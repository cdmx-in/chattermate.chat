"""merge guardrails and chat initiation

Revision ID: 0cf34ff05aee
Revises: 2037204bbebf, a1b2c3d4e5f6
Create Date: 2025-10-31 19:08:54.718682

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0cf34ff05aee'
down_revision: Union[str, None] = ('2037204bbebf', 'a1b2c3d4e5f6')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
