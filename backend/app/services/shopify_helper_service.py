"""
ChatterMate - Shopify Helper Service
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>
"""

from sqlalchemy.orm import Session
from typing import Optional
from fastapi import Request
from fastapi.responses import RedirectResponse, HTMLResponse
from app.core.logger import get_logger
from app.core.config import settings
from app.models.organization import Organization
from app.repositories.widget import WidgetRepository
from app.services.shopify_auth_service import ShopifyAuthService
from urllib.parse import quote
import hmac
import hashlib
import base64

logger = get_logger(__name__)


class ShopifyHelperService:
    """Service for Shopify helper functions and utilities"""
    
    @staticmethod
    def get_shop_agents_list(db: Session, organization_id: str) -> list[dict]:
        """
        Get all agents for a shop's organization and convert to dict format.
        
        Args:
            db: Database session
            organization_id: Organization ID (string UUID)
            
        Returns:
            List of agent dictionaries with id, name, display_name, description, is_active
        """
        from app.repositories.agent import AgentRepository
        agent_repository = AgentRepository(db)
        agents = agent_repository.get_active_agents(organization_id)
        
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
        
        return agents_list

    @staticmethod
    def get_shop_widget_id(db: Session, configs: list, default: str = None) -> Optional[str]:
        """
        Get the widget ID for the first configured agent.
        
        Args:
            db: Database session
            configs: List of agent Shopify configs
            default: Default value if no widget found
            
        Returns:
            Widget ID as string or None
        """
        if configs and len(configs) > 0:
            widget_repo = WidgetRepository(db)
            widgets = widget_repo.get_widgets_by_agent(configs[0].agent_id)
            if widgets and len(widgets) > 0:
                return str(widgets[0].id)
        return default

    @staticmethod
    def handle_embedded_app_response(
        db: Session,
        shop: str,
        shop_id: str,
        organization_id: str,
        agents_connected: int,
        configs: list,
        api_key: str,
        host: str = ''
    ) -> HTMLResponse:
        """
        Handle response for embedded Shopify apps by rendering appropriate HTML page.
        
        Args:
            db: Database session
            shop: Shop domain
            shop_id: Shop ID (string UUID)
            organization_id: Organization ID (string UUID)
            agents_connected: Number of agents already configured
            configs: List of agent Shopify configs
            api_key: Shopify API key
            host: Shopify host parameter
            
        Returns:
            HTMLResponse with either success page or agent selection page
        """
        if agents_connected > 0:
            # Has agents: render success page
            logger.info(f"Shop has {agents_connected} agents, rendering success page")
            widget_id = ShopifyHelperService.get_shop_widget_id(db, configs)
            
            html_content = ShopifyAuthService.generate_success_page_html(
                shop=shop,
                shop_id=shop_id,
                agents_connected=agents_connected,
                widget_id=widget_id,
                api_key=api_key
            )
            return HTMLResponse(content=html_content, status_code=200)
        else:
            # No agents: render agent selection page
            logger.info(f"Shop has 0 agents, rendering agent selection page")
            logger.debug(f"Organization ID: {organization_id}")
            agents_list = ShopifyHelperService.get_shop_agents_list(db, organization_id)
            
            # Render agent selection page directly
            html_content = ShopifyAuthService.generate_agent_selection_page_html(
                shop=shop,
                shop_id=shop_id,
                agents=agents_list,
                api_key=api_key,
                host=host
            )
            return HTMLResponse(content=html_content, status_code=200)

    @staticmethod
    def handle_non_embedded_app_redirect(
        db: Session,
        shop: str,
        shop_id: str,
        agents_connected: int,
        configs: list,
        organization: Optional[Organization] = None
    ) -> RedirectResponse:
        """
        Handle redirect for non-embedded Shopify apps.
        
        Args:
            db: Database session
            shop: Shop domain
            shop_id: Shop ID (string UUID)
            agents_connected: Number of agents already configured
            configs: List of agent Shopify configs
            organization: Organization object (if user is authenticated)
            
        Returns:
            RedirectResponse to appropriate frontend URL
        """
        frontend_url = settings.FRONTEND_URL or "https://app.chattermate.chat"
        
        if not organization:
            logger.info(f"User not authenticated, redirecting to login")
            # Build the return URL - will check agent config after login
            if agents_connected > 0:
                # Get widget ID for success page
                widget_id = ShopifyHelperService.get_shop_widget_id(db, configs)
                
                return_url = f"/shopify/success?shop={shop}&shop_id={shop_id}&agents_connected={agents_connected}"
                if widget_id:
                    return_url += f"&widget_id={widget_id}"
            else:
                return_url = f"/shopify/agent-selection?shop={shop}&shop_id={shop_id}"
            
            target_path = f"{frontend_url}/login?redirect={quote(return_url)}"
        else:
            # User is authenticated, check if agents are configured
            if agents_connected > 0:
                # Agents already configured - redirect to success page
                logger.info(f"Agents already configured, redirecting to success page")
                
                # Get widget ID for success page
                widget_id = ShopifyHelperService.get_shop_widget_id(db, configs)
                
                target_path = f"{frontend_url}/shopify/success?shop={shop}&shop_id={shop_id}&agents_connected={agents_connected}"
                if widget_id:
                    target_path += f"&widget_id={widget_id}"
            else:
                # No agents configured - redirect to agent selection
                logger.info(f"No agents configured, redirecting to agent selection")
                target_path = f"{frontend_url}/shopify/agent-selection?shop={shop}&shop_id={shop_id}"
        
        return RedirectResponse(target_path)

    @staticmethod
    def generate_oauth_redirect_html(auth_url: str, api_key: str, host: str = '') -> str:
        """
        Generate HTML page with App Bridge that redirects to Shopify OAuth.
        This is used for embedded apps to break out of iframe for OAuth.
        
        Args:
            auth_url: The Shopify OAuth authorization URL
            api_key: Shopify API key
            host: Shopify host parameter (optional)
            
        Returns:
            HTML content as string
        """
        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="shopify-api-key" content="{api_key}" />
    <title>ChatterMate - Authorizing...</title>
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }}
        .loader {{
            text-align: center;
            color: white;
        }}
        .spinner {{
            border: 3px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 15px;
        }}
        @keyframes spin {{
            to {{ transform: rotate(360deg); }}
        }}
    </style>
