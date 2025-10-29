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
    def generate_success_page_html(
        shop: str,
        shop_id: str,
        agents_connected: int,
        widget_id: Optional[str],
        api_key: str
    ) -> str:
        """
        Generate HTML for Shopify success page that renders inline (no redirect).
        This provides the best UX for embedded apps - stays within Shopify admin.
        
        Args:
            shop: Shop domain (e.g., store.myshopify.com)
            shop_id: Shop ID
            agents_connected: Number of connected agents
            widget_id: Widget ID (optional)
            api_key: Shopify API key
            
        Returns:
            HTML string
        """
        shop_name = shop.replace('.myshopify.com', '')
        widget_id_display = widget_id if widget_id else "No widget configured yet"
        
        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatterMate - Setup Complete</title>
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1F2937;
            margin: 0;
            padding: 20px;
            background-color: #F9FAFB;
        }}
        .container {{
            max-width: 700px;
            margin: 0 auto;
            padding: 30px;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }}
        .success-icon {{
            color: #10B981;
            font-size: 48px;
            text-align: center;
            margin-bottom: 20px;
        }}
        h1 {{
            color: #111827;
            text-align: center;
            margin-bottom: 10px;
            font-size: 1.8rem;
        }}
        p {{
            text-align: center;
            margin-bottom: 16px;
            color: #4B5563;
        }}
        .info-box {{
            background-color: #ECFDF5;
            border: 1px solid #10B981;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
        }}
        .info-box p {{
            color: #047857;
            font-size: 1.1rem;
            margin: 0;
            text-align: center;
        }}
        .widget-box {{
            background-color: #FFF7ED;
            border: 1px solid #FB923C;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
            text-align: left;
        }}
        .widget-box h3 {{
            margin: 0 0 12px;
            color: #111827;
            font-size: 1.1rem;
        }}
        .widget-id {{
            background-color: #F3F4F6;
            border: 1px solid #D1D5DB;
            border-radius: 6px;
            padding: 12px;
            margin: 12px 0;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.95rem;
            color: #F24611;
            word-break: break-all;
            user-select: all;
            text-align: center;
        }}
        .features-list {{
            text-align: left;
            margin: 32px 0;
            padding: 20px;
            background-color: #F9FAFB;
            border-radius: 8px;
        }}
        .features-list h3 {{
            color: #111827;
            margin-top: 0;
            margin-bottom: 16px;
            font-size: 1.1rem;
        }}
        .features-list ul {{
            margin: 0;
            padding-left: 0;
            list-style: none;
        }}
        .features-list li {{
            padding: 8px 0;
            color: #4B5563;
            font-size: 0.95rem;
        }}
        .action-buttons {{
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 24px;
        }}
        .btn {{
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.2s;
            font-size: 1rem;
        }}
        .btn-primary {{
            background-color: #F24611;
            color: white;
        }}
        .btn-primary:hover {{
            background-color: #D93B0A;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(242, 70, 17, 0.2);
        }}
        .btn-secondary {{
            background-color: #F3F4F6;
            color: #374151;
            border: 1px solid #D1D5DB;
        }}
        .btn-secondary:hover {{
            background-color: #E5E7EB;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="success-icon">✓</div>
        <h1>Shopify Integration Complete!</h1>
        <p>Your Shopify store <strong>{shop_name}</strong> is now connected to ChatterMate.</p>
        
        {"<div class='info-box'><p>✨ <strong>" + str(agents_connected) + "</strong> AI agent" + ("s are" if agents_connected != 1 else " is") + " connected and ready to assist your customers!</p></div>" if agents_connected > 0 else ""}
        
        {"<div class='widget-box'><h3>📋 Widget Configuration</h3><p>Your Widget ID:</p><div class='widget-id'>" + widget_id_display + "</div><p style='color: #6B7280; font-size: 0.85rem; font-style: italic; margin-top: 12px;'>💡 Use this Widget ID in your Shopify theme settings to display the chat widget.</p></div>" if widget_id else ""}
        
        <div class="features-list">
            <h3>Your AI agents can now:</h3>
            <ul>
                <li>🛍️ Search and display products from your store</li>
                <li>📦 Check order status and tracking</li>
                <li>💡 Recommend products to customers</li>
                <li>❓ Answer product questions instantly</li>
            </ul>
        </div>
        
        <div class="action-buttons">
            <button class="btn btn-primary" onclick="openThemeEditor()">Setup Widget in Shopify</button>
            <button class="btn btn-secondary" onclick="openDashboard()">Go to Dashboard</button>
        </div>
    </div>
    
    <script>
        // Initialize App Bridge
        var AppBridge = window['app-bridge'];
        var createApp = AppBridge.default;
        var Redirect = AppBridge.actions.Redirect;
        
        var urlParams = new URLSearchParams(window.location.search);
        var host = urlParams.get('host');
        
        var app = createApp({{
            apiKey: '{api_key}',
            host: host,
            forceRedirect: true
        }});
        
        function openThemeEditor() {{
            window.open('https://{shop}/admin/themes/current/editor?context=apps', '_blank');
        }}
        
        function openDashboard() {{
            window.open('https://app.chattermate.chat', '_blank');
        }}
        
        console.log('ChatterMate success page loaded for shop: {shop}');
        console.log('Agents connected: {agents_connected}');
        console.log('Widget ID: {widget_id_display}');
    </script>
</body>
</html>"""
    
    @staticmethod
    def generate_redirect_html(shop: str, redirect_path: str, api_key: str) -> str:
        """
        Generate HTML page with Shopify App Bridge for embedded app redirects.
        This returns a 200 response that Shopify's checks can validate.
        
        Args:
            shop: Shop domain
            redirect_path: Path to redirect to
            api_key: Shopify API key
            
        Returns:
            HTML string
        """
        # Properly escape for safe JavaScript embedding
        redirect_path_escaped = (redirect_path
                                 .replace('\\', '\\\\')  # Escape backslashes first
                                 .replace("'", "\\'")     # Escape single quotes
                                 .replace('"', '\\"')     # Escape double quotes
                                 .replace('\n', '\\n'))   # Escape newlines
        
        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        h2 {{ margin: 10px 0; font-weight: 400; }}
        p {{ opacity: 0.9; font-size: 14px; margin: 5px 0; }}
    </style>
</head>
<body>
    <div class="loader">
        <div class="spinner"></div>
        <h2>ChatterMate</h2>
        <p id="status">Setting up your AI assistant...</p>
    </div>
    
    <script>
        (function() {{
            var statusEl = document.getElementById('status');
            var redirectUrl = '{redirect_path_escaped}';
            
            function updateStatus(msg) {{
                if (statusEl) statusEl.textContent = msg;
                console.log('ChatterMate:', msg);
            }}
            
            function fallbackRedirect() {{
                updateStatus('Finalizing setup...');
                setTimeout(function() {{
                    window.top.location.href = redirectUrl;
                }}, 500);
            }}
            
            try {{
                // Get host parameter
                var urlParams = new URLSearchParams(window.location.search);
                var host = urlParams.get('host');
                
                if (!host) {{
                    console.warn('No host parameter, using fallback redirect');
                    fallbackRedirect();
                    return;
                }}
                
                // Wait for App Bridge to load
                if (!window['app-bridge']) {{
                    console.warn('App Bridge not loaded, using fallback redirect');
                    fallbackRedirect();
                    return;
                }}
                
                updateStatus('Connecting to Shopify...');
                
                var AppBridge = window['app-bridge'];
                var createApp = AppBridge.default;
                var Redirect = AppBridge.actions.Redirect;
                
                // Initialize App Bridge
                var app = createApp({{
                    apiKey: '{api_key}',
                    host: host,
                    forceRedirect: true
                }});
                
                console.log('App Bridge initialized for host:', host);
                updateStatus('Redirecting...');
                
                // Dispatch redirect using REMOTE (absolute URL) per Shopify example
                var redirect = Redirect.create(app);
                redirect.dispatch(Redirect.Action.REMOTE, redirectUrl);
                
                console.log('Redirect dispatched to:', redirectUrl);
                
                // Fallback after 3 seconds if redirect didn't work
                setTimeout(fallbackRedirect, 3000);
                
            }} catch (error) {{
                console.error('App Bridge error:', error);
                updateStatus('Completing setup...');
                fallbackRedirect();
            }}
        }})();
    </script>
</body>
</html>"""
    
    @staticmethod
    def generate_agent_selection_page_html(
        shop: str,
        shop_id: str,
        agents: List[Dict[str, Any]],
        api_key: str,
        host: str
    ) -> str:
        """
        Generate HTML for agent selection page (server-side rendered).
        This page allows merchants to select which AI agent to connect with Shopify.
        """
        # Generate agent list HTML
        agents_html = ""
        for agent in agents:
            agent_id = agent.get('id', '')
            agent_name = agent.get('display_name') or agent.get('name', 'Unnamed Agent')
            agent_desc = agent.get('description', '')
            is_active = agent.get('is_active', False)
            active_badge = '<span class="badge active">Active</span>' if is_active else '<span class="badge">Inactive</span>'
            
            agents_html += f"""
            <div class="agent-item" data-agent-id="{agent_id}">
                <label class="agent-item-label">
                    <div class="agent-radio">
                        <input type="radio" name="agent-selection" value="{agent_id}"/>
                    </div>
                    <div class="agent-info">
                        <h3>{agent_name}</h3>
                        {"<p>" + agent_desc + "</p>" if agent_desc else ""}
                        <div class="agent-meta">
                            {active_badge}
                        </div>
                    </div>
                </label>
            </div>
            """
        
        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="shopify-api-key" content="{api_key}" />
    <title>ChatterMate - Select AI Agent</title>
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 20px;
        }}
        .container {{
            max-width: 650px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 30px;
        }}
        .header {{
            text-align: center;
            margin-bottom: 30px;
        }}
        h1 {{
            color: #111827;
            font-size: 1.8rem;
            margin-bottom: 10px;
        }}
        .subtitle {{
            color: #6B7280;
            font-size: 0.95rem;
        }}
        .agent-list {{
            max-height: 400px;
            overflow-y: auto;
            margin-bottom: 24px;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            background: #F9FAFB;
        }}
        .agent-item {{
            border-bottom: 1px solid #E5E7EB;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
        }}
        .agent-item:last-child {{ border-bottom: none; }}
        .agent-item:hover {{
            background: linear-gradient(135deg, #F9FAFB 0%, white 100%);
            transform: translateX(4px);
        }}
        .agent-item.selected {{
            background: linear-gradient(135deg, rgba(243, 70, 17, 0.15) 0%, rgba(243, 70, 17, 0.05) 100%);
            border-left: 4px solid #F34611;
            border-right: 4px solid #F34611;
        }}
        .agent-item-label {{
            display: flex;
            padding: 16px;
            cursor: pointer;
        }}
        .agent-radio {{
            margin-right: 16px;
            padding-top: 2px;
        }}
        .agent-radio input[type="radio"] {{
            width: 20px;
            height: 20px;
            cursor: pointer;
            accent-color: #F34611;
        }}
        .agent-info {{
            flex: 1;
        }}
        .agent-info h3 {{
            font-size: 1rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 6px;
        }}
        .agent-info p {{
            font-size: 0.875rem;
            color: #6B7280;
            margin-bottom: 8px;
            line-height: 1.5;
        }}
        .badge {{
            display: inline-flex;
            padding: 4px 12px;
            font-size: 0.75rem;
            font-weight: 500;
            border-radius: 999px;
            background: #F3F4F6;
            color: #6B7280;
        }}
        .badge.active {{
            background: rgba(16, 185, 129, 0.1);
            color: #10B981;
        }}
        .info-box {{
            background: rgba(59, 130, 246, 0.05);
            border: 1px solid rgba(59, 130, 246, 0.1);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
        }}
        .info-box strong {{
            display: block;
            color: #111827;
            margin-bottom: 8px;
            font-size: 0.875rem;
        }}
        .info-box ul {{
            margin: 0;
            padding-left: 20px;
            font-size: 0.75rem;
            color: #6B7280;
        }}
        .info-box li {{
            margin-bottom: 4px;
        }}
        .action-buttons {{
            display: flex;
            gap: 12px;
            justify-content: flex-end;
        }}
        .btn {{
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }}
        .btn-primary {{
            background: #F34611;
            color: white;
            box-shadow: 0 4px 12px rgba(243, 70, 17, 0.2);
        }}
        .btn-primary:hover:not(:disabled) {{
            background: #D93B0A;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(243, 70, 17, 0.3);
        }}
        .btn-primary:disabled {{
            opacity: 0.6;
            cursor: not-allowed;
        }}
        .spinner {{
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
            display: none;
        }}
        @keyframes spin {{
            to {{ transform: rotate(360deg); }}
        }}
        .empty-state {{
            text-align: center;
            padding: 60px 20px;
        }}
        .empty-icon {{
            font-size: 72px;
            margin-bottom: 20px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Connect Shopify to Your AI Agents</h1>
            <p class="subtitle">Select which AI agent should have access to your Shopify store data</p>
        </div>

        {f'<div class="agent-list">{agents_html}</div>' if agents else '<div class="empty-state"><div class="empty-icon">🤖</div><h2>No AI Agents Found</h2><p>You need to create at least one AI agent before connecting Shopify.</p></div>'}
        
        {f'''
        <div class="info-box">
            <strong>What will selected agents be able to do?</strong>
            <ul>
                <li>🛍️ Search and display products from your Shopify store</li>
                <li>📦 Check order status and tracking information</li>
                <li>💡 Provide product recommendations</li>
                <li>❓ Answer customer questions about products and orders</li>
            </ul>
        </div>

        <div class="action-buttons">
            <button id="connectBtn" class="btn btn-primary" disabled>
                <span class="spinner"></span>
                <span id="btnText">Connect Agent</span>
            </button>
        </div>
        ''' if agents else ''}
    </div>
    
    <script>
        (function() {{
            var shop = '{shop}';
            var shopId = '{shop_id}';
            var host = '{host}';
            var selectedAgentId = null;
            
            // Initialize App Bridge (with error handling)
            var app = null;
            try {{
                var AppBridge = window['app-bridge'];
                if (AppBridge && AppBridge.default) {{
                    var createApp = AppBridge.default;
                    app = createApp({{
                        apiKey: '{api_key}',
                        host: host
                    }});
                }}
            }} catch (e) {{
                console.error('App Bridge initialization failed:', e);
            }}
            
            // Handle agent selection
            var agentItems = document.querySelectorAll('.agent-item');
            var connectBtn = document.getElementById('connectBtn');
            
            agentItems.forEach(function(item) {{
                item.addEventListener('click', function() {{
                    agentItems.forEach(function(i) {{ i.classList.remove('selected'); }});
                    this.classList.add('selected');
                    this.querySelector('input[type="radio"]').checked = true;
                    selectedAgentId = this.dataset.agentId;
                    
                    if (connectBtn) {{
                        connectBtn.disabled = false;
                    }}
                }});
            }});
            
            // Handle connect button
            if (connectBtn) {{
                connectBtn.addEventListener('click', async function() {{
                    if (!selectedAgentId) {{
                        alert('Please select an agent first');
                        return;
                    }}
                    
                    var btnText = document.getElementById('btnText');
                    var spinner = document.querySelector('.spinner');
                    connectBtn.disabled = true;
                    spinner.style.display = 'inline-block';
                    btnText.textContent = 'Connecting...';
                    
                    try {{
                        var token = null;
                        
                        // Try to get session token if App Bridge is available
                        if (app && window['app-bridge'] && window['app-bridge'].utilities) {{
                            try {{
                                var getSessionToken = window['app-bridge'].utilities.getSessionToken;
                                token = await getSessionToken(app);
                            }} catch (tokenError) {{
                                console.warn('Could not get session token:', tokenError);
                            }}
                        }}
                        
                        // Call API to enable Shopify for agent
                        var headers = {{
                            'Content-Type': 'application/json'
                        }};
                        
                        if (token) {{
                            headers['Authorization'] = 'Bearer ' + token;
                        }}
                        
                        var response = await fetch('/api/v1/shopify/enable-agent', {{
                            method: 'POST',
                            headers: headers,
                            credentials: 'include',
                            body: JSON.stringify({{
                                shop_id: shopId,
                                agent_ids: [selectedAgentId]
                            }})
                        }});
                        
                        if (response.ok) {{
                            // Redirect to success page
                            window.location.href = '/api/v1/shopify/success?shop=' + shop + '&shop_id=' + shopId + '&host=' + host;
                        }} else {{
                            throw new Error('Failed to connect agent');
                        }}
                    }} catch (error) {{
                        console.error('Error:', error);
                        alert('Failed to connect agent. Please try again.');
                        connectBtn.disabled = false;
                        spinner.style.display = 'none';
                        btnText.textContent = 'Connect Agent';
                    }}
                }});
            }}
        }})();
    </script>
</body>
</html>"""

