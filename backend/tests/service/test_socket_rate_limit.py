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
        # Setup environment data
        mock_sio.get_environ.return_value = {'REMOTE_ADDR': TEST_IP}
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
async def test_localhost_bypass(mock_sio, mock_redis_client):
    """Test that localhost requests bypass rate limiting"""
    # Setup localhost IP
    mock_sio.get_environ.return_value = {'REMOTE_ADDR': '127.0.0.1'}
    
    # Create and decorate handler
    mock_handler = AsyncMock()
    decorated_handler = socket_rate_limit()(mock_handler)
    
    # Call handler
    await decorated_handler(TEST_SID)
    
    # Verify handler was called without checking Redis
    mock_handler.assert_called_once_with(TEST_SID)
    mock_redis_client.get.assert_not_called()

@pytest.mark.asyncio
async def test_daily_limit_exceeded(mock_sio, mock_redis_client):
    """Test when daily request limit is exceeded"""
    # Setup Redis mock to return limit exceeded
    mock_redis_client.get.return_value = "100"  # Current count equals limit
    mock_redis_client.ttl.return_value = 3600  # 1 hour remaining
    
    # Create and decorate handler
    mock_handler = AsyncMock()
    decorated_handler = socket_rate_limit()(mock_handler)
    
    # Call handler
    result = await decorated_handler(TEST_SID)
    
    # Verify error was emitted
    mock_sio.emit.assert_called_once()
    assert mock_sio.emit.call_args[0][0] == 'error'
    assert 'Daily request limit reached' in mock_sio.emit.call_args[0][1]['error']
    assert result is None

@pytest.mark.asyncio
async def test_rate_limit_exceeded(mock_sio, mock_redis_client):
    """Test when rate limit (requests per second) is exceeded"""
    # Setup Redis mocks
    mock_redis_client.get.side_effect = ["1", "1"]  # First for daily, second for rate
    mock_redis_client.ttl.return_value = 1  # 1 second remaining
    mock_redis_client.incr.return_value = 1  # Increment counter
    
    # Create and decorate handler
    mock_handler = AsyncMock()
    decorated_handler = socket_rate_limit()(mock_handler)
    
    # Call handler
    result = await decorated_handler(TEST_SID)
    
    # Verify error was emitted
    mock_sio.emit.assert_called_once()
    assert mock_sio.emit.call_args[0][0] == 'error'
    assert 'sending messages too quickly' in mock_sio.emit.call_args[0][1]['error'].lower()
    assert result is None

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

@pytest.mark.asyncio
async def test_successful_request(mock_sio, mock_redis_client):
    """Test successful request within limits"""
    # Setup Redis mocks for successful case
    mock_redis_client.get.side_effect = [None, None]  # First requests for both limits
    
    # Create and decorate handler
    mock_handler = AsyncMock()
    decorated_handler = socket_rate_limit()(mock_handler)
    
    # Call handler
    await decorated_handler(TEST_SID)
    
    # Verify handler was called
    mock_handler.assert_called_once_with(TEST_SID)
    
    # In GitHub Actions, the Redis client might be mocked differently
    # So we'll check that setex was called at least once
    assert mock_redis_client.setex.call_count > 0 