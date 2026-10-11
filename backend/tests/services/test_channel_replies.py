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
"""

from uuid import uuid4

from app.channels.base import (
    InboundMessage, InteractiveReply, InteractiveReplyType, SharedLocation,
)
from app.channels.interactive import from_options
from app.channels.sent_choices import SENT_CHOICES_ATTRIBUTE, encode_sent_choices
from app.models.organization import Organization
from app.repositories.chat import ChatRepository
from app.services.channel_replies import inbound_attributes, reply_text

LONG_OPTION = "Reschedule to next Saturday morning"


def _tap(reply_id: str, title: str, reply_to: str = "wamid.OFFER") -> InboundMessage:
    return InboundMessage(
        external_account_id="PN123", external_conversation_id="447",
        external_user_id="447", external_message_id="wamid.IN", text=title,
        interactive=InteractiveReply(type=InteractiveReplyType.LIST_REPLY,
                                     id=reply_id, title=title),
        reply_to_message_id=reply_to,
    )


def _offer(db, organization_id, options, external_message_id="wamid.OFFER"):
    return ChatRepository(db).create_message({
        "message": "What now?",
        "message_type": "bot",
        "session_id": str(uuid4()),
        "organization_id": str(organization_id),
        "external_message_id": external_message_id,
        "attributes": {SENT_CHOICES_ATTRIBUTE: encode_sent_choices(
            from_options("What now?", options), as_text=False)},
    })


def test_tap_on_a_cut_option_reads_as_the_full_option(db, test_organization):
    _offer(db, test_organization.id, ["Cancel", LONG_OPTION])
    assert reply_text(db, test_organization.id, _tap("qr_1", "Reschedule to next Sat…")) == LONG_OPTION


def test_tap_on_unknown_ids_or_messages_keeps_the_title(db, test_organization):
    _offer(db, test_organization.id, ["Cancel"])
    assert reply_text(db, test_organization.id, _tap("attendance:present", "Present")) == "Present"
    assert reply_text(db, test_organization.id, _tap("qr_5", "Gone")) == "Gone"
    assert reply_text(db, test_organization.id, _tap("qr_0", "Lost", reply_to="wamid.NONE")) == "Lost"


def test_tap_never_reads_another_organizations_offer(db, test_organization):
    other = Organization(name="Other", domain="other-replies.example")
    db.add(other)
    db.commit()
    _offer(db, other.id, ["Cancel", LONG_OPTION])
    assert reply_text(db, test_organization.id, _tap("qr_1", "Reschedule…")) == "Reschedule…"


def test_plain_text_is_unchanged(db, test_organization):
    inbound = InboundMessage(external_account_id="PN", external_conversation_id="1",
                             external_user_id="1", external_message_id="m", text="hi")
    assert reply_text(db, test_organization.id, inbound) == "hi"


def test_attributes_hold_ids_only_never_customer_details():
    inbound = _tap("qr_0", "Cancel")
    inbound.location = SharedLocation(latitude=1.5, longitude=2.5, name="Home", address="1 High St")

    attributes = inbound_attributes(inbound, "whatsapp")

    assert attributes == {
        "channel": "whatsapp",
        "external_message_id": "wamid.IN",
        "interactive_reply": {"type": "list_reply", "id": "qr_0"},
        "reply_to_message_id": "wamid.OFFER",
    }
