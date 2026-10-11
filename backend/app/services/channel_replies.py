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

What a channel customer's message carries beyond its text — a tapped
button, a shared location — and how a tap on one of the agent's own choices
reads back as the full option.
"""

from typing import Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.channels.base import InboundMessage
from app.channels.sent_choices import (
    SENT_CHOICES_ATTRIBUTE, decode_sent_choices, sent_choice_text,
)
from app.repositories.chat import ChatRepository

# chat_history.attributes key for a tap: only its type and id. The visible
# text is already the (encrypted) message, and a shared location's details
# live there too — nothing customer-identifying goes in plaintext attributes.
REPLY_ATTRIBUTE = "interactive_reply"


def inbound_attributes(inbound: InboundMessage, channel_type: str) -> dict:
    """The chat_history attributes for a customer's channel message."""
    attributes = {
        "channel": channel_type,
        "external_message_id": inbound.external_message_id,
    }
    if inbound.interactive is not None:
        attributes[REPLY_ATTRIBUTE] = {
            "type": inbound.interactive.type.value,
            "id": inbound.interactive.id,
        }
    if inbound.reply_to_message_id:
        attributes["reply_to_message_id"] = inbound.reply_to_message_id
    return attributes


def reply_text(db: Session, organization_id: UUID, inbound: InboundMessage) -> str:
    """The text to store and answer for this message.

    A tap arrives as the button's title, which may have been cut to fit; the
    full choice is in the record of what the offering message sent, found
    through the reply context.
    """
    choice = _tapped_choice(db, organization_id, inbound)
    return choice if choice is not None else (inbound.text or "")


def _tapped_choice(db: Session, organization_id: UUID, inbound: InboundMessage) -> Optional[str]:
    if inbound.interactive is None or not inbound.reply_to_message_id:
        return None
    offered = ChatRepository(db).get_by_external_message_id(
        organization_id, inbound.reply_to_message_id)
    if offered is None:
        return None
    record = decode_sent_choices((offered.attributes or {}).get(SENT_CHOICES_ATTRIBUTE))
    return sent_choice_text(record, inbound.interactive.id)
