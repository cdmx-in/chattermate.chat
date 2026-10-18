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

The SSO endpoints end to end, with the provider itself replaced: the code
exchange and ID-token verification are stubbed, everything on our side
(state, user lookup, avatar sync, session cookies, redirects) is real.
"""

import json
from unittest.mock import AsyncMock
from urllib.parse import parse_qs, urlparse

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.core import oauth_state
from app.core.config import settings
from app.api.sso import router as sso_router
from app.database import get_db

# The SSO router on its own, like the other API test modules do: app.main's
# `app` is the socket.io wrapper, which has no dependency_overrides.
app = FastAPI()
app.include_router(sso_router, prefix="/api/v1/sso")
from app.models.auth_session import AuthSession
from app.models.user import User
from app.services import sso as sso_service

GOOGLE_DISCOVERY = {
    "issuer": "https://accounts.google.com",
    "authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth",
    "token_endpoint": "https://oauth2.googleapis.com/token",
    "jwks_uri": "https://www.googleapis.com/oauth2/v3/certs",
}


@pytest.fixture
def client(db) -> TestClient:
    """A client on the test database with the REAL cookie authentication, so
    /sso/session is exercised the way the dashboard reaches it. https, because
    the session cookies are Secure and would otherwise not be sent back."""
    def override_get_db():
        yield db
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app, base_url="https://testserver") as test_client:
        yield test_client
    app.dependency_overrides.pop(get_db, None)


@pytest.fixture
def google_only(monkeypatch):
    monkeypatch.setattr(settings, "GOOGLE_SSO_CLIENT_ID", "google-client")
    monkeypatch.setattr(settings, "GOOGLE_SSO_CLIENT_SECRET", "google-secret")
    monkeypatch.setattr(settings, "MICROSOFT_SSO_CLIENT_ID", "")
    monkeypatch.setattr(settings, "MICROSOFT_SSO_CLIENT_SECRET", "")
    monkeypatch.setattr(settings, "FRONTEND_URL", "https://app.example.test")
    monkeypatch.setattr(settings, "BACKEND_URL", "https://api.example.test")
    monkeypatch.setattr(sso_service, "discovery", AsyncMock(return_value=GOOGLE_DISCOVERY))
    sso_service.clear_caches()
    yield
    sso_service.clear_caches()


def _begin(client: TestClient, next_path: str = "/") -> dict:
    """Start a sign-in and return the query the provider was sent (state, nonce...)."""
    response = client.get(f"/api/v1/sso/google/start?next={next_path}", follow_redirects=False)
    assert response.status_code == 302
    return {k: v[0] for k, v in parse_qs(urlparse(response.headers["location"]).query).items()}


def _provider_says(monkeypatch, claims: dict, avatar=None, tokens=None):
    monkeypatch.setattr(sso_service, "exchange_code", AsyncMock(return_value=tokens or {"id_token": "id", "access_token": "at"}))
    verify = AsyncMock(return_value=claims)
    monkeypatch.setattr(sso_service, "verify_id_token", verify)
    monkeypatch.setattr(sso_service, "fetch_avatar", AsyncMock(return_value=avatar))
    monkeypatch.setattr(sso_service, "store_avatar", AsyncMock(return_value="/api/v1/uploads/user/org/u/profile.png"))
    return verify


def _google_claims(email: str, **extra) -> dict:
    return {"iss": "https://accounts.google.com", "sub": "g-1", "email": email, "email_verified": True,
            "name": "Someone From SSO", "picture": "https://lh3.googleusercontent.com/a/x=s96-c", **extra}


def _error_of(response) -> str:
    assert response.status_code == 302
    return parse_qs(urlparse(response.headers["location"]).query).get("sso_error", [""])[0]


# --- config --------------------------------------------------------------------

def _no_providers(monkeypatch):
    for name in ("GOOGLE_SSO_CLIENT_ID", "GOOGLE_SSO_CLIENT_SECRET", "MICROSOFT_SSO_CLIENT_ID", "MICROSOFT_SSO_CLIENT_SECRET"):
        monkeypatch.setattr(settings, name, "")


def test_config_lists_only_what_is_configured(client: TestClient, google_only):
    assert client.get("/api/v1/sso/config").json() == {
        "providers": [{"key": "google", "label": "Google"}],
        "password_login": True,
    }


def test_config_is_empty_without_configuration(client: TestClient, monkeypatch):
    _no_providers(monkeypatch)
    assert client.get("/api/v1/sso/config").json() == {"providers": [], "password_login": True}


def test_password_login_can_be_switched_off_once_a_provider_exists(client: TestClient, google_only, monkeypatch):
    monkeypatch.setattr(settings, "PASSWORD_LOGIN_ENABLED", False)
    assert client.get("/api/v1/sso/config").json()["password_login"] is False


def test_password_login_stays_on_without_a_provider(client: TestClient, monkeypatch):
    """The switch must never lock everyone out."""
    _no_providers(monkeypatch)
    monkeypatch.setattr(settings, "PASSWORD_LOGIN_ENABLED", False)
    assert client.get("/api/v1/sso/config").json()["password_login"] is True


# --- start ---------------------------------------------------------------------

def test_start_sends_the_browser_to_the_provider_with_a_one_time_state(client: TestClient, google_only):
    response = client.get("/api/v1/sso/google/start?next=/conversations", follow_redirects=False)
    assert response.status_code == 302
    location = response.headers["location"]
    assert location.startswith(GOOGLE_DISCOVERY["authorization_endpoint"] + "?")
    query = {k: v[0] for k, v in parse_qs(urlparse(location).query).items()}
    assert query["client_id"] == "google-client"
    assert query["redirect_uri"] == "https://api.example.test/api/v1/sso/google/callback"
    assert query["response_type"] == "code"
    assert query["scope"] == "openid email profile"
    assert query["prompt"] == "select_account"
    stored = json.loads(oauth_state.pop_state("sso", query["state"]))
    assert stored == {"provider": "google", "nonce": query["nonce"], "next": "/conversations"}


@pytest.mark.parametrize("next_path", ["https://evil.example/", "//evil.example/x", "/ok\\evil"])
def test_start_only_keeps_a_dashboard_path_as_destination(client: TestClient, google_only, next_path):
    query = _begin(client, next_path)
    assert json.loads(oauth_state.pop_state("sso", query["state"]))["next"] == "/"


@pytest.mark.parametrize("provider", ["microsoft", "okta"])
def test_start_is_404_for_an_unconfigured_or_unknown_provider(client: TestClient, google_only, provider):
    assert client.get(f"/api/v1/sso/{provider}/start", follow_redirects=False).status_code == 404


# --- callback ------------------------------------------------------------------

def test_callback_signs_in_an_existing_user_and_syncs_the_avatar(client: TestClient, db, test_user: User, google_only, monkeypatch):
    query = _begin(client, "/conversations")
    # Case must not matter: the provider's spelling of the address is theirs.
    verify = _provider_says(monkeypatch, _google_claims(test_user.email.upper()), avatar=(b"\x89PNG", "image/png"))

    response = client.get(f"/api/v1/sso/google/callback?code=abc&state={query['state']}", follow_redirects=False)

    assert response.status_code == 302
    assert response.headers["location"] == "https://app.example.test/login?sso=ok&next=%2Fconversations"
    for cookie in ("access_token", "refresh_token", "user_info"):
        assert cookie in response.cookies
    # The nonce issued at start is what the ID token had to echo.
    assert verify.call_args.args[2] == query["nonce"]
    db.refresh(test_user)
    assert test_user.profile_pic == "/api/v1/uploads/user/org/u/profile.png"
    assert test_user.is_online is True
    assert db.query(AuthSession).filter(AuthSession.user_id == test_user.id).count() == 1

    # The dashboard then picks the user up from the cookies it was just given.
    me = client.get("/api/v1/sso/session")
    assert me.status_code == 200
    assert me.json()["email"] == test_user.email

    # A state is redeemed once; replaying the callback gets nothing.
    replay = client.get(f"/api/v1/sso/google/callback?code=abc&state={query['state']}", follow_redirects=False)
    assert _error_of(replay) == "invalid_state"


def test_callback_keeps_signing_in_when_there_is_no_photo(client: TestClient, db, test_user: User, google_only, monkeypatch):
    test_user.profile_pic = "/api/v1/uploads/user/kept.png"
    db.commit()
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims(test_user.email), avatar=None)
    response = client.get(f"/api/v1/sso/google/callback?code=abc&state={query['state']}", follow_redirects=False)
    assert response.headers["location"].endswith("login?sso=ok&next=%2F")
    db.refresh(test_user)
    assert test_user.profile_pic == "/api/v1/uploads/user/kept.png"


def test_callback_turns_away_an_address_without_an_account(client: TestClient, google_only, monkeypatch):
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims("nobody@example.test"))
    response = client.get(f"/api/v1/sso/google/callback?code=abc&state={query['state']}", follow_redirects=False)
    assert _error_of(response) == "no_account"
    assert "access_token" not in response.cookies


def test_callback_turns_away_a_deactivated_user(client: TestClient, db, test_user: User, google_only, monkeypatch):
    test_user.is_active = False
    db.commit()
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims(test_user.email))
    response = client.get(f"/api/v1/sso/google/callback?code=abc&state={query['state']}", follow_redirects=False)
    assert _error_of(response) == "no_account"


def test_callback_requires_google_to_have_verified_the_address(client: TestClient, test_user: User, google_only, monkeypatch):
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims(test_user.email, email_verified=False))
    response = client.get(f"/api/v1/sso/google/callback?code=abc&state={query['state']}", follow_redirects=False)
    assert _error_of(response) == "email_unverified"


def test_callback_reports_a_bad_token_without_detail(client: TestClient, google_only, monkeypatch):
    query = _begin(client)
    monkeypatch.setattr(sso_service, "exchange_code", AsyncMock(return_value={"id_token": "forged"}))
    monkeypatch.setattr(sso_service, "verify_id_token", AsyncMock(side_effect=sso_service.SsoError("invalid_token", "signature")))
    response = client.get(f"/api/v1/sso/google/callback?code=abc&state={query['state']}", follow_redirects=False)
    assert _error_of(response) == "invalid_token"
    assert "signature" not in response.headers["location"]


def test_callback_without_a_code_is_a_provider_error(client: TestClient, google_only):
    query = _begin(client)
    response = client.get(f"/api/v1/sso/google/callback?error=access_denied&state={query['state']}", follow_redirects=False)
    assert _error_of(response) == "provider_error"


def test_callback_with_an_unknown_state_is_rejected(client: TestClient, google_only):
    response = client.get("/api/v1/sso/google/callback?code=abc&state=made-up", follow_redirects=False)
    assert _error_of(response) == "invalid_state"


def test_session_needs_a_signed_in_user(client: TestClient, google_only):
    assert client.get("/api/v1/sso/session").status_code == 401
