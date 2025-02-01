from app.database import Base
from .organization import Organization
from .user import User
from .customer import Customer
from .role import Role
from .permission import Permission
from .ai_config import AIConfig, AIModelType
from .agent import Agent
from .knowledge_to_agent import KnowledgeToAgent
from .knowledge import Knowledge
from .chat_history import ChatHistory
from .session_to_agent import SessionToAgent, SessionStatus
# This ensures all models are imported in the correct order
__all__ = [
    "Organization",
    "User",
    "Customer",
    "Permission",
    "Role",
    "AIConfig",
    "AIModelType",
    "Agent",
    "KnowledgeToAgent",
    "Knowledge",
    "ChatHistory",
    "SessionToAgent",
    "SessionStatus"
]
