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

Which user an SSO account signs in as. The callback-level cases live in
tests/api/test_sso.py; these are the linking rules on their own.
"""

import pytest

from app.models.user import User
from app.models.user_identity import UserIdentity
from app.services import sso_accounts
from app.services.sso import SsoError, SsoIdentity

ISSUER = "https://accounts.google.com"


def _identity(email: str, subject: str = "g-1", trusted: bool = True) -> SsoIdentity:
    return SsoIdentity(issuer=ISSUER, subject=subject, email=email, email_trusted=trusted, name="")


def test_first_sign_in_links_the_account(db, test_user: User):
    user = sso_accounts.user_for_identity(db, "google", _identity(test_user.email))
    db.commit()
    assert user.id == test_user.id
    link = db.query(UserIdentity).one()
    assert (link.provider, link.issuer, link.subject, link.user_id) == ("google", ISSUER, "g-1", test_user.id)


def test_the_same_subject_from_another_issuer_is_another_account(db, test_user: User):
    db.add(UserIdentity(user_id=test_user.id, provider="microsoft", issuer="https://login.microsoftonline.com/a/v2.0",
                        subject="s", email=test_user.email))
    db.commit()
    with pytest.raises(SsoError) as err:
        sso_accounts.user_for_identity(db, "microsoft", SsoIdentity(
            issuer="https://login.microsoftonline.com/b/v2.0", subject="s", email=test_user.email,
            email_trusted=False, name=""))
    assert err.value.code == "email_unverified"


def test_a_user_may_link_several_accounts(db, test_user: User):
    for subject in ("g-1", "g-2"):
        assert sso_accounts.user_for_identity(db, "google", _identity(test_user.email, subject)).id == test_user.id
    db.commit()
    assert db.query(UserIdentity).count() == 2


def test_a_parallel_first_sign_in_reuses_the_link_it_lost_to(db, test_user: User, monkeypatch):
    """Two tabs finishing the first sign-in at once: the loser's insert hits the
    unique constraint and it signs in through the winner's link."""
    db.add(UserIdentity(user_id=test_user.id, provider="google", issuer=ISSUER, subject="g-1", email=test_user.email))
    db.commit()
    # Pretend the lookup ran before the winner committed.
    real_linked = sso_accounts._linked
    calls = []

    def racing_lookup(*args):
        calls.append(1)
        return None if len(calls) == 1 else real_linked(*args)

    monkeypatch.setattr(sso_accounts, "_linked", racing_lookup)
    user = sso_accounts.user_for_identity(db, "google", _identity(test_user.email))
    db.commit()
    assert user.id == test_user.id
    assert db.query(UserIdentity).count() == 1
