"""
Copyright 2024-2026 ChatterMate

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

import pytest
from unittest.mock import patch, MagicMock
import socketio

from app.core.socketio import configure_socketio, sio, socket_app


def test_configure_socketio_with_cors():
    """Test configuring socketio with CORS origins"""
    # Test with a string
    with patch.object(sio.eio, 'cors_allowed_origins', None):
        configure_socketio(cors_origins="https://example.com")
        assert sio.eio.cors_allowed_origins == ["https://example.com"]
    
    # Test with a list
    with patch.object(sio.eio, 'cors_allowed_origins', None):
        configure_socketio(cors_origins=["https://example1.com", "https://example2.com"])
        assert sio.eio.cors_allowed_origins == ["https://example1.com", "https://example2.com"]
    
    # Test with a set
    with patch.object(sio.eio, 'cors_allowed_origins', None):
        configure_socketio(cors_origins={"https://example1.com", "https://example2.com"})
        assert isinstance(sio.eio.cors_allowed_origins, list)
        assert set(sio.eio.cors_allowed_origins) == {"https://example1.com", "https://example2.com"}


REDIS_OPTIONS = {
    'retry_on_timeout': True,
    'health_check_interval': 30,
    'socket_timeout': 5.0,
    'socket_connect_timeout': 5.0,
}


@pytest.fixture
def restore_manager():
    """configure_socketio swaps the shared server's manager; put the real one back."""
    manager, initialized = sio.manager, sio.manager_initialized
    yield
    sio.manager, sio.manager_initialized = manager, initialized


@patch('app.core.socketio.settings')
def test_configure_socketio_with_redis_disabled(mock_settings, restore_manager):
    """Without Redis the server keeps its in-process manager."""
    mock_settings.REDIS_ENABLED = False
    manager = sio.manager

    configure_socketio()

    assert sio.manager is manager
    assert not isinstance(sio.manager, socketio.AsyncRedisManager)


@patch('app.core.socketio.settings')
@patch('socketio.AsyncRedisManager')
def test_configure_socketio_with_redis_enabled(mock_redis_manager, mock_settings, restore_manager):
    """With Redis, the Redis manager is the one the server emits through —
    not merely assigned to an attribute it never reads."""
    mock_settings.REDIS_ENABLED = True
    mock_settings.REDIS_URL = "redis://localhost:6379"
    mock_redis_instance = MagicMock()
    mock_redis_manager.return_value = mock_redis_instance

    configure_socketio()

    mock_redis_manager.assert_called_once_with(
        "redis://localhost:6379", write_only=False, channel='chattermate', redis_options=REDIS_OPTIONS,
    )
    assert sio.manager is mock_redis_instance
    mock_redis_instance.set_server.assert_called_once_with(sio)
    assert sio.manager_initialized is False


@patch('app.core.socketio.settings')
@patch('socketio.AsyncRedisManager')
def test_configure_socketio_with_elasticache(mock_redis_manager, mock_settings, restore_manager):
    """ElastiCache URLs are upgraded to TLS."""
    mock_settings.REDIS_ENABLED = True
    mock_settings.REDIS_URL = "redis://my-cluster.cache.amazonaws.com:6379"
    mock_redis_manager.return_value = MagicMock()

    configure_socketio()

    mock_redis_manager.assert_called_once_with(
        "rediss://my-cluster.cache.amazonaws.com:6379", write_only=False, channel='chattermate',
        redis_options={**REDIS_OPTIONS, 'ssl_cert_reqs': None},
    )


@patch('app.core.socketio.settings')
@patch('socketio.AsyncRedisManager')
def test_configure_socketio_with_redis_exception(mock_redis_manager, mock_settings, restore_manager):
    """A Redis manager that cannot be built leaves the in-process one serving."""
    mock_settings.REDIS_ENABLED = True
    mock_settings.REDIS_URL = "redis://localhost:6379"
    mock_redis_manager.side_effect = Exception("Redis connection error")
    manager = sio.manager

    configure_socketio()

    mock_redis_manager.assert_called_once()
    assert sio.manager is manager


def test_plain_redis_gets_no_tls_options():
    """redis-py rejects ssl_cert_reqs on redis://; with it the manager's listener
    fails in a loop and floods the log."""
    from app.core.socketio import redis_options
    assert 'ssl_cert_reqs' not in redis_options("redis://redis:6379/0")
    assert redis_options("rediss://cache.amazonaws.com:6379")['ssl_cert_reqs'] is None
