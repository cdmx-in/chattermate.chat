"""
ChatterMate - Socketio
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

import socketio
from socketio import AsyncServer
from app.core.config import settings

# Initialize Socket.IO server with basic config
sio: AsyncServer = socketio.AsyncServer(
    async_mode='asgi',
    logger=True,
    engineio_logger=True,
    async_handlers=True,
    ping_timeout=60,
    ping_interval=25,
)

# Create ASGI app
socket_app = socketio.ASGIApp(
    socketio_server=sio,
    socketio_path='socket.io'

)

def configure_socketio(cors_origins):
    """Configure Socket.IO with CORS origins and Redis if enabled"""
    sio.cors_allowed_origins = cors_origins
    
    if settings.REDIS_ENABLED:
        print(f"Redis URL: {settings.REDIS_URL}")
        sio.client_manager = socketio.AsyncRedisManager(
            settings.REDIS_URL,
            write_only=False,
            channel='chattermate',
            redis_options={
                'retry_on_timeout': True,
                'health_check_interval': 30,
            }
        ) 