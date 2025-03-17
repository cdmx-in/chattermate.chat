"""
ChatterMate - Test Socket Rate Limit
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>
"""

import pytest
import redis
from unittest.mock import patch, MagicMock, AsyncMock
import asyncio

from app.services.socket_rate_limit import socket_rate_limit
from app.core.socketio import sio

# Test data
TEST_SID = "test_session_id"
TEST_NAMESPACE = "/widget"
TEST_IP = "192.168.1.1"
TEST_AGENT_ID = "test_agent_123"

@pytest.fixture
def mock_redis_client():
    with patch('app.services.socket_rate_limit.redis_client') as mock_client:
        # Setup Redis mock to work with asyncio.wait_for
        mock_client.get = MagicMock()
        mock_client.setex = MagicMock()
        mock_client.incr = MagicMock()
        mock_client.ttl = MagicMock()
        yield mock_client

@pytest.fixture
def mock_sio():
    with patch('app.services.socket_rate_limit.sio') as mock_sio:
        # Setup session data
        mock_sio.get_session = AsyncMock(return_value={
            'enable_rate_limiting': True,
            'overall_limit_per_ip': 100,
            'requests_per_sec': 1.0,
            'agent_id': TEST_AGENT_ID
        })
        # Setup environment data with load balancer headers
        mock_sio.get_environ.return_value = {
            'REMOTE_ADDR': '10.0.0.1',  # Load balancer IP
            'HTTP_X_FORWARDED_FOR': f'{TEST_IP}, 10.0.0.1'  # Original client IP, load balancer IP
        }
        # Make emit async
        mock_sio.emit = AsyncMock()
        yield mock_sio

@pytest.mark.asyncio
async def test_rate_limit_disabled():
    """Test when rate limiting is disabled"""
    # Create a mock handler
    mock_handler = AsyncMock()
    
    # Create a mock session with rate limiting disabled
    with patch.object(sio, 'get_session', new_callable=AsyncMock) as mock_get_session:
        mock_get_session.return_value = {'enable_rate_limiting': False}
        
        # Apply decorator
        decorated_handler = socket_rate_limit()(mock_handler)
        
        # Call decorated handler
        await decorated_handler(TEST_SID)
        
        # Verify handler was called
        mock_handler.assert_called_once_with(TEST_SID)

@pytest.mark.asyncio
async def test_load_balancer_ip_detection(mock_sio, mock_redis_client):
    """Test that the real client IP is detected when behind a load balancer"""
    # Setup Redis mock for successful case
    mock_redis_client.get.return_value = None  # First request
    mock_redis_client.setex.return_value = True
    
    # Setup environment data with test IP
    mock_sio.get_environ.return_value = {
        'HTTP_X_REAL_IP': TEST_IP,
        'REMOTE_ADDR': '10.0.0.1'  # Load balancer IP
    }
    
    # Create and decorate handler
    mock_handler = AsyncMock()
    decorated_handler = socket_rate_limit()(mock_handler)
    
    # Call handler
    await decorated_handler(TEST_SID)
    
    # Verify Redis operations used the correct client IP
    redis_calls = mock_redis_client.setex.call_args_list
    assert len(redis_calls) == 2, "Should have two setex calls - one for daily limit and one for rate limit"
    
    # Check both Redis keys contain the correct client IP
    overall_key = redis_calls[0][0][0]  # First call, first argument (key)
    rate_key = redis_calls[1][0][0]     # Second call, first argument (key)
    
    assert TEST_IP in overall_key, f"Overall key should contain client IP {TEST_IP}, got {overall_key}"
    assert TEST_IP in rate_key, f"Rate key should contain client IP {TEST_IP}, got {rate_key}"
    
    # Verify handler was called
    mock_handler.assert_called_once_with(TEST_SID)

