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

Whether a user who has proven who they are may sign in this way.
"""

import builtins
import sys
import types
from uuid import UUID

import pytest

from app.core.config import settings
from app.models.user import User
from app.models.user_identity import UserIdentity
from app.services import sign_in_policy
from app.models.auth_session import AuthSession
from app.services.auth_sessions import PASSWORD_LOGIN, SIGNUP, SSO_LOGIN, issue_tokens, session_id_of
from app.services.sign_in_policy import SignInRefused, check_sign_in, password_form_primary


@pytest.fixture
def google_configured(monkeypatch):
    monkeypatch.setattr(settings, "GOOGLE_SSO_CLIENT_ID", "g")
    monkeypatch.setattr(settings, "GOOGLE_SSO_CLIENT_SECRET", "s")
    monkeypatch.setattr(settings, "MICROSOFT_SSO_CLIENT_ID", "")


def _link(db, user: User, provider: str = "google"):
    db.add(UserIdentity(user_id=user.id, provider=provider, issuer="https://accounts.google.com", subject="g-1"))
    db.commit()


def test_passwords_work_while_password_login_is_on(db, test_user, google_configured, monkeypatch):
    monkeypatch.setattr(settings, "PASSWORD_LOGIN_ENABLED", True)
    _link(db, test_user)
    check_sign_in(db, test_user, PASSWORD_LOGIN)


def test_sso_only_refuses_the_password_of_someone_who_signs_in_with_sso(db, test_user, google_configured, monkeypatch):
    monkeypatch.setattr(settings, "PASSWORD_LOGIN_ENABLED", False)
    _link(db, test_user)
    with pytest.raises(SignInRefused):
        check_sign_in(db, test_user, PASSWORD_LOGIN)
    check_sign_in(db, test_user, SSO_LOGIN)


def test_sso_only_never_locks_out_someone_not_linked_yet(db, test_user, google_configured, monkeypatch):
    """A provider that can't vouch for their address must not leave them with no way in."""
    monkeypatch.setattr(settings, "PASSWORD_LOGIN_ENABLED", False)
    check_sign_in(db, test_user, PASSWORD_LOGIN)


def test_a_link_to_a_provider_no_longer_configured_does_not_count(db, test_user, google_configured, monkeypatch):
    monkeypatch.setattr(settings, "PASSWORD_LOGIN_ENABLED", False)
    _link(db, test_user, provider="microsoft")
    check_sign_in(db, test_user, PASSWORD_LOGIN)


def test_the_login_page_leads_with_sso_only_when_both_are_set(google_configured, monkeypatch):
    monkeypatch.setattr(settings, "PASSWORD_LOGIN_ENABLED", False)
    assert password_form_primary() is False
    monkeypatch.setattr(settings, "GOOGLE_SSO_CLIENT_ID", "")
    assert password_form_primary() is True


def test_an_installed_enterprise_policy_has_the_last_word(db, test_user, monkeypatch):
    calls = []

    def enterprise(db_, user, method, identity):
        calls.append((user.id, method, identity))
        raise SignInRefused("This organization signs in with SSO only.")

    monkeypatch.setattr(sign_in_policy, "_enterprise_rules", lambda: enterprise)
    with pytest.raises(SignInRefused, match="SSO only"):
        check_sign_in(db, test_user, PASSWORD_LOGIN)
    assert calls == [(test_user.id, PASSWORD_LOGIN, None)]


def test_the_community_edition_has_no_enterprise_policy(monkeypatch):
    monkeypatch.setattr(sign_in_policy, "_enterprise_loaded", False)
    monkeypatch.setattr(sign_in_policy, "_enterprise_check", None)
    assert sign_in_policy._enterprise_rules() is None


@pytest.fixture
def fresh_hook(monkeypatch):
    monkeypatch.setattr(sign_in_policy, "_enterprise_loaded", False)
    monkeypatch.setattr(sign_in_policy, "_enterprise_check", None)


def _enterprise_package(monkeypatch, hook):
    """Install app.enterprise with `hook` as its sign_in_policy module (None:
    an enterprise build without one)."""
    for name in ("app.enterprise", "app.enterprise.services"):
        monkeypatch.setitem(sys.modules, name, types.ModuleType(name))
    monkeypatch.setitem(sys.modules, sign_in_policy._ENTERPRISE_HOOK, hook)


def test_an_enterprise_build_without_the_hook_has_no_policy(fresh_hook, monkeypatch):
    _enterprise_package(monkeypatch, None)
    assert sign_in_policy._enterprise_rules() is None


def test_a_hook_that_fails_to_load_refuses_every_sign_in(db, test_user, fresh_hook, monkeypatch):
    """Fail closed: a broken enterprise policy must not quietly stop enforcing."""
    _enterprise_package(monkeypatch, types.ModuleType(sign_in_policy._ENTERPRISE_HOOK))  # no check_sign_in
    with pytest.raises(SignInRefused):
        check_sign_in(db, test_user, SSO_LOGIN)


def test_a_hook_whose_own_dependency_is_missing_refuses_every_sign_in(db, test_user, fresh_hook, monkeypatch):
    _enterprise_package(monkeypatch, None)
    real_import = builtins.__import__

    def importing(name, *args, **kwargs):
        if name == sign_in_policy._ENTERPRISE_HOOK:
            raise ModuleNotFoundError("No module named 'some_sdk'", name="some_sdk")
        return real_import(name, *args, **kwargs)

    monkeypatch.setattr("builtins.__import__", importing)
    with pytest.raises(SignInRefused):
        check_sign_in(db, test_user, PASSWORD_LOGIN)


def _session(db, user, method):
    access, _ = issue_tokens(db, user.id, user.organization_id, auth_method=method)
    db.commit()
    return session_id_of(access)


def test_sso_only_ends_the_password_sessions_of_whoever_signs_in_with_sso(db, test_user, google_configured, monkeypatch):
    monkeypatch.setattr(settings, "PASSWORD_LOGIN_ENABLED", False)
    sids = {method: _session(db, test_user, method) for method in (PASSWORD_LOGIN, SIGNUP, None, SSO_LOGIN)}
    sign_in_policy.end_refused_sessions(db, test_user)
    db.commit()
    ended = {m for m, sid in sids.items() if db.get(AuthSession, UUID(sid)).revoked_at is not None}
    assert ended == {PASSWORD_LOGIN, SIGNUP, None}


def test_password_sessions_stay_while_password_login_is_on(db, test_user, google_configured, monkeypatch):
    monkeypatch.setattr(settings, "PASSWORD_LOGIN_ENABLED", True)
    sid = _session(db, test_user, PASSWORD_LOGIN)
    sign_in_policy.end_refused_sessions(db, test_user)
    db.commit()
    assert db.get(AuthSession, UUID(sid)).revoked_at is None
