from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from app.models.session_to_agent import SessionStatus

class CustomerInfo(BaseModel):
    id: UUID
    email: str
    full_name: Optional[str]

class AgentInfo(BaseModel):
    id: UUID
    name: str
    display_name: Optional[str]

class Message(BaseModel):
    message: str
    message_type: str
    created_at: datetime
    attributes: Optional[dict] = None

class ChatOverviewResponse(BaseModel):
    customer: CustomerInfo
    agent: AgentInfo
    last_message: str
    updated_at: datetime
    message_count: int
    status: SessionStatus
    group_id: Optional[UUID]
    session_id: UUID

class ChatDetailResponse(BaseModel):
    customer: CustomerInfo
    agent: AgentInfo
    messages: List[Message]
    status: SessionStatus
    group_id: Optional[UUID]
    session_id: UUID
    user_id: Optional[UUID]
    user_name: Optional[str]
    created_at: datetime
    updated_at: datetime