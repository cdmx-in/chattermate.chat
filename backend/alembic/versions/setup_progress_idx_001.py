"""Index chat_history and knowledge by organization

Setup progress (the dashboard's "Finish setup" bar and the setup emails)
asks per organization whether it has knowledge and whether anyone has
chatted. Neither table had an index usable for that: chat_history's only
org index is partial (channel messages), so each check scanned the table.

Revision ID: setup_progress_idx_001
Revises: widget_install_001
Create Date: 2026-10-13
"""
from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = 'setup_progress_idx_001'
down_revision: Union[str, None] = 'widget_install_001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

INDEXES = (
    ('ix_chat_history_org_type', 'chat_history', ['organization_id', 'message_type']),
    ('ix_knowledge_organization_id', 'knowledge', ['organization_id']),
)


def upgrade() -> None:
    # CONCURRENTLY so the tables keep taking writes while they build -
    # migrations run on backend start - and that can't run in a transaction.
    # A build that fails part-way leaves an INVALID index that IF NOT EXISTS
    # would then skip: if that happens, drop it and restart.
    with op.get_context().autocommit_block():
        for name, table, columns in INDEXES:
            op.create_index(name, table, columns, postgresql_concurrently=True, if_not_exists=True)


def downgrade() -> None:
    with op.get_context().autocommit_block():
        for name, table, _ in reversed(INDEXES):
            op.drop_index(name, table_name=table, postgresql_concurrently=True, if_exists=True)
