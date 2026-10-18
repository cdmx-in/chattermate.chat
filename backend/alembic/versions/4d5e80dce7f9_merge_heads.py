"""merge_heads

Revision ID: 4d5e80dce7f9
Revises: add_allowed_attachment_types_001, add_custom_webhooks_001, add_require_token_auth_001
Create Date: 2026-01-04 15:26:39.980832

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4d5e80dce7f9'
down_revision: Union[str, None] = ('add_allowed_attachment_types_001', 'add_custom_webhooks_001', 'add_require_token_auth_001')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
