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
(state and its browser cookie, account linking, avatar, shop linking,
session cookies, redirects) is real.
"""

import json
from unittest.mock import AsyncMock
from urllib.parse import parse_qs, urlparse

import httpx
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
from app.models.organization import Organization
from app.models.shopify.shopify_shop import ShopifyShop
from app.models.user import User
from app.models.user_identity import UserIdentity
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


@pytest.fixture
def microsoft_common(monkeypatch):
    """Microsoft open to every directory, the default tenant."""
    monkeypatch.setattr(settings, "GOOGLE_SSO_CLIENT_ID", "")
    monkeypatch.setattr(settings, "MICROSOFT_SSO_CLIENT_ID", "ms-client")
    monkeypatch.setattr(settings, "MICROSOFT_SSO_CLIENT_SECRET", "ms-secret")
    monkeypatch.setattr(settings, "MICROSOFT_SSO_TENANT", "common")
    monkeypatch.setattr(settings, "FRONTEND_URL", "https://app.example.test")
    monkeypatch.setattr(settings, "BACKEND_URL", "https://api.example.test")
    monkeypatch.setattr(sso_service, "discovery", AsyncMock(return_value={
        **GOOGLE_DISCOVERY, "authorization_endpoint": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    }))


SSO_OK = "https://app.example.test/login?sso=ok"


def _begin(client: TestClient, query: str = "", provider: str = "google") -> dict:
    """Start a sign-in and return the query the provider was sent (state, nonce...).
    The client keeps the state cookie, as the browser would."""
    response = client.get(f"/api/v1/sso/{provider}/start{query}", follow_redirects=False)
    assert response.status_code == 302
    return {k: v[0] for k, v in parse_qs(urlparse(response.headers["location"]).query).items()}


def _callback(client: TestClient, query: dict, provider: str = "google"):
    return client.get(f"/api/v1/sso/{provider}/callback?code=abc&state={query['state']}", follow_redirects=False)


def _provider_says(monkeypatch, claims: dict, avatar=None, tokens=None):
    monkeypatch.setattr(sso_service, "exchange_code", AsyncMock(return_value=tokens or {"id_token": "id", "access_token": "at"}))
    verify = AsyncMock(return_value=claims)
    monkeypatch.setattr(sso_service, "verify_id_token", verify)
    fetch = AsyncMock(return_value=avatar)
    monkeypatch.setattr(sso_service, "fetch_avatar", fetch)
    monkeypatch.setattr(sso_service, "store_avatar", AsyncMock(return_value="/api/v1/uploads/user/org/u/profile.png"))
    return verify, fetch


def _google_claims(email: str, sub: str = "g-1", **extra) -> dict:
    return {"iss": "https://accounts.google.com", "sub": sub, "email": email, "email_verified": True,
            "name": "Someone From SSO", "picture": "https://lh3.googleusercontent.com/a/x=s96-c", **extra}


def _query_of(response) -> dict:
    assert response.status_code == 302
    return {k: v[0] for k, v in parse_qs(urlparse(response.headers["location"]).query).items()}


def _error_of(response) -> str:
    return _query_of(response).get("sso_error", "")


def _link(db, user: User, sub: str = "g-1") -> UserIdentity:
    link = UserIdentity(user_id=user.id, provider="google", issuer="https://accounts.google.com", subject=sub, email=user.email)
    db.add(link)
    db.commit()
    return link


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
    response = client.get("/api/v1/sso/google/start", follow_redirects=False)
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
    assert stored == {"provider": "google", "nonce": query["nonce"], "carry": {}}


def test_start_binds_the_state_to_this_browser(client: TestClient, google_only):
    response = client.get("/api/v1/sso/google/start", follow_redirects=False)
    query = _query_of(response)
    header = response.headers["set-cookie"]
    assert f"sso_state={query['state']}" in header
    for attribute in ("HttpOnly", "Secure", "SameSite=lax", "Path=/api/v1/sso", "Max-Age=600"):
        assert attribute.lower() in header.lower()


def test_start_carries_only_the_login_page_parameters(client: TestClient, google_only):
    query = _begin(client, "?redirect=%2Fconversations&shopify_flow=1&shop_id=7&shop=s.myshopify.com"
                           "&host=aG9zdA&embedded=true&sso_error=x&evil=1&return_to=" + "h" * 3000)
    carried = json.loads(oauth_state.pop_state("sso", query["state"]))["carry"]
    # Unknown parameters and an oversized one stay behind.
    assert carried == {"redirect": "/conversations", "shopify_flow": "1", "shop_id": "7", "shop": "s.myshopify.com",
                       "host": "aG9zdA", "embedded": "true"}


@pytest.mark.parametrize("provider", ["microsoft", "okta"])
def test_start_is_404_for_an_unconfigured_or_unknown_provider(client: TestClient, google_only, provider):
    assert client.get(f"/api/v1/sso/{provider}/start", follow_redirects=False).status_code == 404


@pytest.mark.parametrize("failure", [httpx.ConnectError("down"), sso_service.SsoError("provider_error", "no authorization_endpoint")])
def test_start_returns_to_the_login_page_when_the_provider_is_unreachable(client: TestClient, google_only, monkeypatch, failure):
    monkeypatch.setattr(sso_service, "discovery", AsyncMock(side_effect=failure))
    response = client.get("/api/v1/sso/google/start?shop_id=7", follow_redirects=False)
    assert response.headers["location"] == "https://app.example.test/login?sso_error=provider_error&shop_id=7"
    assert "sso_state" not in response.cookies


# --- callback ------------------------------------------------------------------

def test_callback_links_and_signs_in_an_existing_user(client: TestClient, db, test_user: User, google_only, monkeypatch):
    query = _begin(client)
    # Case must not matter: the provider's spelling of the address is theirs.
    verify, _ = _provider_says(monkeypatch, _google_claims(test_user.email.upper()), avatar=(b"\x89PNG", "image/png"))

    response = _callback(client, query)

    assert response.headers["location"] == SSO_OK
    for cookie in ("access_token", "refresh_token", "user_info"):
        assert cookie in response.cookies
    # The state cookie is spent with the state.
    assert 'sso_state=""' in response.headers["set-cookie"] or "sso_state=;" in response.headers["set-cookie"]
    # The nonce issued at start is what the ID token had to echo.
    assert verify.call_args.args[2] == query["nonce"]
    link = db.query(UserIdentity).one()
    assert (link.user_id, link.provider, link.issuer, link.subject) == (test_user.id, "google", "https://accounts.google.com", "g-1")
    assert link.email == test_user.email.lower()
    db.refresh(test_user)
    assert test_user.profile_pic == "/api/v1/uploads/user/org/u/profile.png"
    assert test_user.is_online is True
    assert db.query(AuthSession).filter(AuthSession.user_id == test_user.id).count() == 1

    # The dashboard then picks the user up from the cookies it was just given.
    me = client.get("/api/v1/sso/session")
    assert me.status_code == 200
    assert me.json()["email"] == test_user.email

    # A state is redeemed once; replaying the callback gets nothing.
    assert _error_of(_callback(client, query)) == "invalid_state"


def test_callback_hands_the_login_page_parameters_back(client: TestClient, test_user: User, google_only, monkeypatch):
    query = _begin(client, "?redirect=%2Fconversations&shopify_flow=1")
    _provider_says(monkeypatch, _google_claims(test_user.email))
    assert _query_of(_callback(client, query)) == {"sso": "ok", "redirect": "/conversations", "shopify_flow": "1"}


def test_callback_refuses_a_link_started_in_another_browser(client: TestClient, test_user: User, google_only, monkeypatch):
    """Login CSRF: someone else's callback link must not sign this browser in."""
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims(test_user.email))
    client.cookies.clear()
    response = _callback(client, query)
    assert _error_of(response) == "invalid_state"
    assert "access_token" not in response.cookies


