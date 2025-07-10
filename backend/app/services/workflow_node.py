"""
ChatterMate - Workflow Node Service
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

from typing import List, Dict, Any, Optional
from uuid import UUID
import uuid
import re
from sqlalchemy.orm import Session
from app.repositories.workflow_node import WorkflowNodeRepository
from app.repositories.workflow import WorkflowRepository
from app.repositories.workflow_variable import WorkflowVariableRepository
from app.core.logger import get_logger

logger = get_logger(__name__)


def sanitize_utf8_text(text: str) -> str:
    """
    Sanitize text to remove invalid UTF-8 characters and surrogates
    """
    if not text:
        return text
    
    # Remove surrogate characters (like \udcac, \udd16)
    text = re.sub(r'[\ud800-\udfff]', '', text)
    
    # Encode to UTF-8 and decode to handle any remaining issues
    try:
        text = text.encode('utf-8', errors='ignore').decode('utf-8')
    except UnicodeError:
        # If still failing, remove all non-ASCII characters
        text = re.sub(r'[^\x00-\x7F]', '', text)
    
    return text.strip()


class WorkflowNodeService:
    def __init__(self, db: Session):
        self.db = db
        self.node_repo = WorkflowNodeRepository(db)
        self.workflow_repo = WorkflowRepository(db)
        self.variable_repo = WorkflowVariableRepository(db)

    def update_workflow_nodes_and_connections(
        self, 
        workflow_id: UUID, 
        nodes_data: List[Dict[str, Any]], 
        connections_data: List[Dict[str, Any]], 
        organization_id: UUID
    ) -> Dict[str, List]:
        """Update complete workflow nodes and connections"""
        
        # Validate workflow exists and belongs to organization
        workflow = self.workflow_repo.get_by_id(workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")
        
        if workflow.organization_id != organization_id:
            raise ValueError("Workflow does not belong to your organization")
        
        try:
            # Get existing nodes and connections
            existing_nodes = self.node_repo.get_nodes_by_workflow(workflow_id)
            existing_connections = self.node_repo.get_connections_by_workflow(workflow_id)
            
            # Create maps for easier lookup
            existing_nodes_map = {str(node.id): node for node in existing_nodes}
            existing_connections_map = {str(conn.id): conn for conn in existing_connections}
            
            # Create ID mapping for text IDs to UUIDs
            id_mapping = {}
            
            def is_text_id(node_id: str) -> bool:
                """Check if ID is a text ID (like message-1, llm-2) instead of UUID"""
                try:
                    UUID(node_id)
                    return False
                except ValueError:
                    return True
            
            # First pass: Create ID mappings for text IDs
            for node_data in nodes_data:
                node_id = str(node_data.get('id', ''))
                if node_id and is_text_id(node_id):
                    if node_id not in id_mapping:
                        id_mapping[node_id] = str(uuid.uuid4())
                        logger.info(f"Mapped text ID '{node_id}' to UUID '{id_mapping[node_id]}'")
            
            # Also create mappings for connection IDs if they are text IDs
            for conn_data in connections_data:
                conn_id = str(conn_data.get('id', ''))
                if conn_id and is_text_id(conn_id):
                    if conn_id not in id_mapping:
                        id_mapping[conn_id] = str(uuid.uuid4())
                        logger.info(f"Mapped connection text ID '{conn_id}' to UUID '{id_mapping[conn_id]}'")
            
            # Process nodes
            processed_node_ids = set()
            created_nodes = []
            updated_nodes = []
            
            for node_data in nodes_data:
                node_data_copy = node_data.copy()
                node_data_copy['workflow_id'] = workflow_id
                
                # Convert workflow_id to UUID if it's a string
                if isinstance(node_data_copy['workflow_id'], str):
                    node_data_copy['workflow_id'] = UUID(node_data_copy['workflow_id'])
                
                # Sanitize text fields to prevent UTF-8 encoding errors
                text_fields = ['name', 'description', 'message_text', 'system_prompt', 
                              'condition_expression', 'action_type']
                for field in text_fields:
                    if field in node_data_copy and isinstance(node_data_copy[field], str):
                        node_data_copy[field] = sanitize_utf8_text(node_data_copy[field])
                
                # Replace text ID with UUID if mapped
                original_id = str(node_data_copy.get('id', ''))
                if original_id in id_mapping:
                    node_data_copy['id'] = id_mapping[original_id]
                
                if 'id' in node_data_copy and node_data_copy['id'] and str(node_data_copy['id']) in existing_nodes_map:
                    # Update existing node
                    node_id = UUID(str(node_data_copy['id']))
                    processed_node_ids.add(str(node_id))
                    
                    # Remove id from update data
                    update_data = {k: v for k, v in node_data_copy.items() if k != 'id'}
                    
                    updated_node = self.node_repo.update_node(node_id, **update_data)
                    if updated_node:
                        updated_nodes.append(updated_node)
                else:
                    # Create new node
                    if 'id' not in node_data_copy or not node_data_copy['id']:
                        # Generate new ID if not provided
                        node_data_copy['id'] = uuid.uuid4()
                    else:
                        # Convert string ID to UUID
                        node_data_copy['id'] = UUID(str(node_data_copy['id']))
                    
                    new_node = self.node_repo.create_node(**node_data_copy)
                    created_nodes.append(new_node)
                    processed_node_ids.add(str(new_node.id))
            
            # Delete nodes that weren't in the request
            deleted_nodes = []
            for existing_node_id, existing_node in existing_nodes_map.items():
                if existing_node_id not in processed_node_ids:
                    self.node_repo.delete_node(UUID(existing_node_id))
                    deleted_nodes.append(existing_node)
            
            # Commit node changes before processing connections
            self.db.commit()
            
            # Process connections
            processed_connection_ids = set()
            created_connections = []
            updated_connections = []
            
            for conn_data in connections_data:
                conn_data_copy = conn_data.copy()
                conn_data_copy['workflow_id'] = workflow_id
                
                # Convert workflow_id to UUID if it's a string
                if isinstance(conn_data_copy['workflow_id'], str):
                    conn_data_copy['workflow_id'] = UUID(conn_data_copy['workflow_id'])
                
                # Sanitize text fields to prevent UTF-8 encoding errors
                text_fields = ['label', 'condition']
                for field in text_fields:
                    if field in conn_data_copy and isinstance(conn_data_copy[field], str):
                        conn_data_copy[field] = sanitize_utf8_text(conn_data_copy[field])
                
                # Replace text ID with UUID if mapped
                original_id = str(conn_data_copy.get('id', ''))
                if original_id in id_mapping:
                    conn_data_copy['id'] = id_mapping[original_id]
                
                # Map source and target node IDs if they are text IDs
                source_node_id = str(conn_data_copy.get('source_node_id', ''))
                if source_node_id in id_mapping:
                    conn_data_copy['source_node_id'] = id_mapping[source_node_id]
                
                target_node_id = str(conn_data_copy.get('target_node_id', ''))
                if target_node_id in id_mapping:
                    conn_data_copy['target_node_id'] = id_mapping[target_node_id]
                
                if 'id' in conn_data_copy and conn_data_copy['id'] and str(conn_data_copy['id']) in existing_connections_map:
                    # Update existing connection
                    conn_id = UUID(str(conn_data_copy['id']))
                    processed_connection_ids.add(str(conn_id))
                    
                    # Remove id from update data
                    update_data = {k: v for k, v in conn_data_copy.items() if k != 'id'}
                    
                    # Convert source and target node IDs to UUIDs
                    if 'source_node_id' in update_data:
                        update_data['source_node_id'] = UUID(str(update_data['source_node_id']))
                    if 'target_node_id' in update_data:
                        update_data['target_node_id'] = UUID(str(update_data['target_node_id']))
                    
                    # Note: WorkflowConnection doesn't have update method in repo, so we'll recreate
                    # Delete and recreate for simplicity
                    existing_conn = existing_connections_map[str(conn_id)]
                    self.db.delete(existing_conn)
                    new_conn = self.node_repo.create_connection(**update_data)
                    updated_connections.append(new_conn)
                else:
                    # Create new connection
                    if 'id' not in conn_data_copy or not conn_data_copy['id']:
                        # Generate new ID if not provided
                        conn_data_copy['id'] = uuid.uuid4()
                    else:
                        # Convert string ID to UUID
                        conn_data_copy['id'] = UUID(str(conn_data_copy['id']))
                    
                    # Convert source and target node IDs to UUIDs
                    if 'source_node_id' in conn_data_copy:
                        conn_data_copy['source_node_id'] = UUID(str(conn_data_copy['source_node_id']))
                    if 'target_node_id' in conn_data_copy:
                        conn_data_copy['target_node_id'] = UUID(str(conn_data_copy['target_node_id']))
                    
                    new_conn = self.node_repo.create_connection(**conn_data_copy)
                    created_connections.append(new_conn)
                    processed_connection_ids.add(str(new_conn.id))
            
            # Delete connections that weren't in the request
            deleted_connections = []
            for existing_conn_id, existing_conn in existing_connections_map.items():
                if existing_conn_id not in processed_connection_ids:
                    self.db.delete(existing_conn)
                    deleted_connections.append(existing_conn)
            
            # Final commit for connections
            self.db.commit()
            
            logger.info(f"Updated workflow {workflow_id}: {len(created_nodes)} nodes created, {len(updated_nodes)} nodes updated, {len(deleted_nodes)} nodes deleted")
            logger.info(f"Updated workflow {workflow_id}: {len(created_connections)} connections created, {len(updated_connections)} connections updated, {len(deleted_connections)} connections deleted")
            
            # Return all current nodes and connections
            final_nodes = self.node_repo.get_nodes_by_workflow(workflow_id)
            final_connections = self.node_repo.get_connections_by_workflow(workflow_id)
            
            return {
                "nodes": final_nodes,
                "connections": final_connections
            }
            
        except Exception as e:
            logger.error(f"Error updating workflow nodes and connections: {str(e)}")
            self.db.rollback()
            raise

    def get_workflow_nodes_and_connections(self, workflow_id: UUID, organization_id: UUID) -> Dict[str, List]:
        """Get all nodes and connections for a workflow"""
        
        # Validate workflow exists and belongs to organization
        workflow = self.workflow_repo.get_by_id(workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")
        
        if workflow.organization_id != organization_id:
            raise ValueError("Workflow does not belong to your organization")
        
        nodes = self.node_repo.get_nodes_by_workflow(workflow_id)
        connections = self.node_repo.get_connections_by_workflow(workflow_id)
        
        return {
            "nodes": nodes,
            "connections": connections
        }

    def update_single_node_with_variables(
        self, 
        workflow_id: UUID, 
        node_id: UUID, 
        node_data: Dict[str, Any], 
        variables_data: Optional[List[Dict[str, Any]]] = None,
        organization_id: UUID = None
    ) -> Dict[str, Any]:
        """Update a single workflow node with its properties and variables"""
        
        # Validate workflow exists and belongs to organization
        workflow = self.workflow_repo.get_by_id(workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")
        
        if organization_id and workflow.organization_id != organization_id:
            raise ValueError("Workflow does not belong to your organization")
        
        # Validate node exists and belongs to workflow
        node = self.node_repo.get_node_by_id(node_id)
        if not node:
            raise ValueError("Node not found")
        
        if node.workflow_id != workflow_id:
            raise ValueError("Node does not belong to this workflow")
        
        try:
            # Sanitize text fields to prevent UTF-8 encoding errors
            node_data_copy = node_data.copy()
            text_fields = ['name', 'description', 'message_text', 'system_prompt', 
                          'condition_expression', 'action_type']
            for field in text_fields:
                if field in node_data_copy and isinstance(node_data_copy[field], str):
                    node_data_copy[field] = sanitize_utf8_text(node_data_copy[field])
            
            # Update node properties
            updated_node = self.node_repo.update_node(node_id, **node_data_copy)
            if not updated_node:
                raise ValueError("Failed to update node")
            
            # Handle variables if provided
            updated_variables = []
            if variables_data:
                for var_data in variables_data:
                    var_data_copy = var_data.copy()
                    var_data_copy['workflow_id'] = workflow_id
                    var_data_copy['organization_id'] = workflow.organization_id
                    
                    # Sanitize text fields for variables
                    var_text_fields = ['name', 'description', 'default_value']
                    for field in var_text_fields:
                        if field in var_data_copy and isinstance(var_data_copy[field], str):
                            var_data_copy[field] = sanitize_utf8_text(var_data_copy[field])
                    
                    if 'id' in var_data_copy and var_data_copy['id']:
                        # Update existing variable
                        variable_id = UUID(str(var_data_copy.pop('id')))
                        updated_var = self.variable_repo.update_variable(variable_id, **var_data_copy)
                        if updated_var:
                            updated_variables.append(updated_var)
                    else:
                        # Create new variable
                        new_var = self.variable_repo.create_variable(**var_data_copy)
                        updated_variables.append(new_var)
            
            # Commit all changes
            self.db.commit()
            
            # Get all variables for this workflow
            all_variables = self.variable_repo.get_variables_by_workflow(workflow_id)
            
            logger.info(f"Updated node {node_id} with {len(updated_variables)} variables")
            
            return {
                "node": updated_node,
                "variables": all_variables,
                "updated_variables_count": len(updated_variables)
            }
            
        except Exception as e:
            logger.error(f"Error updating node {node_id} with variables: {str(e)}")
            self.db.rollback()
            raise

    def get_node_with_variables(self, workflow_id: UUID, node_id: UUID, organization_id: UUID = None) -> Dict[str, Any]:
        """Get a single node with its associated variables"""
        
        # Validate workflow exists and belongs to organization
        workflow = self.workflow_repo.get_by_id(workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")
        
        if organization_id and workflow.organization_id != organization_id:
            raise ValueError("Workflow does not belong to your organization")
        
        # Validate node exists and belongs to workflow
        node = self.node_repo.get_node_by_id(node_id)
        if not node:
            raise ValueError("Node not found")
        
        if node.workflow_id != workflow_id:
            raise ValueError("Node does not belong to this workflow")
        
        # Get all variables for this workflow
        variables = self.variable_repo.get_variables_by_workflow(workflow_id)
        
        return {
            "node": node,
            "variables": variables
        } 