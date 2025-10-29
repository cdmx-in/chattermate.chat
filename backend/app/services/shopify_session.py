"""
ChatterMate - Shopify Session Token Validation
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

import jwt
import time
from typing import Optional, Dict, Any
from fastapi import Request, HTTPException
from app.core.config import settings
from app.core.logger import get_logger

logger = get_logger(__name__)


class ShopifySessionService:
    """Service for handling Shopify session token validation"""
    
    @staticmethod
    def get_session_token_from_request(request: Request) -> Optional[str]:
        """
        Get session token from request header or URL parameter.
        Per Shopify docs, session token can be in:
        1. Authorization header: Bearer <token>
        2. URL query parameter: id_token
        """
        # Try to get from Authorization header first
        auth_header = request.headers.get('authorization', '')
        if auth_header.startswith('Bearer '):
            token = auth_header.replace('Bearer ', '').strip()
            if token:
                return token
        
        # Try to get from URL query parameter
        id_token = request.query_params.get('id_token')
        if id_token:
            return id_token
        
        return None
    
    @staticmethod
    def validate_session_token(token: str) -> Dict[str, Any]:
        """
        Validate and decode Shopify session token.
        Returns decoded token payload if valid.
        Raises HTTPException if invalid.
        """
        try:
            # Decode without verification first to get the shop
            unverified = jwt.decode(token, options={"verify_signature": False})
            
            # Verify the token with Shopify's public key
            # Note: In production, you should fetch and cache Shopify's public keys
            # For now, we'll do basic validation
            decoded = jwt.decode(
                token,
                settings.SHOPIFY_API_SECRET,
                algorithms=["HS256"],
                audience=settings.SHOPIFY_API_KEY
            )
            
            # Check expiration
            exp = decoded.get('exp')
            if exp and exp < time.time():
                raise HTTPException(status_code=401, detail="Session token expired")
            
            # Check nbf (not before)
            nbf = decoded.get('nbf')
            if nbf and nbf > time.time():
                raise HTTPException(status_code=401, detail="Session token not yet valid")
            
            logger.info(f"Session token validated for shop: {decoded.get('dest')}")
            return decoded
            
        except jwt.ExpiredSignatureError:
            logger.warning("Session token expired")
            raise HTTPException(
                status_code=401,
                detail="Session token expired",
                headers={"X-Shopify-Retry-Invalid-Session-Request": "1"}
            )
        except jwt.InvalidTokenError as e:
            logger.warning(f"Invalid session token: {str(e)}")
            raise HTTPException(
                status_code=401,
                detail="Invalid session token",
                headers={"X-Shopify-Retry-Invalid-Session-Request": "1"}
            )
    
    @staticmethod
    def is_document_request(request: Request) -> bool:
        """
        Check if this is a document request (initial page load) vs API request.
        Document requests typically don't have Authorization header.
        """
        return not request.headers.get("authorization")
    
    @staticmethod
    def generate_bounce_page_html(shop: str, redirect_path: str, api_key: str) -> str:
        """
        Generate HTML for session token bounce page.
        This page uses App Bridge to retrieve a fresh session token,
        then redirects back with the token in the URL.
        """
        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="shopify-api-key" content="{api_key}" />
    <title>ChatterMate - Loading...</title>
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
        <h2>Loading ChatterMate...</h2>
        <p>Authenticating...</p>
    </div>
    
    <script>
        (function() {{
            try {{
                // Get App Bridge from window
                var AppBridge = window['app-bridge'];
                if (!AppBridge || !AppBridge.default) {{
                    throw new Error('App Bridge not loaded');
                }}
                
                var createApp = AppBridge.default;
                var getSessionToken = AppBridge.utilities.getSessionToken;
                
                // Create app instance
                var app = createApp({{
                    apiKey: '{api_key}',
                    host: new URLSearchParams(window.location.search).get('host'),
                }});
                
                // Get session token and redirect back with it
                getSessionToken(app).then(function(token) {{
                    var redirectUrl = '{redirect_path}';
                    var separator = redirectUrl.includes('?') ? '&' : '?';
                    window.location.href = redirectUrl + separator + 'id_token=' + token;
                }}).catch(function(error) {{
                    console.error('Failed to get session token:', error);
                    document.querySelector('p').textContent = 'Authentication failed. Please try again.';
                }});
                
            }} catch (error) {{
                console.error('App Bridge error:', error);
                document.querySelector('p').textContent = 'Failed to load. Please refresh the page.';
            }}
        }})();
    </script>
</body>
</html>"""





