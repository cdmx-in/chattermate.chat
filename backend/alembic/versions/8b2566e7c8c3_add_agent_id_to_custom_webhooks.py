"""add_agent_id_to_custom_webhooks

Revision ID: 8b2566e7c8c3
Revises: 4d5e80dce7f9
Create Date: 2026-01-04 15:26:58.260638

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8b2566e7c8c3'
down_revision: Union[str, None] = '4d5e80dce7f9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop organization_id column (no longer needed - webhooks are agent-specific)
    op.drop_column('custom_webhooks', 'organization_id')
    
    # Add agent_id column as NOT NULL
    op.add_column('custom_webhooks', sa.Column('agent_id', sa.UUID(), nullable=False))
    
    # Add foreign key constraint
    op.create_foreign_key(
        'fk_custom_webhooks_agent_id',
        'custom_webhooks',
        'agents',
        ['agent_id'],
        ['id'],
        ondelete='CASCADE'
    )
    
    # Add index for better query performance
    op.create_index('ix_custom_webhooks_agent_id', 'custom_webhooks', ['agent_id'])


def downgrade() -> None:
    # Remove the changes in reverse order
    op.drop_index('ix_custom_webhooks_agent_id', table_name='custom_webhooks')
    op.drop_constraint('fk_custom_webhooks_agent_id', 'custom_webhooks', type_='foreignkey')
    op.drop_column('custom_webhooks', 'agent_id')
    
    # Re-add organization_id column
    op.add_column('custom_webhooks', sa.Column('organization_id', sa.UUID(), nullable=False))
