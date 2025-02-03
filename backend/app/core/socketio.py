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