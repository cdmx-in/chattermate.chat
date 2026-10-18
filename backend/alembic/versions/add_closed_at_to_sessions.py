"""add_closed_at_to_sessions

Revision ID: add_closed_at_to_sessions
Revises: 32e95a0a22e8
Create Date: 2026-01-07

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'add_closed_at_to_sessions'
down_revision = '32e95a0a22e8'  # Latest migration
branch_labels = None
depends_on = None


def upgrade():
    # Add closed_at column to session_to_agents table
    op.add_column('session_to_agents',
        sa.Column('closed_at', sa.DateTime(timezone=True), nullable=True)
    )


def downgrade():
    # Remove closed_at column
    op.drop_column('session_to_agents', 'closed_at')
