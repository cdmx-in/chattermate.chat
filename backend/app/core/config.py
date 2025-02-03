import os
import json
from pydantic_settings import BaseSettings
from typing import List
from dotenv import load_dotenv
from pathlib import Path

# Get the absolute path to the backend directory (parent of app directory)
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent

# Load the .env file
load_dotenv(BACKEND_DIR / ".env")

class Settings(BaseSettings):
    PROJECT_NAME: str = "ChatterMate"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "postgresql://test:test@localhost:5432/chattermate")
    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    REDIS_ENABLED: bool = os.getenv("REDIS_ENABLED", "false").lower() == "true"

    # JWT
    SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "your-secret-key")

    ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    CONVERSATION_SECRET_KEY: str = os.getenv(
        "CONVERSATION_SECRET_KEY", "your-conversation-secret-key")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS - Base origins that are always allowed
    BASE_CORS_ORIGINS: List[str] = json.loads(os.getenv(
        "CORS_ORIGINS", '["https://chattermate.chat", "http://localhost:5173", "http://localhost:8000"]'))

    # Firebase config
    FIREBASE_CREDENTIALS: str = os.getenv(
        "FIREBASE_CREDENTIALS", "app/config/firebase-config.json")
    
    VITE_WIDGET_URL: str = os.getenv("VITE_WIDGET_URL", "http://localhost:5173")
    ENCRYPTION_KEY_PATH: str = os.getenv("ENCRYPTION_KEY_PATH", "encryption.key")
    CORS_ORIGINS: List[str] = json.loads(os.getenv(
        "CORS_ORIGINS", '["https://chattermate.chat", "http://localhost:5173", "http://localhost:8000"]'))

    model_config = {
        "case_sensitive": True,
        "env_file": ".env",
        "extra": "allow"  # This allows extra fields from .env
    }


settings = Settings()
