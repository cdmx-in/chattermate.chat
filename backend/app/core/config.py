import os
from pydantic_settings import BaseSettings
import socketio
from socketio import AsyncServer


class Settings(BaseSettings):
    PROJECT_NAME: str = "ChatterMate"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "postgresql://test:test@localhost:5432/chattermate")

    # JWT
    SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "your-secret-key")
    CONVERSATION_SECRET_KEY: str = os.getenv(
        "CONVERSATION_SECRET_KEY", "your-conversation-secret-key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS
    CORS_ORIGINS: list = ["https://chattermate.chat",
                          "http://localhost:5173", "http://localhost:8000", "*"]

    # Firebase config
    FIREBASE_CREDENTIALS_PATH: str = "chattermate-13e0a-firebase-adminsdk-7dqo6-57f3de88cb.json"

    class Config:
        case_sensitive = True


settings = Settings()

# Socket.IO setup with proper async configuration
sio: AsyncServer = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=settings.CORS_ORIGINS,
    logger=True,
    engineio_logger=True,
    async_handlers=True,
    ping_timeout=60,
    ping_interval=25,
)

# Create ASGI app
app = socketio.ASGIApp(
    socketio_server=sio,
    socketio_path='socket.io'
)
