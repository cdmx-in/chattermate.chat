"""
ChatterMate - Custom Webhook API
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

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.core.auth import require_permissions
from app.core.logger import get_logger
from app.models.user import User
from app.models.schemas.webhook import (
    CustomWebhookCreate,
    CustomWebhookUpdate,
    CustomWebhookResponse,
    CustomWebhookListResponse,
    WebhookTestRequest,
    WebhookTestResponse,
    WebhookTriggerRequest,
    WebhookLogResponse
)
from app.repositories.webhook import WebhookRepository
from app.services.webhook_service import webhook_service
from app.models.webhook import CustomWebhook

router = APIRouter()
logger = get_logger(__name__)


@router.get("/webhooks", response_model=CustomWebhookListResponse)
async def list_webhooks(
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """List all custom webhooks for the organization."""
    webhook_repo = WebhookRepository(db)
    webhooks = webhook_repo.get_webhooks_by_organization(current_user.organization_id)
    
    return CustomWebhookListResponse(
        webhooks=[CustomWebhookResponse.model_validate(w) for w in webhooks],
        total=len(webhooks)
    )


@router.post("/webhooks", response_model=CustomWebhookResponse, status_code=status.HTTP_201_CREATED)
async def create_webhook(
    webhook_data: CustomWebhookCreate,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Create a new custom webhook."""
    webhook_repo = WebhookRepository(db)
    
    try:
        webhook = webhook_repo.create_webhook(
            organization_id=current_user.organization_id,
            name=webhook_data.name,
            webhook_url=webhook_data.webhook_url,
            http_method=webhook_data.http_method.value if webhook_data.http_method else "POST",
            auth_type=webhook_data.auth_type.value if webhook_data.auth_type else None,
            auth_token=webhook_data.auth_token,
            auth_header_name=webhook_data.auth_header_name,
            auth_username=webhook_data.auth_username,
            custom_headers=webhook_data.custom_headers,
            payload_template=webhook_data.payload_template,
            content_type=webhook_data.content_type,
            is_active=webhook_data.is_active
        )
        
        logger.info(f"Created webhook '{webhook_data.name}' for org {current_user.organization_id}")
        return CustomWebhookResponse.model_validate(webhook)
        
    except Exception as e:
        logger.error(f"Error creating webhook: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create webhook: {str(e)}"
        )


