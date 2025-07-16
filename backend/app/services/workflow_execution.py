"""
ChatterMate - Workflow Execution Service
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

import traceback
from typing import Optional, Dict, Any, List, Tuple
from uuid import UUID
from sqlalchemy.orm import Session
from dataclasses import dataclass
import json
import re
from datetime import datetime, timedelta

from app.models.workflow import Workflow, WorkflowStatus
from app.models.workflow_node import WorkflowNode, NodeType
from app.models.workflow_connection import WorkflowConnection
from app.models.session_to_agent import SessionToAgent
from app.repositories.workflow import WorkflowRepository
from app.repositories.session_to_agent import SessionToAgentRepository
from app.agents.chat_agent import ChatAgent, ChatResponse
from app.core.logger import get_logger

logger = get_logger(__name__)


@dataclass
class WorkflowExecutionResult:
    """Result of workflow execution"""
    success: bool
    message: str
    next_node_id: Optional[UUID] = None
    workflow_state: Optional[Dict[str, Any]] = None
    should_continue: bool = True
    transfer_to_human: bool = False
    end_chat: bool = False
    request_rating: bool = False
    error: Optional[str] = None
    form_data: Optional[Dict[str, Any]] = None


class WorkflowExecutionService:
    """Service for executing workflows in chat sessions"""
    
    def __init__(self, db: Session):
        self.db = db
        self.workflow_repo = WorkflowRepository(db)
        self.session_repo = SessionToAgentRepository(db)
    
    async def execute_workflow(
        self,
        session_id: str,
        user_message: str,
        workflow_id: UUID,
        current_node_id: Optional[UUID] = None,
        workflow_state: Optional[Dict[str, Any]] = None,
        api_key: str = None,
        model_name: str = None,
        model_type: str = None,
        org_id: str = None,
        agent_id: str = None,
        customer_id: str = None
    ) -> WorkflowExecutionResult:
        """
        Execute workflow for a chat session
        
        Args:
            session_id: Session ID
            user_message: User's message
            workflow_id: Workflow to execute
            current_node_id: Current node (None to start from beginning)
            workflow_state: Current workflow state
            api_key: API key for AI model
            model_name: AI model name
            model_type: AI model type
            org_id: Organization ID
            agent_id: Agent ID
            customer_id: Customer ID
            
        Returns:
            WorkflowExecutionResult with execution details
        """
        try:
            # Get workflow with nodes and connections
            workflow = self.workflow_repo.get_workflow_with_nodes_and_connections(workflow_id)
            if not workflow:
                return WorkflowExecutionResult(
                    success=False,
                    message="Workflow not found",
                    error="Workflow not found"
                )
            
            # Check if workflow is published
            if workflow.status != WorkflowStatus.PUBLISHED:
                return WorkflowExecutionResult(
                    success=False,
                    message="Workflow is not published",
                    error="Workflow is not published"
                )
            
            # Initialize workflow state if not provided
            if workflow_state is None:
                workflow_state = {
                    "variables": {},
                    "history": [],
                    "started_at": datetime.utcnow().isoformat()
                }
            
            # Ensure workflow_state has required keys
            if "variables" not in workflow_state:
                workflow_state["variables"] = {}
            if "history" not in workflow_state:
                workflow_state["history"] = []
            
            # Store user message in workflow state
            workflow_state["variables"]["last_user_message"] = user_message
            workflow_state["history"].append({
                "timestamp": datetime.utcnow().isoformat(),
                "type": "user_message",
                "content": user_message
            })
            
            # Determine starting node
            if current_node_id is None:
                current_node = self._find_start_node(workflow)
                if not current_node:
                    return WorkflowExecutionResult(
                        success=False,
                        message="No start node found in workflow",
                        error="No start node found"
                    )
            else:
                current_node = self._find_node_by_id(workflow, current_node_id)
                if not current_node:
                    return WorkflowExecutionResult(
                        success=False,
                        message="Current node not found",
                        error="Current node not found"
                    )
            
            # Execute current node
            result = await self._execute_node(
                current_node,
                workflow,
                workflow_state,
                user_message,
                api_key,
                model_name,
                model_type,
                org_id,
                agent_id,
                customer_id,
                session_id
            )
            
            # Update workflow state with execution result
            workflow_state["history"].append({
                "timestamp": datetime.utcnow().isoformat(),
                "type": "node_execution",
                "node_id": str(current_node.id),
                "node_type": current_node.node_type.value,
                "result": result.message
            })
            
            # Update session with new state
            self._update_session_workflow_state(session_id, result.next_node_id, workflow_state)
            
            return WorkflowExecutionResult(
                success=result.success,
                message=result.message,
                next_node_id=result.next_node_id,
                workflow_state=workflow_state,
                should_continue=result.should_continue,
                transfer_to_human=result.transfer_to_human,
                end_chat=result.end_chat,
                request_rating=result.request_rating,
                error=result.error,
                form_data=result.form_data  # Pass through form_data
            )
            
        except Exception as e:
            traceback.print_exc()
            logger.error(f"Error executing workflow: {str(e)}")
            return WorkflowExecutionResult(
                success=False,
                message="An error occurred while executing the workflow",
                error=str(e)
            )
    
    async def submit_form(
        self,
        session_id: str,
        form_data: Dict[str, Any],
        workflow_id: UUID,
        org_id: str = None,
        agent_id: str = None,
        customer_id: str = None,
        api_key: str = None,
        model_name: str = None,
        model_type: str = None
    ) -> WorkflowExecutionResult:
        """
        Handle form submission and continue workflow
        
        Args:
            session_id: Session ID
            form_data: Submitted form data
            workflow_id: Workflow ID
            org_id: Organization ID
            agent_id: Agent ID
            customer_id: Customer ID
            api_key: API key for AI model
            model_name: AI model name
            model_type: AI model type
            
        Returns:
            WorkflowExecutionResult with next step
        """
        try:
            # Get current session state
            session = self.session_repo.get_session(session_id)
            if not session:
                return WorkflowExecutionResult(
                    success=False,
                    message="Session not found",
                    error="Session not found"
                )
            
            workflow_state = session.workflow_state or {}
            current_node_id = session.current_node_id
            
            # Validate that we're in a form waiting state
            if workflow_state.get("variables", {}).get("form_state") != "waiting":
                return WorkflowExecutionResult(
                    success=False,
                    message="No form submission expected",
                    error="No form submission expected"
                )
            
            # Store form submission in workflow state
            workflow_state["variables"]["form_submission"] = form_data
            workflow_state["variables"]["form_state"] = "submitted"
            
            logger.info(f"Form submission received for session {session_id}")
            logger.info(f"Form data: {form_data}")
            logger.info(f"Updated workflow state: {workflow_state}")
            
            # Continue workflow execution with form submission
            return await self.execute_workflow(
                session_id=session_id,
                user_message="",  # No user message for form submission
                workflow_id=workflow_id,
                current_node_id=current_node_id,
                workflow_state=workflow_state,
                api_key=api_key,
                model_name=model_name,
                model_type=model_type,
                org_id=org_id,
                agent_id=agent_id,
                customer_id=customer_id
            )
            
        except Exception as e:
            logger.error(f"Error submitting form: {str(e)}")
            return WorkflowExecutionResult(
                success=False,
                message="An error occurred while submitting the form",
                error=str(e)
            )
    
    def _find_start_node(self, workflow: Workflow) -> Optional[WorkflowNode]:
        """Find the starting node of a workflow"""
        # Look for a node with no incoming connections
        for node in workflow.nodes:
            if not node.incoming_connections:
                return node
        
        # If no node without incoming connections, return the first node
        return workflow.nodes[0] if workflow.nodes else None
    
    def _find_node_by_id(self, workflow: Workflow, node_id: UUID) -> Optional[WorkflowNode]:
        """Find a node by ID in the workflow"""
        for node in workflow.nodes:
            if node.id == node_id:
                return node
        return None
    
    async def _execute_node(
        self,
        node: WorkflowNode,
        workflow: Workflow,
        workflow_state: Dict[str, Any],
        user_message: str,
        api_key: str,
        model_name: str,
        model_type: str,
        org_id: str,
        agent_id: str,
        customer_id: str,
        session_id: str
    ) -> WorkflowExecutionResult:
        """Execute a specific node based on its type"""
        
        logger.info(f"Executing node {node.id} of type {node.node_type}")
        
        try:
            if node.node_type == NodeType.MESSAGE:
                return self._execute_message_node(node, workflow_state)
            
            elif node.node_type == NodeType.LLM:
                return await self._execute_llm_node(
                    node, workflow_state, user_message, api_key, model_name, 
                    model_type, org_id, agent_id, customer_id, session_id
                )
            
            elif node.node_type == NodeType.CONDITION:
                return self._execute_condition_node(node, workflow, workflow_state)
            
            elif node.node_type == NodeType.FORM:
                return self._execute_form_node(node, workflow_state, user_message)
            
            elif node.node_type == NodeType.ACTION:
                return self._execute_action_node(node, workflow_state)
            
            elif node.node_type == NodeType.HUMAN_TRANSFER:
                return self._execute_human_transfer_node(node, workflow_state)
            
            elif node.node_type == NodeType.WAIT:
                return self._execute_wait_node(node, workflow_state)
            
            elif node.node_type == NodeType.END:
                return self._execute_end_node(node, workflow_state)
            
            else:
                return WorkflowExecutionResult(
                    success=False,
                    message=f"Unknown node type: {node.node_type}",
                    error=f"Unknown node type: {node.node_type}"
                )
                
        except Exception as e:
            logger.error(f"Error executing node {node.id}: {str(e)}")
            return WorkflowExecutionResult(
                success=False,
                message=f"Error executing node: {str(e)}",
                error=str(e)
            )
    
    def _execute_message_node(self, node: WorkflowNode, workflow_state: Dict[str, Any]) -> WorkflowExecutionResult:
        """Execute a message node"""
        message = node.message_text or "No message configured"
        
        # Process variables in message
        message = self._process_variables(message, workflow_state["variables"])
        
        # Find next node
        next_node_id = self._find_next_node(node)
        
        return WorkflowExecutionResult(
            success=True,
            message=message,
            next_node_id=next_node_id,
            should_continue=next_node_id is not None
        )
    
    async def _execute_llm_node(
        self,
        node: WorkflowNode,
        workflow_state: Dict[str, Any],
        user_message: str,
        api_key: str,
        model_name: str,
        model_type: str,
        org_id: str,
        agent_id: str,
        customer_id: str,
        session_id: str
    ) -> WorkflowExecutionResult:
        """Execute an LLM node"""
        try:
            # Get system prompt and process variables
            system_prompt = node.system_prompt or "You are a helpful assistant."
            system_prompt = self._process_variables(system_prompt, workflow_state["variables"])
            
            # Create chat agent with custom system prompt
            chat_agent = ChatAgent(
                api_key=api_key,
                model_name=model_name,
                model_type=model_type,
                org_id=org_id,
                agent_id=agent_id,
                customer_id=customer_id,
                session_id=session_id,
                custom_system_prompt=system_prompt
            )
            
            # Get response from LLM
            response = await chat_agent.get_response(
                message=user_message,
                session_id=session_id,
                org_id=org_id,
                agent_id=agent_id,
                customer_id=customer_id
            )
            
            # Store LLM response in workflow state
            workflow_state["variables"]["last_llm_response"] = response.message
            
            # Find next node
            next_node_id = self._find_next_node(node)
            
            return WorkflowExecutionResult(
                success=True,
                message=response.message,
                next_node_id=next_node_id,
                should_continue=next_node_id is not None,
                transfer_to_human=response.transfer_to_human,
                end_chat=response.end_chat,
                request_rating=response.request_rating
            )
            
        except Exception as e:
            logger.error(f"Error executing LLM node: {str(e)}")
            return WorkflowExecutionResult(
                success=False,
                message="Sorry, I encountered an error processing your request.",
                error=str(e)
            )
    
    def _execute_condition_node(
        self,
        node: WorkflowNode,
        workflow: Workflow,
        workflow_state: Dict[str, Any]
    ) -> WorkflowExecutionResult:
        """Execute a condition node"""
        try:
            condition_expression = node.condition_expression
            if not condition_expression:
                return WorkflowExecutionResult(
                    success=False,
                    message="No condition expression configured",
                    error="No condition expression"
                )
            
            # Evaluate condition
            condition_result = self._evaluate_condition(condition_expression, workflow_state["variables"])
            
            # Find next node based on condition result
            next_node_id = self._find_conditional_next_node(node, condition_result)
            
            return WorkflowExecutionResult(
                success=True,
                message="",  # Condition nodes don't produce user-facing messages
                next_node_id=next_node_id,
                should_continue=next_node_id is not None
            )
            
        except Exception as e:
            logger.error(f"Error executing condition node: {str(e)}")
            return WorkflowExecutionResult(
                success=False,
                message="Error evaluating condition",
                error=str(e)
            )
    
    def _execute_form_node(
        self,
        node: WorkflowNode,
        workflow_state: Dict[str, Any],
        user_message: str
    ) -> WorkflowExecutionResult:
        """Execute a form node"""
        form_fields = node.form_fields or []
        config = node.config or {}
        
        # Check for form fields in config as well (frontend stores them there)
        if not form_fields and config.get("form_fields"):
            form_fields = config.get("form_fields", [])
        
        logger.info(f"Form fields from node: {node.form_fields}")
        logger.info(f"Form fields from config: {config.get('form_fields')}")
        logger.info(f"Final form fields: {form_fields}")
        
        if not form_fields:
            return WorkflowExecutionResult(
                success=False,
                message="No form fields configured",
                error="No form fields"
            )
        
        # Check if we're waiting for form submission
        current_state = workflow_state["variables"].get("form_state", "display")
        
        if current_state == "display":
            # First time hitting form node - display the form
            form_data = {
                "title": config.get("form_title", "Please fill out this form"),
                "description": config.get("form_description", ""),
                "submit_button_text": config.get("submit_button_text", "Submit"),
                "fields": form_fields
            }
            
            logger.info(f"Creating form_data: {form_data}")
            logger.info(f"Form state: {current_state}")
            
            # Mark that we're waiting for form submission
            workflow_state["variables"]["form_state"] = "waiting"
            workflow_state["variables"]["form_node_id"] = str(node.id)
            
            result = WorkflowExecutionResult(
                success=True,
                message="",  # No text message for form display
                next_node_id=None,  # Don't proceed yet
                should_continue=False,  # Wait for form submission
                form_data=form_data  # Include form data for display
            )
            
            logger.info(f"Returning result with form_data: {result.form_data}")
            return result
        elif current_state == "submitted":
            # Form has been submitted, process and continue
            form_submission = workflow_state["variables"].get("form_submission", {})
            
            logger.info(f"Processing submitted form. Form submission: {form_submission}")
            
            # Store form data in workflow state
            workflow_state["variables"]["form_data"] = form_submission
            workflow_state["variables"]["form_state"] = "completed"
            
            # Find next node
            next_node_id = self._find_next_node(node)
            
            logger.info(f"Form processed. Next node: {next_node_id}")
            
            return WorkflowExecutionResult(
                success=True,
                message="Thank you for your submission!",
                next_node_id=next_node_id,
                should_continue=next_node_id is not None
            )
        else:
            # Invalid state
            return WorkflowExecutionResult(
                success=False,
                message="Invalid form state",
                error="Invalid form state"
            )
    
    def _execute_action_node(self, node: WorkflowNode, workflow_state: Dict[str, Any]) -> WorkflowExecutionResult:
        """Execute an action node"""
        # This is a simplified implementation
        # In a full implementation, you'd handle webhooks, database operations, etc.
        
        action_type = node.action_type
        action_config = node.action_config or {}
        
        logger.info(f"Executing action: {action_type}")
        
        # Store action execution in workflow state
        workflow_state["variables"]["last_action"] = {
            "type": action_type,
            "config": action_config,
            "executed_at": datetime.utcnow().isoformat()
        }
        
        # Find next node
        next_node_id = self._find_next_node(node)
        
        return WorkflowExecutionResult(
            success=True,
            message="Action completed successfully.",
            next_node_id=next_node_id,
            should_continue=next_node_id is not None
        )
    
    def _execute_human_transfer_node(
        self,
        node: WorkflowNode,
        workflow_state: Dict[str, Any]
    ) -> WorkflowExecutionResult:
        """Execute a human transfer node"""
        transfer_rules = node.transfer_rules or {}
        message = transfer_rules.get("message", "Transferring you to a human agent...")
        
        return WorkflowExecutionResult(
            success=True,
            message=message,
            transfer_to_human=True,
            should_continue=False
        )
    
    def _execute_wait_node(self, node: WorkflowNode, workflow_state: Dict[str, Any]) -> WorkflowExecutionResult:
        """Execute a wait node"""
        # This is a simplified implementation
        # In a full implementation, you'd handle timed waits and conditions
        
        wait_duration = node.wait_duration or 0
        message = f"Please wait {wait_duration} seconds..."
        
        # Find next node
        next_node_id = self._find_next_node(node)
        
        return WorkflowExecutionResult(
            success=True,
            message=message,
            next_node_id=next_node_id,
            should_continue=next_node_id is not None
        )
    
    def _execute_end_node(self, node: WorkflowNode, workflow_state: Dict[str, Any]) -> WorkflowExecutionResult:
        """Execute an end node"""
        message = node.message_text or "Thank you for using our service!"
        
        # Check if we should request rating
        config = node.config or {}
        request_rating = config.get("request_rating", False)
        
        return WorkflowExecutionResult(
            success=True,
            message=message,
            end_chat=True,
            request_rating=request_rating,
            should_continue=False
        )
    
    def _find_next_node(self, node: WorkflowNode) -> Optional[UUID]:
        """Find the next node in the workflow"""
        if not node.outgoing_connections:
            return None
        
        # Return the first outgoing connection's target
        # In a more complex implementation, you'd handle multiple connections
        return node.outgoing_connections[0].target_node_id
    
    def _find_conditional_next_node(self, node: WorkflowNode, condition_result: bool) -> Optional[UUID]:
        """Find next node based on condition result"""
        if not node.outgoing_connections:
            return None
        
        # Look for connections with appropriate conditions
        for connection in node.outgoing_connections:
            if condition_result and (connection.label == "true" or connection.condition == "true"):
                return connection.target_node_id
            elif not condition_result and (connection.label == "false" or connection.condition == "false"):
                return connection.target_node_id
        
        # If no specific condition found, return first connection
        return node.outgoing_connections[0].target_node_id
    
    def _process_variables(self, text: str, variables: Dict[str, Any]) -> str:
        """Process variables in text using {{variable}} syntax"""
        if not text or not variables:
            return text
        
        # Replace {{variable}} with actual values
        for key, value in variables.items():
            placeholder = f"{{{{{key}}}}}"
            text = text.replace(placeholder, str(value))
        
        return text
    
    def _evaluate_condition(self, condition: str, variables: Dict[str, Any]) -> bool:
        """Evaluate a condition expression"""
        # This is a simplified implementation
        # In a full implementation, you'd use a proper expression evaluator
        
        try:
            # Replace variables in condition
            condition = self._process_variables(condition, variables)
            
            # Simple condition evaluation
            if "==" in condition:
                left, right = condition.split("==", 1)
                return left.strip() == right.strip()
            elif "!=" in condition:
                left, right = condition.split("!=", 1)
                return left.strip() != right.strip()
            elif "contains" in condition:
                left, right = condition.split("contains", 1)
                return right.strip() in left.strip()
            else:
                # Default to true for unknown conditions
                return True
                
        except Exception as e:
            logger.error(f"Error evaluating condition: {str(e)}")
            return False
    
    def _update_session_workflow_state(
        self,
        session_id: str,
        next_node_id: Optional[UUID],
        workflow_state: Dict[str, Any]
    ) -> None:
        """Update session with new workflow state"""
        try:
            logger.info(f"Updating session {session_id} with next_node_id: {next_node_id}")
            logger.info(f"Updating session {session_id} with workflow_state: {workflow_state}")
            
            success = self.session_repo.update_workflow_state(session_id, next_node_id, workflow_state)
            if success:
                logger.info(f"Successfully updated session {session_id} workflow state")
            else:
                logger.error(f"Failed to update session {session_id} workflow state")
            
        except Exception as e:
            logger.error(f"Error updating session workflow state: {str(e)}") 