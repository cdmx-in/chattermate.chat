"""
ChatterMate - Shopify OAuth
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

from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response
from fastapi.responses import RedirectResponse, HTMLResponse
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.logger import get_logger
from app.database import get_db
from app.models.schemas.shopify import ShopifyShopCreate, ShopifyShop
from app.models.schemas.shopify import AgentShopifyConfigBase, AgentShopifyConfig, AgentShopifyConfigCreate, AgentShopifyConfigUpdate
from app.repositories.shopify_shop_repository import ShopifyShopRepository
from app.repositories.agent_shopify_config_repository import AgentShopifyConfigRepository
from typing import Optional
import requests
import hmac
import hashlib
import base64
import json
from urllib.parse import urlencode, quote
from app.core.auth import get_current_user, require_permissions, get_current_organization
from app.models.user import User
from app.models.organization import Organization

router = APIRouter()
logger = get_logger(__name__)

# Define the scopes needed for your app
SCOPES = "read_products,write_products"

# Validate Shopify HMAC signature
def verify_shopify_webhook(request_headers, request_body):
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

# Validate the OAuth request from Shopify
def validate_shop_request(request: Request, shop: str, hmac_param: str):
    """Simple HMAC validation for Shopify OAuth requests"""
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

@router.get("/auth")
async def shopify_auth(
    request: Request,
    shop: str = Query(..., description="Shopify shop domain"),
    hmac: Optional[str] = Query(None, description="HMAC signature for validation"),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permissions("manage_integrations"))
):
    """
    Initiates the Shopify OAuth process by redirecting to the Shopify authorization URL.
    If embedded=1, validates the HMAC and returns a success page.
    """
    logger.info(f"Shopify auth request received for shop: {shop}")

    # Regular OAuth flow (not embedded)
    # Check if the shop already exists and has a valid token
    shop_repository = ShopifyShopRepository(db)
    db_shop = shop_repository.get_shop_by_domain(shop)
    if db_shop and db_shop.access_token and db_shop.is_installed:
        return {"status": "already_installed", "shop": shop}
    
    # Initialize OAuth flow
    nonce = base64.b64encode(hashlib.sha256(shop.encode('utf-8')).digest()).decode('utf-8')
    
    # Create auth URL
    redirect_uri = f"{settings.FRONTEND_URL}/shopify/auth/callback"
    auth_url = f"https://{shop}/admin/oauth/authorize?client_id={settings.SHOPIFY_API_KEY}&scope={SCOPES}&redirect_uri={redirect_uri}"
    
    return RedirectResponse(auth_url)

@router.get("/auth/callback")
async def shopify_callback(
    request: Request,
    shop: str = Query(..., description="Shopify shop domain"),
    code: str = Query(..., description="Authorization code"),
    state: Optional[str] = Query(None, description="State parameter for verification"),
    hmac: str = Query(..., description="HMAC signature for validation"),
    db: Session = Depends(get_db),
    organization: Organization = Depends(get_current_organization)
):
    """
    Handles the Shopify OAuth callback, exchanges the code for an access token,
    and stores the token securely.
    """
    logger.info(f"Shopify callback received for shop: {shop}")
    # Validate the request
    if not validate_shop_request(request, shop, hmac):
        logger.warning(f"Invalid Shopify OAuth callback: {shop}")
        raise HTTPException(status_code=400, detail="Invalid request")
    
    logger.info(f"Validating Shopify OAuth callback: {shop}")
    # Exchange the code for an access token
    token_url = f"https://{shop}/admin/oauth/access_token"
    payload = {
        "client_id": settings.SHOPIFY_API_KEY,
        "client_secret": settings.SHOPIFY_API_SECRET,
        "code": code
    }
    
    try:
        response = requests.post(token_url, json=payload)
        response.raise_for_status()
        token_data = response.json()
        access_token = token_data.get("access_token")
        scope = token_data.get("scope")
        
        if not access_token:
            logger.error(f"Failed to get access token for shop: {shop}")
            raise HTTPException(status_code=400, detail="Failed to obtain access token")
        
        # Convert the organization ID to string
        org_id_str = str(organization.id) if organization and organization.id else None
        
        # Store or update the shop in the database
        shop_repository = ShopifyShopRepository(db)
        db_shop = shop_repository.get_shop_by_domain(shop)
        if db_shop:
            # Update existing shop
            shop_update = {
                "access_token": access_token,
                "scope": scope,
                "is_installed": True,
                "organization_id": org_id_str
            }
            shop_repository.update_shop(db_shop.id, shop_update)
        else:
            # Create new shop
            shop_data = ShopifyShopCreate(
                shop_domain=shop,
                access_token=access_token,
                scope=scope,
                is_installed=True,
                organization_id=org_id_str
            )
            shop_repository.create_shop(shop_data)
        
        # Redirect to the app or admin section
        redirect_url = f"https://{shop}/admin/apps/{settings.SHOPIFY_API_KEY}"
        return RedirectResponse(redirect_url)
    
    except Exception as e:
        logger.error(f"Error processing Shopify callback: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing callback")

@router.get("/shops", response_model=list[ShopifyShop])
async def get_shops(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    organization: Organization = Depends(get_current_organization),
    current_user: User = Depends(require_permissions("manage_organization"))
):
    """
    Get all shops for the current organization
    """
    org_id_str = str(organization.id) if organization.id else None
    shop_repository = ShopifyShopRepository(db)
    return shop_repository.get_shops_by_organization(org_id_str, skip=skip, limit=limit)

@router.get("/shops/{shop_id}", response_model=ShopifyShop)
async def get_shop(
    shop_id: str,
    db: Session = Depends(get_db),
    organization: Organization = Depends(get_current_organization),
    current_user: User = Depends(require_permissions("manage_organization"))
):
    """
    Get a shop by ID
    """
    shop_repository = ShopifyShopRepository(db)
    db_shop = shop_repository.get_shop(shop_id)
    if not db_shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    # Convert organization IDs to strings for comparison
    shop_org_id = str(db_shop.organization_id) if db_shop.organization_id else None
    current_org_id = str(organization.id) if organization.id else None
    
    # Verify that the shop belongs to the current organization
    if shop_org_id != current_org_id:
        logger.warning(f"Unauthorized attempt to access shop {shop_id} from organization {current_org_id}")
        raise HTTPException(status_code=403, detail="This shop does not belong to your organization")
    
    return db_shop

@router.delete("/shops/{shop_id}")
async def delete_shop(
    shop_id: str,
    db: Session = Depends(get_db),
    organization: Organization = Depends(get_current_organization),
    current_user: User = Depends(require_permissions("manage_organization"))
):
    """
    Delete a shop and disconnect from Shopify
    """
    shop_repository = ShopifyShopRepository(db)
    db_shop = shop_repository.get_shop(shop_id)
    if not db_shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    # Convert organization IDs to strings for comparison
    shop_org_id = str(db_shop.organization_id) if db_shop.organization_id else None
    current_org_id = str(organization.id) if organization.id else None
    
    # Verify that the shop belongs to the current organization
    if shop_org_id != current_org_id:
        logger.warning(f"Unauthorized attempt to delete shop {shop_id} from organization {current_org_id}")
        raise HTTPException(status_code=403, detail="This shop does not belong to your organization")
    
    # Send an uninstall request to Shopify if we have an access token
    if db_shop.access_token:
        try:
            # Request to delete app data from Shopify
            uninstall_url = f"https://{db_shop.shop_domain}/admin/api/2023-07/graphql.json"
            headers = {
                "X-Shopify-Access-Token": db_shop.access_token,
                "Content-Type": "application/json"
            }
            
            # GraphQL mutation to uninstall the app
            mutation = """
            mutation {
                appSubscriptionCancel(
                    id: "gid://shopify/AppSubscription/current"
                ) {
                    appSubscription {
                        id
                        status
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
            """
            
            response = requests.post(
                uninstall_url, 
                headers=headers,
                json={"query": mutation}
            )
            
            logger.info(f"Shopify uninstall response: {response.status_code} - {response.text}")
        except Exception as e:
            logger.error(f"Error uninstalling app from Shopify: {str(e)}")
            # Continue with deletion even if uninstall fails
    
    # Get all agent configs linked to this shop and delete them
    try:
        agent_config_repository = AgentShopifyConfigRepository(db)
        agent_configs = agent_config_repository.get_configs_by_shop(shop_id)
        if agent_configs:
            logger.info(f"Deleting {len(agent_configs)} agent Shopify configs for shop {shop_id}")
            for config in agent_configs:
                # Update the config to disable and remove shop_id
                agent_config_repository.update_agent_shopify_config(
                    config.agent_id, 
                    AgentShopifyConfigUpdate(enabled=False, shop_id=None)
                )
            logger.info(f"Successfully deleted agent Shopify configs for shop {shop_id}")
    except Exception as e:
        logger.error(f"Error deleting agent Shopify configs: {str(e)}")
        # Continue with shop deletion even if config deletion fails
    
    # Delete the shop from our database
    success = shop_repository.delete_shop(shop_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete shop")
    
    return {"status": "success", "message": "Shop successfully disconnected"}

@router.get("/status")
async def check_connection(
    db: Session = Depends(get_db),
    organization: Organization = Depends(get_current_organization),
    current_user: User = Depends(require_permissions("manage_organization"))
):
    """
    Check if Shopify is connected for the current organization
    """
    try:
        # Get shops for the current organization
        org_id_str = str(organization.id) if organization.id else None
        shop_repository = ShopifyShopRepository(db)
        shops = shop_repository.get_shops_by_organization(org_id_str, limit=1)
        is_connected = len(shops) > 0 and any(shop.is_installed for shop in shops)
        
        result = {
            "connected": is_connected
        }
        
        # If connected, include the shop domain
        if is_connected:
            result["shop_domain"] = shops[0].shop_domain
        
        return result
    except Exception as e:
        logger.error(f"Error checking Shopify connection: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Error checking Shopify connection status"
        )

@router.get("/agent-config/{agent_id}", response_model=AgentShopifyConfig)
async def get_agent_shopify_config(
    agent_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permissions("manage_organization"))
):
    """
    Get Shopify configuration for an agent.
    """
    agent_config_repository = AgentShopifyConfigRepository(db)
    config = agent_config_repository.get_agent_shopify_config(agent_id)
    if not config:
        # Return a default config if none exists
        return {"id": "", "agent_id": agent_id, "enabled": False, "shop_id": None, "created_at": None, "updated_at": None}
    return config

@router.post("/agent-config/{agent_id}", response_model=AgentShopifyConfig)
async def save_agent_shopify_config(
    agent_id: str,
    config: AgentShopifyConfigBase,
    organization: Organization = Depends(get_current_organization),
    current_user: User = Depends(require_permissions("manage_organization")),
    db: Session = Depends(get_db)
):
    """
    Save Shopify configuration for an agent.
    """
    # Check if Shopify is connected
    shop_repository = ShopifyShopRepository(db)
    shops = shop_repository.get_shops(limit=1)
    shopify_connected = len(shops) > 0 and any(shop.is_installed for shop in shops)
    
    if not shopify_connected and config.enabled:
        raise HTTPException(status_code=400, detail="Cannot enable Shopify integration: Shopify is not connected")
    
    # If enabled and no shop_id is provided, use the first available shop
    if config.enabled and not config.shop_id and shopify_connected:
        config.shop_id = shops[0].id
    
    # Check if config already exists
    agent_config_repository = AgentShopifyConfigRepository(db)
    existing_config = agent_config_repository.get_agent_shopify_config(agent_id)
    
    if existing_config:
        # Update existing config
        updated_config = agent_config_repository.update_agent_shopify_config(
            agent_id, config
        )
        return updated_config
    else:
        # Create new config
        new_config = agent_config_repository.create_agent_shopify_config(
            AgentShopifyConfigCreate(agent_id=agent_id, enabled=config.enabled, shop_id=config.shop_id)
        )
        return new_config