@pytest.mark.asyncio
async def test_multiple_ip_headers(mock_sio, mock_redis_client):
    """Test IP detection with multiple proxy headers"""
    # Setup environment with multiple headers
    mock_sio.get_environ.return_value = {
        'REMOTE_ADDR': '10.0.0.1',
        'HTTP_X_FORWARDED_FOR': 'bad.ip.address',
        'HTTP_X_REAL_IP': TEST_IP
    }
    
    # Setup Redis mock for successful case
    mock_redis_client.get.return_value = None  # First request
    mock_redis_client.setex.return_value = True
    
    # Create and decorate handler
    mock_handler = AsyncMock()
    decorated_handler = socket_rate_limit()(mock_handler)
    
    # Call handler
    await decorated_handler(TEST_SID)
    
    # Verify Redis operations used the correct client IP
    redis_calls = mock_redis_client.setex.call_args_list
    assert len(redis_calls) == 2, "Should have two setex calls - one for daily limit and one for rate limit"
    
    # Check both Redis keys contain the correct client IP
    overall_key = redis_calls[0][0][0]  # First call, first argument (key)
    rate_key = redis_calls[1][0][0]     # Second call, first argument (key)
    
    assert TEST_IP in overall_key, f"Overall key should contain client IP {TEST_IP}, got {overall_key}"
    assert TEST_IP in rate_key, f"Rate key should contain client IP {TEST_IP}, got {rate_key}"
    
    # Verify handler was called
    mock_handler.assert_called_once_with(TEST_SID)

@pytest.mark.asyncio
async def test_localhost_bypass(mock_sio, mock_redis_client):
    """Test that localhost requests bypass rate limiting"""
    # Test different localhost variations and headers
    test_cases = [
        # (header_name, is_list, localhost_ip)
        ('HTTP_X_FORWARDED_FOR', True, '127.0.0.1'),
        ('HTTP_X_FORWARDED_FOR', True, 'localhost'),
        ('HTTP_X_FORWARDED_FOR', True, '::1'),
        ('HTTP_X_REAL_IP', False, '127.0.0.1'),
        ('HTTP_X_REAL_IP', False, 'localhost'),
        ('HTTP_CF_CONNECTING_IP', False, '127.0.0.1'),
        ('REMOTE_ADDR', False, '127.0.0.1')
    ]
    
    for header, is_list, ip in test_cases:
        # Setup environment data
        environ = {'REMOTE_ADDR': '10.0.0.1'}  # Default remote addr
        if is_list:
            environ[header] = f"{ip}, 10.0.0.1"  # Add load balancer IP
        else:
            environ[header] = ip
        
        mock_sio.get_environ.return_value = environ
        
        # Create and decorate handler
        mock_handler = AsyncMock()
        decorated_handler = socket_rate_limit()(mock_handler)
        
        # Call handler
        await decorated_handler(TEST_SID)
        
        # Verify handler was called without checking Redis
        mock_handler.assert_called_once_with(TEST_SID)
        mock_redis_client.get.assert_not_called()
        mock_redis_client.setex.assert_not_called()
        
        # Reset mocks for next iteration
        mock_handler.reset_mock()
        mock_redis_client.get.reset_mock()
        mock_redis_client.setex.reset_mock()

@pytest.mark.asyncio
async def test_redis_connection_failure(mock_sio):
    """Test behavior when Redis connection fails"""
    # Setup Redis client to be None
    with patch('app.services.socket_rate_limit.redis_client', None):
        # Create and decorate handler
        mock_handler = AsyncMock()
        decorated_handler = socket_rate_limit()(mock_handler)
        
        # Call handler
        await decorated_handler(TEST_SID)
        
        # Verify handler was called despite Redis failure
        mock_handler.assert_called_once_with(TEST_SID)

@pytest.mark.asyncio
async def test_redis_timeout(mock_sio, mock_redis_client):
    """Test behavior when Redis operations timeout"""
    # Setup Redis mock to timeout
    mock_redis_client.get.side_effect = asyncio.TimeoutError()
    
    # Create and decorate handler
    mock_handler = AsyncMock()
    decorated_handler = socket_rate_limit()(mock_handler)
    
    # Call handler
    await decorated_handler(TEST_SID)
    
    # Verify handler was called despite timeout
    mock_handler.assert_called_once_with(TEST_SID)
