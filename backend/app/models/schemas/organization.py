from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, TypedDict
from uuid import UUID

from app.models.schemas.user import UserResponse


class BusinessHours(TypedDict):
    start: str
    end: str
    enabled: bool


class BusinessHoursDict(TypedDict):
    monday: BusinessHours
    tuesday: BusinessHours
    wednesday: BusinessHours
    thursday: BusinessHours
    friday: BusinessHours
    saturday: BusinessHours
    sunday: BusinessHours


class OrganizationBase(BaseModel):
    name: str
    domain: str
    timezone: Optional[str] = 'UTC'
    business_hours: Optional[BusinessHoursDict] = {
        'monday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'tuesday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'wednesday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'thursday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'friday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'saturday': {'start': '09:00', 'end': '17:00', 'enabled': False},
        'sunday': {'start': '09:00', 'end': '17:00', 'enabled': False}
    }
    settings: Optional[Dict] = {}


class OrganizationCreate(OrganizationBase):
    admin_email: EmailStr
    admin_name: str
    admin_password: str


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    domain: Optional[str] = None
    timezone: Optional[str] = None
    business_hours: Optional[BusinessHoursDict] = None
    settings: Optional[Dict] = None


class OrganizationCreateResponse(OrganizationBase):
    id: UUID
    is_active: bool
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    token_type: Optional[str] = None
    user: UserResponse

    class Config:
        from_attributes = True


class OrganizationResponse(OrganizationBase):
    id: UUID
    is_active: bool
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    token_type: Optional[str] = None