def test_callback_refuses_a_state_cookie_from_another_sign_in(client: TestClient, test_user: User, google_only, monkeypatch):
    first = _begin(client)
    _begin(client)  # this browser's cookie now holds the second state
    _provider_says(monkeypatch, _google_claims(test_user.email))
    assert _error_of(_callback(client, first)) == "invalid_state"


def test_linked_account_signs_in_whatever_address_it_now_carries(client: TestClient, db, test_user: User, google_only, monkeypatch):
    _link(db, test_user)
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims("renamed@elsewhere.test", email_verified=False))
    response = _callback(client, query)
    assert response.headers["location"] == SSO_OK
    assert db.query(UserIdentity).one().last_login_at is not None


def test_linked_account_of_a_deactivated_user_is_turned_away(client: TestClient, db, test_user: User, google_only, monkeypatch):
    _link(db, test_user)
    test_user.is_active = False
    db.commit()
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims(test_user.email))
    assert _error_of(_callback(client, query)) == "no_account"


def test_callback_keeps_a_picture_the_user_uploaded(client: TestClient, db, test_user: User, google_only, monkeypatch):
    test_user.profile_pic = "/api/v1/uploads/user/kept.png"
    db.commit()
    query = _begin(client)
    _, fetch = _provider_says(monkeypatch, _google_claims(test_user.email), avatar=(b"\x89PNG", "image/png"))
    assert _callback(client, query).headers["location"] == SSO_OK
    fetch.assert_not_awaited()
    db.refresh(test_user)
    assert test_user.profile_pic == "/api/v1/uploads/user/kept.png"


def test_callback_keeps_signing_in_when_there_is_no_photo(client: TestClient, db, test_user: User, google_only, monkeypatch):
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims(test_user.email), avatar=None)
    assert _callback(client, query).headers["location"] == SSO_OK
    db.refresh(test_user)
    assert test_user.profile_pic is None


