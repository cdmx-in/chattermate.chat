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

Which dashboard user a single sign-on account signs in as.

An account already linked (app.models.user_identity) signs in as its user,
whatever address it now carries. An unlinked account is linked once, by an
e-mail address the provider vouches for, to the one active user with that
address. SSO never creates users.
"""

from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.models.user import User
from app.models.user_identity import UserIdentity
from app.services.sso import SsoError, SsoIdentity

logger = get_logger(__name__)


def _linked(db: Session, provider_key: str, identity: SsoIdentity):
    return db.query(UserIdentity).filter(
        UserIdentity.provider == provider_key,
        UserIdentity.issuer == identity.issuer,
        UserIdentity.subject == identity.subject,
    ).first()


def _user_by_email(db: Session, email: str) -> User:
    """The one active user with this address. Addresses are unique only as
    typed, so two that differ in case are a conflict, not a coin toss."""
    matches = db.query(User).filter(
        func.lower(User.email) == email, User.is_active == True  # noqa: E712
    ).limit(2).all()
    if not matches:
        raise SsoError("no_account", "no active user has the address")
    if len(matches) > 1:
        raise SsoError("ambiguous_account", "several users share the address in different case")
    return matches[0]


def _link(db: Session, provider_key: str, identity: SsoIdentity) -> User:
    if not identity.email_trusted:
        raise SsoError("email_unverified", f"{provider_key} does not vouch for the address of an unlinked account")
    user = _user_by_email(db, identity.email)
    try:
        with db.begin_nested():
            db.add(UserIdentity(
                user_id=user.id,
                provider=provider_key,
                issuer=identity.issuer,
                subject=identity.subject,
                email=identity.email,
                last_login_at=func.now(),
            ))
    except IntegrityError:
        # A parallel first sign-in of the same account linked it first.
        link = _linked(db, provider_key, identity)
        if link is None:
            raise
        return _signed_in(link)
    logger.info(f"SSO {provider_key} account linked to user {user.id}")
    return user


def _signed_in(link: UserIdentity) -> User:
    user = link.user
    if user is None or not user.is_active:
        raise SsoError("no_account", "the linked user is no longer active")
    link.last_login_at = func.now()
    return user


def user_for_identity(db: Session, provider_key: str, identity: SsoIdentity) -> User:
    """The active user this account signs in as, linking it on first use.
    Raises SsoError when there is none; the caller commits."""
    link = _linked(db, provider_key, identity)
    if link is not None:
        return _signed_in(link)
    return _link(db, provider_key, identity)
