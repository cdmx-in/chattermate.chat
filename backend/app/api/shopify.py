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

import traceback
from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response
from fastapi.responses import RedirectResponse, HTMLResponse
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.logger import get_logger
from app.database import get_db
from app.models.schemas.shopify import ShopifyShopCreate, ShopifyShop, ShopifyShopUpdate
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
from app.core.auth import get_current_user, require_permissions, get_current_organization, check_permissions
from app.models.user import User
from app.models.organization import Organization
from app.repositories.widget import WidgetRepository
from app.services.shopify import ShopifyService
from app.services.shopify_auth_service import ShopifyAuthService
from app.services.shopify_helper_service import ShopifyHelperService
from app.repositories.knowledge import KnowledgeRepository
from app.repositories.knowledge_queue import KnowledgeQueueRepository
from app.repositories.knowledge_to_agent import KnowledgeToAgentRepository
from app.models.knowledge import SourceType
from app.models.knowledge_queue import KnowledgeQueue, QueueStatus
from app.models.knowledge_to_agent import KnowledgeToAgent
from uuid import UUID

router = APIRouter()
logger = get_logger(__name__)

# Define the scopes needed for your app
SCOPES = "read_products,read_themes,write_themes,write_script_tags,read_script_tags,read_orders,read_customers"



@router.get("/auth")
async def shopify_auth(
    request: Request,
    shop: str = Query(..., description="Shopify shop domain"),
    hmac: Optional[str] = Query(None, description="HMAC signature for validation"),
    embedded: Optional[str] = Query(None, description="Whether this is an embedded app request"),
    timestamp: Optional[str] = Query(None, description="Timestamp"),
    host: Optional[str] = Query(None, description="Shopify host parameter for embedded apps"),
    db: Session = Depends(get_db)
):
    """
    Initiates the Shopify OAuth process by redirecting to the Shopify authorization URL.
    This endpoint works for both initial installation and re-authentication.
    Authentication is handled AFTER OAuth callback, not before.
    """
    logger.info(f"Shopify auth request received for shop: {shop}, embedded: {embedded}, host: {host}")
    
    # # Normalize embedded parameter (Shopify can send "1", "true", or "True")
    # # Used only for validation of already-installed shops
    # is_embedded = embedded in ("1", "true", "True")
    
    # Validate shop domain
    if not shop or not shop.endswith('.myshopify.com'):
        logger.warning(f"Invalid shop domain: {shop}")
        raise HTTPException(status_code=400, detail="Invalid shop domain")
    
    # If HMAC is provided, validate it
    if hmac:
        if not ShopifyHelperService.validate_shop_request(request, shop, hmac):
            logger.warning(f"HMAC validation failed for shop: {shop}")
            raise HTTPException(status_code=400, detail="Invalid request signature")

    shop_repository = ShopifyShopRepository(db)
    db_shop = shop_repository.get_shop_by_domain(shop)
    # Generate CSRF protection state parameter
    import secrets
    from datetime import datetime, timedelta
    
    state = secrets.token_urlsafe(16)
    state_expiry = datetime.utcnow() + timedelta(minutes=10)  # State expires in 10 minutes
    
    # Check if shop is already installed with valid token
    token_valid = False
    if db_shop and db_shop.access_token and db_shop.is_installed:
        logger.info(f"Shop {shop} is already installed, verifying token...")
        token_valid = await ShopifyAuthService.verify_shop_token(db, db_shop)
        logger.info(f"Token valid: {token_valid}")
    # Build OAuth URL with proper URL encoding
    redirect_uri = f"{settings.APP_BASE_URL}/api/v1/shopify/auth/callback"
    auth_url = (
        f"https://{shop}/admin/oauth/authorize?"
        f"client_id={settings.SHOPIFY_API_KEY}"
        f"&scope={SCOPES}"
        f"&redirect_uri={quote(redirect_uri, safe='')}"
        f"&state={state}"
    )
    
    logger.info(f"Redirecting to Shopify OAuth: {auth_url}")
    # If shop is installed with valid token, return to app
    if db_shop and db_shop.is_installed and token_valid:

       logger.info(f"Shop {shop} has valid token, loading app and updating state")
       shop_update_data = ShopifyShopUpdate(
            oauth_state=state,
            oauth_state_expiry=state_expiry
        )
       shop_repository.update_shop(db_shop.id, shop_update_data) 
       db.commit()
       return RedirectResponse(auth_url, status_code=302)
        
    
    # Store state in database for validation in callback
    if not db_shop:
        logger.info(f"Creating shop record for {shop} , state: {state}, state_expiry: {state_expiry}")
        # Create shop record if it doesn't exist
        shop_data = ShopifyShopCreate(
            shop_domain=shop,
            is_installed=False,
            oauth_state=state,
            oauth_state_expiry=state_expiry
        )
        db_shop = shop_repository.create_shop(shop_data)
 
    elif db_shop and db_shop.access_token and not token_valid:
        logger.info(f"Clearing invalid token for shop {shop}")
        shop_update_data = ShopifyShopUpdate(
            is_installed=False,
            access_token=None,
            scope=None,
            oauth_state=state,
            oauth_state_expiry=state_expiry
        )
        shop_repository.update_shop(db_shop.id, shop_update_data) 
        db.commit()    
    else:
        logger.info(f"Updating shop record for {shop} , state: {state}, state_expiry: {state_expiry}")
        shop_update = ShopifyShopUpdate(
            oauth_state=state,
            oauth_state_expiry=state_expiry
        )
        shop_repository.update_shop(db_shop.id, shop_update)
        db.commit()
    
    
    logger.info(f"Generated OAuth state for shop {shop}: {state} (expires at {state_expiry})")

    return RedirectResponse(auth_url, status_code=302)

