"""make_knowledge_queue_user_id_nullable

Revision ID: 910bfe03518b
Revises: 0cf34ff05aee
Create Date: 2025-11-04 17:18:35.904635

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '910bfe03518b'
down_revision: Union[str, None] = '0cf34ff05aee'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Make user_id nullable in knowledge_queue table
    op.alter_column('knowledge_queue', 'user_id',
                    existing_type=sa.UUID(),
                    nullable=True)


def downgrade() -> None:
    # Revert user_id to not nullable
    op.alter_column('knowledge_queue', 'user_id',
                    existing_type=sa.UUID(),
                    nullable=False)
