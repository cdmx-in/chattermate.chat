"""
ChatterMate - Custom Webhook Model
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

from sqlalchemy import Boolean, Column, Integer, String, JSON, ForeignKey, DateTime, func, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base


class CustomWebhook(Base):
    """Model for custom webhook integrations used for ticket/incident management.

    The `is_active` column includes UI metadata in `info` to hint the frontend
    to render a toggle control instead of a plain checkbox, which helps with
    alignment and provides a clearer UX.
    """

    __tablename__ = "custom_webhooks"

    id = Column(Integer, primary_key=True, index=True)

    # Agent-specific webhook
    agent_id = Column(
        UUID(as_uuid=True),
        ForeignKey("agents.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Basic webhook configuration
    name = Column(String(255), nullable=False)  # e.g., n8n, Make, Zapier
    webhook_url = Column(Text, nullable=False)

    # HTTP configuration
    http_method = Column(String(10), nullable=False, default="POST")  # POST, PUT, PATCH

    # Authentication options
    auth_type = Column(String(50), nullable=True)  # none, bearer, basic, api_key, custom_header
    auth_token = Column(Text, nullable=True)
    auth_header_name = Column(String(100), nullable=True)
    auth_username = Column(String(255), nullable=True)

    # Headers and payload template
    custom_headers = Column(JSON, nullable=True, default=dict)
    payload_template = Column(Text, nullable=True)

    # Content type
    content_type = Column(String(100), nullable=False, default="application/json")

    # Event types that trigger this webhook
    event_types = Column(JSON, nullable=False, default=lambda: ["ticket_created"])

    # Status with UI hint: frontend may read Column.info to render a toggle
    is_active = Column(Boolean, default=True, info={"ui_widget": "toggle", "label": "Active"})

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    agent = relationship("Agent", back_populates="custom_webhooks")

    def __repr__(self) -> str:
        return f"<CustomWebhook id={self.id} name={self.name!r} agent_id={self.agent_id} active={self.is_active}>"

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "agent_id": str(self.agent_id) if self.agent_id else None,
            "name": self.name,
            "webhook_url": self.webhook_url,
            "http_method": self.http_method,
            "auth_type": self.auth_type,
            "content_type": self.content_type,
            "is_active": bool(self.is_active),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }


class WebhookLog(Base):
    """Model for logging webhook execution history."""
    __tablename__ = "webhook_logs"

    id = Column(Integer, primary_key=True, index=True)
    webhook_id = Column(Integer, ForeignKey("custom_webhooks.id", ondelete="CASCADE"), nullable=False)
    agent_id = Column(
        UUID(as_uuid=True),
        ForeignKey("agents.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    # Request details
    request_payload = Column(Text, nullable=True)
    
    # Response details
    response_status_code = Column(Integer, nullable=True)
    response_body = Column(Text, nullable=True)
    
    # Status
    success = Column(Boolean, default=False)
    error_message = Column(Text, nullable=True)
    
    # Timestamps
    executed_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    webhook = relationship("CustomWebhook")
    agent = relationship("Agent")
