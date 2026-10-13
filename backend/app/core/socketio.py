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

from urllib.parse import urlparse

import socketio
from socketio import AsyncServer
from app.core.config import settings
from app.core.logger import get_logger
from app.core.cors import get_cors_origins

logger = get_logger(__name__)

# ElastiCache endpoints terminate TLS, so a redis:// URL pointing at one has to be
# upgraded to rediss://. Match the HOST: ".cache.amazonaws.com" anywhere in the
# string would also accept redis://evil.com/?x=.cache.amazonaws.com.
ELASTICACHE_HOST_SUFFIX = ".cache.amazonaws.com"


def needs_elasticache_tls(redis_url: str | None) -> bool:
    """True when this plaintext Redis URL points at an ElastiCache host."""
    if not redis_url or not redis_url.startswith("redis://"):
        return False
    return (urlparse(redis_url).hostname or "").endswith(ELASTICACHE_HOST_SUFFIX)

# Initialize Socket.IO server with basic config
sio: AsyncServer = socketio.AsyncServer(
    async_mode='asgi',
    logger=True,
    engineio_logger=True,
    async_handlers=True,
    ping_timeout=60,
    ping_interval=25,
    max_http_buffer_size=15 * 1024 * 1024,  # 15MB to handle base64-encoded files (5MB image = ~6.7MB base64)
    cors_allowed_origins=list(get_cors_origins())  # Use the same CORS origins as FastAPI
)

# Create ASGI app
socket_app = socketio.ASGIApp(
    socketio_server=sio,
    socketio_path='socket.io'
)

def redis_options(redis_url: str) -> dict:
    """Connection options for the Socket.IO Redis manager. ssl_cert_reqs is a
    TLS-only option — redis-py refuses it on a plain redis:// connection, and the
    manager's listener then fails in a loop."""
    options = {
        'retry_on_timeout': True,
        'health_check_interval': 30,
        'socket_timeout': 5.0,
        'socket_connect_timeout': 5.0,
    }
    if redis_url.startswith("rediss://"):
        options['ssl_cert_reqs'] = None  # ElastiCache's certificate is not verified
    return options


def configure_socketio(cors_origins=None):
    """Configure Socket.IO with CORS origins and Redis if enabled"""
    if cors_origins:
        # Convert set to list if needed and ensure all origins are strings
        cors_list = list(cors_origins) if isinstance(cors_origins, (set, list)) else [cors_origins]
        
        # Set CORS origins for Socket.IO
        sio.eio.cors_allowed_origins = cors_list

    if settings.REDIS_ENABLED:
        # Use rediss:// protocol if TLS is needed (ElastiCache)
        redis_url = settings.REDIS_URL
        if needs_elasticache_tls(redis_url):
            redis_url = "rediss://" + redis_url[8:]
            logger.info(f"Using TLS for Redis connection: {redis_url}")
        
        logger.info(f"Redis URL: {redis_url}")
        
        try:
            # The server routes every emit through sio.manager, which it set
            # up at construction; assigning client_manager afterwards (as this
            # once did) changes nothing, so emits from other processes — the
            # ticket worker's CSAT requests and ticket updates — never left
            # them. Install the Redis manager where the server looks for it.
            # Local clients are still served directly; Redis carries the emit
            # to the other processes.
            manager = socketio.AsyncRedisManager(
                redis_url,
                write_only=False,
                channel='chattermate',
                redis_options=redis_options(redis_url),
            )
            manager.set_server(sio)
            sio.manager = manager
            sio.manager_initialized = False
            logger.info("Redis manager configured successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Redis manager: {str(e)}") 