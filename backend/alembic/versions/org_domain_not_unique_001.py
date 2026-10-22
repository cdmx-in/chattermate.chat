"""organizations.domain is no longer unique

Revision ID: org_domain_not_unique_001
Revises: widget_allowed_domains_001
Create Date: 2026-10-22

The widget is framed from our own origin, so an org's website no longer has to
be in CORS to work, and two orgs may run on the same site. The column stays
required (the website seeds the agent's knowledge and the setup emails); a
plain index keeps lookups by it fast.
"""
from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = 'org_domain_not_unique_001'
down_revision: Union[str, None] = 'widget_allowed_domains_001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE organizations DROP CONSTRAINT IF EXISTS organizations_domain_key")
    op.execute("CREATE INDEX IF NOT EXISTS ix_organizations_domain ON organizations (domain)")


def downgrade() -> None:
    # Fails if two orgs now share a website: that is the point of the upgrade
    op.execute("DROP INDEX IF EXISTS ix_organizations_domain")
    op.execute("ALTER TABLE organizations ADD CONSTRAINT organizations_domain_key UNIQUE (domain)")
