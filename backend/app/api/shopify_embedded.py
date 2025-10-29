"""
Shopify Embedded App Endpoints - Server-Side Rendered Pages
Following Shopify's official embedded app authentication pattern
"""

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.logger import get_logger
from app.database import get_db
from app.repositories.shopify_shop_repository import ShopifyShopRepository
from app.repositories.agent import AgentRepository
from app.repositories.agent_shopify_config_repository import AgentShopifyConfigRepository
from app.services.shopify_auth_service import ShopifyAuthService
from app.services.shopify_session import ShopifySessionService
from typing import Optional

from app.models.schemas.shopify.agent_shopify_config import AgentShopifyConfigCreate

router = APIRouter()
logger = get_logger(__name__)


@router.get("/", response_class=HTMLResponse)
@router.get("/home", response_class=HTMLResponse)
async def embedded_app_home(
    request: Request,
    shop: str = Query(...),
    host: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Entry point for embedded Shopify app.
    This is the application_url endpoint that Shopify loads in the iframe.
    """
    logger.info(f"Embedded app home requested for shop: {shop}")
    
    # Get shop from database
    shop_repository = ShopifyShopRepository(db)
    db_shop = shop_repository.get_shop_by_domain(shop)
    
    if not db_shop or not db_shop.is_installed:
        # Shop not installed, redirect to OAuth
        logger.info(f"Shop {shop} not installed, redirecting to OAuth")
        redirect_url = f"/api/v1/shopify/auth?shop={shop}&host={host or ''}&embedded=1"
        
        # Use App Bridge redirect
        html = f"""<!DOCTYPE html>
<html>
<head>
    <meta name="shopify-api-key" content="{settings.SHOPIFY_API_KEY}" />
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
</head>
<body>
    <script>
        var AppBridge = window['app-bridge'];
        var createApp = AppBridge.default;
        var Redirect = AppBridge.actions.Redirect;
        
        var app = createApp({{
            apiKey: '{settings.SHOPIFY_API_KEY}',
            host: '{host or ""}'
        }});
        
        var redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.REMOTE, '{redirect_url}');
    </script>
</body>
</html>"""
        return HTMLResponse(content=html, status_code=200)
    
    # Shop is installed, check agent configuration
    agents_connected, widget_id = await ShopifyAuthService.get_shop_success_data(db, str(db_shop.id))
    
    if agents_connected > 0:
        # Has agents: render success page
        logger.info(f"Shop has {agents_connected} agents, rendering success page")
        html_content = ShopifyAuthService.generate_success_page_html(
            shop=shop,
            shop_id=str(db_shop.id),
            agents_connected=agents_connected,
            widget_id=widget_id,
            api_key=settings.SHOPIFY_API_KEY
        )
        return HTMLResponse(content=html_content, status_code=200)
    else:
        # No agents: render agent selection page
        logger.info(f"Shop has 0 agents, rendering agent selection page")
        
        # Get organization agents
        agent_repository = AgentRepository(db)
        agents = agent_repository.get_by_organization(db_shop.organization_id)
        
        # Convert agents to dict format
        agents_list = [
            {
                "id": str(agent.id),
                "name": agent.name,
                "display_name": agent.display_name,
                "description": agent.description,
                "is_active": agent.is_active
            }
            for agent in agents
        ]
        
        # Render agent selection page
        html_content = ShopifyAuthService.generate_agent_selection_page_html(
            shop=shop,
            shop_id=str(db_shop.id),
            agents=agents_list,
            api_key=settings.SHOPIFY_API_KEY,
            host=host or ''
        )
        return HTMLResponse(content=html_content, status_code=200)


@router.get("/session-token-bounce", response_class=HTMLResponse)
async def session_token_bounce(
    request: Request,
    shop: str = Query(...),
    redirect_path: str = Query(...)
):
    """
    Bounce page to retrieve session token using App Bridge.
    Per Shopify docs, this page loads App Bridge and gets a fresh session token,
    then redirects back to the original path with the token in the URL.
    """
    logger.info(f"Session token bounce requested for shop: {shop}, redirect: {redirect_path}")
    
    html = ShopifySessionService.generate_bounce_page_html(
        shop=shop,
        redirect_path=redirect_path,
        api_key=settings.SHOPIFY_API_KEY
    )
    
    return HTMLResponse(content=html, status_code=200)


@router.get("/agent-selection", response_class=HTMLResponse)
async def agent_selection_page(
    request: Request,
    shop: str = Query(...),
    shop_id: Optional[str] = Query(None),
    host: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Server-side rendered agent selection page.
    Validates session token before rendering.
    """
    logger.info(f"Agent selection page requested for shop: {shop}")
    
    # Get and validate session token
    session_token = ShopifySessionService.get_session_token_from_request(request)
    
    if not session_token:
        # No session token - redirect to bounce page
        if ShopifySessionService.is_document_request(request):
            redirect_path = f"/api/v1/shopify/agent-selection?shop={shop}"
            if shop_id:
                redirect_path += f"&shop_id={shop_id}"
            if host:
                redirect_path += f"&host={host}"
            
            bounce_html = ShopifySessionService.generate_bounce_page_html(
                shop=shop,
                redirect_path=redirect_path,
                api_key=settings.SHOPIFY_API_KEY
            )
            return HTMLResponse(content=bounce_html, status_code=200)
        else:
            raise HTTPException(
                status_code=401,
                detail="Session token required",
                headers={"X-Shopify-Retry-Invalid-Session-Request": "1"}
            )
    
    # Validate session token
    try:
        decoded_token = ShopifySessionService.validate_session_token(session_token)
        logger.info(f"Session token valid for shop: {shop}")
    except HTTPException as e:
        if ShopifySessionService.is_document_request(request):
            # Invalid token on document request - bounce to get new token
            redirect_path = f"/api/v1/shopify/agent-selection?shop={shop}"
            if shop_id:
                redirect_path += f"&shop_id={shop_id}"
            if host:
                redirect_path += f"&host={host}"
            
            bounce_html = ShopifySessionService.generate_bounce_page_html(
                shop=shop,
                redirect_path=redirect_path,
                api_key=settings.SHOPIFY_API_KEY
            )
            return HTMLResponse(content=bounce_html, status_code=200)
        else:
            raise e
    
    # Get shop from database
    shop_repository = ShopifyShopRepository(db)
    db_shop = shop_repository.get_shop_by_domain(shop)
    
    if not db_shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    if not shop_id:
        shop_id = str(db_shop.id)
    
    # Get organization agents
    agent_repository = AgentRepository(db)
    agents = agent_repository.get_org_agents(db_shop.organization_id, active_only=True)
    
    # Convert agents to dict format
    agents_list = [
        {
            "id": str(agent.id),
            "name": agent.name,
            "display_name": agent.display_name,
            "description": agent.description,
            "is_active": agent.is_active
        }
        for agent in agents
    ]
    
    # Generate HTML page
    html = ShopifyAuthService.generate_agent_selection_page_html(
        shop=shop,
        shop_id=shop_id,
        agents=agents_list,
        api_key=settings.SHOPIFY_API_KEY,
        host=host or ''
    )
    
    return HTMLResponse(content=html, status_code=200)


