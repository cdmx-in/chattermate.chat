"""Add custom webhooks integration

Revision ID: add_custom_webhooks_001
Revises: add_slack_integration_001
Create Date: 2024-12-31 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = 'add_custom_webhooks_001'
down_revision: Union[str, None] = 'add_slack_integration_001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create custom_webhooks table
    op.create_table('custom_webhooks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('organization_id', sa.UUID(), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('webhook_url', sa.Text(), nullable=False),
        sa.Column('http_method', sa.String(length=10), nullable=False, server_default='POST'),
        sa.Column('auth_type', sa.String(length=50), nullable=True),
        sa.Column('auth_token', sa.Text(), nullable=True),
        sa.Column('auth_header_name', sa.String(length=100), nullable=True),
        sa.Column('auth_username', sa.String(length=255), nullable=True),
        sa.Column('custom_headers', sa.JSON(), nullable=True),
        sa.Column('payload_template', sa.Text(), nullable=True),
        sa.Column('content_type', sa.String(length=100), nullable=False, server_default='application/json'),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_custom_webhooks_id'), 'custom_webhooks', ['id'], unique=False)
    op.create_index(op.f('ix_custom_webhooks_organization_id'), 'custom_webhooks', ['organization_id'], unique=False)

    # Create webhook_logs table
    op.create_table('webhook_logs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('webhook_id', sa.Integer(), nullable=False),
        sa.Column('organization_id', sa.UUID(), nullable=False),
        sa.Column('request_payload', sa.Text(), nullable=True),
        sa.Column('response_status_code', sa.Integer(), nullable=True),
        sa.Column('response_body', sa.Text(), nullable=True),
        sa.Column('success', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('error_message', sa.Text(), nullable=True),
        sa.Column('executed_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['webhook_id'], ['custom_webhooks.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_webhook_logs_id'), 'webhook_logs', ['id'], unique=False)
    op.create_index(op.f('ix_webhook_logs_organization_id'), 'webhook_logs', ['organization_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_webhook_logs_organization_id'), table_name='webhook_logs')
    op.drop_index(op.f('ix_webhook_logs_id'), table_name='webhook_logs')
    op.drop_table('webhook_logs')
    
    op.drop_index(op.f('ix_custom_webhooks_organization_id'), table_name='custom_webhooks')
    op.drop_index(op.f('ix_custom_webhooks_id'), table_name='custom_webhooks')
    op.drop_table('custom_webhooks')
