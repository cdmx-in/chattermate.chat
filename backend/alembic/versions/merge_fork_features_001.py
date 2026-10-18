"""Merge the upstream head with the fork's feature chain

Revision ID: merge_fork_features_001
Revises: auth_sessions_001, fa8ff100dadc
Create Date: 2026-10-18

The fork's chain (custom webhooks -> closed_at on sessions -> Nova guardrail
columns) was written against an older upstream; this empty merge joins it to
the upstream head so `alembic upgrade head` has a single head again. Nothing
in either chain touches the same column, so no data migration is needed.
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'merge_fork_features_001'
down_revision: Union[str, None] = ('auth_sessions_001', 'fa8ff100dadc')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
