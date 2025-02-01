from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from cryptography.fernet import Fernet
from app.core.config import settings
from app.core.logger import get_logger
import base64
import os

logger = get_logger(__name__)

# Constants
SECRET_KEY = settings.SECRET_KEY
CONVERSATION_SECRET_KEY = settings.CONVERSATION_SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Initialize encryption key from environment or generate a persistent one


def get_or_create_key():
    key_path = os.getenv("ENCRYPTION_KEY_PATH", "encryption.key")
    if os.path.exists(key_path):
        with open(key_path, "rb") as key_file:
            return key_file.read()
    else:
        key = Fernet.generate_key()
        with open(key_path, "wb") as key_file:
            key_file.write(key)
        return key


# Initialize Fernet with persistent key
ENCRYPTION_KEY = get_or_create_key()
fernet = Fernet(ENCRYPTION_KEY)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
def verify_conversation_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, CONVERSATION_SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


def encrypt_api_key(api_key: str) -> str:
    """Encrypt API key before storing in database"""
    try:
        return fernet.encrypt(api_key.encode()).decode()
    except Exception as e:
        logger.error(f"Encryption error: {str(e)}")
        raise ValueError("Failed to encrypt API key")


def decrypt_api_key(encrypted_key: str) -> str:
    """Decrypt API key from database"""
    try:
        return fernet.decrypt(encrypted_key.encode()).decode()
    except Exception as e:
        logger.error(f"Decryption error: {str(e)}")
        raise ValueError("Failed to decrypt API key")


def create_conversation_token(widget_id: str, customer_id: Optional[str] = None) -> str:
    """Create a JWT token for widget conversations"""
    data = {
        "sub": str(customer_id),
        "widget_id": widget_id,
        "type": "conversation"
    }
    # Set expiration to 30 days
    expire = datetime.utcnow() + timedelta(days=30)
    data.update({"exp": expire})

    return jwt.encode(data, CONVERSATION_SECRET_KEY, algorithm=ALGORITHM)


def verify_conversation_token(token: str) -> Optional[dict]:
    """Verify conversation token and return payload"""
    try:
        payload = jwt.decode(token, CONVERSATION_SECRET_KEY,
                             algorithms=[ALGORITHM])
        if payload.get("type") != "conversation":
            return None
        return payload
    except JWTError:
        return None


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)