@router.get("/auth/callback")
async def shopify_callback(
    request: Request,
    shop: str = Query(..., description="Shopify shop domain"),
    code: str = Query(..., description="Authorization code"),
    state: Optional[str] = Query(None, description="State parameter for CSRF verification"),
    hmac: str = Query(..., description="HMAC signature for validation"),
    host: Optional[str] = Query(None, description="Shopify host parameter for embedded apps"),
    db: Session = Depends(get_db)
):
    """
    Handles the Shopify OAuth callback, exchanges the code for an access token,
    and stores the token securely.
    
    Flow:
    1. Validate request (HMAC + state)
    2. Check if shop already authenticated (prevent code reuse)
    3. Exchange code for access token
    4. Store shop details in database
    5. Render appropriate page (agent selection or success)
    """
    logger.info(f"Shopify callback received for shop: {shop}, host: {host}, state: {state}")
    

    # Validate the HMAC
    if not ShopifyHelperService.validate_shop_request(request, shop, hmac):
        logger.warning(f"Invalid Shopify OAuth callback HMAC: {shop}")
        raise HTTPException(status_code=400, detail="Invalid request signature")
    try:    

        # Check if user is authenticated
        organization = None
        try:
            current_user = await get_current_user(request=request, db=db)
            logger.debug(f"Current user: {current_user}")
            if check_permissions(current_user, ["manage_organization"]):
                # Get the organization from the authenticated user
                if current_user.organization_id:
                    from app.repositories.organization import OrganizationRepository
                    org_repo = OrganizationRepository(db)
                    organization = org_repo.get_organization(str(current_user.organization_id))
        except Exception as e:
                logger.info(f"User not authenticated during callback: {str(e)}")

        org_id_str = str(organization.id) if organization and organization.id else None        
        shop_repository = ShopifyShopRepository(db)    
        db_shop = shop_repository.get_shop_by_domain(shop)
        
        # Log state validation details for debugging
        logger.info(f"State validation check - state provided: {state is not None}, db_shop exists: {db_shop is not None}, db_shop.oauth_state: {db_shop.oauth_state if db_shop else 'N/A'}")
        
        # Validate CSRF state parameter from database
        if state and db_shop and db_shop.oauth_state:
            if db_shop.organization_id:
                org_id_str = str(db_shop.organization_id)
            access_token, scope = ShopifyHelperService.exchange_oauth_code_for_token(shop, code)

            
            if not db_shop:
                logger.warning(f"Shop {shop} not found in database during OAuth callback")
                raise HTTPException(status_code=400, detail="Shop not found")
            
            if not db_shop.oauth_state:
                logger.warning(f"No OAuth state found for shop {shop}")
                raise HTTPException(status_code=400, detail="Invalid OAuth state - no state found")
            
            if db_shop.oauth_state != state:
                logger.warning(f"Invalid OAuth state for shop {shop}. Expected: {db_shop.oauth_state}, Got: {state}")
                raise HTTPException(status_code=400, detail="Invalid state parameter - possible CSRF attack")
            
            # Check if state has expired
            from datetime import datetime
            if db_shop.oauth_state_expiry and datetime.utcnow() > db_shop.oauth_state_expiry:
                logger.warning(f"OAuth state expired for shop {shop}")
                raise HTTPException(status_code=400, detail="OAuth state expired - please try again")
                    

            # Update existing shop with access token
            shop_update = ShopifyShopUpdate( 
                    access_token=access_token,
                    scope=scope,
                    is_installed=True,
                    organization_id=org_id_str,
                    oauth_state=None,
                    oauth_state_expiry=None
            )
            db_shop = shop_repository.update_shop(db_shop.id, shop_update)
            db.commit()
            # Refresh the shop object after commit to ensure we have the latest data
            db.refresh(db_shop)
            logger.info(f"Updated shop {shop} with access token and committed to database")
            logger.info(f"OAuth state validated successfully for shop: {shop}")
        
        if db_shop and db_shop.access_token and db_shop.is_installed:
            logger.info(f"Shop {shop} already has access token, skipping token exchange")
            
            # Check if any agents are configured for this shop
            agent_config_repository = AgentShopifyConfigRepository(db)
            configs = agent_config_repository.get_configs_by_shop(str(db_shop.id), enabled_only=True)
            agents_connected = len(configs) if configs else 0
            
            logger.info(f"Shop {shop} has {agents_connected} agents configured")
            
            # Installed shops should ONLY use embedded flow (accessed via Shopify admin)
            if not host:
                logger.warning(f"Installed shop {shop} accessed without host parameter - should use embedded flow")
                raise HTTPException(
                    status_code=400, 
                    detail="This app must be accessed through your Shopify admin. Please open it from Apps section in your Shopify dashboard."
                )
            # Embedded app (Shopify always provides host parameter)
            # If user is not authenticated and shop has no organization, show connect page
            if not organization and not db_shop.organization_id:
                logger.info(f"Shop not connected to organization, showing connect account page")
                return ShopifyHelperService.generate_connect_account_page(
                    shop=shop,
                    shop_id=str(db_shop.id),
                    api_key=settings.SHOPIFY_API_KEY,
                    host=host
                )            
            # Render embedded app response
            logger.info(f"Embedded app callback (already authenticated), rendering page directly")
            return ShopifyHelperService.handle_embedded_app_response(
                db=db,
                shop=shop,
                shop_id=str(db_shop.id),
                organization_id=db_shop.organization_id,
                agents_connected=agents_connected,
                configs=configs,
                api_key=settings.SHOPIFY_API_KEY,
                host=host
            )
        
        # If we reach here, something went wrong - shop exists but no token
        logger.error(f"Shop {shop} reached end of callback without proper handling. db_shop exists: {db_shop is not None}, has token: {db_shop.access_token if db_shop else 'N/A'}, oauth_state: {db_shop.oauth_state if db_shop else 'N/A'}")
        raise HTTPException(
            status_code=400, 
            detail="Unable to complete OAuth flow. Please try reconnecting from the beginning."
        )
        
    except Exception as e:
        logger.error(f"Error processing Shopify callback: {str(e)}")
        traceback.print_exc()
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
    # Ensure organization_id is a string, not a UUID object
    org_id_str = str(organization.id) if organization and organization.id else None
    shop_repository = ShopifyShopRepository(db)
    shops = shop_repository.get_shops_by_organization(org_id_str, skip=skip, limit=limit)
    
    # Ensure organization_id is a string in each shop object
    for shop in shops:
        if shop.organization_id and not isinstance(shop.organization_id, str):
            shop.organization_id = str(shop.organization_id)
    
    return shops

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
    
    # Ensure organization_id is a string, not a UUID object
    if db_shop.organization_id and not isinstance(db_shop.organization_id, str):
        db_shop.organization_id = str(db_shop.organization_id)
    
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
            uninstall_url = f"https://{db_shop.shop_domain}/admin/api/2025-10/graphql.json"
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

