from pydantic import BaseModel
from typing import Optional, Dict
from uuid import UUID


class CustomizationBase(BaseModel):
    photo_url: Optional[str] = None
    chat_background_color: Optional[str] = "#F8F9FA"
    chat_bubble_color: Optional[str] = "#E9ECEF"
    chat_text_color: Optional[str] = "#212529"
    icon_url: Optional[str] = None
    icon_color: Optional[str] = "#6C757D"
    accent_color: Optional[str] = "#f34611"
    font_family: Optional[str] = "Inter, system-ui, sans-serif"
    custom_css: Optional[str] = None
    customization_metadata: Optional[Dict] = {}


class CustomizationCreate(CustomizationBase):
    pass


class CustomizationResponse(CustomizationBase):
    id: int
    agent_id: UUID

    class Config:
        from_attributes = True
