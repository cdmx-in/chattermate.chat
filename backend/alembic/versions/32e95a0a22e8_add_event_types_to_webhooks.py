"""add_event_types_to_webhooks

Revision ID: 32e95a0a22e8
Revises: 8b2566e7c8c3
Create Date: 2026-01-04 18:26:38.678336

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '32e95a0a22e8'
down_revision: Union[str, None] = '8b2566e7c8c3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add event_types column to custom_webhooks table
    op.add_column('custom_webhooks',
        sa.Column('event_types', sa.JSON(), nullable=False, server_default='["ticket_created"]')
    )


def downgrade() -> None:
    # Remove event_types column
    op.drop_column('custom_webhooks', 'event_types')