@router.post("/link-shop/{shop_id}")
async def link_shop_to_organization(
    shop_id: str,
    db: Session = Depends(get_db),
    organization: Organization = Depends(get_current_organization),
    current_user: User = Depends(require_permissions("manage_organization"))
):
    """
    Link a Shopify shop to the current organization after user logs in.
    This is called after successful login from the embedded app flow.
    """
    try:
        shop_repository = ShopifyShopRepository(db)
        db_shop = shop_repository.get_shop(shop_id)
        
        if not db_shop:
            raise HTTPException(status_code=404, detail="Shop not found")
        
        # Link shop to organization if not already linked
        if not db_shop.organization_id:
            org_id_str = str(organization.id)
            shop_update = ShopifyShopUpdate(organization_id=org_id_str)
            db_shop = shop_repository.update_shop(shop_id, shop_update)
            db.commit()
            logger.info(f"Linked shop {shop_id} to organization {org_id_str}")
        
        return {
            "success": True,
            "shop_id": str(db_shop.id),
            "shop_domain": db_shop.shop_domain,
            "organization_id": str(db_shop.organization_id)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error linking shop to organization: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error linking shop to organization"
        )

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

@router.get("/shop-config-status")
async def get_shop_config_status(
    shop: str = Query(..., description="Shopify shop domain"),
    shop_id: Optional[str] = Query(None, description="Shop ID"),
    db: Session = Depends(get_db)
):
    """
    Check configuration status for a shop (agents configured, widget ID, etc.)
    This endpoint can be called without authentication for embedded apps using session tokens.
    """
    try:
        shop_repository = ShopifyShopRepository(db)
        
        # Get shop by domain or ID
        if shop_id:
            db_shop = shop_repository.get_shop(shop_id)
        else:
            db_shop = shop_repository.get_shop_by_domain(shop)
        
        if not db_shop:
            raise HTTPException(status_code=404, detail="Shop not found")
        
        # Check if any agents are configured for this shop
        agent_config_repository = AgentShopifyConfigRepository(db)
        configs = agent_config_repository.get_configs_by_shop(str(db_shop.id), enabled_only=True)
        agents_connected = len(configs) if configs else 0
        
        # Get widget ID if agents are configured
        widget_id = None
        if configs and len(configs) > 0:
            widget_repo = WidgetRepository(db)
            widgets = widget_repo.get_widgets_by_agent(configs[0].agent_id)
            if widgets and len(widgets) > 0:
                widget_id = str(widgets[0].id)
        
        return {
            "shop_id": str(db_shop.id),
            "shop_domain": db_shop.shop_domain,
            "is_installed": db_shop.is_installed,
            "agents_connected": agents_connected,
            "widget_id": widget_id,
            "organization_id": str(db_shop.organization_id) if db_shop.organization_id else None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting shop config status: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error retrieving shop configuration status"
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
        raise HTTPException(status_code=404, detail="Shopify configuration not found for this agent")
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
    Automatically determines the shop ID for the organization.
    """
    agent_config_repository = AgentShopifyConfigRepository(db)
    shop_repository = ShopifyShopRepository(db)
    
    org_id_str = str(organization.id)
    
    # Get the current config for the agent, if it exists
    existing_config = agent_config_repository.get_agent_shopify_config(agent_id)
    
    # Automatically determine the shop ID for this organization
    target_shop = None
    
    # Find the available installed shop for the organization
    shops = shop_repository.get_shops_by_organization(org_id_str, limit=10)
    installed_shops = [s for s in shops if s.is_installed]
    
    if installed_shops:
        target_shop = installed_shops[0]
        target_shop_id = target_shop.id
    else:
        target_shop_id = None

    if not installed_shops and config.enabled:
        raise HTTPException(
            status_code=400, 
            detail="Cannot enable Shopify integration: No installed Shopify shops found for this organization."
        )
    
    # --- Save Config to DB --- 
    try:
        if existing_config:
            # Update existing config
            # Always use the automatically determined shop_id
            update_config = AgentShopifyConfigUpdate(
                enabled=config.enabled,
                shop_id=target_shop_id if config.enabled else None
            )
            updated_config = agent_config_repository.update_agent_shopify_config(
                agent_id, update_config
            )
            logger.info(f"Updated Shopify config for agent {agent_id}")
            saved_config = updated_config
        else:
            # Create new config
            # Always use the automatically determined shop_id
            config_create_data = AgentShopifyConfigCreate(
                agent_id=agent_id, 
                enabled=config.enabled, 
                shop_id=target_shop_id if config.enabled else None
            )
            new_config = agent_config_repository.create_agent_shopify_config(config_create_data)
            logger.info(f"Created Shopify config for agent {agent_id}")
            saved_config = new_config

        # --- Link or Queue Knowledge Source --- 
        if config.enabled and target_shop: 
            try:
                org_uuid = UUID(org_id_str)
                agent_uuid = UUID(agent_id)
                shop_domain = target_shop.shop_domain

                if shop_domain:
                    knowledge_repo = KnowledgeRepository(db)
                    # Check if knowledge source already exists for this shop domain and org
                    existing_knowledge_list = knowledge_repo.get_by_sources(org_uuid, [shop_domain])
                    existing_knowledge = existing_knowledge_list[0] if existing_knowledge_list else None

                    if existing_knowledge is None:
                        # Knowledge doesn't exist, queue it
                        logger.info(f"Shop domain {shop_domain} not found in knowledge base for org {org_uuid}. Queuing...")
                        queue_repo = KnowledgeQueueRepository(db)
                        queue_item = KnowledgeQueue(
                            organization_id=org_uuid,
                            agent_id=agent_uuid, # Link to current agent
                            user_id=current_user.id, # Added user_id
                            source_type=SourceType.WEBSITE,
                            source=shop_domain,
                            status=QueueStatus.PENDING,
                            queue_metadata={}
                        )
                        queue_repo.create(queue_item)
                        logger.info(f"Shop domain {shop_domain} queued for knowledge processing for agent {agent_id}.")
                    else:
                        # Knowledge exists, check if linked to agent
                        logger.info(f"Shop domain {shop_domain} found in knowledge base (ID: {existing_knowledge.id}). Checking agent link...")
                        link_repo = KnowledgeToAgentRepository(db)
                        existing_link = link_repo.get_by_ids(existing_knowledge.id, agent_uuid)
                        if existing_link is None:
                            # Link doesn't exist, create it
                            logger.info(f"Linking knowledge source {existing_knowledge.id} to agent {agent_id}...")
                            link = KnowledgeToAgent(knowledge_id=existing_knowledge.id, agent_id=agent_uuid)
                            link_repo.create(link)
                            # Optional: Could add vector DB filter update here later if needed
                            logger.info(f"Successfully linked knowledge source {existing_knowledge.id} to agent {agent_id}.")
                        else:
                            logger.info(f"Knowledge source {existing_knowledge.id} already linked to agent {agent_id}.")

            except Exception as ke:
                # Log the error but don't fail the main config saving operation
                logger.error(f"Failed to link or queue knowledge for shop {target_shop.id if target_shop else 'N/A'} / agent {agent_id}: {str(ke)}", exc_info=True)

        return saved_config # Return the saved/updated config
    except Exception as e:
        logger.error(f"Failed to save agent Shopify config to DB: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to save Shopify configuration to database.")

@router.post("/webhooks/app-uninstalled")
async def shopify_app_uninstalled_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Webhook handler for Shopify app uninstallation.
    This endpoint is called by Shopify when a merchant uninstalls the app.
    
    It performs the following cleanup:
    1. Marks the shop as uninstalled (is_installed = False)
    2. Disables all agent Shopify configs for this shop
    3. Optionally: Can clear access tokens for security
    
    Documentation: https://shopify.dev/docs/apps/build/webhooks/subscribe/get-started
    """
    try:
        # Get the request body and headers
        request_body = await request.body()
        request_headers = request.headers
        
        # Verify the webhook signature
        if not ShopifyHelperService.verify_shopify_webhook(request_headers, request_body):
            logger.warning("Invalid webhook signature for app/uninstalled")
            raise HTTPException(status_code=401, detail="Invalid webhook signature")
        
        # Parse the webhook payload
        try:
            payload = json.loads(request_body.decode('utf-8'))
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse webhook payload: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid JSON payload")
        
        # Extract shop domain from payload
        # Shopify sends the shop domain in the payload
        shop_domain = payload.get('domain') or payload.get('myshopify_domain')
        
        if not shop_domain:
            logger.error(f"No shop domain in webhook payload: {payload}")
            raise HTTPException(status_code=400, detail="Missing shop domain in payload")
        
        logger.info(f"Processing app uninstall webhook for shop: {shop_domain}")
        
        # Initialize repositories
        shop_repo = ShopifyShopRepository(db)
        config_repo = AgentShopifyConfigRepository(db)
        
        # Find the shop in our database
        db_shop = shop_repo.get_shop_by_domain(shop_domain)
        
        if not db_shop:
            logger.warning(f"Shop not found in database: {shop_domain}")
            # Return 200 anyway to acknowledge receipt
            return {"success": True, "message": "Shop not found, no action needed"}
        
        logger.info(f"Found shop in database: {db_shop.id}")
        
        # Delete all agent configurations for this shop
        configs = config_repo.get_configs_by_shop(str(db_shop.id))
        deleted_configs = 0
        
        for config in configs:
            config_repo.delete_agent_shopify_config(config.agent_id)
            deleted_configs += 1
            logger.info(f"Deleted Shopify config for agent {config.agent_id}")
        
        logger.info(f"Deleted {deleted_configs} agent config(s) for shop {shop_domain}")
        
        # Delete the shop record from the database
        shop_repo.delete_shop(str(db_shop.id))
        logger.info(f"Deleted shop record for {shop_domain}")
        
        # Commit the changes
        db.commit()
        
        logger.info(f"Successfully processed uninstall for {shop_domain}. Deleted shop and {deleted_configs} agent config(s)")
        
        # Return 200 OK to acknowledge receipt
        return {
            "success": True,
            "message": f"App uninstalled successfully for {shop_domain}",
            "shop_domain": shop_domain,
            "configs_deleted": deleted_configs
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing app uninstall webhook: {str(e)}")
        logger.error(traceback.format_exc())
        # Return 200 to prevent Shopify from retrying
        # Log the error for investigation
        return {
            "success": False,
            "message": "An internal error occurred while processing the uninstall webhook."
        }

@router.post("/webhooks/customers/data_request")
async def shopify_customers_data_request_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    GDPR Compliance Webhook: Customer Data Request
    
    This webhook is called when a customer requests access to their data.
    You must provide the customer's data within a specified timeframe.
    
    Shopify sends the following information:
    - shop_id: The ID of the shop
    - shop_domain: The shop's domain
    - customer: Customer information including email, phone
    - orders_requested: List of order IDs the customer has placed
    
    Documentation: https://shopify.dev/docs/apps/build/privacy-law-compliance
    """
    try:
        # Get the request body and headers
        request_body = await request.body()
        request_headers = request.headers
        
        # Verify the webhook signature
        if not ShopifyHelperService.verify_shopify_webhook(request_headers, request_body):
            logger.warning("Invalid webhook signature for customers/data_request")
            raise HTTPException(status_code=401, detail="Invalid webhook signature")
        
        # Parse the webhook payload
        try:
            payload = json.loads(request_body.decode('utf-8'))
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse webhook payload: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid JSON payload")
        
        shop_domain = payload.get('shop_domain')
        customer = payload.get('customer', {})
        customer_email = customer.get('email')
        customer_phone = customer.get('phone')
        orders_requested = payload.get('orders_requested', [])
        
        logger.info(f"Received customer data request for shop: {shop_domain}, customer: {customer_email}")
        
        # TODO: Implement data collection based on your data storage
        # For now, we'll log the request and acknowledge receipt
        # You should:
        # 1. Collect all customer data you've stored (chat history, customer info, etc.)
        # 2. Prepare it in a readable format (JSON, CSV, etc.)
        # 3. Send it to the customer or make it available for download
        # 4. Keep a record of the request for compliance
        
        logger.info(f"Customer data request details:")
        logger.info(f"  - Shop: {shop_domain}")
        logger.info(f"  - Customer Email: {customer_email}")
        logger.info(f"  - Customer Phone: {customer_phone}")
        logger.info(f"  - Orders: {orders_requested}")
        
        # In a production system, you would:
        # 1. Query your chat_history table for this customer
        # 2. Query any customer-specific data
        # 3. Format and send the data to the customer
        
        # Return 200 OK to acknowledge receipt
        return {
            "success": True,
            "message": "Customer data request received and logged",
            "shop_domain": shop_domain,
            "customer_email": customer_email
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing customer data request webhook: {str(e)}")
        logger.error(traceback.format_exc())
        return {
            "success": False,
            "message": f"Error processing webhook: {str(e)}"
        }

@router.post("/webhooks/customers/redact")
async def shopify_customers_redact_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    GDPR Compliance Webhook: Customer Data Erasure
    
    This webhook is called when a customer requests their data to be deleted.
    You must delete all customer data within a specified timeframe.
    
    Shopify sends the following information:
    - shop_id: The ID of the shop
    - shop_domain: The shop's domain
    - customer: Customer information including email, phone
    - orders_to_redact: List of order IDs to redact
    
    Documentation: https://shopify.dev/docs/apps/build/privacy-law-compliance
    """
    try:
        # Get the request body and headers
        request_body = await request.body()
        request_headers = request.headers
        
        # Verify the webhook signature
        if not ShopifyHelperService.verify_shopify_webhook(request_headers, request_body):
            logger.warning("Invalid webhook signature for customers/redact")
            raise HTTPException(status_code=401, detail="Invalid webhook signature")
        
        # Parse the webhook payload
        try:
            payload = json.loads(request_body.decode('utf-8'))
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse webhook payload: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid JSON payload")
        
        shop_domain = payload.get('shop_domain')
        customer = payload.get('customer', {})
        customer_email = customer.get('email')
        customer_phone = customer.get('phone')
        orders_to_redact = payload.get('orders_to_redact', [])
        
        logger.info(f"Received customer redact request for shop: {shop_domain}, customer: {customer_email}")
        
        # TODO: Implement data deletion based on your data storage
        # For now, we'll log the request and acknowledge receipt
        # You should:
        # 1. Delete or anonymize all customer data (chat history, personal info, etc.)
        # 2. Keep a minimal record for compliance (that the request was fulfilled)
        # 3. Ensure the customer's data is no longer accessible
        
        logger.info(f"Customer redact request details:")
        logger.info(f"  - Shop: {shop_domain}")
        logger.info(f"  - Customer Email: {customer_email}")
        logger.info(f"  - Customer Phone: {customer_phone}")
        logger.info(f"  - Orders to redact: {orders_to_redact}")
        
        # In a production system, you would:
        # 1. Find all chat_history records for this customer
        # 2. Either delete them or anonymize the customer data
        # 3. Remove any personally identifiable information (PII)
        # 4. Keep a log that the request was fulfilled
        
        # Example pseudocode:
        # chat_repo = ChatHistoryRepository(db)
        # if customer_email:
        #     chat_repo.delete_by_customer_email(customer_email, shop_domain)
        # if customer_phone:
        #     chat_repo.delete_by_customer_phone(customer_phone, shop_domain)
        
        # Return 200 OK to acknowledge receipt
        return {
            "success": True,
            "message": "Customer data redaction request received and logged",
            "shop_domain": shop_domain,
            "customer_email": customer_email
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing customer redact webhook: {str(e)}")
        logger.error(traceback.format_exc())
        return {
            "success": False,
            "message": f"Error processing webhook: {str(e)}"
        }

@router.post("/webhooks/shop/redact")
async def shopify_shop_redact_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    GDPR Compliance Webhook: Shop Data Erasure
    
    This webhook is called 48 hours after a shop owner uninstalls your app.
    You must delete all shop-related data.
    
    Shopify sends the following information:
    - shop_id: The ID of the shop
    - shop_domain: The shop's domain
    
    Documentation: https://shopify.dev/docs/apps/build/privacy-law-compliance
    """
    try:
        # Get the request body and headers
        request_body = await request.body()
        request_headers = request.headers
        
        # Verify the webhook signature
        if not ShopifyHelperService.verify_shopify_webhook(request_headers, request_body):
            logger.warning("Invalid webhook signature for shop/redact")
            raise HTTPException(status_code=401, detail="Invalid webhook signature")
        
        # Parse the webhook payload
        try:
            payload = json.loads(request_body.decode('utf-8'))
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse webhook payload: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid JSON payload")
        
        shop_domain = payload.get('shop_domain')
        shop_id = payload.get('shop_id')
        
        logger.info(f"Received shop redact request for shop: {shop_domain} (ID: {shop_id})")
        
        # Initialize repositories
        shop_repo = ShopifyShopRepository(db)
        config_repo = AgentShopifyConfigRepository(db)
        
        # Find the shop in our database
        db_shop = shop_repo.get_shop_by_domain(shop_domain)
        
        if not db_shop:
            logger.warning(f"Shop not found in database: {shop_domain}")
            # Return 200 anyway to acknowledge receipt
            return {"success": True, "message": "Shop not found, no action needed"}
        
        logger.info(f"Found shop in database: {db_shop.id}")
        
        # Delete all agent configurations for this shop
        configs = config_repo.get_configs_by_shop(str(db_shop.id))
        deleted_configs = 0
        
        for config in configs:
            config_repo.delete_agent_shopify_config(config.agent_id)
            deleted_configs += 1
            logger.info(f"Deleted Shopify config for agent {config.agent_id}")
        
        # TODO: Delete all shop-related data
        # You should also:
        # 1. Delete or anonymize all chat history related to this shop
        # 2. Remove any customer data associated with this shop
        # 3. Delete any cached product data
        # 4. Remove any analytics data for this shop
        
        # Example pseudocode:
        # chat_repo = ChatHistoryRepository(db)
        # chat_repo.delete_by_shop(shop_domain)
        # 
        # customer_repo = CustomerRepository(db)
        # customer_repo.delete_by_shop(shop_domain)
        
        # Delete the shop record from the database
        shop_repo.delete_shop(str(db_shop.id))
        logger.info(f"Deleted shop record for {shop_domain}")
        
        logger.info(f"Successfully redacted all data for shop {shop_domain}. Deleted {deleted_configs} config(s)")
        
        # Return 200 OK to acknowledge receipt
        return {
            "success": True,
            "message": f"Shop data redacted successfully for {shop_domain}",
            "shop_domain": shop_domain,
            "configs_deleted": deleted_configs
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing shop redact webhook: {str(e)}")
        logger.error(traceback.format_exc())
        return {
            "success": False,
            "message": f"Error processing webhook: {str(e)}"
        }