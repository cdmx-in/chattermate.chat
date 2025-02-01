from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict
from app.models.notification import NotificationType
from uuid import UUID


class NotificationResponse(BaseModel):
    id: int
    user_id: UUID
    type: NotificationType
    title: str
    message: str
    notification_metadata: Optional[Dict] = None
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
