from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from uuid import  uuid4
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base


class Widget(Base):
    __tablename__ = "widgets"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    name = Column(String, nullable=False)
    organization_id = Column(UUID(as_uuid=True), ForeignKey(
        "organizations.id"), nullable=False)

    # Agent relationship
    agent_id = Column(UUID(as_uuid=True), ForeignKey("agents.id"))
    agent = relationship("Agent", back_populates="widgets")

    # Relationships
    organization = relationship("Organization", back_populates="widgets")
