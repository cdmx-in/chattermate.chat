"""
ChatterMate - Session To Agent
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