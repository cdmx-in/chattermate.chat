from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime, func, UUID
from sqlalchemy.orm import relationship
from app.database import Base


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(UUID(as_uuid=True), ForeignKey(
        "organizations.id", ondelete="SET NULL"), nullable=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey(
        "users.id", ondelete="SET NULL"), nullable=True)
    customer_id = Column(UUID(as_uuid=True), ForeignKey(
        "customers.id", ondelete="SET NULL"), nullable=True)
    agent_id = Column(UUID(as_uuid=True), ForeignKey(
        "agents.id", ondelete="SET NULL"), nullable=True)
    session_id = Column(UUID(as_uuid=True), ForeignKey("session_to_agents.session_id"), nullable=True)
    message = Column(String, nullable=False)
    # 'user', 'bot', or 'agent'
    message_type = Column(String, nullable=False)
    attributes = Column(JSON, default={})
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(),
                        onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="chat_histories")
    customer = relationship("Customer", back_populates="chat_histories")
    agent = relationship("Agent", back_populates="chat_histories")
    organization = relationship("Organization", back_populates="chat_histories")
    session_assignment = relationship("SessionToAgent")

