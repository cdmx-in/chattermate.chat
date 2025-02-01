from sqlalchemy import Column, Integer, String, JSON, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
import enum
from sqlalchemy.dialects.postgresql import UUID

class QueueStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class KnowledgeQueue(Base):
    __tablename__ = "knowledge_queue"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(UUID(as_uuid=True), nullable=False)
    agent_id = Column(UUID(as_uuid=True), nullable=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    # 'pdf_file', 'pdf_url', 'website'
    source_type = Column(String, nullable=False)
    source = Column(String, nullable=False)  # File path or URL
    status = Column(String, default=QueueStatus.PENDING)
    error = Column(String, nullable=True)
    # Renamed from metadata to queue_metadata
    queue_metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Add relationship
    user = relationship("User", back_populates="knowledge_queue_items")
