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

The parts of SSO that talk to a provider, exercised against real signatures
and an in-memory HTTP transport.
"""

import time
from unittest.mock import AsyncMock

import httpx
import pytest
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from jose import jwk, jwt

from app.core.config import settings
from app.services import sso


@pytest.fixture
def both_providers(monkeypatch):
    monkeypatch.setattr(settings, "GOOGLE_SSO_CLIENT_ID", "google-client")
    monkeypatch.setattr(settings, "GOOGLE_SSO_CLIENT_SECRET", "google-secret")
    monkeypatch.setattr(settings, "MICROSOFT_SSO_CLIENT_ID", "ms-client")
    monkeypatch.setattr(settings, "MICROSOFT_SSO_CLIENT_SECRET", "ms-secret")
    monkeypatch.setattr(settings, "MICROSOFT_SSO_TENANT", "common")
    sso.clear_caches()
    yield
    sso.clear_caches()


@pytest.fixture(scope="module")
def signing_key():
    """An RSA key pair as a provider would publish it: the private PEM signs,
    the public JWK (with a kid) is what the JWKS endpoint serves."""
    private = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    private_pem = private.private_bytes(
        serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()
    ).decode()
    public_pem = private.public_key().public_bytes(
        serialization.Encoding.PEM, serialization.PublicFormat.SubjectPublicKeyInfo
    ).decode()
    public_jwk = jwk.construct(public_pem, algorithm="RS256").to_dict()
    public_jwk["kid"] = "key-1"
    return private_pem, public_jwk


def _token(private_pem: str, claims: dict, kid: str = "key-1") -> str:
    now = int(time.time())
    return jwt.encode({"iat": now, "exp": now + 300, **claims}, private_pem, algorithm="RS256", headers={"kid": kid})


def _stub_metadata(monkeypatch, public_jwk, issuer):
    monkeypatch.setattr(sso, "discovery", AsyncMock(return_value={"issuer": issuer, "jwks_uri": "https://keys.example"}))
    jwks = AsyncMock(return_value={"keys": [public_jwk]})
    monkeypatch.setattr(sso, "jwks", jwks)
    return jwks


# --- configuration -------------------------------------------------------------

def test_providers_follow_configuration_and_tenant(both_providers, monkeypatch):
    assert list(sso.providers()) == ["google", "microsoft"]
    assert "login.microsoftonline.com/common/" in sso.providers()["microsoft"].discovery_url
    monkeypatch.setattr(settings, "MICROSOFT_SSO_TENANT", "11111111-2222-3333-4444-555555555555")
    assert "login.microsoftonline.com/11111111-2222-3333-4444-555555555555/" in sso.providers()["microsoft"].discovery_url
    monkeypatch.setattr(settings, "GOOGLE_SSO_CLIENT_SECRET", "")
    assert list(sso.providers()) == ["microsoft"]


def test_redirect_uri_derives_from_backend_url(both_providers, monkeypatch):
    monkeypatch.setattr(settings, "BACKEND_URL", "https://api.example.test/")
    assert sso.redirect_uri(sso.get_provider("google")) == "https://api.example.test/api/v1/sso/google/callback"


# --- ID token verification -----------------------------------------------------

@pytest.mark.asyncio
async def test_a_genuine_google_token_is_accepted(both_providers, signing_key, monkeypatch):
    private_pem, public_jwk = signing_key
    _stub_metadata(monkeypatch, public_jwk, "https://accounts.google.com")
    token = _token(private_pem, {"iss": "https://accounts.google.com", "aud": "google-client", "sub": "1", "nonce": "n1",
                                 "email": "a@example.test", "email_verified": True})
    claims = await sso.verify_id_token(sso.get_provider("google"), token, "n1")
    assert claims["email"] == "a@example.test"


@pytest.mark.asyncio
@pytest.mark.parametrize("bad, code_detail", [
    ({"aud": "someone-else"}, "rejected"),      # not addressed to us
    ({"nonce": "other"}, "nonce"),              # not the sign-in we started
    ({"iss": "https://evil.example"}, "issuer"), # not the provider
    ({"exp": int(time.time()) - 10}, "rejected"),  # expired
])
async def test_tokens_that_are_not_for_us_are_refused(both_providers, signing_key, monkeypatch, bad, code_detail):
    private_pem, public_jwk = signing_key
    _stub_metadata(monkeypatch, public_jwk, "https://accounts.google.com")
    claims = {"iss": "https://accounts.google.com", "aud": "google-client", "sub": "1", "nonce": "n1", **bad}
    token = _token(private_pem, claims)
    with pytest.raises(sso.SsoError) as err:
        await sso.verify_id_token(sso.get_provider("google"), token, "n1")
    assert err.value.code == "invalid_token"
    assert code_detail in err.value.detail


@pytest.mark.asyncio
async def test_a_token_signed_by_another_key_is_refused(both_providers, signing_key, monkeypatch):
    _, public_jwk = signing_key
    other = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    other_pem = other.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8,
                                    serialization.NoEncryption()).decode()
    jwks = _stub_metadata(monkeypatch, public_jwk, "https://accounts.google.com")
    token = _token(other_pem, {"iss": "https://accounts.google.com", "aud": "google-client", "sub": "1"}, kid="key-1")
    with pytest.raises(sso.SsoError):
        await sso.verify_id_token(sso.get_provider("google"), token, None)
    # An unknown kid is looked up once more in case the provider rotated keys.
    token = _token(other_pem, {"iss": "https://accounts.google.com", "aud": "google-client", "sub": "1"}, kid="key-9")
    with pytest.raises(sso.SsoError) as err:
        await sso.verify_id_token(sso.get_provider("google"), token, None)
    assert "unknown key" in err.value.detail
    assert jwks.call_args.kwargs.get("force") is True


@pytest.mark.asyncio
async def test_microsoft_multi_tenant_issuer_must_match_the_tokens_tenant(both_providers, signing_key, monkeypatch):
    private_pem, public_jwk = signing_key
    _stub_metadata(monkeypatch, public_jwk, "https://login.microsoftonline.com/{tenantid}/v2.0")
    provider = sso.get_provider("microsoft")
    good = _token(private_pem, {"iss": "https://login.microsoftonline.com/tenant-a/v2.0", "tid": "tenant-a",
                                "aud": "ms-client", "sub": "1", "email": "b@example.test"})
    assert (await sso.verify_id_token(provider, good, None))["tid"] == "tenant-a"
    forged = _token(private_pem, {"iss": "https://login.microsoftonline.com/tenant-a/v2.0", "tid": "tenant-b",
                                  "aud": "ms-client", "sub": "1"})
    with pytest.raises(sso.SsoError):
        await sso.verify_id_token(provider, forged, None)


# --- identity ------------------------------------------------------------------

def test_identity_rules(both_providers):
    google, microsoft = sso.get_provider("google"), sso.get_provider("microsoft")
    assert sso.identity_from_claims(google, {"email": "A@Example.Test", "email_verified": True, "name": "Ann"}) == ("a@example.test", "Ann")
    with pytest.raises(sso.SsoError) as err:
        sso.identity_from_claims(google, {"email": "a@example.test", "email_verified": False})
    assert err.value.code == "email_unverified"
    # Microsoft: e-mail claim first, UPN as the fallback, and a name assembled from parts.
    assert sso.identity_from_claims(microsoft, {"preferred_username": "Bob@Example.Test", "given_name": "Bob", "family_name": "B"}) == ("bob@example.test", "Bob B")
    with pytest.raises(sso.SsoError):
        sso.identity_from_claims(microsoft, {"preferred_username": "bob"})


# --- avatar --------------------------------------------------------------------

def _transport(handler):
    def factory(**kwargs):
        return httpx.AsyncClient(transport=httpx.MockTransport(handler), **kwargs)
    return factory


@pytest.mark.asyncio
async def test_google_avatar_is_fetched_larger_from_the_token_picture(both_providers, monkeypatch):
    seen = {}
    def handler(request):
        seen["url"] = str(request.url)
        return httpx.Response(200, content=b"\xff\xd8jpeg", headers={"content-type": "image/jpeg"})
    monkeypatch.setattr(sso, "_client", _transport(handler))
    image = await sso.fetch_avatar(sso.get_provider("google"), {"picture": "https://lh3.googleusercontent.com/a/abc=s96-c"}, None)
    assert image == (b"\xff\xd8jpeg", "image/jpeg")
    assert seen["url"] == "https://lh3.googleusercontent.com/a/abc=s256-c"


@pytest.mark.asyncio
async def test_google_avatar_only_comes_from_google_hosts(both_providers, monkeypatch):
    monkeypatch.setattr(sso, "_client", _transport(lambda r: httpx.Response(200, content=b"x", headers={"content-type": "image/png"})))
    assert await sso.fetch_avatar(sso.get_provider("google"), {"picture": "https://evil.example/x.png"}, None) is None
    assert await sso.fetch_avatar(sso.get_provider("google"), {"picture": "http://lh3.googleusercontent.com/x"}, None) is None
    assert await sso.fetch_avatar(sso.get_provider("google"), {}, None) is None


@pytest.mark.asyncio
async def test_microsoft_avatar_comes_from_graph_with_the_access_token(both_providers, monkeypatch):
    seen = {}
    def handler(request):
        seen["url"] = str(request.url)
        seen["auth"] = request.headers.get("authorization")
        return httpx.Response(200, content=b"\x89PNG", headers={"content-type": "image/png"})
    monkeypatch.setattr(sso, "_client", _transport(handler))
    image = await sso.fetch_avatar(sso.get_provider("microsoft"), {}, "graph-token")
    assert image == (b"\x89PNG", "image/png")
    assert seen == {"url": sso.MICROSOFT_GRAPH_PHOTO_URL, "auth": "Bearer graph-token"}
    assert await sso.fetch_avatar(sso.get_provider("microsoft"), {}, None) is None


@pytest.mark.asyncio
@pytest.mark.parametrize("response", [
    httpx.Response(404),
    httpx.Response(200, content=b"<html>", headers={"content-type": "text/html"}),
    httpx.Response(200, content=b"x" * (sso.AVATAR_MAX_BYTES + 1), headers={"content-type": "image/png"}),
])
async def test_avatars_that_are_missing_or_not_images_are_skipped(both_providers, monkeypatch, response):
    monkeypatch.setattr(sso, "_client", _transport(lambda r: response))
    assert await sso.fetch_avatar(sso.get_provider("microsoft"), {}, "t") is None


@pytest.mark.asyncio
async def test_avatar_is_stored_like_an_uploaded_profile_picture(both_providers, monkeypatch):
    store = AsyncMock(return_value="/api/v1/uploads/user/org-1/user-1/profile.jpg")
    monkeypatch.setattr(sso, "store_upload", store)

    class U:
        organization_id = "org-1"
        id = "user-1"

    assert await sso.store_avatar(U(), (b"jpeg", "image/jpeg")) == "/api/v1/uploads/user/org-1/user-1/profile.jpg"
    store.assert_awaited_once_with(b"jpeg", "user/org-1/user-1", "profile.jpg", "image/jpeg")
