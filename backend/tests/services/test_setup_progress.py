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

Setup progress is read from the data, step by step, and can be hidden.
"""

from datetime import datetime, timezone
from uuid import uuid4

from app.models.channels.channel_account import ChannelAccount
from app.models.chat_history import ChatHistory
from app.models.customer import Customer
from app.models.knowledge import Knowledge, SourceType
from app.models.knowledge_queue import KnowledgeQueue, QueueStatus
from app.services.setup_progress import SetupStep, get_progress, hide


def step(db, org):
    db.refresh(org)
    return get_progress(db, org).step


def add_chat(db, org, email="onboarding+1791389331263@noemail.com"):
    """A user message; by default from the wizard's own test chat."""
    customer = Customer(id=uuid4(), organization_id=org.id, email=email)
    db.add(customer)
    db.add(ChatHistory(organization_id=org.id, customer_id=customer.id, message="hi",
                       message_type="user", session_id=uuid4()))
    db.commit()


def test_new_org_starts_at_create(db, test_organization):
    progress = get_progress(db, test_organization)
    assert (progress.step, progress.agent_id, progress.widget_id) == (SetupStep.CREATE, None, None)


def test_walks_create_teach_test_launch_live(db, test_organization, test_widget):
    assert step(db, test_organization) is SetupStep.TEACH
    progress = get_progress(db, test_organization)
    assert progress.agent_id == str(test_widget.agent_id)
    assert progress.widget_id == test_widget.id

    db.add(KnowledgeQueue(organization_id=test_organization.id, source_type="website",
                          source="https://test.com", status=QueueStatus.PENDING.value))
    db.commit()
    assert step(db, test_organization) is SetupStep.TEST

    add_chat(db, test_organization)
    assert step(db, test_organization) is SetupStep.LAUNCH

    test_widget.installed_at = datetime.now(timezone.utc)
    test_widget.installed_origin = "https://test.com"
    db.commit()
    assert step(db, test_organization) is SetupStep.LIVE


def test_failed_crawl_does_not_count_as_knowledge(db, test_organization, test_agent):
    db.add(KnowledgeQueue(organization_id=test_organization.id, source_type="website",
                          source="https://nope.invalid", status=QueueStatus.FAILED.value))
    db.commit()
    assert step(db, test_organization) is SetupStep.TEACH


def test_indexed_knowledge_counts(db, test_organization, test_agent):
    db.add(Knowledge(organization_id=test_organization.id, source="https://test.com",
                     source_type=SourceType.WEBSITE, table_name="d_test"))
    db.commit()
    assert step(db, test_organization) is SetupStep.TEST


def test_a_connected_channel_is_live(db, test_organization, test_agent):
    db.add(KnowledgeQueue(organization_id=test_organization.id, source_type="website",
                          source="https://test.com", status=QueueStatus.COMPLETED.value))
    add_chat(db, test_organization)
    db.add(ChannelAccount(organization_id=test_organization.id, channel_type="telegram",
                          external_account_id="123", encrypted_credentials="x", webhook_secret="s"))
    db.commit()
    assert step(db, test_organization) is SetupStep.LIVE


def test_hide_is_kept_with_other_settings(db, test_organization):
    test_organization.settings = {"promo_code": "FIRSTYEAR50"}
    db.commit()
    hide(db, test_organization)
    db.refresh(test_organization)
    assert get_progress(db, test_organization).hidden is True
    assert test_organization.settings["promo_code"] == "FIRSTYEAR50"


def test_a_real_visitor_chat_is_live(db, test_organization, test_agent):
    """Orgs live before install detection existed have no installed_at yet."""
    db.add(KnowledgeQueue(organization_id=test_organization.id, source_type="website",
                          source="https://test.com", status=QueueStatus.COMPLETED.value))
    add_chat(db, test_organization)  # the wizard's test chat: not live
    assert step(db, test_organization) is SetupStep.LAUNCH
    add_chat(db, test_organization, email="1791639646437@noemail.com")  # a site visitor
    assert step(db, test_organization) is SetupStep.LIVE


def test_live_without_knowledge_is_live(db, test_organization, test_agent):
    """A human-only or channel-only org may never add knowledge: once it is
    live it must not be sent back to Teach."""
    db.add(ChannelAccount(organization_id=test_organization.id, channel_type="telegram",
                          external_account_id="123", encrypted_credentials="x", webhook_secret="s"))
    db.commit()
    assert step(db, test_organization) is SetupStep.LIVE
