"""
ChatterMate - Workflow Variable
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

from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base
import enum
import uuid
from datetime import datetime


class VariableScope(str, enum.Enum):
    GLOBAL = "global"  # Available across all workflows in the organization
    WORKFLOW = "workflow"  # Available only within a specific workflow
    CONVERSATION = "conversation"  # Instance-specific for a conversation


class VariableType(str, enum.Enum):
    STRING = "string"
    NUMBER = "number"
    BOOLEAN = "boolean"
    ARRAY = "array"
    OBJECT = "object"


class WorkflowVariable(Base):
    __tablename__ = "workflow_variables"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workflow_id = Column(UUID(as_uuid=True), ForeignKey("workflows.id", ondelete="CASCADE"))
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"))
    name = Column(String(100), nullable=False)
    description = Column(Text)
    scope = Column(Enum(VariableScope), default=VariableScope.WORKFLOW)
    variable_type = Column(Enum(VariableType), default=VariableType.STRING)
    default_value = Column(Text)  # Stored as JSON string for all types
    is_required = Column(Boolean, default=False)
    is_system = Column(Boolean, default=False)  # System variables like current_user, timestamp
    validation_rules = Column(JSON, default={})  # Rules for validating variable values
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    workflow = relationship("Workflow", back_populates="variables")
    organization = relationship("Organization")

    class Config:
        orm_mode = True 