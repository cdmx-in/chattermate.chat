"""
ChatterMate - Custom Webhook Schemas
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

from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, Dict, Any, List
from uuid import UUID
from datetime import datetime
from enum import Enum


class WebhookEventType(str, Enum):
    """Event types that can trigger webhooks."""
    TICKET_CREATED = "ticket_created"
    CONVERSATION_STARTED = "conversation_started"
    RATING_RECEIVED = "rating_received"


class AuthType(str, Enum):
    """Authentication types for webhooks."""
    NONE = "none"
    BEARER = "bearer"
    BASIC = "basic"
    API_KEY = "api_key"
    CUSTOM_HEADER = "custom_header"


class HttpMethod(str, Enum):
    """Allowed HTTP methods for webhooks."""
    POST = "POST"
    PUT = "PUT"
    PATCH = "PATCH"


class CustomWebhookBase(BaseModel):
    """Base schema for custom webhook."""
    name: str = Field(..., min_length=1, max_length=255, description="Name of the webhook integration")
    webhook_url: str = Field(..., description="The webhook endpoint URL")
    http_method: HttpMethod = Field(default=HttpMethod.POST, description="HTTP method to use")
    auth_type: Optional[AuthType] = Field(default=AuthType.NONE, description="Authentication type")
    auth_token: Optional[str] = Field(default=None, description="Auth token or password")
    auth_header_name: Optional[str] = Field(default=None, description="Custom header name for API key auth")
    auth_username: Optional[str] = Field(default=None, description="Username for basic auth")
    custom_headers: Optional[Dict[str, str]] = Field(default_factory=dict, description="Additional headers")
    payload_template: Optional[str] = Field(default=None, description="JSON template with placeholders")
    content_type: str = Field(default="application/json", description="Content-Type header")
    is_active: bool = Field(default=True, description="Whether the webhook is active")
    event_types: List[WebhookEventType] = Field(default=[WebhookEventType.TICKET_CREATED], description="Events that trigger this webhook")


class CustomWebhookCreate(CustomWebhookBase):
    """Schema for creating a custom webhook."""
    pass


class CustomWebhookUpdate(BaseModel):
    """Schema for updating a custom webhook."""
    name: Optional[str] = Field(default=None, min_length=1, max_length=255)
    webhook_url: Optional[str] = None
    http_method: Optional[HttpMethod] = None
    auth_type: Optional[AuthType] = None
    auth_token: Optional[str] = None
    auth_header_name: Optional[str] = None
    auth_username: Optional[str] = None
    custom_headers: Optional[Dict[str, str]] = None
    payload_template: Optional[str] = None
    content_type: Optional[str] = None
    is_active: Optional[bool] = None
    event_types: Optional[List[WebhookEventType]] = None


class CustomWebhookResponse(CustomWebhookBase):
    """Response schema for custom webhook."""
    id: int
    agent_id: UUID
    created_at: datetime
    updated_at: datetime
    
    # Don't expose sensitive auth details in response
    auth_token: Optional[str] = Field(default=None, exclude=True)

    class Config:
        from_attributes = True


class CustomWebhookListResponse(BaseModel):
    """Response schema for listing webhooks."""
    webhooks: List[CustomWebhookResponse]
    total: int


class WebhookTestRequest(BaseModel):
    """Schema for testing a webhook."""
    test_data: Optional[Dict[str, Any]] = Field(
        default_factory=lambda: {
            "title": "Test Ticket",
            "description": "This is a test ticket from ChatterMate",
            "priority": "medium",
            "customer_email": "test@example.com",
            "customer_name": "Test Customer",
            "session_id": "test-session-123",
            "agent_name": "Test Agent"
        },
        description="Test data to send to the webhook"
    )


class WebhookTestResponse(BaseModel):
    """Response schema for webhook test."""
    success: bool
    status_code: Optional[int] = None
    response_body: Optional[str] = None
    error_message: Optional[str] = None


class WebhookTriggerRequest(BaseModel):
    """Schema for triggering a webhook."""
    title: str = Field(..., description="Ticket title")
    description: str = Field(..., description="Ticket description")
    priority: Optional[str] = Field(default="medium", description="Ticket priority")
    customer_email: Optional[str] = None
    customer_name: Optional[str] = None
    session_id: Optional[str] = None
    agent_name: Optional[str] = None
    custom_fields: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional custom fields")


class WebhookLogResponse(BaseModel):
    """Response schema for webhook log."""
    id: int
    webhook_id: int
    success: bool
    response_status_code: Optional[int] = None
    error_message: Optional[str] = None
    executed_at: datetime

    class Config:
        from_attributes = True
