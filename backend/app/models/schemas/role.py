from uuid import UUID
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PermissionResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]

    class Config:
        from_attributes = True

class RoleBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_default: Optional[bool] = False

class RoleCreate(RoleBase):
    permissions: List["PermissionResponse"]

class RoleUpdate(RoleBase):
    permissions: Optional[List["PermissionResponse"]] = None

class SimpleRoleResponse(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

class RoleResponse(RoleBase):
    id: int
    organization_id: Optional[UUID] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    permissions: Optional[List["PermissionResponse"]] = None

    class Config:
        from_attributes = True



RoleResponse.update_forward_refs()
