from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from app.models.schemas.user import UserResponse

class UserGroupBase(BaseModel):
    name: str
    description: Optional[str] = None

class UserGroupCreate(UserGroupBase):
    pass

class UserGroupUpdate(UserGroupBase):
    name: Optional[str] = None

class UserGroupResponse(UserGroupBase):
    id: UUID
    organization_id: UUID

    class Config:
        from_attributes = True

class UserGroupWithUsers(UserGroupResponse):
    users: List[UserResponse] 