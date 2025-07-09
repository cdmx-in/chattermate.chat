"""
ChatterMate - Workflow Node API
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
from typing import List, Dict, Any
from uuid import UUID
from pydantic import BaseModel
from app.core.logger import get_logger
from app.database import get_db
from app.models.user import User
from app.core.auth import require_permissions
from app.services.workflow_node import WorkflowNodeService
from app.models.schemas.workflow import WorkflowNodeResponse, WorkflowConnectionResponse

router = APIRouter()
logger = get_logger(__name__)


class WorkflowNodesUpdateRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    connections: List[Dict[str, Any]]


class WorkflowNodesResponse(BaseModel):
    nodes: List[WorkflowNodeResponse]
    connections: List[WorkflowConnectionResponse]


@router.put("/{workflow_id}/nodes", response_model=WorkflowNodesResponse)
async def update_workflow_nodes(
    workflow_id: UUID,
    request_data: WorkflowNodesUpdateRequest,
    current_user: User = Depends(require_permissions("manage_agents")),
    db: Session = Depends(get_db)
):
    """Update complete workflow nodes and connections"""
    try:
        workflow_node_service = WorkflowNodeService(db)
        
        # Update nodes and connections
        result = workflow_node_service.update_workflow_nodes_and_connections(
            workflow_id=workflow_id,
            nodes_data=request_data.nodes,
            connections_data=request_data.connections,
            organization_id=current_user.organization_id
        )
        
        # Convert to response format
        nodes_response = [
            WorkflowNodeResponse(
                id=node.id,
                workflow_id=node.workflow_id,
                node_type=node.node_type,
                name=node.name,
                description=node.description,
                position_x=node.position_x,
                position_y=node.position_y,
                config=node.config,
                message_text=node.message_text,
                system_prompt=node.system_prompt,
                temperature=node.temperature,
                model_id=node.model_id,
                form_fields=node.form_fields,
                condition_expression=node.condition_expression,
                action_type=node.action_type,
                action_config=node.action_config,
                transfer_rules=node.transfer_rules,
                wait_duration=node.wait_duration,
                wait_until_condition=node.wait_until_condition,
                created_at=node.created_at,
                updated_at=node.updated_at
            )
            for node in result["nodes"]
        ]
        
        connections_response = [
            WorkflowConnectionResponse(
                id=conn.id,
                workflow_id=conn.workflow_id,
                source_node_id=conn.source_node_id,
                target_node_id=conn.target_node_id,
                label=conn.label,
                condition=conn.condition,
                priority=conn.priority,
                connection_metadata=conn.connection_metadata,
                created_at=conn.created_at,
                updated_at=conn.updated_at
            )
            for conn in result["connections"]
        ]
        
        return WorkflowNodesResponse(
            nodes=nodes_response,
            connections=connections_response
        )
        
    except ValueError as e:
        logger.error(f"Validation error updating workflow nodes: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error updating workflow nodes: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to update workflow nodes")


@router.get("/{workflow_id}/nodes", response_model=WorkflowNodesResponse)
async def get_workflow_nodes(
    workflow_id: UUID,
    current_user: User = Depends(require_permissions("view_all", "manage_agents")),
    db: Session = Depends(get_db)
):
    """Get all nodes and connections for a workflow"""
    try:
        workflow_node_service = WorkflowNodeService(db)
        
        # Get nodes and connections
        result = workflow_node_service.get_workflow_nodes_and_connections(
            workflow_id=workflow_id,
            organization_id=current_user.organization_id
        )
        
        # Convert to response format
        nodes_response = [
            WorkflowNodeResponse(
                id=node.id,
                workflow_id=node.workflow_id,
                node_type=node.node_type,
                name=node.name,
                description=node.description,
                position_x=node.position_x,
                position_y=node.position_y,
                config=node.config,
                message_text=node.message_text,
                system_prompt=node.system_prompt,
                temperature=node.temperature,
                model_id=node.model_id,
                form_fields=node.form_fields,
                condition_expression=node.condition_expression,
                action_type=node.action_type,
                action_config=node.action_config,
                transfer_rules=node.transfer_rules,
                wait_duration=node.wait_duration,
                wait_until_condition=node.wait_until_condition,
                created_at=node.created_at,
                updated_at=node.updated_at
            )
            for node in result["nodes"]
        ]
        
        connections_response = [
            WorkflowConnectionResponse(
                id=conn.id,
                workflow_id=conn.workflow_id,
                source_node_id=conn.source_node_id,
                target_node_id=conn.target_node_id,
                label=conn.label,
                condition=conn.condition,
                priority=conn.priority,
                connection_metadata=conn.connection_metadata,
                created_at=conn.created_at,
                updated_at=conn.updated_at
            )
            for conn in result["connections"]
        ]
        
        return WorkflowNodesResponse(
            nodes=nodes_response,
            connections=connections_response
        )
        
    except ValueError as e:
        logger.error(f"Validation error getting workflow nodes: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error getting workflow nodes: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get workflow nodes") 