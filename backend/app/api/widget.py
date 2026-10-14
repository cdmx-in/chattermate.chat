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
"""

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, Response, Header, Query, status
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from app.models.widget import Widget
from app.models.user import User

from app.core.auth import get_current_user
from app.database import get_db
from app.repositories.widget import WidgetRepository
from app.repositories.agent import AgentRepository
from app.core.security import create_conversation_token, verify_conversation_token
from app.services import conversation_token
from app.repositories.customer import CustomerRepository
from app.models.schemas.widget import WidgetCreate, WidgetResponse
from app.core.logger import get_logger
from app.repositories.session_to_agent import SessionToAgentRepository
from app.models.session_to_agent import SessionStatus
from app.core.config import settings
from app.services import widget_bootstrap
from app.api.widget_common import (
    FONT_LINKS,
    PAGE_LOAD,
    allow_widget_open,
    asset_version,
    bearer_token,
    frame_ancestors,
    note_install,
    script_json,
    widget_runtime_config,
)

router = APIRouter()
logger = get_logger(__name__)

def _identity_expired() -> HTTPException:
    """401 telling the widget its visitor's identity lapsed, not that it never had one.

    The embed loader answers this by asking the host page for a fresh token
    (`tokenProvider`) and retrying, so an identified visitor is never silently
    re-created as an anonymous customer.
    """
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={
            "code": conversation_token.IDENTITY_EXPIRED_CODE,
            "message": widget_bootstrap.IDENTITY_EXPIRED_MESSAGE,
        },
    )


def _widget_html_response(html: str) -> HTMLResponse:
    """The widget HTML embeds a conversation token and the current customization,
    and points at a versioned bundle URL. Caching it would hand a visitor someone
    else's token from a shared cache, and would keep pinning them to a stale widget
    build after a release."""
    return HTMLResponse(html, headers={"Cache-Control": "no-store"})


@router.post("", response_model=WidgetResponse)
def create_new_widget(
    widget: WidgetCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """Create a new widget for the organization"""
    widget_repo = WidgetRepository(db)
    return widget_repo.create_widget(widget, current_user.organization_id)


def _token_required() -> HTTPException:
    """401 for an agent that only talks to identified visitors. The embed loader
    matches this wording, so it stays as it was."""
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required. Token must be obtained from /api/v1/generate-token endpoint with valid API key."
    )


@router.get("/{widget_id}/data", response_class=HTMLResponse)
async def get_widget_ui(
    widget_id: str,
    request: Request,
    background_tasks: BackgroundTasks,
    authorization: Optional[str] = Header(None),
    source: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """The widget page with its visitor's token baked in.

    Fetched cross-origin by older embed loaders (and injected as srcdoc), or
    framed directly by a raw <iframe> embed — which is why it carries the same
    frame-ancestors as /frame: a CSP on a fetch() response is never applied, so
    old loaders are unaffected, while a raw iframe can't dodge the list.
    """
    if request.headers.get("sec-fetch-dest") == "iframe":
        # A raw <iframe src=".../data"> embed: send it to the framed page, which
        # carries no token in its HTML and moves to the cookieless frame host
        return RedirectResponse(request.url.path.rsplit("/data", 1)[0] + "/frame", status_code=status.HTTP_302_FOUND)

    if not allow_widget_open(request, widget_id):
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many requests. Try again shortly.")

    widget = widget_bootstrap.find_widget(db, widget_id)
    note_install(db, widget, request.headers.get("origin"), request, background_tasks, PAGE_LOAD)

    try:
        session = widget_bootstrap.open_session(db, widget, bearer_token(authorization), source)
    except widget_bootstrap.WidgetAccessDenied as denied:
        raise _identity_expired() if denied.code == conversation_token.IDENTITY_EXPIRED_CODE else _token_required()

    html_page = get_widget_html(await widget_bootstrap.initial_data(session), request)
    response = _widget_html_response(html_page)
    ancestors = frame_ancestors(db, widget)
    if ancestors:
        response.headers["Content-Security-Policy"] = ancestors
    return response


def get_widget_html(data: dict, request: Optional[Request] = None) -> str:
    """Widget HTML with `data` baked in as window.__INITIAL_DATA__.

    The layout of the __INITIAL_DATA__ block is read by tooling that scrapes
    this page, so it keeps its one-key-per-line shape.
    """
    import html
    widget_url = settings.VITE_WIDGET_URL
    version = asset_version()
    asset_query = f"?v={version}" if version else ""

    return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat Widget</title>
            {FONT_LINKS}
            <script>
                // Runtime backend config so the widget connects to THIS install's
                // backend instead of falling back to the baked cloud default.
                // Declared before the widget module loads.
                window.APP_CONFIG = {script_json(widget_runtime_config(request))};
            </script>
            <script type="module" crossorigin src="{widget_url}/assets/widget.js{asset_query}"></script>
            <link rel="stylesheet" crossorigin href="{widget_url}/assets/widget.css{asset_query}">
            <script>
                window.__INITIAL_DATA__ = {{
                    widgetId: "{html.escape(data['widgetId'])}",
                    agentName: "{html.escape(data['agentName'])}",
                    customization: {script_json(data['customization'])},
                    customerId: "{html.escape(data['customerId'])}",
                    initialToken: "{html.escape(data['initialToken'])}",
                    customer: {{}},
                    workflow: {str(data['workflow']).lower()},
                    allowAttachments: {str(data['allowAttachments']).lower()},
                    presence: {script_json(data['presence'])}
                }};
            </script>
        </head>
        <body>
            <div id="app"></div>
        </body>
        </html>
    """

