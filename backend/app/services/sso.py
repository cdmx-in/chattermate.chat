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

Single sign-on for the dashboard: Google and Microsoft over OpenID Connect
(authorization-code flow).

/sso/{provider}/start sends the browser to the provider; it comes back to
/sso/{provider}/callback with a code. The backend exchanges the code, checks
the ID token against the provider's published signing keys, matches the
address to an existing dashboard user and opens the same session a password
login would. SSO never creates accounts: admins still decide who is on the
team, SSO only decides how they sign in.

No client library: discovery documents and key sets are fetched with httpx
and the token is verified with python-jose, which already signs the app's own
JWTs. The avatar is refreshed on every sign-in from Google's picture URL or
the Microsoft Graph photo, stored like a manually uploaded profile picture.
"""

import re
import time
from dataclasses import dataclass
from typing import Any, Dict, Optional, Tuple
from urllib.parse import urlencode, urlparse

import httpx
from jose import JWTError, jwt

from app.core.config import settings
from app.core.logger import get_logger
from app.core.outbound_policy import OutboundTargetBlocked, check_outbound_target
from app.services.file_storage import store_upload

logger = get_logger(__name__)

GOOGLE = "google"
MICROSOFT = "microsoft"

_HTTP_TIMEOUT = 15.0
_METADATA_TTL_SECONDS = 60 * 60
AVATAR_MAX_BYTES = 2 * 1024 * 1024
_AVATAR_EXTENSIONS = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
}
MICROSOFT_GRAPH_PHOTO_URL = "https://graph.microsoft.com/v1.0/me/photo/$value"


class SsoError(Exception):
    """A sign-in that must stop. `code` is what the login page gets told; the
    detail stays in the log, since most of these describe our own config."""

    def __init__(self, code: str, detail: str = ""):
        super().__init__(detail or code)
        self.code = code
        self.detail = detail


@dataclass(frozen=True)
class Provider:
    key: str
    label: str
    discovery_url: str
    scopes: str
    client_id: str
    client_secret: str
    # Microsoft's multi-tenant endpoints publish an issuer *template*; the real
    # issuer carries the signing tenant's id, which the token names in `tid`.
    issuer_template: Optional[str] = None


def providers() -> Dict[str, Provider]:
    """The providers an operator has configured, in the order the login page shows them."""
    out: Dict[str, Provider] = {}
    if settings.GOOGLE_SSO_CLIENT_ID and settings.GOOGLE_SSO_CLIENT_SECRET:
        out[GOOGLE] = Provider(
            key=GOOGLE,
            label="Google",
            discovery_url="https://accounts.google.com/.well-known/openid-configuration",
            scopes="openid email profile",
            client_id=settings.GOOGLE_SSO_CLIENT_ID,
            client_secret=settings.GOOGLE_SSO_CLIENT_SECRET,
        )
    if settings.MICROSOFT_SSO_CLIENT_ID and settings.MICROSOFT_SSO_CLIENT_SECRET:
        tenant = (settings.MICROSOFT_SSO_TENANT or "common").strip()
        out[MICROSOFT] = Provider(
            key=MICROSOFT,
            label="Microsoft",
            discovery_url=f"https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration",
            # User.Read is what lets us read the profile photo from Graph.
            scopes="openid email profile User.Read",
            client_id=settings.MICROSOFT_SSO_CLIENT_ID,
            client_secret=settings.MICROSOFT_SSO_CLIENT_SECRET,
            issuer_template="https://login.microsoftonline.com/{tenantid}/v2.0",
        )
    return out


def get_provider(key: str) -> Optional[Provider]:
    return providers().get((key or "").lower())


def redirect_uri(provider: Provider) -> str:
    """Derived from BACKEND_URL like every other OAuth callback in the app, so
    the only thing to register at the provider is this exact URL."""
    return f"{settings.BACKEND_URL.rstrip('/')}{settings.API_V1_STR}/sso/{provider.key}/callback"


# ---------------------------------------------------------------------------
# Provider metadata. ponytail: per-process caches; a worker refetches two small
# documents an hour, which is nothing, and a rotated key is picked up on demand.
# ---------------------------------------------------------------------------
_discovery_cache: Dict[str, Tuple[dict, float]] = {}
_jwks_cache: Dict[str, Tuple[dict, float]] = {}


def _client(**kwargs) -> httpx.AsyncClient:
    return httpx.AsyncClient(timeout=_HTTP_TIMEOUT, verify=settings.VERIFY_SSL_CERTIFICATES, **kwargs)


async def _get_json(url: str) -> dict:
    async with _client() as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.json()


def _fresh(entry: Optional[Tuple[dict, float]]) -> Optional[dict]:
    if entry and time.time() - entry[1] < _METADATA_TTL_SECONDS:
        return entry[0]
    return None


async def discovery(provider: Provider) -> dict:
    doc = _fresh(_discovery_cache.get(provider.key))
    if doc is None:
        doc = await _get_json(provider.discovery_url)
        _discovery_cache[provider.key] = (doc, time.time())
    return doc


async def jwks(provider: Provider, force: bool = False) -> dict:
    keys = None if force else _fresh(_jwks_cache.get(provider.key))
    if keys is None:
        keys = await _get_json((await discovery(provider))["jwks_uri"])
        _jwks_cache[provider.key] = (keys, time.time())
    return keys


def clear_caches() -> None:
    """Tests and config changes."""
    _discovery_cache.clear()
    _jwks_cache.clear()


# ---------------------------------------------------------------------------
# The flow
# ---------------------------------------------------------------------------
async def authorize_url(provider: Provider, state: str, nonce: str) -> str:
    doc = await discovery(provider)
    params = {
        "client_id": provider.client_id,
        "redirect_uri": redirect_uri(provider),
        "response_type": "code",
        "scope": provider.scopes,
        "state": state,
        "nonce": nonce,
        # Always offer the account chooser: a shared machine must not silently
        # sign in whoever Google/Microsoft remembers.
        "prompt": "select_account",
    }
    return f"{doc['authorization_endpoint']}?{urlencode(params)}"


async def exchange_code(provider: Provider, code: str) -> dict:
    """Redeem the authorization code. Returns the provider's token response
    (id_token, access_token, ...)."""
    doc = await discovery(provider)
    async with _client() as client:
        response = await client.post(
            doc["token_endpoint"],
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": redirect_uri(provider),
                "client_id": provider.client_id,
                "client_secret": provider.client_secret,
            },
        )
    if response.status_code != 200:
        raise SsoError("provider_error", f"{provider.key} token endpoint answered {response.status_code}: {response.text[:200]}")
    tokens = response.json()
    if not tokens.get("id_token"):
        raise SsoError("provider_error", f"{provider.key} token response carries no id_token")
    return tokens


def _key_for(keys: dict, kid: Optional[str]) -> Optional[dict]:
    for key in keys.get("keys", []):
        if key.get("kid") == kid:
            return key
    return None


def _issuer_ok(provider: Provider, claims: dict, doc: dict) -> bool:
    issuer = claims.get("iss", "")
    published = doc.get("issuer", "")
    if provider.issuer_template and "{tenantid}" in (published or provider.issuer_template):
        # Multi-tenant Microsoft: the issuer is per tenant and the token says
        # which one signed it; the discovery document only gives the shape.
        tenant = claims.get("tid")
        return bool(tenant) and issuer == provider.issuer_template.replace("{tenantid}", tenant)
    if provider.key == GOOGLE:
        # Google documents both spellings.
        return issuer in ("https://accounts.google.com", "accounts.google.com")
    return bool(published) and issuer == published


async def verify_id_token(provider: Provider, id_token: str, nonce: Optional[str]) -> dict:
    """The claims of an ID token that is genuinely for us: signed by a key the
    provider publishes, addressed to our client id, from the expected issuer,
    unexpired, and carrying the nonce this sign-in started with."""
    try:
        header = jwt.get_unverified_header(id_token)
    except JWTError as e:
        raise SsoError("invalid_token", f"unreadable id_token header: {e}")
    kid = header.get("kid")
    key = _key_for(await jwks(provider), kid)
    if key is None:
        # Key rotation: the set we hold predates this key. Refetch once.
        key = _key_for(await jwks(provider, force=True), kid)
        if key is None:
            raise SsoError("invalid_token", f"{provider.key} id_token signed with unknown key {kid}")
    try:
        claims = jwt.decode(
            id_token,
            key,
            algorithms=["RS256"],
            audience=provider.client_id,
            options={"verify_at_hash": False},
        )
    except JWTError as e:
        raise SsoError("invalid_token", f"{provider.key} id_token rejected: {e}")
    if not _issuer_ok(provider, claims, await discovery(provider)):
        raise SsoError("invalid_token", f"{provider.key} id_token from unexpected issuer {claims.get('iss')}")
    if nonce and claims.get("nonce") != nonce:
        raise SsoError("invalid_token", f"{provider.key} id_token nonce mismatch")
    return claims


def identity_from_claims(provider: Provider, claims: dict) -> Tuple[str, str]:
    """(e-mail, display name) to match against the team.

    Google marks whether it has verified the address and we insist that it has.
    Microsoft tokens carry the account's e-mail (or UPN for accounts without
    one) as managed by the directory; restrict MICROSOFT_SSO_TENANT to your
    own tenant if that directory should be the only one trusted.
    """
    email = (claims.get("email") or "").strip().lower()
    if provider.key == GOOGLE:
        if not email or not claims.get("email_verified"):
            raise SsoError("email_unverified", "Google did not vouch for the address")
    elif not email:
        upn = (claims.get("preferred_username") or "").strip().lower()
        email = upn if "@" in upn else ""
        if not email:
            raise SsoError("email_unverified", "Microsoft token carries no e-mail address")
    name = claims.get("name") or " ".join(
        part for part in (claims.get("given_name"), claims.get("family_name")) if part
    )
    return email, (name or email)


def _google_picture_url(url: str) -> Optional[str]:
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    if parsed.scheme != "https" or not (host == "googleusercontent.com" or host.endswith(".googleusercontent.com")):
        return None
    # The token links a 96px thumbnail; the same URL serves larger sizes.
    return re.sub(r"=s\d+(-c)?$", "=s256-c", url)


async def fetch_avatar(provider: Provider, claims: dict, access_token: Optional[str]) -> Optional[Tuple[bytes, str]]:
    """The account's current photo as (bytes, content type), or None when the
    provider has none or it is not a plain image of a sane size. Google links
    a public picture in the token; Microsoft keeps it in Graph, behind the
    access token the sign-in just earned."""
    try:
        if provider.key == GOOGLE:
            url = _google_picture_url(claims.get("picture") or "")
            if not url:
                return None
            check_outbound_target(url, "Avatar URL")
            headers: Dict[str, str] = {}
        else:
            if not access_token:
                return None
            url = MICROSOFT_GRAPH_PHOTO_URL
            headers = {"Authorization": f"Bearer {access_token}"}
        async with _client(follow_redirects=False) as client:
            response = await client.get(url, headers=headers)
    except (httpx.HTTPError, OutboundTargetBlocked) as e:
        logger.warning(f"SSO avatar fetch from {provider.key} failed: {e}")
        return None
    if response.status_code != 200:
        return None
    content_type = response.headers.get("content-type", "").split(";")[0].strip().lower()
    if content_type not in _AVATAR_EXTENSIONS or not response.content or len(response.content) > AVATAR_MAX_BYTES:
        return None
    return response.content, content_type


async def store_avatar(user: Any, image: Tuple[bytes, str]) -> str:
    """Persist a fetched photo where uploaded profile pictures live and return
    the URL to keep on the user. Same name every time, so a re-sync replaces
    the previous photo instead of piling up files."""
    content, content_type = image
    folder = f"user/{user.organization_id}/{user.id}"
    return await store_upload(content, folder, f"profile{_AVATAR_EXTENSIONS[content_type]}", content_type)
