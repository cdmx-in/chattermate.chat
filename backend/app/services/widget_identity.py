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

What a widget conversation token may do to the customer it names.

A widget visitor can be bound to a customer by an email they only typed, so the
token naming a customer is not proof of being them. Conversations are already
fenced by the token's scope (see conversation_token.conversation_scope); this
module fences the customer row itself - its contact details, merges, and whether
an unverified token may stand for a person the embedding app has signed in.
"""

from sqlalchemy.orm import Session

from app.repositories.customer import CustomerRepository
from app.repositories.session_to_agent import SessionToAgentRepository
from app.services.conversation_token import (
    LEGACY_SCOPE_PREFIX,
    VERIFIED_SCOPE,
    scope_for_session_key,
)


def can_act_as(db: Session, customer, scope: str) -> bool:
    """True when a token with `scope` may change `customer` as if it were them.

    A verified token always may. An unverified one only for a customer its own
    scope created - "no conversations elsewhere" is not ownership: a customer
    made by a ticket or an import has none - and only while every conversation
    of that customer is still its own.
    """
    if customer is None or not scope:
        return False
    if scope == VERIFIED_SCOPE:
        return True
    if customer.is_authenticated or not _created_by(customer, scope):
        return False
    return not SessionToAgentRepository(db).customer_has_sessions_outside_scope(customer.id, scope)


def _created_by(customer, scope: str) -> bool:
    if customer.conversation_key:
        return customer.conversation_key == scope
    # Customers from before conversation keys: the anonymous row a legacy
    # widget token created for itself is the only kind such a token can own.
    return scope.startswith(LEGACY_SCOPE_PREFIX) and CustomerRepository.is_placeholder_email(customer.email)


def may_stand_for(customer, scope: str) -> bool:
    """True when an unverified token may keep naming `customer` at all.

    Once the embedding app has signed a person in, only a token it vouched for
    may name them - otherwise whoever claimed the address first would keep a
    token for the signed-in user's row.
    """
    if customer is None or not scope:
        return False
    return scope == VERIFIED_SCOPE or not customer.is_authenticated


def trusts_identity_in_session(db: Session, customer, session_id) -> bool:
    """True when the visitor in `session_id` may be told what we know of `customer`.

    Reciting a stored name or email back is how a visitor who only typed someone
    else's address would learn who they are. Unknown session: tell nothing.
    """
    conversation = SessionToAgentRepository(db).get_session(session_id) if session_id else None
    if conversation is None:
        return False
    return can_act_as(db, customer, scope_for_session_key(conversation.conversation_key))
