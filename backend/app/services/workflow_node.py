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

from typing import List, Dict, Any
from uuid import UUID
import uuid
from sqlalchemy.orm import Session
from app.repositories.workflow_node import WorkflowNodeRepository
from app.repositories.workflow import WorkflowRepository
from app.core.logger import get_logger

logger = get_logger(__name__)


class WorkflowNodeService:
    def __init__(self, db: Session):
        self.db = db
        self.node_repo = WorkflowNodeRepository(db)
        self.workflow_repo = WorkflowRepository(db)

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
                    # Keep the ID from frontend to maintain references in connections
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
                    # Keep the ID from frontend or generate new one
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