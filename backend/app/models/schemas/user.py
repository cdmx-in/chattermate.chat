from pydantic import BaseModel, EmailStr
from typing import Optional, List
from uuid import UUID
from datetime import datetime

from app.models.schemas.role import RoleResponse



class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    is_active: bool = True
    profile_pic: Optional[str] = None
    is_online: bool = False
    last_seen: Optional[datetime] = None


class UserCreate(UserBase):
    password: str
    role_id: int


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    current_password: Optional[str] = None
    role_id: Optional[int] = None
    profile_pic: Optional[str] = None
    is_online: Optional[bool] = None

class UserStatusUpdate(BaseModel):
    is_online: bool

class UserGroupResponse(BaseModel):
    name: str
    description: Optional[str] = None

class UserResponse(UserBase):
    id: UUID
    organization_id: Optional[UUID] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_online: Optional[bool] = None
    last_seen: Optional[datetime] = None
    profile_pic: Optional[str] = None
    is_active: Optional[bool] = None
    groups: Optional[List[UserGroupResponse]] = None    
    role: Optional[RoleResponse] = None
    class Config:
        from_attributes = True




class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user: UserResponse

    class Config:
        from_attributes = True
