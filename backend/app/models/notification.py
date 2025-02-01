from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey, Boolean, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum
from sqlalchemy.dialects.postgresql import UUID

class NotificationType(str, enum.Enum):
    KNOWLEDGE_PROCESSED = "knowledge_processed"
    KNOWLEDGE_FAILED = "knowledge_failed"
    SYSTEM = "system"
    CHAT = "chat"


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    type = Column(SQLEnum(NotificationType), nullable=False)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    # For additional data like queue_id, knowledge_id etc
    notification_metadata = Column(JSON, nullable=True)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="notifications")
