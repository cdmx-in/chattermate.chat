"""
ChatterMate - Test Shopify Agent Config API
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
from app.models.shopify.agent_shopify_config import AgentShopifyConfig
from app.models.shopify.shopify_shop import ShopifyShop
import uuid


def test_get_agent_shopify_config_not_exists(client, test_agent):
    """Test getting agent Shopify config when it doesn't exist"""
    response = client.get(f"/api/v1/shopify/agent-config/{test_agent.id}")
    assert response.status_code == 200
    assert response.json()["enabled"] is False
    assert response.json()["shop_id"] is None


def test_save_agent_shopify_config_new(client, test_agent, test_shopify_shop):
    """Test saving a new agent Shopify config"""
    response = client.post(
        f"/api/v1/shopify/agent-config/{test_agent.id}",
        json={"enabled": True, "shop_id": test_shopify_shop.id}
    )
    assert response.status_code == 200
    assert response.json()["enabled"] is True
    assert response.json()["agent_id"] == test_agent.id
    assert response.json()["shop_id"] == test_shopify_shop.id


def test_save_agent_shopify_config_with_auto_shop_id(client, test_agent, test_shopify_shop):
    """Test saving a new agent Shopify config with auto-assigned shop_id"""
    response = client.post(
        f"/api/v1/shopify/agent-config/{test_agent.id}",
        json={"enabled": True}
    )
    assert response.status_code == 200
    assert response.json()["enabled"] is True
    assert response.json()["agent_id"] == test_agent.id
    assert response.json()["shop_id"] == test_shopify_shop.id


def test_save_agent_shopify_config_update(client, test_agent, test_agent_shopify_config):
    """Test updating an existing agent Shopify config"""
    # First ensure it's enabled
    assert test_agent_shopify_config.enabled is True
    
    # Now disable it
    response = client.post(
        f"/api/v1/shopify/agent-config/{test_agent.id}",
        json={"enabled": False, "shop_id": test_agent_shopify_config.shop_id}
    )
    assert response.status_code == 200
    assert response.json()["enabled"] is False
    assert response.json()["agent_id"] == test_agent.id
    assert response.json()["shop_id"] == test_agent_shopify_config.shop_id


def test_save_agent_shopify_config_no_connection(client, test_agent, db):
    """Test trying to enable Shopify when it's not connected"""
    # Delete any existing shops to ensure Shopify is not connected
    db.query(ShopifyShop).delete()
    db.commit()
    
    response = client.post(
        f"/api/v1/shopify/agent-config/{test_agent.id}",
        json={"enabled": True}
    )
    assert response.status_code == 400
    assert "Cannot enable Shopify integration" in response.json()["detail"] 