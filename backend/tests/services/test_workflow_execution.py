"""
ChatterMate - Workflow Execution Service Tests
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
from unittest.mock import Mock, patch, MagicMock, AsyncMock
from datetime import datetime
from uuid import uuid4
from app.services.workflow_execution import WorkflowExecutionService
from app.models.workflow_node import WorkflowNode, NodeType, ExitCondition
from app.models.chat_history import ChatHistory


@pytest.fixture
def mock_db():
    return Mock()


@pytest.fixture
def workflow_service(mock_db):
    return WorkflowExecutionService(mock_db)


@pytest.fixture
def sample_workflow_node():
    node = MagicMock(spec=WorkflowNode)
    node.id = uuid4()
    node.node_type = NodeType.LLM
    # Create config as a dictionary instead of a Mock
    node.config = MagicMock()
    node.config.__getitem__.side_effect = {
        "system_prompt": "You are a helpful assistant.",
        "exit_condition": ExitCondition.SINGLE_EXECUTION,
        "model_config": {
            "temperature": 0.7,
            "max_tokens": 150
        }
    }.__getitem__
    node.config.get.side_effect = {
        "system_prompt": "You are a helpful assistant.",
        "exit_condition": ExitCondition.SINGLE_EXECUTION,
        "model_config": {
            "temperature": 0.7,
            "max_tokens": 150
        }
    }.get
    return node


@pytest.fixture
def sample_workflow():
    workflow = Mock()
    workflow.id = uuid4()
    workflow.name = "Test Workflow"
    return workflow


@pytest.fixture
def sample_chat_history():
    messages = []
    
    # User message
    user_msg = Mock(spec=ChatHistory)
    user_msg.message = "Hello, I need help with my order"
    user_msg.message_type = "user"
    user_msg.created_at = datetime(2024, 1, 1, 10, 0, 0)
    user_msg.attributes = {}
    messages.append(user_msg)
    
    # Bot response
    bot_msg = Mock(spec=ChatHistory)
    bot_msg.message = "I'd be happy to help you with your order. Can you provide your order number?"
    bot_msg.message_type = "bot"
    bot_msg.created_at = datetime(2024, 1, 1, 10, 1, 0)
    bot_msg.attributes = {"workflow_execution": True}
    messages.append(bot_msg)
    
    # User response with form submission
    user_form_msg = Mock(spec=ChatHistory)
    user_form_msg.message = "ORDER123"
    user_form_msg.message_type = "user"
    user_form_msg.created_at = datetime(2024, 1, 1, 10, 2, 0)
    user_form_msg.attributes = {"form_submission": True, "order_number": "ORDER123"}
    messages.append(user_form_msg)
    
    return messages


@pytest.fixture
def sample_workflow_history():
    return [
        {
            "node_id": str(uuid4()),
            "type": "form_submission",
            "timestamp": "2024-01-01T10:02:00",
            "data": {"order_number": "ORDER123", "customer_email": "test@example.com"}
        },
        {
            "node_id": str(uuid4()),
            "type": "user_input",
            "timestamp": "2024-01-01T10:03:00",
            "data": "I want to check my order status"
        }
    ]


class TestWorkflowExecutionService:
    
    def test_build_context_message_with_full_history(
        self, workflow_service, sample_chat_history, sample_workflow_history
    ):
        """Test building context message with complete chat and workflow history"""
        
        # Mock repositories
        mock_chat_repo = Mock()
        mock_chat_repo.get_session_history.return_value = sample_chat_history
        
        with patch('app.services.workflow_execution.ChatRepository', return_value=mock_chat_repo), \
             patch.object(workflow_service.session_repo, 'get_workflow_history', return_value=sample_workflow_history):
            
            workflow_state = {"current_step": "order_lookup", "order_id": "ORDER123"}
            session_id = "test-session-id"
            
            result = workflow_service._build_context_message(session_id, workflow_state)
            
            # Verify the structure and content
            assert "CONTEXT ANALYSIS REQUEST" in result
            assert "CONVERSATION HISTORY:" in result
            assert "WORKFLOW INTERACTION HISTORY:" in result
            assert "CURRENT WORKFLOW STATE:" in result
            assert "ANALYSIS INSTRUCTIONS:" in result
            
            # Verify chat history is included
            assert "Hello, I need help with my order" in result
            assert "ORDER123" in result
            assert "USER:" in result
            assert "BOT:" in result
            
            # Verify workflow history is included
            assert "FORM_SUBMISSION" in result
            assert "USER_INPUT" in result
            assert "order_number" in result
            assert "test@example.com" in result
            
            # Verify workflow state is included
            assert "current_step" in result
            assert "order_lookup" in result
    
    def test_build_context_message_empty_history(self, workflow_service):
        """Test building context message with no history"""
        
        # Mock repositories with empty results
        mock_chat_repo = Mock()
        mock_chat_repo.get_session_history.return_value = []
        
        with patch('app.services.workflow_execution.ChatRepository', return_value=mock_chat_repo), \
             patch.object(workflow_service.session_repo, 'get_workflow_history', return_value=[]):
            
            workflow_state = {}
            session_id = "test-session-id"
            
            result = workflow_service._build_context_message(session_id, workflow_state)
            
            # Verify the structure exists even with empty data
            assert "CONTEXT ANALYSIS REQUEST" in result
            assert "No previous messages" in result
            assert "No previous workflow interactions" in result
            assert "ANALYSIS INSTRUCTIONS:" in result
    
    def test_build_context_message_error_handling(self, workflow_service):
        """Test error handling in context message building"""
        
        # Mock exception in chat repository
        mock_chat_repo = Mock()
        mock_chat_repo.get_session_history.side_effect = Exception("Database error")
        
        with patch('app.services.workflow_execution.ChatRepository', return_value=mock_chat_repo):
            workflow_state = {}
            session_id = "test-session-id"
            
            result = workflow_service._build_context_message(session_id, workflow_state)
            
            # Should return fallback message
            assert "Please analyze the current conversation context" in result
            assert "The user has not provided a new message" in result
    
    @pytest.mark.asyncio
    async def test_execute_llm_node_with_empty_message(
        self, workflow_service, sample_workflow_node, sample_workflow, sample_chat_history
    ):
        """Test LLM node execution with empty user message"""
        
        # Mock chat agent and its response
        mock_chat_agent = Mock()
        mock_response = Mock()
        mock_response.message = "Based on our conversation, I can see you're asking about order ORDER123. Let me check that for you."
        mock_response.transfer_to_human = False
        mock_response.end_chat = False
        mock_response.transfer_reason = None
        mock_response.transfer_description = None
        mock_response.success = True  # Add success attribute
        
        # Use AsyncMock for the async method
        mock_chat_agent._get_llm_response_only = AsyncMock(return_value=mock_response)
        
        # Mock repositories
        mock_chat_repo = Mock()
        mock_chat_repo.get_session_history.return_value = sample_chat_history
        
        with patch('app.services.workflow_execution.ChatRepository', return_value=mock_chat_repo), \
             patch('app.services.workflow_execution.ChatAgent', return_value=mock_chat_agent), \
             patch.object(workflow_service.session_repo, 'get_workflow_history', return_value=[]):
                
                # Test with empty user message
                result = await workflow_service._execute_llm_node(
                    node=sample_workflow_node,
                    workflow=sample_workflow,
                    workflow_state={},
                    user_message="",  # Empty message
                    api_key="test-key",
                    model_name="gpt-4",
                    model_type="openai",
                    org_id="test-org",
                    agent_id="test-agent",
                    customer_id="test-customer",
                    session_id="test-session"
                )
                
                # Verify that context message was built and used
                assert result.success is True
                assert result.message == mock_response.message
                
                # Verify that _get_llm_response_only was called with context message, not empty string
                call_args = mock_chat_agent._get_llm_response_only.call_args
                sent_message = call_args[1]['message']  # keyword argument
                
                assert sent_message != ""
                assert "CONTEXT ANALYSIS REQUEST" in sent_message
    
    @pytest.mark.asyncio
    async def test_execute_llm_node_with_normal_message(
        self, workflow_service, sample_workflow_node, sample_workflow
    ):
        """Test LLM node execution with normal user message (should not use context building)"""
        
        # Mock chat agent and its response
        mock_chat_agent = Mock()
        mock_response = Mock()
        mock_response.message = "I understand you want to check your order status."
        mock_response.transfer_to_human = False
        mock_response.end_chat = False
        mock_response.transfer_reason = None
        mock_response.transfer_description = None
        mock_response.success = True  # Add success attribute
        
        # Use AsyncMock for the async method
        mock_chat_agent._get_llm_response_only = AsyncMock(return_value=mock_response)
        
        with patch('app.services.workflow_execution.ChatAgent', return_value=mock_chat_agent), \
             patch.object(workflow_service.session_repo, 'get_workflow_history', return_value=[]):
            
            # Test with normal user message
            user_message = "I want to check my order status"
            result = await workflow_service._execute_llm_node(
                node=sample_workflow_node,
                workflow=sample_workflow,
                workflow_state={},
                user_message=user_message,
                api_key="test-key",
                model_name="gpt-4", 
                model_type="openai",
                org_id="test-org",
                agent_id="test-agent",
                customer_id="test-customer",
                session_id="test-session"
            )
            
            # Verify that original message was used
            assert result.success is True
            
            # Verify that _get_llm_response_only was called with original message
            call_args = mock_chat_agent._get_llm_response_only.call_args
            sent_message = call_args[1]['message']
            
            assert sent_message == user_message
            assert "CONTEXT ANALYSIS REQUEST" not in sent_message 