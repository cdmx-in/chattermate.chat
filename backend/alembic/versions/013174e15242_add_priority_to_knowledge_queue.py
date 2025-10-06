"""add_priority_to_knowledge_queue

Revision ID: 013174e15242
Revises: dc827ab30bd4
Create Date: 2025-10-06 14:35:40.640506

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '013174e15242'
down_revision: Union[str, None] = 'dc827ab30bd4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add priority column with default value 0 and create index
    op.add_column('knowledge_queue', sa.Column('priority', sa.Integer(), nullable=False, server_default='0'))
    op.create_index(op.f('ix_knowledge_queue_priority'), 'knowledge_queue', ['priority'], unique=False)


def downgrade() -> None:
    # Remove index and column
    op.drop_index(op.f('ix_knowledge_queue_priority'), table_name='knowledge_queue')
    op.drop_column('knowledge_queue', 'priority')
