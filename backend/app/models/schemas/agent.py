from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum
from uuid import UUID
from app.models.agent import AgentType
from app.models.schemas.agent_customization import CustomizationResponse
from app.models.schemas.user_group import UserGroupResponse


class AgentType(str, Enum):
    CUSTOMER_SUPPORT = "customer_support"
    SALES = "sales"
    TECH_SUPPORT = "tech_support"
    GENERAL = "general"
    CUSTOM = "custom"


class KnowledgeItem(BaseModel):
    id: int
    name: str
    type: str


class AgentBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    agent_type: AgentType
    instructions: List[str]
    tools: Optional[List[Dict]] = None
    is_active: bool = True
    is_default: bool = False
    transfer_to_human: bool = False


class AgentCreate(AgentBase):
    organization_id: UUID


class AgentUpdate(BaseModel):
    display_name: Optional[str] = None
    instructions: Optional[List[str]] = None
    is_active: Optional[bool] = None
    transfer_to_human: Optional[bool] = None



class AgentKnowledge(BaseModel):
    id: int
    name: str
    type: str


class AgentResponse(BaseModel):
    id: UUID
    name: str
    display_name: Optional[str]
    description: Optional[str]
    agent_type: AgentType
    instructions: List[str]
    is_active: bool
    organization_id: UUID
    knowledge: List[AgentKnowledge] = []
    transfer_to_human: bool = False


    class Config:
        from_attributes = True


class AgentWithCustomizationResponse(AgentResponse):
    customization: Optional[CustomizationResponse] = None
    groups: List[UserGroupResponse] = []
