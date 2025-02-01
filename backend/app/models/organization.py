import uuid
from sqlalchemy import Column, Integer, String, Boolean, DateTime, JSON, func
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.role import Role
from sqlalchemy.dialects.postgresql import UUID

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True,default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    domain = Column(String(100), unique=True, nullable=False)
    timezone = Column(String(50), nullable=False, default='UTC')
    business_hours = Column(JSON, default={
        'monday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'tuesday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'wednesday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'thursday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'friday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'saturday': {'start': '09:00', 'end': '17:00', 'enabled': False},
        'sunday': {'start': '09:00', 'end': '17:00', 'enabled': False}
    })
    settings = Column(JSON, default={})
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(),
                        onupdate=func.now())

    # Define relationships
    chat_histories = relationship("ChatHistory", back_populates="organization")
    users = relationship("User", back_populates="organization",
                         cascade="all, delete-orphan")
    customers = relationship(
        "Customer", back_populates="organization", cascade="all, delete-orphan")
    roles = relationship("Role", back_populates="organization",
                         cascade="all, delete-orphan")
    ai_configs = relationship("AIConfig", back_populates="organization",
                              cascade="all, delete-orphan")
    agents = relationship("Agent", back_populates="organization")
    knowledge_sources = relationship(
        "Knowledge", back_populates="organization")
    widgets = relationship("Widget", back_populates="organization")
    groups = relationship("UserGroup", back_populates="organization")
    class Config:
        orm_mode = True
