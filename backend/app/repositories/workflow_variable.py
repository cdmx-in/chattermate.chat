"""
ChatterMate - Workflow Variable Repository
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

from typing import List, Optional
from uuid import UUID
from sqlalchemy.orm import Session
from app.models.workflow_variable import WorkflowVariable, VariableScope, VariableType
from app.core.logger import get_logger

logger = get_logger(__name__)


class WorkflowVariableRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_variable(self, **kwargs) -> WorkflowVariable:
        """Create a new workflow variable"""
        try:
            variable = WorkflowVariable(**kwargs)
            self.db.add(variable)
            self.db.flush()  # Flush to get the ID without committing
            logger.info(f"Created workflow variable: {variable.id}")
            return variable
        except Exception as e:
            logger.error(f"Error creating workflow variable: {str(e)}")
            raise

    def get_variables_by_workflow(self, workflow_id: UUID) -> List[WorkflowVariable]:
        """Get all variables for a workflow"""
        return self.db.query(WorkflowVariable).filter(
            WorkflowVariable.workflow_id == workflow_id
        ).all()

    def get_variable_by_id(self, variable_id: UUID) -> Optional[WorkflowVariable]:
        """Get variable by ID"""
        return self.db.query(WorkflowVariable).filter(
            WorkflowVariable.id == variable_id
        ).first()

    def get_variable_by_name(self, workflow_id: UUID, name: str) -> Optional[WorkflowVariable]:
        """Get variable by name within a workflow"""
        return self.db.query(WorkflowVariable).filter(
            WorkflowVariable.workflow_id == workflow_id,
            WorkflowVariable.name == name
        ).first()

    def get_global_variables(self, organization_id: UUID) -> List[WorkflowVariable]:
        """Get all global variables for an organization"""
        return self.db.query(WorkflowVariable).filter(
            WorkflowVariable.organization_id == organization_id,
            WorkflowVariable.scope == VariableScope.GLOBAL
        ).all()

    def get_system_variables(self, organization_id: UUID) -> List[WorkflowVariable]:
        """Get all system variables for an organization"""
        return self.db.query(WorkflowVariable).filter(
            WorkflowVariable.organization_id == organization_id,
            WorkflowVariable.is_system == True
        ).all()

    def update_variable(self, variable_id: UUID, **kwargs) -> Optional[WorkflowVariable]:
        """Update workflow variable"""
        try:
            variable = self.get_variable_by_id(variable_id)
            if not variable:
                return None

            for key, value in kwargs.items():
                if hasattr(variable, key):
                    setattr(variable, key, value)

            self.db.flush()  # Flush to update without committing
            logger.info(f"Updated workflow variable: {variable_id}")
            return variable
        except Exception as e:
            logger.error(f"Error updating workflow variable {variable_id}: {str(e)}")
            raise

    def delete_variable(self, variable_id: UUID) -> bool:
        """Delete workflow variable"""
        try:
            variable = self.get_variable_by_id(variable_id)
            if not variable:
                return False

            self.db.delete(variable)
            self.db.flush()  # Flush to delete without committing
            logger.info(f"Deleted workflow variable: {variable_id}")
            return True
        except Exception as e:
            logger.error(f"Error deleting workflow variable {variable_id}: {str(e)}")
            raise

    def delete_variables_by_workflow(self, workflow_id: UUID) -> bool:
        """Delete all variables for a workflow"""
        try:
            variables = self.get_variables_by_workflow(workflow_id)
            for variable in variables:
                self.db.delete(variable)
            
            self.db.flush()  # Flush to delete without committing
            logger.info(f"Deleted all variables for workflow: {workflow_id}")
            return True
        except Exception as e:
            logger.error(f"Error deleting variables for workflow {workflow_id}: {str(e)}")
            raise

    def bulk_create_variables(self, variables_data: List[dict]) -> List[WorkflowVariable]:
        """Create multiple variables at once"""
        try:
            variables = []
            for var_data in variables_data:
                variable = WorkflowVariable(**var_data)
                self.db.add(variable)
                variables.append(variable)
            
            self.db.flush()  # Flush to get IDs without committing
            logger.info(f"Created {len(variables)} workflow variables")
            return variables
        except Exception as e:
            logger.error(f"Error bulk creating workflow variables: {str(e)}")
            raise

    def bulk_update_variables(self, variables_data: List[dict]) -> List[WorkflowVariable]:
        """Update multiple variables at once"""
        try:
            updated_variables = []
            for var_data in variables_data:
                variable_id = var_data.pop('id')
                variable = self.update_variable(variable_id, **var_data)
                if variable:
                    updated_variables.append(variable)
            
            logger.info(f"Updated {len(updated_variables)} workflow variables")
            return updated_variables
        except Exception as e:
            logger.error(f"Error bulk updating workflow variables: {str(e)}")
            raise 