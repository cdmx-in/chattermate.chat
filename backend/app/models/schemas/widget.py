from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class WidgetBase(BaseModel):
    name: str

    # Optional agent ID for widget configuration
    agent_id: Optional[UUID] = None


class WidgetCreate(WidgetBase):
    pass


class AgentCustomizationResponse(BaseModel):
    chat_background_color: Optional[str] = None
    chat_bubble_color: Optional[str] = None
    accent_color: Optional[str] = None
    font_family: Optional[str] = None
    photo_url: Optional[str] = None


class AgentResponse(BaseModel):
    id: UUID
    name: str
    display_name: Optional[str] = None
    customization: Optional[AgentCustomizationResponse] = None


class CustomerResponse(BaseModel):
    full_name: Optional[str] = None
    profile_pic: Optional[str] = None


class WidgetResponse(BaseModel):
    id: str
    organization_id: UUID
    agent: AgentResponse
    customer: Optional[CustomerResponse] = None
    # Include agent ID in response if set
    agent_id: Optional[UUID] = None

    class Config:
        from_attributes = True