async def get_human_agent_session_info(db: Session, customer_id: str) -> dict:
    """Get customer session info including human agent details if assigned"""
    human_agent_info = {}
    session_repo = SessionToAgentRepository(db)
    sessions = session_repo.get_customer_sessions(customer_id, SessionStatus.OPEN)
    
    if sessions and len(sessions) > 0:
        session_model,user_full_name, user_profile_pic = sessions[0]
        
        if user_full_name:  # If there's a human agent assigned
            # HumanAgentResponse signs human_agent_profile_pic on serialization.

            # Get human agent info from session
            human_agent_info = {
                "human_agent_name": user_full_name,
                "human_agent_profile_pic": user_profile_pic,
            }
    
    return human_agent_info

@router.get("/{widget_id}", response_model=WidgetResponse)
async def get_widget_data(
    widget_id: str,
    response: Response,
    email: Optional[str] = None,
    source: Optional[str] = Query(None),
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Get widget data including agent customization"""
    logger.info(f"Getting widget data for widget_id {widget_id}, email {email}, has_token {bool(authorization)}")
    # Binds this visitor to a customer: a stored copy would skip that and leave
    # the widget holding the page's anonymous token.
    response.headers["Cache-Control"] = "no-store"

    widget = db.query(Widget).filter(Widget.id == widget_id).first()
    if not widget:
        raise HTTPException(status_code=404, detail="Widget not found")
    
    agent_repo = AgentRepository(db)
    agent = agent_repo.get_by_id(widget.agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    require_token_auth = getattr(agent, 'require_token_auth', False)
    customer_id = None
    token = None
    old_token_source = None

    # Try to validate existing token if provided
    if authorization and authorization.startswith('Bearer '):
        token = authorization.split(' ')[1]
        state = conversation_token.inspect(token, widget_id)
        if state.is_live:
            customer_id = state.payload.get("sub")
            old_token_source = state.payload.get("source")
        elif state.identity_lost:
            # Identity ran out rather than never existing: minting a fresh anonymous
            # customer here is what used to turn a signed-in visitor into "Anonymous"
            # in the inbox the moment they started a new chat.
            raise _identity_expired()
        else:
            token = None
    
    # SECURITY: If token auth required, must have valid token with customer_id
    if require_token_auth:
        if not token or customer_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized - Token required")

    # Check if agent has workflow enabled
    agent_has_workflow = bool(agent.use_workflow and agent.active_workflow_id)
    
    # Check if agent has ASK_ANYTHING chat style
    is_ask_anything_style = (agent.customization and
                           agent.customization.chat_style and
                           agent.customization.chat_style.value == "ASK_ANYTHING")

    # Email is optional unless the agent explicitly opts into collecting it before chat.
    # When not collecting email we bypass the gate (anonymous customer + token), like
    # ASK_ANYTHING / workflow agents already do. NOTE: this runs AFTER the require_token_auth
    # 401 check above, so token-protected widgets are unaffected.
    email_bypass = not bool(agent.customization and getattr(agent.customization, 'collect_email', False))

    # For workflow agents, ASK_ANYTHING style, or email-optional agents, create a customer with a
    # blank email if none exists. Only email-collecting regular agents require email up front.
    should_create_customer = (customer_id == "None" or customer_id is None) and (email or agent_has_workflow or is_ask_anything_style or email_bypass)

    logger.debug(f"should_create_customer={should_create_customer}, customer_id={customer_id}, require_token_auth={require_token_auth}")
    
    customer_repo = CustomerRepository(db)
    human_agent_info = {}
    
    # Flag to track if we generated a new token
    token_was_generated = False
    
    if should_create_customer:
        logger.debug(f"Creating new customer for email: {email}")
        # Generate unique email if no email provided
        if email:
            customer_email = email
        else:
            customer_email = CustomerRepository.anonymous_email()
        
        # Try to get existing customer first (only if email is provided)
        customer = None
        if email:
            customer = customer_repo.get_customer_by_email(email, widget.organization_id)
        
        if not customer:
            # Create new customer if doesn't exist
            customer = customer_repo.create_customer(customer_email, widget.organization_id)
        
        # Get session info for existing customer
        if customer:
            human_agent_info = await get_human_agent_session_info(db, str(customer.id))
        
        # Generate new token with customer_id and preserve source if applicable.
        # Prefer the fresh `source` query param (first-visit Explore flow) and
        # fall back to any source already captured in a prior token.
        new_token_extra_data = {}
        if widget_id == settings.EXPLORE_WIDGET_ID:
            effective_source = source or old_token_source
            if effective_source:
                new_token_extra_data["source"] = effective_source

        new_token = create_conversation_token(
            customer_id=str(customer.id),
            widget_id=widget_id,
            **new_token_extra_data
        )
        token_was_generated = True
        
        # photo_url is signed by AgentCustomizationResponse on serialization.
        customization = agent.customization

        return {
            "id": widget.id,
            "organization_id": widget.organization_id,
            "customer_id": str(customer.id),
            "human_agent": human_agent_info,
            "agent": {
                "id": agent.id,
                "name": agent.name,
                "display_name": agent.display_name,
                "customization": customization,
                "workflow": bool(agent.use_workflow and agent.active_workflow_id),
                "allow_attachments": agent.allow_attachments
            },
            "token": new_token
        }
    else:
        # If workflow / ASK_ANYTHING / email-optional and no customer_id, create anonymous customer
        if (customer_id == "None" or customer_id is None) and (agent_has_workflow or is_ask_anything_style or email_bypass):
            # Create anonymous customer for workflow or ASK_ANYTHING style
            customer = customer_repo.create_customer(CustomerRepository.anonymous_email(), widget.organization_id)

            # Generate new token with customer_id
            new_token = create_conversation_token(
                customer_id=str(customer.id),
                widget_id=widget_id
            )

            # Create a copy of customization to modify photo_url
            customization = agent.customization

            # photo_url is signed by AgentCustomizationResponse on serialization.

            return {
                "id": widget.id,
                "organization_id": widget.organization_id,
                "customer_id": str(customer.id),
                "human_agent": {},
                "agent": {
                    "id": agent.id,
                    "name": agent.name,
                    "display_name": agent.display_name,
                    "customization": customization,
                    "workflow": bool(agent.use_workflow and agent.active_workflow_id),
                    "allow_attachments": agent.allow_attachments
                },
                "token": new_token
            }
        elif customer_id == "None" or customer_id is None:
            # Regular agent without email/customer_id - return 401
            raise HTTPException(
                status_code=401,
                detail="Unauthorized"
            )

        # Existing customer with valid token - get session info
        logger.debug(f"Using existing token for customer_id: {customer_id}")
        human_agent_info = await get_human_agent_session_info(db, customer_id)

    # Create a copy of customization to modify photo_url
    customization = agent.customization

    # photo_url is signed by AgentCustomizationResponse on serialization.

    return {
        "id": widget.id,
        "organization_id": widget.organization_id,
        "customer_id": customer_id,
        "human_agent": human_agent_info,
        "agent": {
            "id": agent.id,
            "name": agent.name,
            "display_name": agent.display_name,
            "customization": customization,
            "workflow": bool(agent.use_workflow and agent.active_workflow_id),
            "allow_attachments": agent.allow_attachments
        }
    }


@router.post("/{widget_id}/end-chat")
async def end_chat_acknowledgment(
    widget_id: str,
    session_id: str,
    reason: Optional[str] = None,
    description: Optional[str] = None,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Acknowledge end_chat event from widget and close session on backend"""
    try:
        logger.info(f"End chat request received: widget_id={widget_id}, session_id={session_id}, reason={reason}, has_token={bool(authorization)}")

        # A conversation token is REQUIRED. This used to validate the token only
        # when one was sent, so a request with no Authorization header fell
        # straight through and closed any session by id, unauthenticated.
        if not authorization or not authorization.startswith('Bearer '):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

        try:
            token_data = verify_conversation_token(authorization.split(' ')[1])
        except Exception:
            token_data = None
        if not token_data:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

        customer_id = token_data.get("sub")
        if token_data.get("widget_id") != widget_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Widget mismatch")

        # The token proves who the caller is, not that this session is theirs —
        # without this any visitor could close another customer's conversation.
        session_repo = SessionToAgentRepository(db)
        session = session_repo.get_session(session_id)
        if not session or str(session.customer_id) != str(customer_id):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")

        success = session_repo.close_session(
            session_id=session_id,
            reason=reason,
            description=description
        )

        if success:
            logger.info(f"End chat acknowledged: widget_id={widget_id}, session_id={session_id}, reason={reason}")
            return {
                "success": True,
                "message": "Chat session closed",
                "session_id": session_id,
                "closed_at": datetime.utcnow().isoformat()
            }
        else:
            logger.warning(f"Failed to close session: widget_id={widget_id}, session_id={session_id}")
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in end_chat_acknowledgment: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to process end chat")


@router.get("", response_model=List[WidgetResponse])
def list_widgets(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """List all widgets for the organization"""
    widget_repo = WidgetRepository(db)
    return widget_repo.get_widgets(current_user.organization_id)


@router.get("/agent/{agent_id}", response_model=List[WidgetResponse])
def get_widgets_by_agent(
    agent_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """Get all widgets for a specific agent"""
    widget_repo = WidgetRepository(db)
    widgets = widget_repo.get_widgets_by_agent(agent_id)
    
    # Verify the agent belongs to the user's organization
    agent_repo = AgentRepository(db)
    agent = agent_repo.get_by_id(agent_id)
    if not agent or str(agent.organization_id) != str(current_user.organization_id):
        raise HTTPException(status_code=404, detail="Agent not found")
    
    return widgets


@router.delete("/{widget_id}")
def remove_widget(
    widget_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """Delete a widget"""
    widget_repo = WidgetRepository(db)
    widget = widget_repo.get_widget(widget_id)
    if not widget or widget.organization_id != current_user.organization_id:
        raise HTTPException(status_code=404, detail="Widget not found")
    widget_repo.delete_widget(widget_id)
    return {"message": "Widget deleted"}