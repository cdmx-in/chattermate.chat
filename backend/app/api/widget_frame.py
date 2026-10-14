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

The widget as a framed page on our own origin.

The embed loader points an iframe at `/widgets/{id}/frame`. That page carries no
token and no org data; once it loads, the host page hands it the visitor's token
by postMessage and the frame calls `/widgets/{id}/bootstrap` for everything
else. Running on our origin means a customer's site never has to be in CORS,
and `frame-ancestors` (the widget's allowed domains) decides where it may load.
"""

import json
import secrets
from typing import Optional
from urllib.parse import urlparse

from fastapi import APIRouter, BackgroundTasks, Depends, Header, HTTPException, Request, status
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.api.widget import (
    allow_widget_open,
    asset_version,
    bearer_token,
    embed_headers,
    note_install,
    runtime_config_for,
    widget_runtime_config,
)
from app.core.auth import require_permissions
from app.core.config import settings
from app.database import get_db
from app.models.schemas.widget import WidgetEmbedSettings
from app.models.user import User
from app.repositories.widget import WidgetRepository
from app.services import conversation_token, widget_bootstrap, widget_embed_policy

router = APIRouter()

_NO_STORE = {"Cache-Control": "no-store"}


class BootstrapRequest(BaseModel):
    # The embedding page's origin, as the frame saw it on the host's first message
    host_origin: Optional[str] = Field(None, max_length=300)
    source: Optional[str] = Field(None, max_length=100)


def _frame_config(request: Request) -> dict:
    """API/WS URLs for the frame: its own host, so every call is same-origin."""
    if settings.WIDGET_FRAME_URL:
        return runtime_config_for(settings.WIDGET_FRAME_URL)
    return widget_runtime_config(request)


def _frame_host_redirect(request: Request) -> Optional[RedirectResponse]:
    """Send a frame request that reached the API host (which carries dashboard
    cookies) over to the cookieless frame host.

    Only the API host is redirected, never "anything but the frame host": a proxy
    that forwards an internal Host for the frame vhost would otherwise bounce the
    frame to itself forever.
    """
    frame_host = urlparse(settings.WIDGET_FRAME_URL).netloc if settings.WIDGET_FRAME_URL else ""
    api_host = urlparse(settings.BACKEND_URL).netloc
    request_host = request.headers.get("host", "")
    if not frame_host or request_host != api_host or request_host == frame_host:
        return None
    query = f"?{request.url.query}" if request.url.query else ""
    return RedirectResponse(f"{settings.WIDGET_FRAME_URL}{request.url.path}{query}", status_code=status.HTTP_302_FOUND)


def _ws_origin(api_url: str) -> str:
    parsed = urlparse(api_url)
    return f"{parsed.scheme}://{parsed.netloc}"


@router.get("/{widget_id}/frame", response_class=HTMLResponse)
async def get_widget_frame(widget_id: str, request: Request, db: Session = Depends(get_db)):
    redirect = _frame_host_redirect(request)
    if redirect:
        return redirect

    widget = widget_bootstrap.find_widget(db, widget_id)
    config = _frame_config(request)
    nonce = secrets.token_urlsafe(16)
    version = asset_version()
    asset_query = f"?v={version}" if version else ""

    ancestors = embed_headers(db, widget).get("Content-Security-Policy")
    csp = widget_embed_policy.frame_document_csp(
        nonce,
        [_ws_origin(config["API_URL"]), _ws_origin(config["WS_URL"])],
        ancestors,
    )
    boot = {"widgetId": widget.id}

    page = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Widget</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <script nonce="{nonce}">
        window.APP_CONFIG = {json.dumps(config)};
        window.__CM_FRAME__ = {json.dumps(boot)};
    </script>
    <script type="module" src="/assets/widget.js{asset_query}"></script>
    <link rel="stylesheet" href="/assets/widget.css{asset_query}">
</head>
<body>
    <div id="app"></div>
</body>
</html>
"""
    return HTMLResponse(page, headers={**_NO_STORE, "Content-Security-Policy": csp})


@router.post("/{widget_id}/bootstrap")
async def bootstrap_widget(
    widget_id: str,
    body: BootstrapRequest,
    request: Request,
    background_tasks: BackgroundTasks,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    """Everything the framed widget starts from, for the visitor in `authorization`.

    401 `identity_expired`: the signed-in visitor's identity lapsed (the host
    re-identifies and retries). 401 `token_required`: the agent only talks to
    identified visitors.
    """
    if not allow_widget_open(request):
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                            detail={"code": "rate_limited", "message": "Too many requests. Try again shortly."})

    widget = widget_bootstrap.find_widget(db, widget_id)
    host_origin = widget_embed_policy.origin_of(body.host_origin or "")
    note_install(db, widget, host_origin, request, background_tasks)

    try:
        session = widget_bootstrap.open_session(db, widget, bearer_token(authorization), body.source)
    except widget_bootstrap.WidgetAccessDenied as denied:
        message = (
            "Conversation token expired. Issue a new one with /generate-token."
            if denied.code == conversation_token.IDENTITY_EXPIRED_CODE
            else "This widget only talks to identified visitors."
        )
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={"code": denied.code, "message": message})

    return JSONResponse(await widget_bootstrap.initial_data(session), headers=_NO_STORE)


def _own_widget(db: Session, widget_id: str, user: User):
    widget = WidgetRepository(db).get_widget(widget_id)
    if not widget or widget.organization_id != user.organization_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Widget not found")
    return widget


@router.get("/{widget_id}/embed-settings", response_model=WidgetEmbedSettings)
async def get_embed_settings(
    widget_id: str,
    current_user: User = Depends(require_permissions("manage_agents")),
    db: Session = Depends(get_db),
):
    widget = _own_widget(db, widget_id, current_user)
    return WidgetEmbedSettings(allowed_domains=widget.allowed_domains or [])


@router.put("/{widget_id}/embed-settings", response_model=WidgetEmbedSettings)
async def update_embed_settings(
    widget_id: str,
    body: WidgetEmbedSettings,
    current_user: User = Depends(require_permissions("manage_agents")),
    db: Session = Depends(get_db),
):
    """Replace the widget's allowed domains. An empty list allows any site."""
    widget = _own_widget(db, widget_id, current_user)
    try:
        domains = widget_embed_policy.normalize_allowed_domains(body.allowed_domains)
    except widget_embed_policy.InvalidAllowedDomain as invalid:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(invalid))
    widget = WidgetRepository(db).set_allowed_domains(widget, domains)
    return WidgetEmbedSettings(allowed_domains=widget.allowed_domains or [])
