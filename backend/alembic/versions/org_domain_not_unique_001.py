"""organizations.domain is no longer unique

Revision ID: org_domain_not_unique_001
Revises: widget_allowed_domains_001
Create Date: 2026-10-22

The widget is framed from our own origin, so an org's website no longer has to
be in CORS to work, and two orgs may run on the same site. The column stays
required: the website seeds the agent's knowledge and the setup emails.
"""
from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = 'org_domain_not_unique_001'
down_revision: Union[str, None] = 'widget_allowed_domains_001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # The constraint the first migration created (Postgres named it this)...
    op.execute("ALTER TABLE organizations DROP CONSTRAINT IF EXISTS organizations_domain_key")
    # ...and any unique index on the column a hand-built database may have instead
    op.execute("""
        DO $$
        DECLARE unique_index record;
        BEGIN
            FOR unique_index IN
                SELECT indexname FROM pg_indexes
                WHERE tablename = 'organizations'
                  AND indexdef ILIKE 'CREATE UNIQUE INDEX % ON %organizations% (domain)'
            LOOP
                EXECUTE format('DROP INDEX IF EXISTS %I', unique_index.indexname);
            END LOOP;
        END $$;
    """)


def downgrade() -> None:
    # Fails if two orgs now share a website: that is the point of the upgrade
    op.execute("ALTER TABLE organizations ADD CONSTRAINT organizations_domain_key UNIQUE (domain)")
