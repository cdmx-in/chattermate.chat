"""
ChatterMate - Config
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

import os
import json
from pydantic_settings import BaseSettings
from typing import List
from dotenv import load_dotenv
from pathlib import Path
from pydantic import field_validator

# Get the absolute path to the backend directory (parent of app directory)
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent

# Load the .env file
load_dotenv(BACKEND_DIR / ".env")

DEFAULT_CORS = ["https://chattermate.chat", "http://localhost:5173", "http://localhost:8000"]

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

    # CORS Configuration
    CORS_ORIGINS: List[str] = DEFAULT_CORS
    BASE_CORS_ORIGINS: List[str] = DEFAULT_CORS

    # Firebase config
    FIREBASE_CREDENTIALS: str = os.getenv(
        "FIREBASE_CREDENTIALS", "app/config/firebase-config.json")
    
    VITE_WIDGET_URL: str = os.getenv("VITE_WIDGET_URL", "http://localhost:5173")
    ENCRYPTION_KEY_PATH: str = os.getenv("ENCRYPTION_KEY_PATH", "encryption.key")

    # SMTP Settings
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "your-email@gmail.com")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "your-password")
    FROM_EMAIL: str = os.getenv("FROM_EMAIL", "noreply@chattermate.chat")
    FROM_NAME: str = os.getenv("FROM_NAME", "ChatterMate")

    # PayPal
    PAYPAL_CLIENT_ID: str = os.getenv("PAYPAL_CLIENT_ID", "test")
    PAYPAL_CLIENT_SECRET: str = os.getenv("PAYPAL_CLIENT_SECRET", "test")
    PAYPAL_SANDBOX_MODE: bool = os.getenv("PAYPAL_SANDBOX_MODE", "true").lower() == "true"
    PAYPAL_WEBHOOK_ID: str = os.getenv("PAYPAL_WEBHOOK_ID", "test")
    
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    TRIAL_DAYS: int = 7  # 7-day trial period

    model_config = {
        "case_sensitive": True,
        "env_file": ".env",
        "extra": "allow",  # This allows extra fields from .env
    }

    @field_validator("CORS_ORIGINS", "BASE_CORS_ORIGINS", mode="before")
    @classmethod
    def validate_cors_origins(cls, v):
        if isinstance(v, list):
            return v
        if not v:
            return DEFAULT_CORS
        try:
            if isinstance(v, str):
                return json.loads(v)
        except json.JSONDecodeError as e:
            print(f"Error parsing CORS_ORIGINS: {e}. Using default values.")
            return DEFAULT_CORS
        return DEFAULT_CORS


settings = Settings()
