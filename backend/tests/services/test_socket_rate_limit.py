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
import asyncio
from unittest.mock import patch, MagicMock, AsyncMock
from app.services.socket_rate_limit import socket_rate_limit
from app.core.config import settings
from app.core.socketio import sio

@pytest.fixture
def mock_redis():
    with patch('app.services.socket_rate_limit.redis_client') as mock_client:
        yield mock_client

@pytest.fixture
def mock_sio():
    with patch('app.services.socket_rate_limit.sio') as mock_sio:
        yield mock_sio

@pytest.mark.asyncio
async def test_socket_rate_limit_disabled():
    """Test when rate limiting is disabled"""
    # Create a mock handler function
    mock_handler = AsyncMock()
    
    # Create a mock session without rate limiting
    mock_session = {
        'enable_rate_limiting': False
    }
    
    # Mock sio.get_session
    with patch('app.services.socket_rate_limit.sio.get_session', AsyncMock(return_value=mock_session)):
        # Apply the decorator
        decorated_handler = socket_rate_limit()(mock_handler)
        
        # Call the decorated handler
        await decorated_handler('test_sid', 'test_arg')
        
        # Verify the handler was called
        mock_handler.assert_called_once_with('test_sid', 'test_arg')

@pytest.mark.asyncio
async def test_socket_rate_limit_redis_disabled():
    """Test when Redis is disabled"""
    # Create a mock handler function
    mock_handler = AsyncMock()
    
    # Create a mock session with rate limiting
    mock_session = {
        'enable_rate_limiting': True,
        'overall_limit_per_ip': 100,
        'requests_per_sec': 1.0
    }
    
    with patch('app.services.socket_rate_limit.settings.REDIS_ENABLED', False), \
         patch('app.services.socket_rate_limit.sio.get_session', AsyncMock(return_value=mock_session)):
        # Apply the decorator
        decorated_handler = socket_rate_limit()(mock_handler)
        
        # Call the decorated handler
        await decorated_handler('test_sid', 'test_arg')
        
        # Verify the handler was called
        mock_handler.assert_called_once_with('test_sid', 'test_arg')

@pytest.mark.asyncio
async def test_socket_rate_limit_with_forwarded_ip(mock_redis):
    """Test rate limiting with X-Forwarded-For header"""
    # Create a mock handler function
    mock_handler = AsyncMock()
    
    # Create a mock session with rate limiting
    mock_session = {
        'enable_rate_limiting': True,
        'overall_limit_per_ip': 100,
        'requests_per_sec': 1.0,
        'agent_id': 'test_agent'
    }
    
    # Mock environment with X-Forwarded-For
    mock_environ = {
        'HTTP_X_FORWARDED_FOR': '192.168.1.1, 10.0.0.1'
    }
    
    # Configure Redis mock
    mock_redis.get.return_value = None  # No previous requests
    mock_redis.setex.return_value = True
    mock_redis.incr.return_value = 1  # First request
    mock_redis.expire.return_value = True
    
    # Mock asyncio.wait_for to return Redis results directly
    async def mock_wait_for(coro, timeout):
        if isinstance(coro, asyncio.Future):
            return await coro
        return coro
    
    with patch('app.services.socket_rate_limit.settings.REDIS_ENABLED', True), \
         patch('app.services.socket_rate_limit.sio.get_session', AsyncMock(return_value=mock_session)), \
         patch('app.services.socket_rate_limit.sio.get_environ', return_value=mock_environ), \
         patch('asyncio.wait_for', mock_wait_for):
        # Apply the decorator
        decorated_handler = socket_rate_limit()(mock_handler)
        
        # Call the decorated handler
        await decorated_handler('test_sid', 'test_arg')
        
        # Verify the handler was called
        mock_handler.assert_called_once_with('test_sid', 'test_arg')
        
        # Verify Redis interactions
        assert mock_redis.get.call_count >= 2  # Called for both overall and rate limits
        assert mock_redis.setex.call_count >= 2  # Called for both overall and rate limits

