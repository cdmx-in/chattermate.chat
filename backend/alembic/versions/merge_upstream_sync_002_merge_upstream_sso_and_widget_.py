"""merge upstream sso and widget migrations into fork chain

Revision ID: merge_upstream_sync_002
Revises: merge_fork_features_001, auth_session_method_001
Create Date: 2026-10-28 12:12:15.895938

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'merge_upstream_sync_002'
down_revision: Union[str, None] = ('merge_fork_features_001', 'auth_session_method_001')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
