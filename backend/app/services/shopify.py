"""
ChatterMate - Shopify Service
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

import requests
from typing import Dict, Any, List, Optional
from app.core.logger import get_logger
from app.models.shopify import ShopifyShop
from sqlalchemy.orm import Session
from app.repositories.shopify_shop_repository import ShopifyShopRepository
from app.repositories.agent_shopify_config_repository import AgentShopifyConfigRepository
import json

logger = get_logger(__name__)

class ShopifyService:
    """Service for interacting with the Shopify API."""

    def __init__(self, db: Session):
        self.db = db
        self.shopify_shop_repository = ShopifyShopRepository(db)
        self.agent_shopify_config_repository = AgentShopifyConfigRepository(db)
        self.api_version = "2025-04"

    def _execute_graphql(self, shop: ShopifyShop, query: str, variables: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Execute a GraphQL query against the Shopify Admin API.
        
        Args:
            shop: The ShopifyShop model containing credentials
            query: The GraphQL query string
            variables: Optional variables for the GraphQL query
            
        Returns:
            Dict containing the GraphQL response or error information
        """
        try:
            if not shop or not shop.access_token or not shop.is_installed:
                return {
                    "success": False,
                    "message": "Shop not connected or missing access token"
                }

            url = f"https://{shop.shop_domain}/admin/api/{self.api_version}/graphql.json"
            headers = {
                "X-Shopify-Access-Token": shop.access_token,
                "Content-Type": "application/json"
            }
            
            payload = {
                "query": query
            }
            
            if variables:
                payload["variables"] = variables
            
            response = requests.post(url, headers=headers, json=payload)
            
            if response.status_code != 200:
                logger.error(f"Failed to execute GraphQL query: {response.text}")
                return {
                    "success": False,
                    "message": f"Failed to execute GraphQL query: {response.text}"
                }
                
            result = response.json()
            
            # Check for GraphQL errors
            if "errors" in result:
                logger.error(f"GraphQL errors: {result['errors']}")
                return {
                    "success": False,
                    "errors": result["errors"],
                    "message": result["errors"][0]["message"] if result["errors"] else "Unknown GraphQL error"
                }
                
            return {
                "success": True,
                "data": result.get("data", {}),
                "extensions": result.get("extensions", {})
            }
            
        except Exception as e:
            logger.error(f"Error executing GraphQL query: {str(e)}")
            return {
                "success": False,
                "message": f"Error executing GraphQL query: {str(e)}"
            }

    def get_products(self, shop: ShopifyShop, limit: int = 10) -> Dict[str, Any]:
        """
        Get products from a Shopify store using GraphQL.
        
        Args:
            shop: The ShopifyShop model containing credentials
            limit: Maximum number of products to return
            
        Returns:
            Dict containing products or error information
        """
        query = """
        query GetProducts($limit: Int!) {
          products(first: $limit) {
            edges {
              node {
                id
                title
                description
                handle
                productType
                vendor
                totalInventory
                priceRangeV2 {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      id
                      url
                      altText
                    }
                  }
                }
                tags
                createdAt
                updatedAt
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
        """
        
        variables = {
            "limit": limit
        }
        
        result = self._execute_graphql(shop, query, variables)
        
        if not result.get("success", False):
            return result
        
        # Transform the GraphQL data structure to match the existing format
        transformed_products = []
        edges = result.get("data", {}).get("products", {}).get("edges", [])
        
        for edge in edges:
            node = edge.get("node", {})
            
            # Extract the first image URL if available
            image_url = None
            images = node.get("images", {}).get("edges", [])
            if images and len(images) > 0:
                image_url = images[0].get("node", {}).get("url")
            
            # Extract price information
            price_range = node.get("priceRangeV2", {})
            min_price = price_range.get("minVariantPrice", {}).get("amount")
            max_price = price_range.get("maxVariantPrice", {}).get("amount")
            currency_code = price_range.get("minVariantPrice", {}).get("currencyCode")
            
            # Transform to previous structure
            transformed_product = {
                "id": node.get("id").split("/")[-1] if node.get("id") else None,  # Extract numeric ID from gid
                "title": node.get("title"),
                "description": node.get("description"),
                "handle": node.get("handle"),
                "product_type": node.get("productType"),
                "vendor": node.get("vendor"),
                "total_inventory": node.get("totalInventory"),
                "price": min_price,
                "price_max": max_price,
                "currency": currency_code,
                "image": {"src": image_url} if image_url else None,
                "tags": node.get("tags"),
                "created_at": node.get("createdAt"),
                "updated_at": node.get("updatedAt")
            }
            
            transformed_products.append(transformed_product)
        
        return {
            "success": True,
            "products": transformed_products,
            "count": len(transformed_products),
            "has_next_page": result.get("data", {}).get("products", {}).get("pageInfo", {}).get("hasNextPage", False),
            "end_cursor": result.get("data", {}).get("products", {}).get("pageInfo", {}).get("endCursor")
        }
    
    def get_product(self, shop: ShopifyShop, product_id: str) -> Dict[str, Any]:
        """
        Get a specific product from a Shopify store using GraphQL.
        
        Args:
            shop: The ShopifyShop model containing credentials
            product_id: The ID of the product to retrieve
            
        Returns:
            Dict containing the product details or error information
        """
        # In GraphQL, we need the full global ID which is formatted as gid://shopify/Product/{id}
        gid = f"gid://shopify/Product/{product_id}"
        
        query = """
        query GetProduct($id: ID!) {
          product(id: $id) {
            id
            title
            description
            descriptionHtml
            handle
            productType
            vendor
            totalInventory
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                  price
                  compareAtPrice
                  inventoryQuantity
                  sku
                  barcode
                }
              }
            }
            tags
            collections(first: 5) {
              edges {
                node {
                  id
                  title
                }
              }
            }
            createdAt
            updatedAt
          }
        }
        """
        
        variables = {
            "id": gid
        }
        
        result = self._execute_graphql(shop, query, variables)
        
        if not result.get("success", False):
            return result
        
        product_data = result.get("data", {}).get("product")
        
        if not product_data:
            return {
                "success": False,
                "message": f"Product with ID {product_id} not found"
            }
        
        # Transform GraphQL data to match the expected format
        
        # Process images
        images = []
        for edge in product_data.get("images", {}).get("edges", []):
            node = edge.get("node", {})
            images.append({
                "id": node.get("id").split("/")[-1] if node.get("id") else None,
                "src": node.get("url"),
                "alt": node.get("altText"),
                "width": node.get("width"),
                "height": node.get("height")
            })
        
        # Process variants
        variants = []
        for edge in product_data.get("variants", {}).get("edges", []):
            node = edge.get("node", {})
            variants.append({
                "id": node.get("id").split("/")[-1] if node.get("id") else None,
                "title": node.get("title"),
                "price": node.get("price"),
                "compare_at_price": node.get("compareAtPrice"),
                "inventory_quantity": node.get("inventoryQuantity"),
                "sku": node.get("sku"),
                "barcode": node.get("barcode")
            })
        
        # Process collections
        collections = []
        for edge in product_data.get("collections", {}).get("edges", []):
            node = edge.get("node", {})
            collections.append({
                "id": node.get("id").split("/")[-1] if node.get("id") else None,
                "title": node.get("title")
            })
        
        # Extract price information
        price_range = product_data.get("priceRangeV2", {})
        min_price = price_range.get("minVariantPrice", {}).get("amount")
        max_price = price_range.get("maxVariantPrice", {}).get("amount")
        currency_code = price_range.get("minVariantPrice", {}).get("currencyCode")
        
        # Build transformed product
        transformed_product = {
            "id": product_data.get("id").split("/")[-1] if product_data.get("id") else None,
            "title": product_data.get("title"),
            "description": product_data.get("description"),
            "body_html": product_data.get("descriptionHtml"),
            "handle": product_data.get("handle"),
            "product_type": product_data.get("productType"),
            "vendor": product_data.get("vendor"),
            "total_inventory": product_data.get("totalInventory"),
            "price": min_price,
            "price_max": max_price,
            "currency": currency_code,
            "images": images,
            "image": images[0] if images else None,
            "variants": variants,
            "tags": product_data.get("tags"),
            "collections": collections,
            "created_at": product_data.get("createdAt"),
            "updated_at": product_data.get("updatedAt")
        }
        
        return {
            "success": True,
            "product": transformed_product
        }
    
    def create_product(self, shop: ShopifyShop, product_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new product in a Shopify store.
        
        Args:
            shop: The ShopifyShop model containing credentials
            product_data: Dictionary containing the product details
            
        Returns:
            Dict containing the created product or error information
        """
        try:
            if not shop or not shop.access_token or not shop.is_installed:
                return {
                    "success": False,
                    "message": "Shop not connected or missing access token"
                }

            url = f"https://{shop.shop_domain}/admin/api/2025-04/products.json"
            headers = {
                "X-Shopify-Access-Token": shop.access_token,
                "Content-Type": "application/json"
            }
            
            # Ensure product_data has the right structure
            payload = {"product": product_data}
            
            response = requests.post(url, headers=headers, json=payload)
            
            if response.status_code not in (200, 201):
                logger.error(f"Failed to create product: {response.text}")
                return {
                    "success": False,
                    "message": f"Failed to create product: {response.text}"
                }
                
            product = response.json().get("product", {})
            
            return {
                "success": True,
                "product": product,
                "message": "Product created successfully"
            }
            
        except Exception as e:
            logger.error(f"Error creating product: {str(e)}")
            return {
                "success": False,
                "message": f"Error creating product: {str(e)}"
            }
    
    def update_product(self, shop: ShopifyShop, product_id: str, product_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update an existing product in a Shopify store.
        
        Args:
            shop: The ShopifyShop model containing credentials
            product_id: The ID of the product to update
            product_data: Dictionary containing the updated product details
            
        Returns:
            Dict containing the updated product or error information
        """
        try:
            if not shop or not shop.access_token or not shop.is_installed:
                return {
                    "success": False,
                    "message": "Shop not connected or missing access token"
                }

            url = f"https://{shop.shop_domain}/admin/api/2025-04/products/{product_id}.json"
            headers = {
                "X-Shopify-Access-Token": shop.access_token,
                "Content-Type": "application/json"
            }
            
            # Ensure product_data has the right structure
            payload = {"product": product_data}
            
            response = requests.put(url, headers=headers, json=payload)
            
            if response.status_code != 200:
                logger.error(f"Failed to update product: {response.text}")
                return {
                    "success": False,
                    "message": f"Failed to update product: {response.text}"
                }
                
            product = response.json().get("product", {})
            
            return {
                "success": True,
                "product": product,
                "message": "Product updated successfully"
            }
            
        except Exception as e:
            logger.error(f"Error updating product: {str(e)}")
            return {
                "success": False,
                "message": f"Error updating product: {str(e)}"
            }
    
    def delete_product(self, shop: ShopifyShop, product_id: str) -> Dict[str, Any]:
        """
        Delete a product from a Shopify store.
        
        Args:
            shop: The ShopifyShop model containing credentials
            product_id: The ID of the product to delete
            
        Returns:
            Dict containing success status or error information
        """
        try:
            if not shop or not shop.access_token or not shop.is_installed:
                return {
                    "success": False,
                    "message": "Shop not connected or missing access token"
                }

            url = f"https://{shop.shop_domain}/admin/api/2025-04/products/{product_id}.json"
            headers = {
                "X-Shopify-Access-Token": shop.access_token,
                "Content-Type": "application/json"
            }
            
            response = requests.delete(url, headers=headers)
            
            if response.status_code not in (200, 204):
                logger.error(f"Failed to delete product: {response.text}")
                return {
                    "success": False,
                    "message": f"Failed to delete product: {response.text}"
                }
                
            return {
                "success": True,
                "message": "Product deleted successfully"
            }
            
        except Exception as e:
            logger.error(f"Error deleting product: {str(e)}")
            return {
                "success": False,
                "message": f"Error deleting product: {str(e)}"
            }
    
    def search_products(self, shop: ShopifyShop, query: str, limit: int = 10) -> Dict[str, Any]:
        """
        Search for products in a Shopify store using GraphQL.
        
        Args:
            shop: The ShopifyShop model containing credentials
            query: The search query
            limit: Maximum number of products to return
            
        Returns:
            Dict containing matching products or error information
        """
        graphql_query = """
        query SearchProducts($query: String!, $limit: Int!) {
          products(first: $limit, query: $query) {
            edges {
              node {
                id
                title
                description
                handle
                productType
                vendor
                totalInventory
                priceRangeV2 {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      id
                      url
                      altText
                    }
                  }
                }
                tags
                createdAt
                updatedAt
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
        """
        
        variables = {
            "query": query,
            "limit": limit
        }
        
        result = self._execute_graphql(shop, graphql_query, variables)
        
        if not result.get("success", False):
            return result
        
        # Transform the GraphQL data structure to match the existing format
        transformed_products = []
        edges = result.get("data", {}).get("products", {}).get("edges", [])
        
        for edge in edges:
            node = edge.get("node", {})
            
            # Extract the first image URL if available
            image_url = None
            images = node.get("images", {}).get("edges", [])
            if images and len(images) > 0:
                image_url = images[0].get("node", {}).get("url")
            
            # Extract price information
            price_range = node.get("priceRangeV2", {})
            min_price = price_range.get("minVariantPrice", {}).get("amount")
            max_price = price_range.get("maxVariantPrice", {}).get("amount")
            currency_code = price_range.get("minVariantPrice", {}).get("currencyCode")
            
            # Transform to previous structure
            transformed_product = {
                "id": node.get("id").split("/")[-1] if node.get("id") else None,  # Extract numeric ID from gid
                "title": node.get("title"),
                "description": node.get("description"),
                "handle": node.get("handle"),
                "product_type": node.get("productType"),
                "vendor": node.get("vendor"),
                "total_inventory": node.get("totalInventory"),
                "price": min_price,
                "price_max": max_price,
                "currency": currency_code,
                "image": {"src": image_url} if image_url else None,
                "tags": node.get("tags"),
                "created_at": node.get("createdAt"),
                "updated_at": node.get("updatedAt")
            }
            
            transformed_products.append(transformed_product)
        
        return {
            "success": True,
            "products": transformed_products,
            "count": len(transformed_products),
            "has_next_page": result.get("data", {}).get("products", {}).get("pageInfo", {}).get("hasNextPage", False),
            "end_cursor": result.get("data", {}).get("products", {}).get("pageInfo", {}).get("endCursor")
        }
            
    def search_orders(self, shop: ShopifyShop, params: Dict[str, Any], limit: int = 10) -> Dict[str, Any]:
        """
        Search for orders in a Shopify store using GraphQL.
        
        Args:
            shop: The ShopifyShop model containing credentials
            params: Dictionary containing search parameters
            limit: Maximum number of orders to return
            
        Returns:
            Dict containing matching orders or error information
        """
        # Construct the query string based on the parameters
        query_parts = []
        
        if params.get("query"):
            query_parts.append(params.get("query"))
        
        if params.get("email"):
            query_parts.append(f"email:{params.get('email')}")
        
        if params.get("name"):
            query_parts.append(f"name:{params.get('name')}")
            
        # Combine query parts or use a default query
        query_string = " ".join(query_parts) if query_parts else ""
        
        graphql_query = """
        query SearchOrders($query: String!, $limit: Int!) {
          orders(first: $limit, query: $query) {
            edges {
              node {
                id
                name
                email
                processedAt
                createdAt
                updatedAt
                cancelledAt
                cancelReason
                displayFinancialStatus
                displayFulfillmentStatus
                customerJourneySummary {
                  customerOrderIndex
                  daysToConversion
                }
                customer {
                  id
                  firstName
                  lastName
                  email
                  phone
                }
                currentTotalPrice {
                  amount
                  currencyCode
                }
                originalTotalPrice {
                  amount
                  currencyCode
                }
                shippingAddress {
                  address1
                  address2
                  city
                  country
                  zip
                  phone
                  name
                }
                fulfillments {
                  status
                  trackingInfo {
                    number
                    url
                  }
                }
                lineItems(first: 10) {
                  edges {
                    node {
                      id
                      name
                      quantity
                      originalTotalPrice {
                        amount
                        currencyCode
                      }
                      variant {
                        id
                        title
                        sku
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
        """
        
        variables = {
            "query": query_string,
            "limit": limit
        }
        
        result = self._execute_graphql(shop, graphql_query, variables)
        
        if not result.get("success", False):
            return result
        
        # Transform the GraphQL data structure to match the expected format
        transformed_orders = []
        edges = result.get("data", {}).get("orders", {}).get("edges", [])
        
        for edge in edges:
            node = edge.get("node", {})
            
            # Process line items
            line_items = []
            for li_edge in node.get("lineItems", {}).get("edges", []):
                li_node = li_edge.get("node", {})
                variant = li_node.get("variant", {})
                
                line_item = {
                    "id": li_node.get("id").split("/")[-1] if li_node.get("id") else None,
                    "name": li_node.get("name"),
                    "quantity": li_node.get("quantity"),
                    "price": li_node.get("originalTotalPrice", {}).get("amount"),
                    "currency": li_node.get("originalTotalPrice", {}).get("currencyCode"),
                    "variant_id": variant.get("id").split("/")[-1] if variant.get("id") else None,
                    "variant_title": variant.get("title"),
                    "sku": variant.get("sku")
                }
                
                line_items.append(line_item)
            
            # Process fulfillments
            fulfillments = []
            for fulfillment in node.get("fulfillments", []):
                tracking_info = []
                
                for tracking in fulfillment.get("trackingInfo", []):
                    tracking_info.append({
                        "number": tracking.get("number"),
                        "url": tracking.get("url")
                    })
                
                fulfillments.append({
                    "status": fulfillment.get("status"),
                    "tracking_numbers": [t.get("number") for t in tracking_info if t.get("number")],
                    "tracking_urls": [t.get("url") for t in tracking_info if t.get("url")],
                    "tracking_info": tracking_info
                })
            
            # Extract customer info
            customer = node.get("customer", {})
            customer_data = {
                "id": customer.get("id").split("/")[-1] if customer.get("id") else None,
                "first_name": customer.get("firstName"),
                "last_name": customer.get("lastName"),
                "email": customer.get("email"),
                "phone": customer.get("phone")
            } if customer else None
            
            # Process shipping address
            shipping_address = node.get("shippingAddress", {})
            
            # Build transformed order
            transformed_order = {
                "id": node.get("id").split("/")[-1] if node.get("id") else None,
                "name": node.get("name"),
                "email": node.get("email"),
                "processed_at": node.get("processedAt"),
                "created_at": node.get("createdAt"),
                "updated_at": node.get("updatedAt"),
                "cancelled_at": node.get("cancelledAt"),
                "cancel_reason": node.get("cancelReason"),
                "financial_status": node.get("displayFinancialStatus"),
                "fulfillment_status": node.get("displayFulfillmentStatus"),
                "customer": customer_data,
                "total_price": node.get("currentTotalPrice", {}).get("amount"),
                "currency": node.get("currentTotalPrice", {}).get("currencyCode"),
                "original_total_price": node.get("originalTotalPrice", {}).get("amount"),
                "shipping_address": shipping_address,
                "fulfillments": fulfillments,
                "line_items": line_items
            }
            
            transformed_orders.append(transformed_order)
        
        return {
            "success": True,
            "orders": transformed_orders,
            "count": len(transformed_orders),
            "has_next_page": result.get("data", {}).get("orders", {}).get("pageInfo", {}).get("hasNextPage", False),
            "end_cursor": result.get("data", {}).get("orders", {}).get("pageInfo", {}).get("endCursor")
        }
    
    def get_order(self, shop: ShopifyShop, order_id: str) -> Dict[str, Any]:
        """
        Get a specific order from a Shopify store using GraphQL.
        
        Args:
            shop: The ShopifyShop model containing credentials
            order_id: The ID of the order to retrieve
            
        Returns:
            Dict containing the order details or error information
        """
        # In GraphQL, we need the full global ID which is formatted as gid://shopify/Order/{id}
        gid = f"gid://shopify/Order/{order_id}"
        
        query = """
        query GetOrder($id: ID!) {
          order(id: $id) {
            id
            name
            email
            processedAt
            createdAt
            updatedAt
            cancelledAt
            cancelReason
            displayFinancialStatus
            displayFulfillmentStatus
            customerJourneySummary {
              customerOrderIndex
              daysToConversion
            }
            customer {
              id
              firstName
              lastName
              email
              phone
            }
            currentTotalPrice {
              amount
              currencyCode
            }
            originalTotalPrice {
              amount
              currencyCode
            }
            shippingAddress {
              address1
              address2
              city
              country
              zip
              phone
              name
            }
            fulfillments {
              status
              trackingInfo {
                number
                url
              }
            }
            lineItems(first: 50) {
              edges {
                node {
                  id
                  name
                  quantity
                  originalTotalPrice {
                    amount
                    currencyCode
                  }
                  variant {
                    id
                    title
                    sku
                  }
                }
              }
            }
          }
        }
        """
        
        variables = {
            "id": gid
        }
        
        result = self._execute_graphql(shop, query, variables)
        
        if not result.get("success", False):
            return result
        
        order_data = result.get("data", {}).get("order")
        
        if not order_data:
            return {
                "success": False,
                "message": f"Order with ID {order_id} not found"
            }
        
        # Process line items
        line_items = []
        for li_edge in order_data.get("lineItems", {}).get("edges", []):
            li_node = li_edge.get("node", {})
            variant = li_node.get("variant", {})
            
            line_item = {
                "id": li_node.get("id").split("/")[-1] if li_node.get("id") else None,
                "name": li_node.get("name"),
                "quantity": li_node.get("quantity"),
                "price": li_node.get("originalTotalPrice", {}).get("amount"),
                "currency": li_node.get("originalTotalPrice", {}).get("currencyCode"),
                "variant_id": variant.get("id").split("/")[-1] if variant.get("id") else None,
                "variant_title": variant.get("title"),
                "sku": variant.get("sku")
            }
            
            line_items.append(line_item)
        
        # Process fulfillments
        fulfillments = []
        for fulfillment in order_data.get("fulfillments", []):
            tracking_info = []
            
            for tracking in fulfillment.get("trackingInfo", []):
                tracking_info.append({
                    "number": tracking.get("number"),
                    "url": tracking.get("url")
                })
            
            fulfillments.append({
                "status": fulfillment.get("status"),
                "tracking_numbers": [t.get("number") for t in tracking_info if t.get("number")],
                "tracking_urls": [t.get("url") for t in tracking_info if t.get("url")],
                "tracking_info": tracking_info
            })
        
        # Extract customer info
        customer = order_data.get("customer", {})
        customer_data = {
            "id": customer.get("id").split("/")[-1] if customer.get("id") else None,
            "first_name": customer.get("firstName"),
            "last_name": customer.get("lastName"),
            "email": customer.get("email"),
            "phone": customer.get("phone")
        } if customer else None
        
        # Build transformed order
        transformed_order = {
            "id": order_data.get("id").split("/")[-1] if order_data.get("id") else None,
            "name": order_data.get("name"),
            "email": order_data.get("email"),
            "processed_at": order_data.get("processedAt"),
            "created_at": order_data.get("createdAt"),
            "updated_at": order_data.get("updatedAt"),
            "cancelled_at": order_data.get("cancelledAt"),
            "cancel_reason": order_data.get("cancelReason"),
            "financial_status": order_data.get("displayFinancialStatus"),
            "fulfillment_status": order_data.get("displayFulfillmentStatus"),
            "customer": customer_data,
            "total_price": order_data.get("currentTotalPrice", {}).get("amount"),
            "currency": order_data.get("currentTotalPrice", {}).get("currencyCode"),
            "original_total_price": order_data.get("originalTotalPrice", {}).get("amount"),
            "shipping_address": order_data.get("shippingAddress", {}),
            "fulfillments": fulfillments,
            "line_items": line_items
        }
        
        return {
            "success": True,
            "order": transformed_order
        } 