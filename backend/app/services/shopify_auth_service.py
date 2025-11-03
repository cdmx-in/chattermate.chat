"""
ChatterMate - Shopify Authentication Service
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
from typing import Optional, Tuple, List, Dict, Any
from app.core.logger import get_logger
from app.repositories.agent_shopify_config_repository import AgentShopifyConfigRepository
from app.repositories.widget import WidgetRepository
from app.services.shopify import ShopifyService
from app.repositories.agent import AgentRepository
from fastapi import Request
from fastapi.responses import RedirectResponse, HTMLResponse
from app.models.organization import Organization
from app.core.config import settings
from urllib.parse import quote
import hmac
import hashlib
import base64

logger = get_logger(__name__)


class ShopifyAuthService:
    """Service for handling Shopify authentication and HTML generation"""
    
    @staticmethod
    async def get_shop_success_data(db: Session, shop_id: str) -> Tuple[int, Optional[str]]:
        """
        Get success page data for a shop (agent count and widget ID).
        
        Args:
            db: Database session
            shop_id: Shop ID
            
        Returns:
            Tuple of (agents_connected, widget_id)
        """
        agent_config_repository = AgentShopifyConfigRepository(db)
        configs = agent_config_repository.get_configs_by_shop(shop_id, enabled_only=True)
        agents_connected = len(configs) if configs else 0
        
        # Get widget ID from the first connected agent
        widget_id = None
        if configs and len(configs) > 0:
            widget_repo = WidgetRepository(db)
            widgets = widget_repo.get_widgets_by_agent(configs[0].agent_id)
            if widgets and len(widgets) > 0:
                widget_id = str(widgets[0].id)
        
        return agents_connected, widget_id
    
    @staticmethod
    async def verify_shop_token(db: Session, db_shop) -> bool:
        """
        Verify if a shop's access token is valid.
        
        Args:
            db: Database session
            db_shop: Shop database record
            
        Returns:
            True if token is valid, False otherwise
        """
        shopify_service = ShopifyService(db)
        validation_query = "query { shop { name } }"
        validation_result = await shopify_service._execute_graphql_async(db_shop, validation_query)
        return validation_result.get("success", False)
    
    @staticmethod
    def generate_success_redirect(
        shop: str,
        shop_id: str,
        agents_connected: int,
        widget_id: Optional[str],
        frontend_url: Optional[str] = None
    ):
        """
        Generate RedirectResponse to ShopifySuccessView.vue with query parameters.
        Simple redirect approach for Shopify success page.
        
        Args:
            shop: Shop domain (e.g., store.myshopify.com)
            shop_id: Shop ID
            agents_connected: Number of connected agents
            widget_id: Widget ID (optional)
            frontend_url: Frontend URL (optional, defaults to settings)
            
        Returns:
            RedirectResponse
        """
        from fastapi.responses import RedirectResponse
        from app.core.config import settings
        
        # Use provided frontend_url or fall back to settings
        base_url = frontend_url or settings.FRONTEND_URL
        
        # Build query parameters for the Vue route
        params = f"shop={shop}&shop_id={shop_id}&agents_connected={agents_connected}"
        if widget_id:
            params += f"&widget_id={widget_id}"
        
        # Full redirect URL to ShopifyAgentManagementView
        success_url = f"{base_url}/shopify/agent-management?{params}"
        
        return RedirectResponse(url=success_url, status_code=302)
    

    
    @staticmethod
    def generate_agent_selection_redirect(
        shop: str,
        shop_id: str,
        frontend_url: Optional[str] = None
    ):
        """
        Generate RedirectResponse to ShopifyAgentSelectionView.vue with query parameters.
        Simple redirect approach for agent selection page.
        
        Args:
            shop: Shop domain (e.g., store.myshopify.com)
            shop_id: Shop ID
            frontend_url: Frontend URL (optional, defaults to settings)
            
        Returns:
            RedirectResponse
        """
        from fastapi.responses import RedirectResponse
        from app.core.config import settings
        
        # Use provided frontend_url or fall back to settings
        base_url = frontend_url or settings.FRONTEND_URL
        
        # Build query parameters for the Vue route
        params = f"shop={shop}&shop_id={shop_id}"
        
        # Full redirect URL to ShopifyAgentSelectionView
        selection_url = f"{base_url}/shopify/agent-selection?{params}"
        
        return RedirectResponse(url=selection_url, status_code=302)

