"""Record where each widget is live, and where it is blocked

installed_at/installed_origin: the first page load from the org's own site.
blocked_origin/blocked_origin_seen_at: the latest site that loaded the widget
but isn't allowed to (CORS only admits the org's domain), so it silently fails
there.

Revision ID: widget_install_001
Revises: agent_quick_replies_001
Create Date: 2026-10-12
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = 'widget_install_001'
down_revision: Union[str, None] = 'agent_quick_replies_001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

COLUMNS = (
    ('installed_at', sa.DateTime(timezone=True)),
    ('installed_origin', sa.String(255)),
    ('blocked_origin', sa.String(255)),
    ('blocked_origin_seen_at', sa.DateTime(timezone=True)),
)


def upgrade() -> None:
    for name, type_ in COLUMNS:
        op.add_column('widgets', sa.Column(name, type_, nullable=True), if_not_exists=True)


def downgrade() -> None:
    for name, _ in reversed(COLUMNS):
        op.drop_column('widgets', name, if_exists=True)
