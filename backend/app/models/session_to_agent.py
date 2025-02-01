from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import enum
from sqlalchemy.sql import func
from app.models.user import UserGroup


class SessionStatus(str, enum.Enum):
    OPEN = "open"
    CLOSED = "closed"
    TRANSFERRED = "transferred"


class SessionToAgent(Base):
    __tablename__ = "session_to_agents"

    session_id = Column(UUID(as_uuid=True), primary_key=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    agent_id = Column(UUID(as_uuid=True), ForeignKey("agents.id", ondelete="SET NULL"), nullable=True)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id", ondelete="SET NULL"), nullable=False)
    group_id = Column(UUID(as_uuid=True), ForeignKey("groups.id", ondelete="SET NULL"), nullable=True)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    status = Column(SQLEnum(SessionStatus), nullable=False, default=SessionStatus.OPEN)
    assigned_at = Column(DateTime(timezone=True), server_default=func.now())
    closed_at = Column(DateTime(timezone=True), nullable=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    transfer_reason = Column(String, nullable=True)
    transfer_description = Column(String, nullable=True)

    # Relationships
    user = relationship("User", back_populates="session_assignments")
    agent = relationship("Agent", back_populates="session_assignments")
    customer = relationship("Customer", back_populates="session_assignments")
    group = relationship("UserGroup", back_populates="session_assignments")


# Add back-reference in UserGroup model if not already present
if not hasattr(UserGroup, 'session_assignments'):
    UserGroup.session_assignments = relationship(
        "SessionToAgent",
        back_populates="group",
        uselist=True
    ) 