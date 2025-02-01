from pydantic import BaseModel, SecretStr
from typing import Optional, Dict
from app.models.ai_config import AIModelType
from uuid import UUID


class AIConfigBase(BaseModel):
    model_type: AIModelType
    model_name: str
    settings: Optional[Dict] = {}


class AIConfigCreate(AIConfigBase):
    api_key: SecretStr


class AIConfigUpdate(BaseModel):
    model_type: Optional[AIModelType] = None
    model_name: Optional[str] = None
    api_key: Optional[SecretStr] = None
    settings: Optional[Dict] = None


class AIConfigResponse(BaseModel):
    id: int
    organization_id: UUID
    model_type: AIModelType
    model_name: str
    is_active: bool
    settings: Dict = {}

    class Config:
        from_attributes = True


class AISetupResponse(BaseModel):
    message: str
    config: AIConfigResponse
