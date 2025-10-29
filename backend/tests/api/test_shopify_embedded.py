"""
ChatterMate - Test Shopify Embedded App Endpoints
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

import pytest
from unittest.mock import MagicMock, patch, AsyncMock
from fastapi import HTTPException
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
import uuid

from app.core.application import app  # Import FastAPI app before SocketIO wrapping
from app.api.shopify_embedded import router
from app.models.shopify import ShopifyShop
from app.database import get_db


@pytest.fixture
def mock_db():
    """Create a mock database session"""
    db = MagicMock(spec=Session)
    return db


@pytest.fixture
def api_client(mock_db):
    """Create a TestClient for the FastAPI app with mocked database"""
    # Override the get_db dependency to return our mock
    app.dependency_overrides[get_db] = lambda: mock_db
    
    client = TestClient(app)
    
    yield client
    
    # Clean up - remove the override after the test
    app.dependency_overrides.clear()


@pytest.fixture
def mock_shop():
    """Create a mock Shopify shop"""
    shop = MagicMock(spec=ShopifyShop)
    shop.id = str(uuid.uuid4())
    shop.shop_domain = "test-shop.myshopify.com"
    shop.is_installed = True
    shop.organization_id = str(uuid.uuid4())
    return shop


@pytest.fixture
def mock_agent():
    """Create a mock agent"""
    agent = MagicMock()
    agent.id = str(uuid.uuid4())
    agent.name = "Test Agent"
    agent.display_name = "Test Agent Display"
    agent.description = "Test agent description"
    agent.is_active = True
    return agent


class TestEmbeddedAppHome:
    """Test suite for embedded_app_home endpoint"""
    
    @patch('app.api.shopify_embedded.ShopifyShopRepository')
    def test_embedded_app_home_not_installed(self, mock_shop_repo, api_client, mock_db):
        """Test embedded app home when shop is not installed"""
        # Arrange
        shop = "test-shop.myshopify.com"
        host = "test-host"
        
        mock_shop_repo_instance = MagicMock()
        mock_shop_repo.return_value = mock_shop_repo_instance
        mock_shop_repo_instance.get_shop_by_domain.return_value = None
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/home?shop={shop}&host={host}"
        )
        
        # Assert
        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]
        assert settings.SHOPIFY_API_KEY in response.text
        assert "app-bridge.js" in response.text
        assert "/api/v1/shopify/auth" in response.text
    
    @patch('app.api.shopify_embedded.ShopifyShopRepository')
    @patch('app.api.shopify_embedded.ShopifyAuthService.get_shop_success_data')
    @patch('app.api.shopify_embedded.ShopifyAuthService.generate_success_page_html')
    def test_embedded_app_home_with_agents(
        self, 
        mock_generate_success, 
        mock_get_success_data,
        mock_shop_repo, 
        api_client, 
        mock_db, 
        mock_shop
    ):
        """Test embedded app home when shop has agents configured"""
        # Arrange
        shop = "test-shop.myshopify.com"
        host = "test-host"
        
        mock_shop_repo_instance = MagicMock()
        mock_shop_repo.return_value = mock_shop_repo_instance
        mock_shop_repo_instance.get_shop_by_domain.return_value = mock_shop
        
        mock_get_success_data.return_value = (2, "widget-123")
        mock_generate_success.return_value = "<html>Success Page</html>"
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/home?shop={shop}&host={host}"
        )
        
        # Assert
        assert response.status_code == 200
        assert "Success Page" in response.text
        mock_get_success_data.assert_called_once()
        mock_generate_success.assert_called_once()
    
    @patch('app.api.shopify_embedded.ShopifyShopRepository')
    @patch('app.api.shopify_embedded.ShopifyAuthService.get_shop_success_data')
    @patch('app.api.shopify_embedded.AgentRepository')
    @patch('app.api.shopify_embedded.ShopifyAuthService.generate_agent_selection_page_html')
    def test_embedded_app_home_without_agents(
        self,
        mock_generate_selection,
        mock_agent_repo,
        mock_get_success_data,
        mock_shop_repo,
        api_client,
        mock_db,
        mock_shop,
        mock_agent
    ):
        """Test embedded app home when shop has no agents configured"""
        # Arrange
        shop = "test-shop.myshopify.com"
        host = "test-host"
        
        mock_shop_repo_instance = MagicMock()
        mock_shop_repo.return_value = mock_shop_repo_instance
        mock_shop_repo_instance.get_shop_by_domain.return_value = mock_shop
        
        mock_get_success_data.return_value = (0, None)
        
        mock_agent_repo_instance = MagicMock()
        mock_agent_repo.return_value = mock_agent_repo_instance
        mock_agent_repo_instance.get_by_organization.return_value = [mock_agent]
        
        mock_generate_selection.return_value = "<html>Agent Selection Page</html>"
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/home?shop={shop}&host={host}"
        )
        
        # Assert
        assert response.status_code == 200
        assert "Agent Selection Page" in response.text
        mock_generate_selection.assert_called_once()


class TestSessionTokenBounce:
    """Test suite for session_token_bounce endpoint"""
    
    @patch('app.api.shopify_embedded.ShopifySessionService.generate_bounce_page_html')
    def test_session_token_bounce(self, mock_generate_bounce, api_client):
        """Test session token bounce page generation"""
        # Arrange
        shop = "test-shop.myshopify.com"
        redirect_path = "/api/v1/shopify/agent-selection"
        
        mock_generate_bounce.return_value = "<html>Bounce Page</html>"
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/session-token-bounce?shop={shop}&redirect_path={redirect_path}"
        )
        
        # Assert
        assert response.status_code == 200
        assert "Bounce Page" in response.text
        mock_generate_bounce.assert_called_once_with(
            shop=shop,
            redirect_path=redirect_path,
            api_key=settings.SHOPIFY_API_KEY
        )


class TestAgentSelectionPage:
    """Test suite for agent_selection_page endpoint"""
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.is_document_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.generate_bounce_page_html')
    def test_agent_selection_no_session_token_document_request(
        self,
        mock_generate_bounce,
        mock_is_document,
        mock_get_token,
        api_client
    ):
        """Test agent selection page without session token on document request"""
        # Arrange
        shop = "test-shop.myshopify.com"
        
        mock_get_token.return_value = None
        mock_is_document.return_value = True
        mock_generate_bounce.return_value = "<html>Bounce Page</html>"
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/agent-selection?shop={shop}"
        )
        
        # Assert
        assert response.status_code == 200
        assert "Bounce Page" in response.text
        mock_generate_bounce.assert_called_once()
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.is_document_request')
    def test_agent_selection_no_session_token_api_request(
        self,
        mock_is_document,
        mock_get_token,
        api_client
    ):
        """Test agent selection page without session token on API request"""
        # Arrange
        shop = "test-shop.myshopify.com"
        
        mock_get_token.return_value = None
        mock_is_document.return_value = False
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/agent-selection?shop={shop}"
        )
        
        # Assert
        assert response.status_code == 401
        assert "X-Shopify-Retry-Invalid-Session-Request" in response.headers
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.validate_session_token')
    @patch('app.api.shopify_embedded.ShopifyShopRepository')
    @patch('app.api.shopify_embedded.AgentRepository')
    @patch('app.api.shopify_embedded.ShopifyAuthService.generate_agent_selection_page_html')
    def test_agent_selection_with_valid_token(
        self,
        mock_generate_selection,
        mock_agent_repo,
        mock_shop_repo,
        mock_validate_token,
        mock_get_token,
        api_client,
        mock_db,
        mock_shop,
        mock_agent
    ):
        """Test agent selection page with valid session token"""
        # Arrange
        shop = "test-shop.myshopify.com"
        
        mock_get_token.return_value = "valid-token"
        mock_validate_token.return_value = {"shop": shop}
        
        mock_shop_repo_instance = MagicMock()
        mock_shop_repo.return_value = mock_shop_repo_instance
        mock_shop_repo_instance.get_shop_by_domain.return_value = mock_shop
        
        mock_agent_repo_instance = MagicMock()
        mock_agent_repo.return_value = mock_agent_repo_instance
        mock_agent_repo_instance.get_org_agents.return_value = [mock_agent]
        
        mock_generate_selection.return_value = "<html>Agent Selection</html>"
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/agent-selection?shop={shop}"
        )
        
        # Assert
        assert response.status_code == 200
        assert "Agent Selection" in response.text
        mock_validate_token.assert_called_once()
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.validate_session_token')
    @patch('app.api.shopify_embedded.ShopifySessionService.is_document_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.generate_bounce_page_html')
    def test_agent_selection_invalid_token_document_request(
        self,
        mock_generate_bounce,
        mock_is_document,
        mock_validate_token,
        mock_get_token,
        api_client
    ):
        """Test agent selection page with invalid token on document request"""
        # Arrange
        shop = "test-shop.myshopify.com"
        
        mock_get_token.return_value = "invalid-token"
        mock_validate_token.side_effect = HTTPException(status_code=401, detail="Invalid token")
        mock_is_document.return_value = True
        mock_generate_bounce.return_value = "<html>Bounce Page</html>"
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/agent-selection?shop={shop}"
        )
        
        # Assert
        assert response.status_code == 200
        assert "Bounce Page" in response.text
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.validate_session_token')
    @patch('app.api.shopify_embedded.ShopifyShopRepository')
    def test_agent_selection_shop_not_found(
        self,
        mock_shop_repo,
        mock_validate_token,
        mock_get_token,
        api_client
    ):
        """Test agent selection page when shop is not found"""
        # Arrange
        shop = "test-shop.myshopify.com"
        
        mock_get_token.return_value = "valid-token"
        mock_validate_token.return_value = {"shop": shop}
        
        mock_shop_repo_instance = MagicMock()
        mock_shop_repo.return_value = mock_shop_repo_instance
        mock_shop_repo_instance.get_shop_by_domain.return_value = None
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/agent-selection?shop={shop}"
        )
        
        # Assert
        assert response.status_code == 404


class TestEnableAgent:
    """Test suite for enable_agent endpoint"""
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    def test_enable_agent_no_session_token(self, mock_get_token, api_client):
        """Test enable agent without session token"""
        # Arrange
        mock_get_token.return_value = None
        
        # Act
        response = api_client.post(
            "/api/v1/shopify/enable-agent",
            json={"shop_id": "shop-123", "agent_ids": ["agent-1"]}
        )
        
        # Assert
        assert response.status_code == 401
        assert "X-Shopify-Retry-Invalid-Session-Request" in response.headers
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.validate_session_token')
    def test_enable_agent_missing_shop_id(
        self,
        mock_validate_token,
        mock_get_token,
        api_client
    ):
        """Test enable agent without shop_id"""
        # Arrange
        mock_get_token.return_value = "valid-token"
        mock_validate_token.return_value = {"shop": "test-shop.myshopify.com"}
        
        # Act
        response = api_client.post(
            "/api/v1/shopify/enable-agent",
            json={"agent_ids": ["agent-1"]}
        )
        
        # Assert
        assert response.status_code == 400
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.validate_session_token')
    def test_enable_agent_missing_agent_ids(
        self,
        mock_validate_token,
        mock_get_token,
        api_client
    ):
        """Test enable agent without agent_ids"""
        # Arrange
        mock_get_token.return_value = "valid-token"
        mock_validate_token.return_value = {"shop": "test-shop.myshopify.com"}
        
        # Act
        response = api_client.post(
            "/api/v1/shopify/enable-agent",
            json={"shop_id": "shop-123"}
        )
        
        # Assert
        assert response.status_code == 400
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.validate_session_token')
    @patch('app.api.shopify_embedded.AgentShopifyConfigRepository')
    def test_enable_agent_success(
        self,
        mock_config_repo,
        mock_validate_token,
        mock_get_token,
        api_client,
        mock_db
    ):
        """Test successful agent enablement"""
        # Arrange
        shop_id = str(uuid.uuid4())
        agent_ids = [str(uuid.uuid4()), str(uuid.uuid4())]
        
        mock_get_token.return_value = "valid-token"
        mock_validate_token.return_value = {"shop": "test-shop.myshopify.com"}
        
        mock_config_repo_instance = MagicMock()
        mock_config_repo.return_value = mock_config_repo_instance
        
        # Act
        response = api_client.post(
            "/api/v1/shopify/enable-agent",
            json={"shop_id": shop_id, "agent_ids": agent_ids}
        )
        
        # Assert
        assert response.status_code == 200
        assert response.json()["success"] is True
        assert f"Connected {len(agent_ids)} agent(s)" in response.json()["message"]
        assert mock_config_repo_instance.create_agent_shopify_config.call_count == len(agent_ids)
    
    @patch('app.api.shopify_embedded.ShopifySessionService.get_session_token_from_request')
    @patch('app.api.shopify_embedded.ShopifySessionService.validate_session_token')
    def test_enable_agent_invalid_token(
        self,
        mock_validate_token,
        mock_get_token,
        api_client
    ):
        """Test enable agent with invalid session token"""
        # Arrange
        mock_get_token.return_value = "invalid-token"
        mock_validate_token.side_effect = HTTPException(status_code=401, detail="Invalid token")
        
        # Act
        response = api_client.post(
            "/api/v1/shopify/enable-agent",
            json={"shop_id": "shop-123", "agent_ids": ["agent-1"]}
        )
        
        # Assert
        assert response.status_code == 401


class TestSuccessPage:
    """Test suite for success_page endpoint"""
    
    @patch('app.api.shopify_embedded.ShopifyAuthService.get_shop_success_data')
    @patch('app.api.shopify_embedded.ShopifyAuthService.generate_success_page_html')
    def test_success_page(
        self,
        mock_generate_success,
        mock_get_success_data,
        api_client,
        mock_db
    ):
        """Test success page generation"""
        # Arrange
        shop = "test-shop.myshopify.com"
        shop_id = str(uuid.uuid4())
        host = "test-host"
        
        mock_get_success_data.return_value = (2, "widget-123")
        mock_generate_success.return_value = "<html>Success Page</html>"
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/success?shop={shop}&shop_id={shop_id}&host={host}"
        )
        
        # Assert
        assert response.status_code == 200
        assert "Success Page" in response.text
        # Use ANY for db since we can't control the exact session object
        from unittest.mock import ANY
        mock_get_success_data.assert_called_once_with(ANY, shop_id)
        mock_generate_success.assert_called_once()
    
    @patch('app.api.shopify_embedded.ShopifyAuthService.get_shop_success_data')
    @patch('app.api.shopify_embedded.ShopifyAuthService.generate_success_page_html')
    def test_success_page_no_agents(
        self,
        mock_generate_success,
        mock_get_success_data,
        api_client,
        mock_db
    ):
        """Test success page with no agents connected"""
        # Arrange
        shop = "test-shop.myshopify.com"
        shop_id = str(uuid.uuid4())
        
        mock_get_success_data.return_value = (0, None)
        mock_generate_success.return_value = "<html>Success Page - No Agents</html>"
        
        # Act
        response = api_client.get(
            f"/api/v1/shopify/success?shop={shop}&shop_id={shop_id}"
        )
        
        # Assert
        assert response.status_code == 200
        assert "Success Page" in response.text


class TestEmbeddedAppIntegration:
    """Integration tests for embedded app flow"""
    
    @patch('app.api.shopify_embedded.ShopifyShopRepository')
    @patch('app.api.shopify_embedded.ShopifyAuthService.get_shop_success_data')
    @patch('app.api.shopify_embedded.AgentRepository')
    @patch('app.api.shopify_embedded.ShopifyAuthService.generate_agent_selection_page_html')
    def test_full_flow_new_shop_to_agent_selection(
        self,
        mock_generate_selection,
        mock_agent_repo,
        mock_get_success_data,
        mock_shop_repo,
        api_client,
        mock_shop,
        mock_agent
    ):
        """Test full flow from new shop to agent selection"""
        # Arrange
        shop = "test-shop.myshopify.com"
        
        # First request: Shop not installed
        mock_shop_repo_instance = MagicMock()
        mock_shop_repo.return_value = mock_shop_repo_instance
        mock_shop_repo_instance.get_shop_by_domain.return_value = None
        
        # Act - First request (not installed)
        response1 = api_client.get(f"/api/v1/shopify/home?shop={shop}")
        
        # Assert - Should redirect to OAuth
        assert response1.status_code == 200
        assert "/api/v1/shopify/auth" in response1.text
        
        # Second request: Shop installed but no agents
        mock_shop_repo_instance.get_shop_by_domain.return_value = mock_shop
        mock_get_success_data.return_value = (0, None)
        
        mock_agent_repo_instance = MagicMock()
        mock_agent_repo.return_value = mock_agent_repo_instance
        mock_agent_repo_instance.get_by_organization.return_value = [mock_agent]
        
        mock_generate_selection.return_value = "<html>Agent Selection</html>"
        
        # Act - Second request (installed, no agents)
        response2 = api_client.get(f"/api/v1/shopify/home?shop={shop}")
        
        # Assert - Should show agent selection
        assert response2.status_code == 200
        assert "Agent Selection" in response2.text


# Import settings for tests
from app.core.config import settings