def test_callback_links_the_shopify_store_the_sign_in_started_from(client: TestClient, db, test_user: User, google_only, monkeypatch):
    other = Organization(name="Other", domain="other.example", timezone="UTC")
    db.add(other)
    db.flush()
    unclaimed = ShopifyShop(shop_domain="new.myshopify.com", is_installed=True)
    theirs = ShopifyShop(shop_domain="theirs.myshopify.com", is_installed=True, organization_id=other.id)
    db.add_all([unclaimed, theirs])
    db.commit()
    _provider_says(monkeypatch, _google_claims(test_user.email))

    for shop in (unclaimed, theirs):
        query = _begin(client, f"?shopify_flow=1&shop_id={shop.id}")
        assert _query_of(_callback(client, query))["sso"] == "ok"

    db.refresh(unclaimed)
    db.refresh(theirs)
    assert unclaimed.organization_id == test_user.organization_id
    assert theirs.organization_id == other.id


def test_callback_turns_away_an_address_without_an_account(client: TestClient, google_only, monkeypatch):
    query = _begin(client, "?shop_id=7")
    _provider_says(monkeypatch, _google_claims("nobody@example.test"))
    response = _callback(client, query)
    assert _query_of(response) == {"sso_error": "no_account", "shop_id": "7"}
    assert "access_token" not in response.cookies


def test_callback_turns_away_a_deactivated_user(client: TestClient, db, test_user: User, google_only, monkeypatch):
    test_user.is_active = False
    db.commit()
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims(test_user.email))
    assert _error_of(_callback(client, query)) == "no_account"


def test_callback_refuses_an_address_two_users_share_in_different_case(client: TestClient, db, test_user: User, google_only, monkeypatch):
    db.add(User(organization_id=test_user.organization_id, email=test_user.email.upper(), full_name="Twin",
                hashed_password="x", is_active=True, role_id=test_user.role_id))
    db.commit()
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims(test_user.email))
    assert _error_of(_callback(client, query)) == "ambiguous_account"
    assert db.query(UserIdentity).count() == 0


def test_callback_requires_google_to_have_verified_the_address(client: TestClient, db, test_user: User, google_only, monkeypatch):
    query = _begin(client)
    _provider_says(monkeypatch, _google_claims(test_user.email, email_verified=False))
    assert _error_of(_callback(client, query)) == "email_unverified"
    assert db.query(UserIdentity).count() == 0


def test_microsoft_directory_address_cannot_link_an_account(client: TestClient, db, test_user: User, microsoft_common, monkeypatch):
    """nOAuth: any tenant's admin can give a user someone else's address."""
    query = _begin(client, provider="microsoft")
    _provider_says(monkeypatch, {"iss": "https://login.microsoftonline.com/attacker/v2.0", "tid": "attacker",
                                 "sub": "ms-1", "email": test_user.email})
    response = _callback(client, query, provider="microsoft")
    assert _error_of(response) == "email_unverified"
    assert "access_token" not in response.cookies
    assert db.query(UserIdentity).count() == 0


def test_microsoft_verified_domain_links_an_account(client: TestClient, db, test_user: User, microsoft_common, monkeypatch):
    query = _begin(client, provider="microsoft")
    _provider_says(monkeypatch, {"iss": "https://login.microsoftonline.com/acme/v2.0", "tid": "acme",
                                 "sub": "ms-1", "email": test_user.email, "xms_edov": True})
    assert _callback(client, query, provider="microsoft").headers["location"] == SSO_OK
    assert db.query(UserIdentity).one().provider == "microsoft"


def test_callback_reports_a_bad_token_without_detail(client: TestClient, google_only, monkeypatch):
    query = _begin(client)
    monkeypatch.setattr(sso_service, "exchange_code", AsyncMock(return_value={"id_token": "forged"}))
    monkeypatch.setattr(sso_service, "verify_id_token", AsyncMock(side_effect=sso_service.SsoError("invalid_token", "signature")))
    response = _callback(client, query)
    assert _error_of(response) == "invalid_token"
    assert "signature" not in response.headers["location"]


def test_callback_reports_an_unreachable_provider(client: TestClient, google_only, monkeypatch):
    query = _begin(client, "?redirect=%2Fx")
    monkeypatch.setattr(sso_service, "exchange_code", AsyncMock(side_effect=httpx.ConnectError("down")))
    assert _query_of(_callback(client, query)) == {"sso_error": "provider_error", "redirect": "/x"}


def test_callback_without_a_code_is_a_provider_error(client: TestClient, google_only):
    query = _begin(client)
    response = client.get(f"/api/v1/sso/google/callback?error=access_denied&state={query['state']}", follow_redirects=False)
    assert _error_of(response) == "provider_error"


def test_callback_with_an_unknown_state_is_rejected(client: TestClient, google_only):
    response = client.get("/api/v1/sso/google/callback?code=abc&state=made-up", follow_redirects=False)
    assert _error_of(response) == "invalid_state"


def test_session_needs_a_signed_in_user(client: TestClient, google_only):
    assert client.get("/api/v1/sso/session").status_code == 401
