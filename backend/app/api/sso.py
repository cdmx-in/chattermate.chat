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

Dashboard single sign-on (Google, Microsoft). See app.services.sso for the flow.
"""

import json
import secrets
from typing import Optional
from urllib.parse import urlencode

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from fastapi.responses import RedirectResponse
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.core.config import settings
from app.core.logger import get_logger
from app.core.oauth_state import pop_state, store_state
from app.database import get_db
from app.models.role import Role
from app.models.schemas.user import UserResponse
from app.models.user import User
from app.services import sso
from app.services.auth_sessions import issue_tokens, session_user_payload, set_session_cookies

logger = get_logger(__name__)
router = APIRouter()

STATE_KIND = "sso"


def _safe_next(path: Optional[str]) -> str:
    """Only a path inside the dashboard may be the post-login destination."""
    if path and path.startswith("/") and not path.startswith("//") and "\\" not in path:
        return path
    return "/"


def _login_redirect(**params: str) -> RedirectResponse:
    return RedirectResponse(f"{settings.FRONTEND_URL.rstrip('/')}/login?{urlencode(params)}", status_code=302)


def _provider_or_404(key: str) -> sso.Provider:
    provider = sso.get_provider(key)
    if provider is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sign-in provider not available")
    return provider


@router.get("/config")
async def sign_in_config():
    """What the login page offers: a button per configured provider, and whether
    the e-mail/password form is still shown (an operator can turn it off once SSO works)."""
    return {
        "providers": [{"key": p.key, "label": p.label} for p in sso.providers().values()],
        "password_login": sso.password_login_enabled(),
    }


@router.get("/{provider_key}/start")
async def start(provider_key: str, next: Optional[str] = Query(None)):
    """Send the browser to the provider. The CSRF state is redeemed once by the
    callback and also carries the nonce the ID token must echo back."""
    provider = _provider_or_404(provider_key)
    state = secrets.token_urlsafe(24)
    nonce = secrets.token_urlsafe(16)
    store_state(STATE_KIND, state, json.dumps({"provider": provider.key, "nonce": nonce, "next": _safe_next(next)}))
    return RedirectResponse(await sso.authorize_url(provider, state, nonce), status_code=302)


@router.get("/{provider_key}/callback")
async def callback(
    provider_key: str,
    code: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    error: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """Finish the sign-in and hand the browser back to the dashboard with the
    session cookies a password login would set. Problems land on the login
    page as `sso_error`; the detail stays in the log."""
    provider = _provider_or_404(provider_key)
    stored = pop_state(STATE_KIND, state or "")
    started = json.loads(stored) if stored else None
    if not started or started.get("provider") != provider.key:
        return _login_redirect(sso_error="invalid_state")
    if error or not code:
        # The person cancelled at the provider, or it refused the request.
        logger.info(f"SSO {provider.key} returned without a code: {error or 'no code'}")
        return _login_redirect(sso_error="provider_error")

    try:
        tokens = await sso.exchange_code(provider, code)
        claims = await sso.verify_id_token(provider, tokens["id_token"], started.get("nonce"))
        email, display_name = sso.identity_from_claims(provider, claims)
    except sso.SsoError as e:
        logger.warning(f"SSO {provider.key} sign-in rejected ({e.code}): {e.detail}")
        return _login_redirect(sso_error=e.code)
    except httpx.HTTPError as e:
        logger.error(f"SSO {provider.key} provider unreachable: {e}")
        return _login_redirect(sso_error="provider_error")

    user = db.query(User).filter(func.lower(User.email) == email, User.is_active == True).first()
    if not user:
        logger.info(f"SSO {provider.key} sign-in for an address with no active account")
        return _login_redirect(sso_error="no_account")

    # The provider's photo is the account's current one: refresh it every time.
    image = await sso.fetch_avatar(provider, claims, tokens.get("access_token"))
    if image:
        try:
            user.profile_pic = await sso.store_avatar(user, image)
        except Exception as e:  # storage trouble must not block the sign-in
            logger.warning(f"SSO avatar could not be stored for user {user.id}: {e}")
    if not user.full_name and display_name:
        user.full_name = display_name

    user.is_online = True
    user.last_seen = func.now()
    access_token, refresh_token = issue_tokens(db, user.id, user.organization_id)
    db.commit()
    role = db.query(Role).filter(Role.id == user.role_id).first()

    response = _login_redirect(sso="ok", next=started.get("next") or "/")
    set_session_cookies(response, user, role, access_token, refresh_token)
    logger.info(f"SSO {provider.key} sign-in for user {user.id}")
    return response


@router.get("/session", response_model=UserResponse)
async def session(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """The signed-in user, for the dashboard to pick up after the redirect.
    Password login returns this in its response body; a redirect cannot."""
    role = db.query(Role).filter(Role.id == current_user.role_id).first()
    return session_user_payload(current_user, role)