@pytest.mark.asyncio
async def test_socket_rate_limit_exceeded(mock_redis):
    """Test when rate limit is exceeded"""
    # Create a mock handler function
    mock_handler = AsyncMock()
    
    # Create a mock session with rate limiting
    mock_session = {
        'enable_rate_limiting': True,
        'overall_limit_per_ip': 100,
        'requests_per_sec': 1.0,
        'agent_id': 'test_agent'
    }
    
    # Mock environment
    mock_environ = {
        'REMOTE_ADDR': '192.168.1.1'
    }
    
    # Configure Redis mock to simulate exceeded limit
    mock_redis.get.return_value = b'101'  # Over the limit
    mock_redis.ttl.return_value = 3600  # 1 hour remaining
    
    # Mock asyncio.wait_for to return Redis results directly
    async def mock_wait_for(coro, timeout):
        if isinstance(coro, asyncio.Future):
            return await coro
        return coro
    
    # Mock sio.emit to capture error messages
    mock_emit = AsyncMock()
    
    with patch('app.services.socket_rate_limit.settings.REDIS_ENABLED', True), \
         patch('app.services.socket_rate_limit.sio.get_session', AsyncMock(return_value=mock_session)), \
         patch('app.services.socket_rate_limit.sio.get_environ', return_value=mock_environ), \
         patch('app.services.socket_rate_limit.sio.emit', mock_emit), \
         patch('asyncio.wait_for', mock_wait_for):
        # Apply the decorator
        decorated_handler = socket_rate_limit()(mock_handler)
        
        # Call the decorated handler
        result = await decorated_handler('test_sid', 'test_arg')
        
        # Verify the handler was not called
        mock_handler.assert_not_called()
        
        # Verify error was emitted
        mock_emit.assert_called_once()
        args = mock_emit.call_args[0]
        assert args[0] == 'error'
        assert 'Daily request limit reached' in args[1]['error']
        assert result is None

@pytest.mark.asyncio
async def test_socket_rate_limit_with_real_ip(mock_redis):
    """Test rate limiting with X-Real-IP header"""
    # Create a mock handler function
    mock_handler = AsyncMock()
    
    # Create a mock session with rate limiting
    mock_session = {
        'enable_rate_limiting': True,
        'overall_limit_per_ip': 100,
        'requests_per_sec': 1.0,
        'agent_id': 'test_agent'
    }
    
    # Mock environment with X-Real-IP
    mock_environ = {
        'HTTP_X_REAL_IP': '192.168.1.1'
    }
    
    # Configure Redis mock
    mock_redis.get.return_value = None  # No previous requests
    mock_redis.setex.return_value = True
    mock_redis.incr.return_value = 1  # First request
    mock_redis.expire.return_value = True
    
    # Mock asyncio.wait_for to return Redis results directly
    async def mock_wait_for(coro, timeout):
        if isinstance(coro, asyncio.Future):
            return await coro
        return coro
    
    with patch('app.services.socket_rate_limit.settings.REDIS_ENABLED', True), \
         patch('app.services.socket_rate_limit.sio.get_session', AsyncMock(return_value=mock_session)), \
         patch('app.services.socket_rate_limit.sio.get_environ', return_value=mock_environ), \
         patch('asyncio.wait_for', mock_wait_for):
        # Apply the decorator
        decorated_handler = socket_rate_limit()(mock_handler)
        
        # Call the decorated handler
        await decorated_handler('test_sid', 'test_arg')
        
        # Verify the handler was called
        mock_handler.assert_called_once_with('test_sid', 'test_arg')
        
        # Verify Redis interactions
        assert mock_redis.get.call_count >= 2  # Called for both overall and rate limits
        assert mock_redis.setex.call_count >= 2  # Called for both overall and rate limits

@pytest.mark.asyncio
async def test_socket_rate_limit_redis_error(mock_redis):
    """Test handling of Redis errors"""
    # Create a mock handler function
    mock_handler = AsyncMock()
    
    # Create a mock session with rate limiting
    mock_session = {
        'enable_rate_limiting': True,
        'overall_limit_per_ip': 100,
        'requests_per_sec': 1.0,
        'agent_id': 'test_agent'
    }
    
    # Mock environment
    mock_environ = {
        'REMOTE_ADDR': '192.168.1.1'
    }
    
    # Configure Redis mock to raise an error
    mock_redis.get.side_effect = redis.RedisError("Connection error")
    
    with patch('app.services.socket_rate_limit.settings.REDIS_ENABLED', True), \
         patch('app.services.socket_rate_limit.sio.get_session', AsyncMock(return_value=mock_session)), \
         patch('app.services.socket_rate_limit.sio.get_environ', return_value=mock_environ):
        # Apply the decorator
        decorated_handler = socket_rate_limit()(mock_handler)
        
        # Call the decorated handler
        await decorated_handler('test_sid', 'test_arg')
        
        # Verify the handler was called (should proceed on Redis error)
        mock_handler.assert_called_once_with('test_sid', 'test_arg') 