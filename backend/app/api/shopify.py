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
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.logger import get_logger
from app.database import get_db
from app.models.schemas.shop import ShopCreate, Shop
from app.repositories import shop_repository
from typing import Optional
import requests
import hmac
import hashlib
import base64
import json
from urllib.parse import urlencode, quote

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
    # Check if the shop URL is a valid Shopify domain
    if not shop.endswith('.myshopify.com'):
        return False
    
    # Validate HMAC signature
    params = dict(request.query_params)
    
    # Remove hmac from the parameters
    received_hmac = params.pop('hmac', None)
    if not received_hmac or received_hmac != hmac_param:
        return False
    
    # Sort and encode parameters
    sorted_params = "&".join([f"{key}={quote(value)}" for key, value in sorted(params.items())])
    
    # Calculate HMAC
    digest = hmac.new(
        settings.SHOPIFY_API_SECRET.encode('utf-8'),
        sorted_params.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    # Verify HMAC
    return hmac.compare_digest(digest, hmac_param)

@router.get("/auth")
async def shopify_auth(
    request: Request,
    shop: str = Query(..., description="Shopify shop domain"),
    db: Session = Depends(get_db)
):
    """
    Initiates the Shopify OAuth process by redirecting to the Shopify authorization URL.
    """
    # Check if the shop already exists and has a valid token
    db_shop = shop_repository.get_shop_by_domain(db, shop)
    if db_shop and db_shop.access_token and db_shop.is_installed:
        return {"status": "already_installed", "shop": shop}
    
    # Initialize OAuth flow
    nonce = base64.b64encode(hashlib.sha256(shop.encode('utf-8')).digest()).decode('utf-8')
    
    # Create auth URL
    redirect_uri = f"{settings.APP_BASE_URL}/api/v1/shopify/auth/callback"
    auth_url = f"https://{shop}/admin/oauth/authorize?client_id={settings.SHOPIFY_API_KEY}&scope={SCOPES}&redirect_uri={redirect_uri}&state={nonce}"
    
    return RedirectResponse(auth_url)

@router.get("/auth/callback")
async def shopify_callback(
    request: Request,
    shop: str = Query(..., description="Shopify shop domain"),
    code: str = Query(..., description="Authorization code"),
    state: Optional[str] = Query(None, description="State parameter for verification"),
    hmac: str = Query(..., description="HMAC signature for validation"),
    db: Session = Depends(get_db)
):
    """
    Handles the Shopify OAuth callback, exchanges the code for an access token,
    and stores the token securely.
    """
    # Validate the request
    if not validate_shop_request(request, shop, hmac):
        logger.warning(f"Invalid Shopify OAuth callback: {shop}")
        raise HTTPException(status_code=400, detail="Invalid request")
    
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
        
        # Store or update the shop in the database
        db_shop = shop_repository.get_shop_by_domain(db, shop)
        if db_shop:
            # Update existing shop
            shop_repository.update_shop(
                db, 
                db_shop.id, 
                {"access_token": access_token, "scope": scope, "is_installed": True}
            )
        else:
            # Create new shop
            shop_data = ShopCreate(
                shop_domain=shop,
                access_token=access_token,
                scope=scope,
                is_installed=True
            )
            shop_repository.create_shop(db, shop_data)
        
        # Redirect to the app or admin section
        redirect_url = f"https://{shop}/admin/apps/{settings.SHOPIFY_API_KEY}"
        return RedirectResponse(redirect_url)
    
    except Exception as e:
        logger.error(f"Error processing Shopify callback: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing callback")

@router.get("/shops", response_model=list[Shop])
async def get_shops(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    """
    Get all shops
    """
    return shop_repository.get_shops(db, skip=skip, limit=limit)

@router.get("/shops/{shop_id}", response_model=Shop)
async def get_shop(
    shop_id: str,
    db: Session = Depends(get_db)
):
    """
    Get a shop by ID
    """
    db_shop = shop_repository.get_shop(db, shop_id)
    if not db_shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    return db_shop 