"""
ChatterMate - Workflow Node Single Update API Tests
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

import pytest
from uuid import uuid4
from httpx import AsyncClient
from app.main import app
from app.models.workflow import Workflow, WorkflowStatus
from app.models.workflow_node import WorkflowNode, NodeType
from app.models.workflow_variable import WorkflowVariable, VariableScope, VariableType


@pytest.mark.asyncio
async def test_update_workflow_node_with_variables_success(test_client: AsyncClient, test_user, test_organization, test_agent):
    """Test successful update of workflow node with variables"""
    
    # Create a workflow
    workflow = Workflow(
        id=uuid4(),
        name="Test Workflow",
        description="Test workflow for node update",
        agent_id=test_agent.id,
        organization_id=test_organization.id,
        created_by=test_user.id,
        status=WorkflowStatus.DRAFT
    )
    
    # Create a workflow node
    node = WorkflowNode(
        id=uuid4(),
        workflow_id=workflow.id,
        node_type=NodeType.MESSAGE,
        name="Test Node",
        description="Test node for update",
        position_x=100,
        position_y=200,
        message_text="Hello World"
    )
    
    # Mock the database session to return our test data
    with test_client.app.dependency_overrides:
        # Update node with variables
        update_data = {
            "node_data": {
                "name": "Updated Test Node",
                "description": "Updated description",
                "message_text": "Updated Hello World"
            },
            "variables_data": [
                {
                    "name": "test_var",
                    "description": "Test variable",
                    "scope": "workflow",
                    "variable_type": "string",
                    "default_value": "test_value",
                    "is_required": True
                }
            ]
        }
        
        response = await test_client.put(
            f"/api/workflow-nodes/{workflow.id}/nodes/{node.id}",
            json=update_data
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "node" in data
        assert "variables" in data
        assert "updated_variables_count" in data
        
        # Verify node was updated
        assert data["node"]["name"] == "Updated Test Node"
        assert data["node"]["description"] == "Updated description"
        assert data["node"]["message_text"] == "Updated Hello World"
        
        # Verify variables were created/updated
        assert len(data["variables"]) >= 1
        assert data["updated_variables_count"] >= 1


@pytest.mark.asyncio
async def test_get_workflow_node_with_variables_success(test_client: AsyncClient, test_user, test_organization, test_agent):
    """Test successful retrieval of workflow node with variables"""
    
    # Create a workflow
    workflow = Workflow(
        id=uuid4(),
        name="Test Workflow",
        description="Test workflow for node retrieval",
        agent_id=test_agent.id,
        organization_id=test_organization.id,
        created_by=test_user.id,
        status=WorkflowStatus.DRAFT
    )
    
    # Create a workflow node
    node = WorkflowNode(
        id=uuid4(),
        workflow_id=workflow.id,
        node_type=NodeType.MESSAGE,
        name="Test Node",
        description="Test node for retrieval",
        position_x=100,
        position_y=200,
        message_text="Hello World"
    )
    
    # Create a workflow variable
    variable = WorkflowVariable(
        id=uuid4(),
        workflow_id=workflow.id,
        organization_id=test_organization.id,
        name="test_var",
        description="Test variable",
        scope=VariableScope.WORKFLOW,
        variable_type=VariableType.STRING,
        default_value="test_value",
        is_required=True
    )
    
    # Mock the database session to return our test data
    with test_client.app.dependency_overrides:
        response = await test_client.get(
            f"/api/workflow-nodes/{workflow.id}/nodes/{node.id}"
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "node" in data
        assert "variables" in data
        
        # Verify node data
        assert data["node"]["id"] == str(node.id)
        assert data["node"]["name"] == "Test Node"
        assert data["node"]["message_text"] == "Hello World"
        
        # Verify variables data
        assert len(data["variables"]) >= 1


@pytest.mark.asyncio
async def test_update_workflow_node_not_found(test_client: AsyncClient, test_user, test_organization, test_agent):
    """Test update of non-existent workflow node"""
    
    workflow_id = uuid4()
    node_id = uuid4()
    
    update_data = {
        "node_data": {
            "name": "Updated Test Node"
        }
    }
    
    response = await test_client.put(
        f"/api/workflow-nodes/{workflow_id}/nodes/{node_id}",
        json=update_data
    )
    
    assert response.status_code == 400
    assert "not found" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_get_workflow_node_not_found(test_client: AsyncClient, test_user, test_organization, test_agent):
    """Test retrieval of non-existent workflow node"""
    
    workflow_id = uuid4()
    node_id = uuid4()
    
    response = await test_client.get(
        f"/api/workflow-nodes/{workflow_id}/nodes/{node_id}"
    )
    
    assert response.status_code == 400
    assert "not found" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_update_workflow_node_unauthorized(test_client: AsyncClient):
    """Test update of workflow node without proper permissions"""
    
    workflow_id = uuid4()
    node_id = uuid4()
    
    update_data = {
        "node_data": {
            "name": "Updated Test Node"
        }
    }
    
    # Test without authentication
    response = await test_client.put(
        f"/api/workflow-nodes/{workflow_id}/nodes/{node_id}",
        json=update_data
    )
    
    assert response.status_code == 401 