@router.post("/enable-agent")
async def enable_agent(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Enable Shopify for selected agent(s).
    Called from agent selection page with session token authentication.
    """
    # Get and validate session token
    session_token = ShopifySessionService.get_session_token_from_request(request)
    
    if not session_token:
        raise HTTPException(
            status_code=401,
            detail="Session token required",
            headers={"X-Shopify-Retry-Invalid-Session-Request": "1"}
        )
    
    # Validate session token
    decoded_token = ShopifySessionService.validate_session_token(session_token)
    
    # Get request body
    body = await request.json()
    shop_id = body.get('shop_id')
    agent_ids = body.get('agent_ids', [])
    
    if not shop_id or not agent_ids:
        raise HTTPException(status_code=400, detail="shop_id and agent_ids required")
    
    # Enable Shopify for agents (create or update if already exists)
    config_repository = AgentShopifyConfigRepository(db)
    
    for agent_id in agent_ids:
        config_create_data = AgentShopifyConfigCreate(
                agent_id=agent_id, 
                enabled=True, 
                shop_id=shop_id
        )
        config_repository.create_or_update_agent_shopify_config(config_create_data)
    
    logger.info(f"Enabled Shopify for {len(agent_ids)} agent(s) in shop {shop_id}")
    
    return {"success": True, "message": f"Connected {len(agent_ids)} agent(s)"}


@router.get("/success", response_class=HTMLResponse)
async def success_page(
    request: Request,
    shop: str = Query(...),
    shop_id: str = Query(...),
    host: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Server-side rendered success page.
    Shows confirmation that Shopify integration is complete.
    """
    logger.info(f"Success page requested for shop: {shop}")
    
    # Get shop configuration
    agents_connected, widget_id = await ShopifyAuthService.get_shop_success_data(db, shop_id)
    
    # Generate success page HTML
    html = ShopifyAuthService.generate_success_page_html(
        shop=shop,
        shop_id=shop_id,
        agents_connected=agents_connected,
        widget_id=widget_id,
        api_key=settings.SHOPIFY_API_KEY
    )
    
    return HTMLResponse(content=html, status_code=200)

