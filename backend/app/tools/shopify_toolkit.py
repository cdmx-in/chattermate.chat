"""
ChatterMate - Shopify Toolkit
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

from typing import Optional, Dict, Any, List
from agno.tools import Toolkit
from app.core.logger import get_logger
from app.services.shopify import ShopifyService
from app.repositories.session_to_agent import SessionToAgentRepository
from app.database import get_db
from app.models.organization import Organization
from app.models.agent import Agent
from app.models.shopify import AgentShopifyConfig, ShopifyShop
from app.repositories.shopify_shop_repository import ShopifyShopRepository
from app.repositories.agent_shopify_config_repository import AgentShopifyConfigRepository
from uuid import UUID
import json

logger = get_logger(__name__)

class ShopifyTools(Toolkit):
    def __init__(self, agent_id: str, org_id: str, session_id: str):
        super().__init__(name="shopify_tools")
        self.agent_id = agent_id
        self.org_id = org_id
        self.session_id = session_id
        self.db = next(get_db())
        self.shopify_service = ShopifyService(self.db)
        self.shopify_repo = ShopifyShopRepository(self.db)
        self.agent_shopify_config_repo = AgentShopifyConfigRepository(self.db)
        
        # Register the functions
        self.register(self.list_products)
        self.register(self.get_product)
        self.register(self.search_products)
        self.register(self.create_product)
        self.register(self.update_product)
        self.register(self.delete_product)
        self.register(self.search_orders)
        self.register(self.get_order_status)
        self.register(self.recommend_products)
    
    def _get_shop_for_agent(self) -> Optional[ShopifyShop]:
        """
        Helper method to get the Shopify shop associated with the agent.
        
        Returns:
            ShopifyShop: The shop associated with the agent, or None if not found or not enabled.
        """
        try:
            # Get the agent's Shopify configuration
            agent_uuid = UUID(str(self.agent_id))
            shopify_config = self.agent_shopify_config_repo.get_agent_shopify_config(str(self.agent_id))
            
            if not shopify_config or not shopify_config.enabled or not shopify_config.shop_id:
                logger.warning("Shopify integration is not enabled for this agent")
                return None
                
            # Get the shop
            shop = self.shopify_repo.get_shop(shopify_config.shop_id)
            
            if not shop or not shop.is_installed:
                logger.warning("Shopify shop not found or not installed")
                return None
                
            # Verify the shop belongs to the current organization
            org_uuid = UUID(str(self.org_id))
            if str(shop.organization_id) != str(org_uuid):
                logger.warning(f"Shop {shop.id} does not belong to organization {self.org_id}")
                return None
                
            return shop
            
        except Exception as e:
            logger.error(f"Error getting shop for agent: {str(e)}")
            return None
    
    def list_products(self, limit: int = 10) -> str:
        """
        List products from the Shopify store.
        
        Args:
            limit: Maximum number of products to return (default: 10)
            
        Returns:
            str: JSON string with the list of products or error information
        """
        try:
            # Get the Shopify shop for this agent
            shop = self._get_shop_for_agent()
            
            if not shop:
                return json.dumps({
                    "success": False,
                    "message": "Shopify integration is not enabled for this agent or shop not found"
                })
                
            # List products
            result = self.shopify_service.get_products(shop, limit)
            return json.dumps(result)
            
        except Exception as e:
            logger.error(f"Error listing products: {str(e)}")
            return json.dumps({
                "success": False,
                "message": f"Error listing products: {str(e)}"
            })
    
    def get_product(self, product_id: str) -> str:
        """
        Get a specific product from the Shopify store.
        
        Args:
            product_id: The ID of the product to retrieve
            
        Returns:
            str: JSON string with the product details or error information
        """
        try:
            # Get the Shopify shop for this agent
            shop = self._get_shop_for_agent()
            
            if not shop:
                return json.dumps({
                    "success": False,
                    "message": "Shopify integration is not enabled for this agent or shop not found"
                })
                
            # Get the product
            result = self.shopify_service.get_product(shop, product_id)
            return json.dumps(result)
            
        except Exception as e:
            logger.error(f"Error getting product: {str(e)}")
            return json.dumps({
                "success": False,
                "message": f"Error getting product: {str(e)}"
            })
    
    def search_products(self, query: str, limit: int = 10) -> str:
        """
        Search for products in the Shopify store.
        
        Args:
            query: The search query
            limit: Maximum number of products to return (default: 10)
            
        Returns:
            str: JSON string with the matching products or error information
        """
        try:
            # Get the Shopify shop for this agent
            shop = self._get_shop_for_agent()
            
            if not shop:
                return json.dumps({
                    "success": False,
                    "message": "Shopify integration is not enabled for this agent or shop not found"
                })
                
            # Search products
            result = self.shopify_service.search_products(shop, query, limit)
            return json.dumps(result)
            
        except Exception as e:
            logger.error(f"Error searching products: {str(e)}")
            return json.dumps({
                "success": False,
                "message": f"Error searching products: {str(e)}"
            })
    
    def create_product(self, 
                      title: str, 
                      description: str, 
                      price: float, 
                      product_type: Optional[str] = None,
                      vendor: Optional[str] = None,
                      tags: Optional[str] = None) -> str:
        """
        Create a new product in the Shopify store.
        
        Args:
            title: The title/name of the product
            description: The description of the product
            price: The price of the product
            product_type: The type/category of the product (optional)
            vendor: The vendor/manufacturer of the product (optional)
            tags: Comma-separated list of tags for the product (optional)
            
        Returns:
            str: JSON string with information about the created product or error
        """
        try:
            # Get the Shopify shop for this agent
            shop = self._get_shop_for_agent()
            
            if not shop:
                return json.dumps({
                    "success": False,
                    "message": "Shopify integration is not enabled for this agent or shop not found"
                })
                
            # Prepare product data
            product_data = {
                "title": title,
                "body_html": description,
                "vendor": vendor or "Default Vendor",
                "product_type": product_type or "Other",
                "tags": tags or "",
                "variants": [
                    {
                        "price": str(price),
                        "inventory_management": "shopify",
                        "inventory_quantity": 10  # Default inventory
                    }
                ]
            }
            
            # Create the product
            result = self.shopify_service.create_product(shop, product_data)
            
            # Record product creation in session
            if result.get("success", False):
                product = result.get("product", {})
                if product:
                    try:
                        session_repo = SessionToAgentRepository(self.db)
                        session_repo.update_session(
                            str(self.session_id),  # Ensure session_id is a string
                            {
                                "product_id": str(product.get("id")),
                                "product_title": product.get("title"),
                                "integration_type": "SHOPIFY"
                            }
                        )
                    except Exception as e:
                        logger.error(f"Failed to update session with product information: {e}")
                        # Continue since the product was created successfully
            
            return json.dumps(result)
            
        except Exception as e:
            logger.error(f"Error creating product: {str(e)}")
            return json.dumps({
                "success": False,
                "message": f"Error creating product: {str(e)}"
            })
    
    def update_product(self, 
                      product_id: str, 
                      title: Optional[str] = None, 
                      description: Optional[str] = None, 
                      price: Optional[float] = None, 
                      product_type: Optional[str] = None,
                      vendor: Optional[str] = None,
                      tags: Optional[str] = None) -> str:
        """
        Update an existing product in the Shopify store.
        
        Args:
            product_id: The ID of the product to update
            title: The updated title/name of the product (optional)
            description: The updated description of the product (optional)
            price: The updated price of the product (optional)
            product_type: The updated type/category of the product (optional)
            vendor: The updated vendor/manufacturer of the product (optional)
            tags: Updated comma-separated list of tags for the product (optional)
            
        Returns:
            str: JSON string with information about the updated product or error
        """
        try:
            # Get the Shopify shop for this agent
            shop = self._get_shop_for_agent()
            
            if not shop:
                return json.dumps({
                    "success": False,
                    "message": "Shopify integration is not enabled for this agent or shop not found"
                })
                
            # First get the existing product
            get_result = self.shopify_service.get_product(shop, product_id)
            if not get_result.get("success", False):
                return json.dumps(get_result)
                
            existing_product = get_result.get("product", {})
            if not existing_product:
                return json.dumps({
                    "success": False,
                    "message": f"Product with ID {product_id} not found"
                })
                
            # Prepare product data with updates, keeping existing values for anything not specified
            product_data = {}
            
            if title:
                product_data["title"] = title
            
            if description:
                product_data["body_html"] = description
                
            if vendor:
                product_data["vendor"] = vendor
                
            if product_type:
                product_data["product_type"] = product_type
                
            if tags:
                product_data["tags"] = tags
                
            # If price is updated, we need to update the variants
            if price is not None:
                # Get the existing variants
                variants = existing_product.get("variants", [])
                if variants:
                    # Update the price for the first variant (default variant)
                    variant_updates = [{"id": variants[0]["id"], "price": str(price)}]
                    product_data["variants"] = variant_updates
            
            # Update the product
            result = self.shopify_service.update_product(shop, product_id, product_data)
            
            # Record product update in session
            if result.get("success", False):
                product = result.get("product", {})
                if product:
                    try:
                        session_repo = SessionToAgentRepository(self.db)
                        session_repo.update_session(
                            str(self.session_id),  # Ensure session_id is a string
                            {
                                "product_id": str(product.get("id")),
                                "product_title": product.get("title"),
                                "integration_type": "SHOPIFY"
                            }
                        )
                    except Exception as e:
                        logger.error(f"Failed to update session with product information: {e}")
                        # Continue since the product was updated successfully
            
            return json.dumps(result)
            
        except Exception as e:
            logger.error(f"Error updating product: {str(e)}")
            return json.dumps({
                "success": False,
                "message": f"Error updating product: {str(e)}"
            })
    
    def delete_product(self, product_id: str) -> str:
        """
        Delete a product from the Shopify store.
        
        Args:
            product_id: The ID of the product to delete
            
        Returns:
            str: JSON string with the result of the delete operation
        """
        try:
            # Get the Shopify shop for this agent
            shop = self._get_shop_for_agent()
            
            if not shop:
                return json.dumps({
                    "success": False,
                    "message": "Shopify integration is not enabled for this agent or shop not found"
                })
                
            # Delete the product
            result = self.shopify_service.delete_product(shop, product_id)
            
            # Record product deletion in session
            if result.get("success", False):
                try:
                    session_repo = SessionToAgentRepository(self.db)
                    session_repo.update_session(
                        str(self.session_id),  # Ensure session_id is a string
                        {
                            "product_id": None,
                            "product_title": None,
                            "integration_type": "SHOPIFY",
                            "product_status": "Deleted"
                        }
                    )
                except Exception as e:
                    logger.error(f"Failed to update session with product deletion: {e}")
                    # Continue since the product was deleted successfully
            
            return json.dumps(result)
            
        except Exception as e:
            logger.error(f"Error deleting product: {str(e)}")
            return json.dumps({
                "success": False,
                "message": f"Error deleting product: {str(e)}"
            })
    
    def search_orders(self, query: str = None, customer_email: str = None, order_number: str = None, limit: int = 10) -> str:
        """
        Search for orders in the Shopify store.
        
        Args:
            query: General search query for orders
            customer_email: Customer's email address to filter orders
            order_number: Specific order number to search for
            limit: Maximum number of orders to return (default: 10)
            
        Returns:
            str: JSON string with the matching orders or error information
        """
        try:
            # Get the Shopify shop for this agent
            shop = self._get_shop_for_agent()
            
            if not shop:
                return json.dumps({
                    "success": False,
                    "message": "Shopify integration is not enabled for this agent or shop not found"
                })
                
            # Prepare search parameters
            params = {}
            if query:
                params["query"] = query
            if customer_email:
                params["email"] = customer_email
            if order_number:
                params["name"] = order_number  # In Shopify, order name is typically the order number with prefix
            
            # Call service to search orders
            result = self.shopify_service.search_orders(shop, params, limit)
            return json.dumps(result)
            
        except Exception as e:
            logger.error(f"Error searching orders: {str(e)}")
            return json.dumps({
                "success": False,
                "message": f"Error searching orders: {str(e)}"
            })
    
    def get_order_status(self, order_id: str) -> str:
        """
        Get the status of a specific order from the Shopify store.
        
        Args:
            order_id: The ID of the order to retrieve status for
            
        Returns:
            str: JSON string with order status details or error information
        """
        try:
            # Get the Shopify shop for this agent
            shop = self._get_shop_for_agent()
            
            if not shop:
                return json.dumps({
                    "success": False,
                    "message": "Shopify integration is not enabled for this agent or shop not found"
                })
                
            # Get order details
            result = self.shopify_service.get_order(shop, order_id)
            
            # If successful, extract relevant order status information
            if result.get("success", False) and result.get("order"):
                order = result.get("order")
                status_info = {
                    "success": True,
                    "order_id": order.get("id"),
                    "order_number": order.get("name"),
                    "status": order.get("financial_status"),
                    "fulfillment_status": order.get("fulfillment_status"),
                    "created_at": order.get("created_at"),
                    "processed_at": order.get("processed_at"),
                    "customer": order.get("customer"),
                    "total_price": order.get("total_price"),
                    "currency": order.get("currency"),
                    "fulfillments": order.get("fulfillments", []),
                    "shipping_address": order.get("shipping_address"),
                    "billing_address": order.get("billing_address"),
                    "tracking_numbers": []
                }
                
                # Extract tracking numbers from fulfillments
                fulfillments = order.get("fulfillments", [])
                tracking_numbers = []
                for fulfillment in fulfillments:
                    if fulfillment.get("tracking_number"):
                        tracking_numbers.append(fulfillment.get("tracking_number"))
                    elif fulfillment.get("tracking_numbers"):
                        tracking_numbers.extend(fulfillment.get("tracking_numbers"))
                
                status_info["tracking_numbers"] = tracking_numbers
                
                return json.dumps(status_info)
            
            return json.dumps(result)
            
        except Exception as e:
            logger.error(f"Error getting order status: {str(e)}")
            return json.dumps({
                "success": False,
                "message": f"Error getting order status: {str(e)}"
            })
    
    def recommend_products(self, product_id: str = None, product_type: str = None, tags: str = None, limit: int = 5) -> str:
        """
        Recommend similar products based on product attributes.
        
        Args:
            product_id: ID of the reference product to find similar products
            product_type: Product type to find similar products
            tags: Comma-separated list of tags to find products with similar tags
            limit: Maximum number of products to return (default: 5)
            
        Returns:
            str: JSON string with recommended products or error information
        """
        try:
            # Get the Shopify shop for this agent
            shop = self._get_shop_for_agent()
            
            if not shop:
                return json.dumps({
                    "success": False,
                    "message": "Shopify integration is not enabled for this agent or shop not found"
                })
            
            # If a product ID is provided, use it as the reference
            if product_id:
                # Get the reference product
                ref_product_result = self.shopify_service.get_product(shop, product_id)
                
                if not ref_product_result.get("success", False) or not ref_product_result.get("product"):
                    return json.dumps({
                        "success": False,
                        "message": f"Reference product with ID {product_id} not found"
                    })
                    
                ref_product = ref_product_result.get("product", {})
                
                # Extract reference product attributes for similarity matching
                ref_product_type = ref_product.get("product_type")
                ref_tags = ref_product.get("tags")
                ref_title = ref_product.get("title", "")
                
                # Use these attributes to find similar products
                search_params = []
                
                if ref_product_type:
                    search_params.append(f"product_type:{ref_product_type}")
                
                if ref_tags:
                    # Extract individual tags and use them for search
                    tag_list = ref_tags.split(",")
                    for tag in tag_list[:3]:  # Use up to 3 tags
                        search_params.append(f"tag:{tag.strip()}")
                
                # Combine search parameters
                search_query = " OR ".join(search_params)
                
                # Search for similar products
                result = self.shopify_service.search_products(shop, search_query, limit + 1)  # +1 to account for the reference product
                
                # Filter out the reference product
                if result.get("success", False) and result.get("products"):
                    filtered_products = [p for p in result.get("products", []) if str(p.get("id")) != product_id][:limit]
                    
                    return json.dumps({
                        "success": True,
                        "reference_product": {
                            "id": ref_product.get("id"),
                            "title": ref_product.get("title"),
                            "product_type": ref_product.get("product_type"),
                            "tags": ref_product.get("tags")
                        },
                        "recommendations": filtered_products,
                        "count": len(filtered_products)
                    })
                
                return json.dumps(result)
            
            # If no product_id but product_type or tags provided
            elif product_type or tags:
                search_params = []
                
                if product_type:
                    search_params.append(f"product_type:{product_type}")
                
                if tags:
                    # Split tags and use them for search
                    tag_list = tags.split(",")
                    for tag in tag_list[:3]:  # Use up to 3 tags
                        search_params.append(f"tag:{tag.strip()}")
                
                # Combine search parameters
                search_query = " OR ".join(search_params)
                
                # Search for matching products
                result = self.shopify_service.search_products(shop, search_query, limit)
                
                if result.get("success", False):
                    return json.dumps({
                        "success": True,
                        "search_criteria": {
                            "product_type": product_type,
                            "tags": tags
                        },
                        "recommendations": result.get("products", []),
                        "count": len(result.get("products", []))
                    })
                
                return json.dumps(result)
            
            else:
                # If no criteria provided, return popular/recent products
                result = self.shopify_service.get_products(shop, limit)
                
                if result.get("success", False):
                    return json.dumps({
                        "success": True,
                        "search_criteria": "recent products",
                        "recommendations": result.get("products", []),
                        "count": len(result.get("products", []))
                    })
                
                return json.dumps(result)
            
        except Exception as e:
            logger.error(f"Error recommending products: {str(e)}")
            return json.dumps({
                "success": False,
                "message": f"Error recommending products: {str(e)}"
            }) 