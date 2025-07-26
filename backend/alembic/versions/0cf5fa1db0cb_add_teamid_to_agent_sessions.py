"""add_teamid_to_agent_sessions

Revision ID: 0cf5fa1db0cb
Revises: 91a148726029
Create Date: 2025-03-21 13:57:55.161703

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0cf5fa1db0cb'
down_revision: Union[str, None] = '91a148726029'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Check if 'ai' schema exists before attempting to modify the table
    conn = op.get_bind()
    result = conn.execute(sa.text("SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'ai'"))
    schema_exists = result.fetchone() is not None
    
    if schema_exists:
        # Add team_id column to ai.agent_sessions table
        op.add_column('agent_sessions', 
            sa.Column('team_id', sa.UUID(), nullable=True),
            schema='ai'
        )
    else:
        print("Schema 'ai' does not exist, skipping migration")


def downgrade() -> None:
    # Check if 'ai' schema exists before attempting to modify the table
    conn = op.get_bind()
    result = conn.execute(sa.text("SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'ai'"))
    schema_exists = result.fetchone() is not None
    
    if schema_exists:
        # Drop team_id column from ai.agent_sessions table
        op.drop_column('agent_sessions', 'team_id', schema='ai')
    else:
        print("Schema 'ai' does not exist, skipping migration rollback")
