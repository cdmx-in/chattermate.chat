"""
Copyright 2024-2026 ChatterMate

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

How far an organization has got towards a live agent, read from the data
itself rather than the browser, so the dashboard and email links resume at
the same step on any device:

  create -> teach -> test -> launch -> live

- create: no agent yet
- teach:  an agent, but no knowledge indexed or being indexed
- test:   knowledge, but nobody has chatted with the agent yet
- launch: tested, but not live anywhere a customer can reach it
- live:   the widget loaded on the org's own site, a messaging channel is
          connected, or a real visitor has chatted (covers orgs that went
          live before install detection existed)
"""

from dataclasses import dataclass
from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from sqlalchemy import exists, select
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from app.models.agent import Agent
from app.models.channels.channel_account import ChannelAccount
from app.models.chat_history import ChatHistory
from app.models.customer import Customer
from app.models.knowledge import Knowledge
from app.models.knowledge_queue import KnowledgeQueue, QueueStatus
from app.models.organization import Organization
from app.models.widget import Widget

SETTINGS_KEY = "onboarding"
# The wizard's own test chat signs in as onboarding+<ms>@noemail.com.
_TEST_CHAT_EMAILS = "onboarding+%@noemail.com"
_ACTIVE_QUEUE = (QueueStatus.PENDING.value, QueueStatus.PROCESSING.value, QueueStatus.COMPLETED.value)


class SetupStep(str, Enum):
    CREATE = "create"
    TEACH = "teach"
    TEST = "test"
    LAUNCH = "launch"
    LIVE = "live"


@dataclass(frozen=True)
class SetupProgress:
    step: SetupStep
    agent_id: Optional[str]
    widget_id: Optional[str]
    hidden: bool


def _exists(db: Session, query) -> bool:
    return db.execute(select(exists(query))).scalar()


def get_progress(db: Session, organization: Organization) -> SetupProgress:
    """A handful of EXISTS checks; stops at the first missing stage."""
    org_id = organization.id
    hidden = bool((organization.settings or {}).get(SETTINGS_KEY, {}).get("hidden_at"))
    agent = (
        db.query(Agent.id).filter(Agent.organization_id == org_id)
        .order_by(Agent.created_at.asc()).first()
    )
    if agent is None:
        return SetupProgress(SetupStep.CREATE, None, None, hidden)

    widget = (
        db.query(Widget.id).filter(Widget.organization_id == org_id, Widget.agent_id == agent.id)
        .first()
    )
    agent_id, widget_id = str(agent.id), widget.id if widget else None

    def progress(step: SetupStep) -> SetupProgress:
        return SetupProgress(step, agent_id, widget_id, hidden)

    has_knowledge = _exists(db, select(Knowledge.id).where(Knowledge.organization_id == org_id)) or _exists(
        db, select(KnowledgeQueue.id).where(
            KnowledgeQueue.organization_id == org_id, KnowledgeQueue.status.in_(_ACTIVE_QUEUE))
    )
    if not has_knowledge:
        return progress(SetupStep.TEACH)
    if not _exists(db, select(ChatHistory.id).where(ChatHistory.organization_id == org_id)):
        return progress(SetupStep.TEST)
    live = (
        _exists(db, select(Widget.id).where(
            Widget.organization_id == org_id, Widget.installed_at.isnot(None)))
        or _exists(db, select(ChannelAccount.id).where(
            ChannelAccount.organization_id == org_id, ChannelAccount.is_active.is_(True)))
        or _exists(db, select(ChatHistory.id).join(Customer, Customer.id == ChatHistory.customer_id).where(
            ChatHistory.organization_id == org_id,
            ChatHistory.message_type == "user",
            Customer.email.notlike(_TEST_CHAT_EMAILS)))
    )
    return progress(SetupStep.LIVE if live else SetupStep.LAUNCH)


def hide(db: Session, organization: Organization) -> None:
    """The org asked not to see the setup bar again. Kept in settings JSON so
    it needs no migration."""
    current = dict(organization.settings or {})
    current[SETTINGS_KEY] = {**current.get(SETTINGS_KEY, {}), "hidden_at": datetime.now(timezone.utc).isoformat()}
    # A new dict + flag_modified: in-place edits to a JSON column are invisible
    # to the unit of work.
    organization.settings = current
    flag_modified(organization, "settings")
    db.commit()