@router.get("/webhooks/{webhook_id}", response_model=CustomWebhookResponse)
async def get_webhook(
    webhook_id: int,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Get a specific webhook by ID."""
    webhook_repo = WebhookRepository(db)
    webhook = webhook_repo.get_webhook_by_id(webhook_id, current_user.organization_id)
    
    if not webhook:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    return CustomWebhookResponse.model_validate(webhook)


@router.put("/webhooks/{webhook_id}", response_model=CustomWebhookResponse)
async def update_webhook(
    webhook_id: int,
    webhook_data: CustomWebhookUpdate,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Update an existing webhook."""
    webhook_repo = WebhookRepository(db)
    
    # Build update dict, only including non-None values
    update_data = {}
    for field, value in webhook_data.model_dump(exclude_unset=True).items():
        if value is not None:
            # Handle enum values
            if field == "http_method" and hasattr(value, "value"):
                update_data[field] = value.value
            elif field == "auth_type" and hasattr(value, "value"):
                update_data[field] = value.value
            else:
                update_data[field] = value
    
    webhook = webhook_repo.update_webhook(
        webhook_id=webhook_id,
        organization_id=current_user.organization_id,
        **update_data
    )
    
    if not webhook:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    logger.info(f"Updated webhook {webhook_id} for org {current_user.organization_id}")
    return CustomWebhookResponse.model_validate(webhook)


@router.delete("/webhooks/{webhook_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_webhook(
    webhook_id: int,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Delete a webhook."""
    webhook_repo = WebhookRepository(db)
    success = webhook_repo.delete_webhook(webhook_id, current_user.organization_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    logger.info(f"Deleted webhook {webhook_id} for org {current_user.organization_id}")


@router.post("/webhooks/{webhook_id}/test", response_model=WebhookTestResponse)
async def test_webhook(
    webhook_id: int,
    test_request: WebhookTestRequest = WebhookTestRequest(),
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Test a webhook with sample data."""
    webhook_repo = WebhookRepository(db)
    webhook = webhook_repo.get_webhook_by_id(webhook_id, current_user.organization_id)
    
    if not webhook:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    success, status_code, response_body, error_message = await webhook_service.test_webhook(
        webhook, 
        test_request.test_data
    )
    
    # Log the test execution
    webhook_repo.create_webhook_log(
        webhook_id=webhook_id,
        agent_id=webhook.agent_id,
        request_payload=str(test_request.test_data),
        response_status_code=status_code,
        response_body=response_body[:1000] if response_body else None,
        success=success,
        error_message=error_message
    )
    
    return WebhookTestResponse(
        success=success,
        status_code=status_code,
        response_body=response_body,
        error_message=error_message
    )


@router.post("/webhooks/{webhook_id}/trigger", response_model=WebhookTestResponse)
async def trigger_webhook(
    webhook_id: int,
    trigger_data: WebhookTriggerRequest,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Trigger a webhook with actual ticket data."""
    webhook_repo = WebhookRepository(db)
    webhook = webhook_repo.get_webhook_by_id(webhook_id, current_user.organization_id)
    
    if not webhook:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    if not webhook.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Webhook is not active"
        )
    
    # Build the data payload
    data = {
        "title": trigger_data.title,
        "description": trigger_data.description,
        "priority": trigger_data.priority,
        "customer_email": trigger_data.customer_email,
        "customer_name": trigger_data.customer_name,
        "session_id": trigger_data.session_id,
        "agent_name": trigger_data.agent_name,
        **(trigger_data.custom_fields or {})
    }
    
    success, status_code, response_body, error_message = await webhook_service.execute_webhook(
        webhook, 
        data
    )
    
    # Log the execution
    webhook_repo.create_webhook_log(
        webhook_id=webhook_id,
        organization_id=current_user.organization_id,
        request_payload=str(data),
        response_status_code=status_code,
        response_body=response_body[:1000] if response_body else None,
        success=success,
        error_message=error_message
    )
    
    return WebhookTestResponse(
        success=success,
        status_code=status_code,
        response_body=response_body,
        error_message=error_message
    )


@router.get("/webhooks/{webhook_id}/logs", response_model=List[WebhookLogResponse])
async def get_webhook_logs(
    webhook_id: int,
    limit: int = 50,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Get recent execution logs for a webhook."""
    webhook_repo = WebhookRepository(db)
    
    # Verify webhook exists and belongs to org
    webhook = webhook_repo.get_webhook_by_id(webhook_id, current_user.organization_id)
    if not webhook:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    logs = webhook_repo.get_webhook_logs(
        webhook_id=webhook_id,
        organization_id=current_user.organization_id,
        limit=min(limit, 100)  # Cap at 100
    )
    
    return [WebhookLogResponse.model_validate(log) for log in logs]


# ============================================================================
# AGENT-SPECIFIC WEBHOOK ENDPOINTS (New Agent-Based Architecture)
# ============================================================================

@router.get("/agents/{agent_id}/webhooks", response_model=CustomWebhookListResponse)
async def list_agent_webhooks(
    agent_id: str,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """List all custom webhooks for a specific agent."""
    from uuid import UUID
    from app.repositories.agent import AgentRepository
    
    agent_repo = AgentRepository(db)
    agent = agent_repo.get_agent(UUID(agent_id))
    
    if not agent or agent.organization_id != current_user.organization_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found"
        )
    
    webhook_repo = WebhookRepository(db)
    webhooks = webhook_repo.get_webhooks_by_agent(UUID(agent_id))
    
    return CustomWebhookListResponse(
        webhooks=[CustomWebhookResponse.model_validate(w) for w in webhooks],
        total=len(webhooks)
    )


@router.post("/agents/{agent_id}/webhooks", response_model=CustomWebhookResponse, status_code=status.HTTP_201_CREATED)
async def create_agent_webhook(
    agent_id: str,
    webhook_data: CustomWebhookCreate,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Create a new custom webhook for a specific agent."""
    from uuid import UUID
    from app.repositories.agent import AgentRepository
    
    agent_repo = AgentRepository(db)
    agent = agent_repo.get_agent(UUID(agent_id))
    
    if not agent or agent.organization_id != current_user.organization_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found"
        )
    
    webhook_repo = WebhookRepository(db)
    
    try:
        webhook = webhook_repo.create_webhook(
            agent_id=UUID(agent_id),
            name=webhook_data.name,
            webhook_url=webhook_data.webhook_url,
            http_method=webhook_data.http_method.value if webhook_data.http_method else "POST",
            auth_type=webhook_data.auth_type.value if webhook_data.auth_type else None,
            auth_token=webhook_data.auth_token,
            auth_header_name=webhook_data.auth_header_name,
            auth_username=webhook_data.auth_username,
            custom_headers=webhook_data.custom_headers,
            payload_template=webhook_data.payload_template,
            content_type=webhook_data.content_type,
            is_active=webhook_data.is_active,
            event_types=[et.value for et in webhook_data.event_types]
        )
        
        logger.info(f"Created webhook '{webhook_data.name}' for agent {agent_id}")
        return CustomWebhookResponse.model_validate(webhook)
        
    except Exception as e:
        logger.error(f"Error creating webhook: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create webhook: {str(e)}"
        )


@router.get("/agents/{agent_id}/webhooks/{webhook_id}", response_model=CustomWebhookResponse)
async def get_agent_webhook(
    agent_id: str,
    webhook_id: int,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Get a specific webhook by ID for an agent."""
    from uuid import UUID
    webhook_repo = WebhookRepository(db)
    webhook = webhook_repo.get_webhook_by_id(webhook_id, UUID(agent_id))
    
    if not webhook:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    return CustomWebhookResponse.model_validate(webhook)


@router.put("/agents/{agent_id}/webhooks/{webhook_id}", response_model=CustomWebhookResponse)
async def update_agent_webhook(
    agent_id: str,
    webhook_id: int,
    webhook_data: CustomWebhookUpdate,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Update an existing webhook for an agent."""
    from uuid import UUID
    webhook_repo = WebhookRepository(db)
    
    # Build update dict, only including non-None values
    update_data = {}
    for field, value in webhook_data.model_dump(exclude_unset=True).items():
        if value is not None:
            # Handle enum values
            if field == "http_method" and hasattr(value, "value"):
                update_data[field] = value.value
            elif field == "auth_type" and hasattr(value, "value"):
                update_data[field] = value.value
            else:
                update_data[field] = value
    
    webhook = webhook_repo.update_webhook(
        webhook_id=webhook_id,
        agent_id=UUID(agent_id),
        **update_data
    )
    
    if not webhook:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    logger.info(f"Updated webhook {webhook_id} for agent {agent_id}")
    return CustomWebhookResponse.model_validate(webhook)


@router.delete("/agents/{agent_id}/webhooks/{webhook_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_agent_webhook(
    agent_id: str,
    webhook_id: int,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Delete a webhook for an agent."""
    from uuid import UUID
    webhook_repo = WebhookRepository(db)
    success = webhook_repo.delete_webhook(webhook_id, UUID(agent_id))
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    logger.info(f"Deleted webhook {webhook_id} for agent {agent_id}")


@router.post("/agents/{agent_id}/webhooks/{webhook_id}/test", response_model=WebhookTestResponse)
async def test_agent_webhook(
    agent_id: str,
    webhook_id: int,
    test_request: WebhookTestRequest = WebhookTestRequest(),
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Test a webhook with sample data for an agent."""
    from uuid import UUID
    webhook_repo = WebhookRepository(db)
    webhook = webhook_repo.get_webhook_by_id(webhook_id, UUID(agent_id))
    
    if not webhook:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    success, status_code, response_body, error_message = await webhook_service.test_webhook(
        webhook, 
        test_request.test_data
    )
    
    # Log the test execution
    webhook_repo.create_webhook_log(
        webhook_id=webhook_id,
        agent_id=webhook.agent_id,
        request_payload=str(test_request.test_data),
        response_status_code=status_code,
        response_body=response_body[:1000] if response_body else None,
        success=success,
        error_message=error_message
    )
    
    return WebhookTestResponse(
        success=success,
        status_code=status_code,
        response_body=response_body,
        error_message=error_message
    )


@router.get("/agents/{agent_id}/webhooks/{webhook_id}/logs", response_model=List[WebhookLogResponse])
async def get_agent_webhook_logs(
    agent_id: str,
    webhook_id: int,
    limit: int = 50,
    current_user: User = Depends(require_permissions("manage_integrations")),
    db: Session = Depends(get_db)
):
    """Get recent execution logs for an agent's webhook."""
    from uuid import UUID
    webhook_repo = WebhookRepository(db)
    
    # Verify webhook exists and belongs to agent
    webhook = webhook_repo.get_webhook_by_id(webhook_id, UUID(agent_id))
    if not webhook:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Webhook not found"
        )
    
    logs = webhook_repo.get_webhook_logs(
        webhook_id=webhook_id,
        organization_id=current_user.organization_id,
        limit=min(limit, 100)  # Cap at 100
    )
    
    return [WebhookLogResponse.model_validate(log) for log in logs]