</head>
<body>
    <div class="loader">
        <div class="spinner"></div>
        <h2>ChatterMate</h2>
        <p>Connecting to Shopify...</p>
    </div>
    
    <script>
        (function() {{
            try {{
                var AppBridge = window['app-bridge'];
                if (!AppBridge || !AppBridge.default) {{
                    // Fallback if App Bridge not loaded
                    window.top.location.href = '{auth_url}';
                    return;
                }}
                
                var createApp = AppBridge.default;
                var Redirect = AppBridge.actions.Redirect;
                
                // Get host from URL
                var urlParams = new URLSearchParams(window.location.search);
                var host = urlParams.get('host') || '{host}';
                
                if (!host) {{
                    // No host, use top-level redirect
                    window.top.location.href = '{auth_url}';
                    return;
                }}
                
                // Create App Bridge instance
                var app = createApp({{
                    apiKey: '{api_key}',
                    host: host
                }});
                
                // Use REMOTE redirect to break out of iframe for OAuth
                var redirect = Redirect.create(app);
                redirect.dispatch(Redirect.Action.REMOTE, '{auth_url}');
                
                console.log('Redirecting to OAuth via App Bridge');
                
            }} catch (error) {{
                console.error('App Bridge error:', error);
                // Fallback to top-level redirect
                window.top.location.href = '{auth_url}';
            }}
        }})();
    </script>
