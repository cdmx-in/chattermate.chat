"""Add oauth_state fields to shopify_shops

Revision ID: 7af9828611e7
Revises: d9a4b9902f80
Create Date: 2025-10-28 20:28:32.936719

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7af9828611e7'
down_revision: Union[str, None] = 'd9a4b9902f80'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add oauth_state and oauth_state_expiry columns to shopify_shops table
    op.add_column('shopify_shops', sa.Column('oauth_state', sa.String(), nullable=True))
    op.add_column('shopify_shops', sa.Column('oauth_state_expiry', sa.DateTime(), nullable=True))


def downgrade() -> None:
    # Remove oauth_state and oauth_state_expiry columns from shopify_shops table
    op.drop_column('shopify_shops', 'oauth_state_expiry')
    op.drop_column('shopify_shops', 'oauth_state')
