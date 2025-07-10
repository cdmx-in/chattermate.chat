"""
ChatterMate - Workflow Variable Schemas
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from app.models.workflow_variable import VariableScope, VariableType


class WorkflowVariableBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Variable name")
    description: Optional[str] = Field(None, description="Variable description")
    scope: VariableScope = Field(default=VariableScope.WORKFLOW, description="Variable scope")
    variable_type: VariableType = Field(default=VariableType.STRING, description="Variable data type")
    default_value: Optional[str] = Field(None, description="Default value as JSON string")
    is_required: bool = Field(default=False, description="Whether the variable is required")
    is_system: bool = Field(default=False, description="Whether this is a system variable")
    validation_rules: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Validation rules")

    @validator('name')
    def validate_name(cls, v):
        """Validate variable name format"""
        if not v.replace('_', '').replace('-', '').isalnum():
            raise ValueError('Variable name must contain only alphanumeric characters, underscores, and hyphens')
        return v

    @validator('default_value')
    def validate_default_value(cls, v, values):
        """Validate default value based on variable type"""
        if v is None:
            return v
        
        variable_type = values.get('variable_type')
        if variable_type == VariableType.NUMBER:
            try:
                float(v)
            except ValueError:
                raise ValueError('Default value must be a valid number')
        elif variable_type == VariableType.BOOLEAN:
            if v.lower() not in ['true', 'false']:
                raise ValueError('Default value must be "true" or "false" for boolean type')
        
        return v


class WorkflowVariableCreate(WorkflowVariableBase):
    workflow_id: UUID = Field(..., description="Workflow ID")


class WorkflowVariableUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100, description="Variable name")
    description: Optional[str] = Field(None, description="Variable description")
    scope: Optional[VariableScope] = Field(None, description="Variable scope")
    variable_type: Optional[VariableType] = Field(None, description="Variable data type")
    default_value: Optional[str] = Field(None, description="Default value as JSON string")
    is_required: Optional[bool] = Field(None, description="Whether the variable is required")
    is_system: Optional[bool] = Field(None, description="Whether this is a system variable")
    validation_rules: Optional[Dict[str, Any]] = Field(None, description="Validation rules")

    @validator('name')
    def validate_name(cls, v):
        """Validate variable name format"""
        if v is not None and not v.replace('_', '').replace('-', '').isalnum():
            raise ValueError('Variable name must contain only alphanumeric characters, underscores, and hyphens')
        return v


class WorkflowVariableResponse(WorkflowVariableBase):
    id: UUID
    workflow_id: UUID
    organization_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class WorkflowVariableBulkCreate(BaseModel):
    variables: list[WorkflowVariableCreate] = Field(..., description="List of variables to create")


class WorkflowVariableBulkUpdate(BaseModel):
    variables: list[dict] = Field(..., description="List of variables to update with their IDs")


class WorkflowVariableBulkResponse(BaseModel):
    variables: list[WorkflowVariableResponse]
    created_count: int
    updated_count: int
    errors: list[str] = Field(default_factory=list) 