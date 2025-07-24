"""
ChatterMate - Test Workflow Node Service
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
from unittest.mock import Mock, MagicMock, patch
from uuid import uuid4
from app.services.workflow_node import WorkflowNodeService
from app.models.workflow_node import WorkflowNode, NodeType
from app.models.workflow import Workflow, WorkflowStatus
from app.models.organization import Organization
from app.models.user import User


@pytest.fixture
def test_organization(db):
    """Create a test organization"""
    organization = Organization(
        id=uuid4(),
        name="Test Organization",
        domain="test.com"
    )
    db.add(organization)
    db.commit()
    db.refresh(organization)
    return organization


@pytest.fixture
def test_user(db, test_organization):
    """Create a test user"""
    user = User(
        id=uuid4(),
        email="test@example.com",
        hashed_password="hashed_password",
        is_active=True,
        organization_id=test_organization.id,
        full_name="Test User"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture
def test_workflow(db, test_organization, test_user):
    """Create a test workflow"""
    workflow = Workflow(
        id=uuid4(),
        name="Test Workflow",
        description="Test workflow",
        status=WorkflowStatus.PUBLISHED,
        version=1,
        is_template=False,
        default_language="en",
        canvas_data={
            "nodes": [
                {
                    "id": "start",
                    "type": "message",
                    "data": {"label": "Start"}
                }
            ]
        },
        settings={},
        organization_id=test_organization.id,
        created_by=test_user.id
    )
    db.add(workflow)
    db.commit()
    db.refresh(workflow)
    return workflow


@pytest.fixture
def test_workflow_node(db, test_workflow):
    """Create a test workflow node"""
    node = WorkflowNode(
        id=uuid4(),
        workflow_id=test_workflow.id,
        node_type=NodeType.MESSAGE,
        name="Start Node",
        position_x=100,
        position_y=100,
        config={"label": "Start Node"}
    )
    db.add(node)
    db.commit()
    db.refresh(node)
    return node


@pytest.fixture
def workflow_node_service(db):
    """Create WorkflowNodeService instance"""
    return WorkflowNodeService(db)


class TestWorkflowNodeService:
    
    def test_workflow_node_created_successfully(self, test_workflow_node, test_workflow):
        """Test that workflow node is created with the right properties"""
        assert test_workflow_node.workflow_id == test_workflow.id
        assert test_workflow_node.node_type == NodeType.MESSAGE
        assert test_workflow_node.name == "Start Node"
        assert test_workflow_node.position_x == 100
        assert test_workflow_node.position_y == 100
    
    def test_node_type_enum_values(self):
        """Test that NodeType enum has the expected values"""
        assert hasattr(NodeType, 'MESSAGE')
        assert hasattr(NodeType, 'LLM')
        assert hasattr(NodeType, 'CONDITION')
        assert hasattr(NodeType, 'FORM')
        assert hasattr(NodeType, 'ACTION')
        assert hasattr(NodeType, 'HUMAN_TRANSFER')
        assert hasattr(NodeType, 'WAIT')
        assert hasattr(NodeType, 'END')
        assert hasattr(NodeType, 'LANDING_PAGE')
    
    def test_workflow_node_service_initialization(self, workflow_node_service):
        """Test that WorkflowNodeService can be initialized"""
        assert workflow_node_service is not None
        assert hasattr(workflow_node_service, 'db')
    
    def test_workflow_node_model_fields(self, test_workflow_node):
        """Test that WorkflowNode model has expected fields"""
        assert hasattr(test_workflow_node, 'id')
        assert hasattr(test_workflow_node, 'workflow_id')
        assert hasattr(test_workflow_node, 'node_type')
        assert hasattr(test_workflow_node, 'name')
        assert hasattr(test_workflow_node, 'description')
        assert hasattr(test_workflow_node, 'position_x')
        assert hasattr(test_workflow_node, 'position_y')
        assert hasattr(test_workflow_node, 'config')
        assert hasattr(test_workflow_node, 'created_at')
        assert hasattr(test_workflow_node, 'updated_at')
    
    def test_workflow_node_relationships(self, test_workflow_node):
        """Test that WorkflowNode model has expected relationships"""
        assert hasattr(test_workflow_node, 'workflow')
        assert hasattr(test_workflow_node, 'outgoing_connections')
        assert hasattr(test_workflow_node, 'incoming_connections')
    
    def test_workflow_node_config_structure(self, test_workflow_node):
        """Test that the workflow node config is properly structured"""
        assert isinstance(test_workflow_node.config, dict)
        assert test_workflow_node.config.get("label") == "Start Node" 