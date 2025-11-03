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
    def generate_connect_account_page(
        shop: str,
        shop_id: str,
        api_key: str,
        host: str = ''
    ) -> HTMLResponse:
        """
        Generate embedded page with "Connect Account" button that opens login popup.
        This keeps the flow within Shopify's embedded app context.
        
        Args:
            shop: Shop domain
            shop_id: Shop ID (string UUID)
            api_key: Shopify API key
            host: Shopify host parameter
            
        Returns:
            HTMLResponse with connect account page
        """
        from app.core.config import settings
        frontend_url = settings.FRONTEND_URL or "https://app.chattermate.chat"
        login_url = f"{frontend_url}/login?shop_id={shop_id}&embedded=true"
        
        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="shopify-api-key" content="{api_key}" />
    <title>ChatterMate - Connect Account</title>
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {{
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 40px 20px;
            background: #f8f5f5;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }}
        
        .container {{
            max-width: 520px;
            width: 100%;
            background: #FFFFFF;
            border-radius: 16px;
            padding: 48px 40px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }}
        
        .brand-header {{
            margin-bottom: 32px;
        }}
        
        .brand-logo {{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            background: #FFFFFF;
            border-radius: 20px;
            margin-bottom: 24px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            border: 1px solid #E5E7EB;
        }}
        
        .brand-logo svg {{
            width: 56px;
            height: 56px;
        }}
        
        h1 {{
            font-size: 28px;
            color: #1F2937;
            margin: 0 0 12px;
            font-weight: 700;
            line-height: 1.2;
        }}
        
        .subtitle {{
            font-size: 16px;
            color: #4B5563;
            line-height: 1.6;
            margin: 0 0 36px;
        }}
        
        .connect-btn {{
            background: linear-gradient(135deg, #f34611 0%, #d93a0c 100%);
            color: white;
            border: none;
            padding: 16px 48px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(243, 70, 17, 0.25);
            width: 100%;
            font-family: 'Montserrat', sans-serif;
        }}
        
        .connect-btn:hover {{
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(243, 70, 17, 0.35);
            background: linear-gradient(135deg, #d93a0c 0%, #f34611 100%);
        }}
        
        .connect-btn:active {{
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(243, 70, 17, 0.25);
        }}
        
        .info-box {{
            background: #f8f5f5;
            border-radius: 12px;
            padding: 24px;
            margin-top: 32px;
            text-align: left;
            border: 1px solid #E5E7EB;
        }}
        
        .info-box h3 {{
            font-size: 15px;
            color: #1F2937;
            margin: 0 0 16px;
            font-weight: 600;
        }}
        
        .info-box ul {{
            margin: 0;
            padding-left: 24px;
            font-size: 14px;
            color: #4B5563;
            line-height: 1.8;
        }}
        
        .info-box li {{
            margin-bottom: 10px;
        }}
        
        .info-box li:last-child {{
            margin-bottom: 0;
        }}
        
        .info-box li::marker {{
            color: #f34611;
        }}
        
        @media (max-width: 640px) {{
            .container {{
                padding: 36px 24px;
            }}
            
            h1 {{
                font-size: 24px;
            }}
            
            .subtitle {{
                font-size: 15px;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="brand-header">
            <div class="brand-logo">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Chat bubble background -->
                    <path 
                        d="M95 20H25C22.2386 20 20 22.2386 20 25V75C20 77.7614 22.2386 80 25 80H45L55 95L65 80H95C97.7614 80 100 77.7614 100 75V25C100 22.2386 97.7614 20 95 20Z" 
                        fill="#f34611"
                        stroke="#EEEEEE"
                        stroke-width="1"
                    />
                    <!-- Letter C -->
                    <path 
                        d="M75 40C75 40 65 35 60 35C50 35 45 42 45 50C45 58 50 65 60 65C65 65 75 60 75 60V52C75 52 68 55 63 55C57 55 53 53 53 50C53 47 57 45 63 45C68 45 75 48 75 48V40Z"
                        fill="#FFFFFF"
                    />
                </svg>
            </div>
            <h1>Welcome to ChatterMate!</h1>
            <p class="subtitle">Connect your ChatterMate account to start using AI-powered chat on your Shopify store.</p>
        </div>
        
        <button class="connect-btn" onclick="openLoginPopup()">Connect Account</button>
        
        <div class="info-box">
            <h3>What happens next?</h3>
            <ul>
                <li>Log in or create your ChatterMate account</li>
                <li>Select which AI agent to connect</li>
                <li>Install the chat widget on your store</li>
            </ul>
        </div>
    </div>
    
    <script>
        var loginWindow = null;
        var pollTimer = null;
        
        function openLoginPopup() {{
            var width = 600;
            var height = 700;
            var left = (screen.width - width) / 2;
            var top = (screen.height - height) / 2;
            
            loginWindow = window.open(
                '{login_url}',
                'ChatterMate Login',
                'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',resizable=yes,scrollbars=yes'
            );
            
            // Check if popup was blocked
            if (!loginWindow || loginWindow.closed || typeof loginWindow.closed === 'undefined') {{
                alert('Popup was blocked. Please allow popups for this site and try again.');
                return;
            }}
            
            // Poll for popup close and check for success
            pollTimer = setInterval(function() {{
                if (loginWindow.closed) {{
                    clearInterval(pollTimer);
                    // Reload the page to check if connection was successful
                    window.location.reload();
                }}
            }}, 500);
        }}
        
        // Listen for messages from the login popup
        window.addEventListener('message', function(event) {{
            // Verify origin for security
            if (event.origin !== '{frontend_url}') return;
            
            if (event.data.type === 'login_success') {{
                console.log('Login successful, linking shop to organization...');
                
                // Popup will close itself, so we don't need to close it
                // Clear the poll timer
                if (pollTimer) {{
                    clearInterval(pollTimer);
                    pollTimer = null;
                }}
                
                // Call backend to link shop to organization
                fetch('/api/v1/shopify/link-shop/{shop_id}', {{
                    method: 'POST',
                    credentials: 'include',
                    headers: {{
                        'Content-Type': 'application/json'
                    }}
                }})
                .then(response => response.json())
                .then(data => {{
                    console.log('Shop linked successfully:', data);
                    // Reload to show agent selection
                    window.location.reload();
                }})
                .catch(error => {{
                    console.error('Error linking shop:', error);
                    // Reload anyway to show current state
                    window.location.reload();
                }});
            }}
        }});
    </script>
</body>
</html>"""
        return HTMLResponse(content=html_content, status_code=200)

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
            # Has agents: redirect to success page
            logger.info(f"Shop has {agents_connected} agents, redirecting to success page")
            widget_id = ShopifyHelperService.get_shop_widget_id(db, configs)
            
            return ShopifyAuthService.generate_success_redirect(
                shop=shop,
                shop_id=shop_id,
                agents_connected=agents_connected,
                widget_id=widget_id,
                frontend_url=settings.FRONTEND_URL
            )
        else:
            # No agents: redirect to agent selection page
            logger.info(f"Shop has 0 agents, redirecting to agent selection page")
            logger.debug(f"Organization ID: {organization_id}")
            
            return ShopifyAuthService.generate_agent_selection_redirect(
                shop=shop,
                shop_id=shop_id,
                frontend_url=settings.FRONTEND_URL
            )

 
 
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

