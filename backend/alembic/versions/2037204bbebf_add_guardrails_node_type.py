"""add guardrails node type

Revision ID: 2037204bbebf
Revises: 7af9828611e7
Create Date: 2025-10-29 11:47:00.000000

"""
from typing import Sequence, Union

from alembic import op
# revision identifiers, used by Alembic.
revision: str = '2037204bbebf'
down_revision: Union[str, None] = '7af9828611e7'


def upgrade() -> None:
    # Add GUARDRAILS to the NodeType enum
    op.execute("ALTER TYPE nodetype ADD VALUE IF NOT EXISTS 'GUARDRAILS'")


def downgrade() -> None:
    # Create a new enum without the guardrails value
    op.execute("""
        CREATE TYPE nodetype_new AS ENUM (
            'MESSAGE','LLM','CONDITION','FORM','ACTION','HUMAN_TRANSFER','WAIT','END','LANDING_PAGE','USER_INPUT'
        )
    """)
    
    # Update the column type to use the new enum
    op.execute("ALTER TABLE workflow_nodes ALTER COLUMN node_type TYPE nodetype_new USING node_type::text::nodetype_new")
    
    # Drop the old enum
    op.execute("DROP TYPE nodetype")
    
    # Rename the new enum to the original name
    op.execute("ALTER TYPE nodetype_new RENAME TO nodetype")