</body>
</html>"""
        return html_content

    @staticmethod
    def exchange_oauth_code_for_token(shop: str, code: str) -> tuple[str, str]:
        """
        Exchange OAuth authorization code for access token.
        
        Args:
            shop: Shop domain
            code: OAuth authorization code
            
        Returns:
            Tuple of (access_token, scope)
            
        Raises:
            HTTPException: If token exchange fails
        """
        import requests
        from fastapi import HTTPException
        
        token_url = f"https://{shop}/admin/oauth/access_token"
        payload = {
            "client_id": settings.SHOPIFY_API_KEY,
            "client_secret": settings.SHOPIFY_API_SECRET,
            "code": code
        }
        
        # Check if we should verify SSL certificates (default to True for production)
        verify_ssl = settings.VERIFY_SSL_CERTIFICATES
        logger.info(f"Exchanging OAuth code for token - Shop: {shop}")
        logger.info(f"Verify SSL Certificates: {verify_ssl}")
        logger.info(f"Token URL: {token_url}")
        
        try:
            response = requests.post(token_url, json=payload, verify=verify_ssl)
            response.raise_for_status()
            token_data = response.json()
            
            access_token = token_data.get("access_token")
            scope = token_data.get("scope")
            
            if not access_token:
                logger.error(f"Failed to get access token for shop: {shop}")
                raise HTTPException(status_code=400, detail="Failed to obtain access token")
            
            logger.info(f"Successfully obtained access token for shop: {shop}")
            return access_token, scope
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Error exchanging OAuth code for token: {str(e)}")
            if isinstance(e, requests.exceptions.SSLError):
                logger.error("SSL Certificate verification failed. If this is a development environment, consider setting VERIFY_SSL_CERTIFICATES=False in settings.")
            raise HTTPException(status_code=500, detail=f"Failed to exchange OAuth code: {str(e)}")

    @staticmethod
    def verify_shopify_webhook(request_headers, request_body) -> bool:
        """
        Validate Shopify HMAC signature for webhooks.
        
        Args:
            request_headers: Request headers containing X-Shopify-Hmac-Sha256
            request_body: Raw request body bytes
            
        Returns:
            True if signature is valid, False otherwise
        """
        shopify_hmac = request_headers.get('X-Shopify-Hmac-Sha256')
        if not shopify_hmac:
            return False
        
        digest = hmac.new(
            settings.SHOPIFY_API_SECRET.encode('utf-8'),
            request_body,
            hashlib.sha256
        ).digest()
        
        computed_hmac = base64.b64encode(digest).decode('utf-8')
        return hmac.compare_digest(computed_hmac, shopify_hmac)

    @staticmethod
    def validate_shop_request(request: Request, shop: str, hmac_param: str) -> bool:
        """
        Validate the OAuth request from Shopify using HMAC validation.
        
        Args:
            request: FastAPI Request object
            shop: Shop domain
            hmac_param: HMAC parameter from query string
            
        Returns:
            True if request is valid, False otherwise
        """
        # Check if the shop URL is a valid Shopify domain
        if not shop.endswith('.myshopify.com'):
            logger.warning(f"Invalid shop domain: {shop}")
            return False
        
        # Get query parameters as dictionary
        query_params = dict(request.query_params)
        
        # Remove hmac from params for validation
        if 'hmac' in query_params:
            query_params.pop('hmac')
        
        logger.info(f"Query params: {query_params}")
        logger.info(f"HMAC param: {hmac_param}")
        
        # Sort and encode parameters
        sorted_params = "&".join([f"{key}={quote(value)}" for key, value in sorted(query_params.items())])
        
        # Generate HMAC
        digest = hmac.new(
            settings.SHOPIFY_API_SECRET.encode('utf-8'),
            sorted_params.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        # Compare with provided HMAC
        is_valid = hmac.compare_digest(digest, hmac_param)
        if not is_valid:
            logger.warning(f"HMAC validation failed for shop: {shop}")
        
        return is_valid

