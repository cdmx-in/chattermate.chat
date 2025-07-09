"""
ChatterMate - Workflow Node
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

from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON, Float, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base
import enum
import uuid


class NodeType(str, enum.Enum):
    MESSAGE = "message"
    LLM = "llm"
    CONDITION = "condition"
    FORM = "form"
    ACTION = "action"
    HUMAN_TRANSFER = "human_transfer"
    WAIT = "wait"
    END = "end"


class ActionType(str, enum.Enum):
    WEBHOOK = "webhook"
    DATABASE = "database"
    EMAIL = "email"
    NOTIFICATION = "notification"
    CUSTOM = "custom"


class WorkflowNode(Base):
    __tablename__ = "workflow_nodes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workflow_id = Column(UUID(as_uuid=True), ForeignKey("workflows.id", ondelete="CASCADE"), nullable=False)
    node_type = Column(Enum(NodeType), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    position_x = Column(Float, default=0)  # X coordinate on canvas
    position_y = Column(Float, default=0)  # Y coordinate on canvas
    config = Column(JSON, default={})  # Node-specific configuration
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # For Message nodes
    message_text = Column(Text)
    
    # For LLM nodes
    system_prompt = Column(Text)
    temperature = Column(Float, default=0.7)
    model_id = Column(Integer, ForeignKey("ai_configs.id"))
    
    # For Form nodes
    form_fields = Column(JSON, default=[])  # Array of field definitions
    
    # For Condition nodes
    condition_expression = Column(Text)
    
    # For Action nodes
    action_type = Column(String)  # webhook, database, email, etc.
    action_config = Column(JSON, default={})
    
    # For Human Transfer nodes
    transfer_rules = Column(JSON, default={})
    
    # For Wait nodes
    wait_duration = Column(Integer)  # in seconds
    wait_until_condition = Column(Text)  # optional condition to end wait early

    # Relationships
    workflow = relationship("Workflow", back_populates="nodes")
    outgoing_connections = relationship(
        "WorkflowConnection", 
        foreign_keys="[WorkflowConnection.source_node_id]", 
        back_populates="source_node",
        cascade="all, delete-orphan"
    )
    incoming_connections = relationship(
        "WorkflowConnection", 
        foreign_keys="[WorkflowConnection.target_node_id]", 
        back_populates="target_node",
        cascade="all, delete-orphan"
    )
    model = relationship("AIConfig")

    class Config:
        orm_mode = True 