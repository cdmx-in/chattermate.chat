"""
ChatterMate - Workflow API
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

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
from app.core.logger import get_logger
from app.database import get_db
from app.models.user import User
from app.core.auth import require_permissions
from app.services.workflow import WorkflowService
from app.models.schemas.workflow import WorkflowCreate, WorkflowResponse, WorkflowUpdate

router = APIRouter()
logger = get_logger(__name__)


@router.post("", response_model=WorkflowResponse, status_code=status.HTTP_201_CREATED)
async def create_workflow(
    workflow_data: WorkflowCreate,
    current_user: User = Depends(require_permissions("manage_agents")),
    db: Session = Depends(get_db)
):
    """Create a new workflow"""
    try:
        workflow_service = WorkflowService(db)
        
        # Create workflow with organization ID from current user
        workflow = workflow_service.create_workflow(
            workflow_data=workflow_data,
            created_by=current_user.id,
            organization_id=current_user.organization_id
        )
        
        # Prepare response
        response = WorkflowResponse(
            id=workflow.id,
            name=workflow.name,
            description=workflow.description,
            status=workflow.status,
            version=workflow.version,
            is_template=workflow.is_template,
            default_language=workflow.default_language,
            canvas_data=workflow.canvas_data,
            settings=workflow.settings,
            organization_id=workflow.organization_id,
            agent_id=workflow.agent_id,
            created_by=workflow.created_by,
            created_at=workflow.created_at,
            updated_at=workflow.updated_at
        )
        
        return response
        
    except ValueError as e:
        logger.error(f"Validation error creating workflow: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating workflow: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create workflow")


@router.get("/agent/{agent_id}", response_model=Optional[WorkflowResponse])
async def get_workflow_by_agent_id(
    agent_id: UUID,
    current_user: User = Depends(require_permissions("view_all", "manage_agents")),
    db: Session = Depends(get_db)
):
    """Get workflow by agent ID"""
    try:
        workflow_service = WorkflowService(db)
        
        # Get workflow for the agent
        workflow = workflow_service.get_workflow_by_agent_id(
            agent_id=agent_id,
            organization_id=current_user.organization_id
        )
        
        if not workflow:
            return None
        
        # Prepare response
        response = WorkflowResponse(
            id=workflow.id,
            name=workflow.name,
            description=workflow.description,
            status=workflow.status,
            version=workflow.version,
            is_template=workflow.is_template,
            default_language=workflow.default_language,
            canvas_data=workflow.canvas_data,
            settings=workflow.settings,
            organization_id=workflow.organization_id,
            agent_id=workflow.agent_id,
            created_by=workflow.created_by,
            created_at=workflow.created_at,
            updated_at=workflow.updated_at
        )
        
        return response
        
    except ValueError as e:
        logger.error(f"Validation error getting workflow by agent ID: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error getting workflow by agent ID: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get workflow")


@router.put("/{workflow_id}", response_model=WorkflowResponse)
async def update_workflow(
    workflow_id: UUID,
    workflow_data: WorkflowUpdate,
    current_user: User = Depends(require_permissions("manage_agents")),
    db: Session = Depends(get_db)
):
    """Update workflow"""
    try:
        workflow_service = WorkflowService(db)
        
        # Update workflow
        workflow = workflow_service.update_workflow(
            workflow_id=workflow_id,
            workflow_data=workflow_data.model_dump(exclude_unset=True),
            organization_id=current_user.organization_id
        )
        
        if not workflow:
            raise HTTPException(status_code=404, detail="Workflow not found")
        
        # Prepare response
        response = WorkflowResponse(
            id=workflow.id,
            name=workflow.name,
            description=workflow.description,
            status=workflow.status,
            version=workflow.version,
            is_template=workflow.is_template,
            default_language=workflow.default_language,
            canvas_data=workflow.canvas_data,
            settings=workflow.settings,
            organization_id=workflow.organization_id,
            agent_id=workflow.agent_id,
            created_by=workflow.created_by,
            created_at=workflow.created_at,
            updated_at=workflow.updated_at
        )
        
        return response
        
    except ValueError as e:
        logger.error(f"Validation error updating workflow: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error updating workflow: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to update workflow")


@router.delete("/{workflow_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_workflow(
    workflow_id: UUID,
    current_user: User = Depends(require_permissions("manage_agents")),
    db: Session = Depends(get_db)
):
    """Delete workflow"""
    try:
        workflow_service = WorkflowService(db)
        
        # Delete workflow
        success = workflow_service.delete_workflow(
            workflow_id=workflow_id,
            organization_id=current_user.organization_id
        )
        
        if not success:
            raise HTTPException(status_code=404, detail="Workflow not found")
        
        return None  # 204 No Content
        
    except ValueError as e:
        logger.error(f"Validation error deleting workflow: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error deleting workflow: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to delete workflow") 