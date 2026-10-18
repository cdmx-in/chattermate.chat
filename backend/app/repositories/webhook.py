"""
ChatterMate - Custom Webhook Repository
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

from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import Optional, List
from uuid import UUID

from app.models.webhook import CustomWebhook, WebhookLog
from app.core.logger import get_logger

logger = get_logger(__name__)


class WebhookRepository:
    """Repository for custom webhook operations."""

    def __init__(self, db: Session):
        self.db = db

    def create_webhook(
        self,
        agent_id: UUID,
        name: str,
        webhook_url: str,
        http_method: str = "POST",
        auth_type: Optional[str] = None,
        auth_token: Optional[str] = None,
        auth_header_name: Optional[str] = None,
        auth_username: Optional[str] = None,
        custom_headers: Optional[dict] = None,
        payload_template: Optional[str] = None,
        content_type: str = "application/json",
        is_active: bool = True,
        event_types: Optional[list] = None
    ) -> CustomWebhook:
        """Create a new agent-specific custom webhook."""
        webhook = CustomWebhook(
            agent_id=agent_id,
            name=name,
            webhook_url=webhook_url,
            http_method=http_method,
            auth_type=auth_type,
            auth_token=auth_token,
            auth_header_name=auth_header_name,
            auth_username=auth_username,
            custom_headers=custom_headers or {},
            payload_template=payload_template,
            content_type=content_type,
            is_active=is_active,
            event_types=event_types or ["ticket_created"]
        )
        self.db.add(webhook)
        self.db.commit()
        self.db.refresh(webhook)
        logger.info(f"Created webhook '{name}' for agent {agent_id}")
        return webhook

    def get_webhook_by_id(self, webhook_id: int, agent_id: UUID) -> Optional[CustomWebhook]:
        """Get a webhook by ID for a specific agent."""
        return self.db.query(CustomWebhook).filter(
            and_(
                CustomWebhook.id == webhook_id,
                CustomWebhook.agent_id == agent_id
            )
        ).first()

    def get_webhooks_by_agent(self, agent_id: UUID) -> List[CustomWebhook]:
        """Get all webhooks for an agent."""
        return self.db.query(CustomWebhook).filter(
            CustomWebhook.agent_id == agent_id
        ).order_by(CustomWebhook.created_at.desc()).all()

    def get_active_webhooks_by_agent(self, agent_id: UUID) -> List[CustomWebhook]:
        """Get all active webhooks for an agent."""
        return self.db.query(CustomWebhook).filter(
            and_(
                CustomWebhook.agent_id == agent_id,
                CustomWebhook.is_active == True
            )
        ).order_by(CustomWebhook.created_at.desc()).all()

    def update_webhook(self, webhook_id: int, agent_id: UUID, **kwargs) -> Optional[CustomWebhook]:
        """Update an existing webhook."""
        webhook = self.get_webhook_by_id(webhook_id, agent_id)
        if not webhook:
            return None

        for key, value in kwargs.items():
            if hasattr(webhook, key) and value is not None:
                setattr(webhook, key, value)

        self.db.commit()
        self.db.refresh(webhook)
        logger.info(f"Updated webhook {webhook_id} for agent {agent_id}")
        return webhook

    def delete_webhook(self, webhook_id: int, agent_id: UUID) -> bool:
        """Delete a webhook."""
        webhook = self.get_webhook_by_id(webhook_id, agent_id)
        if not webhook:
            return False

        self.db.delete(webhook)
        self.db.commit()
        logger.info(f"Deleted webhook {webhook_id} for agent {agent_id}")
        return True

    def create_webhook_log(
        self,
        webhook_id: int,
        agent_id: UUID,
        request_payload: Optional[str] = None,
        response_status_code: Optional[int] = None,
        response_body: Optional[str] = None,
        success: bool = False,
        error_message: Optional[str] = None
    ) -> WebhookLog:
        """Create a webhook execution log entry."""
        log = WebhookLog(
            webhook_id=webhook_id,
            agent_id=agent_id,
            request_payload=request_payload,
            response_status_code=response_status_code,
            response_body=response_body,
            success=success,
            error_message=error_message
        )
        self.db.add(log)
        self.db.commit()
        self.db.refresh(log)
        return log

    def get_webhook_logs(
        self, 
        webhook_id: int, 
        agent_id: UUID, 
        limit: int = 50
    ) -> List[WebhookLog]:
        """Get recent logs for a webhook."""
        return self.db.query(WebhookLog).filter(
            and_(
                WebhookLog.webhook_id == webhook_id,
                WebhookLog.agent_id == agent_id
            )
        ).order_by(WebhookLog.executed_at.desc()).limit(limit).all()

    def get_active_webhooks_by_org(self, organization_id: UUID) -> List[CustomWebhook]:
        """Get all active webhooks for an organization (deprecated - use get_active_webhooks_by_agent)."""
        return self.db.query(CustomWebhook).filter(
            and_(
                CustomWebhook.organization_id == organization_id,
                CustomWebhook.is_active == True
            )
        ).all()
