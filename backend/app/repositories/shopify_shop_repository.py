"""
ChatterMate - Shopify Shop Repository
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
from app.models.shopify import ShopifyShop
from app.models.schemas.shopify import ShopifyShopCreate, ShopifyShopUpdate
from typing import List, Optional
import uuid
from app.core.logger import get_logger

logger = get_logger(__name__)

class ShopifyShopRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_shop(self, shop_id: str) -> Optional[ShopifyShop]:
        """
        Get a shop by ID
        """
        shop = self.db.query(ShopifyShop).filter(ShopifyShop.id == shop_id).first()
        if shop and shop.organization_id:
            shop.organization_id = str(shop.organization_id)
        return shop
    
    def get_shop_by_domain(self, shop_domain: str) -> Optional[ShopifyShop]:
        """
        Get a shop by domain
        """
        shop = self.db.query(ShopifyShop).filter(ShopifyShop.shop_domain == shop_domain).first()
        if shop and shop.organization_id:
            shop.organization_id = str(shop.organization_id)
        return shop
    
    def get_shops(self, skip: int = 0, limit: int = 100) -> List[ShopifyShop]:
        """
        Get all shops with pagination
        """
        shops = self.db.query(ShopifyShop).offset(skip).limit(limit).all()
        
        # Ensure organization_id is properly serialized as a string
        for shop in shops:
            if shop.organization_id:
                shop.organization_id = str(shop.organization_id)
        
        return shops
    
    def get_shops_by_organization(self, organization_id: str, skip: int = 0, limit: int = 100) -> List[ShopifyShop]:
        """Get all Shopify shops for an organization."""
        # Make sure organization_id is a string
        org_id_str = str(organization_id)
        shops = self.db.query(ShopifyShop).filter(ShopifyShop.organization_id == org_id_str).offset(skip).limit(limit).all()
        return shops
    
    def create_shop(self, shop: ShopifyShopCreate) -> ShopifyShop:
        """
        Create a new shop
        """
        db_shop = ShopifyShop(
            id=str(uuid.uuid4()),
            shop_domain=shop.shop_domain,
            access_token=shop.access_token,
            scope=shop.scope,
            is_installed=shop.is_installed,
            organization_id=shop.organization_id
        )
        self.db.add(db_shop)
        self.db.commit()
        self.db.refresh(db_shop)
        return db_shop
    
    def update_shop(self, shop_id: str, shop_update: ShopifyShopUpdate) -> Optional[ShopifyShop]:
        """
        Update a shop
        """
        db_shop = self.get_shop(shop_id)
        if not db_shop:
            return None
        
        update_data = shop_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_shop, key, value)
        
        self.db.commit()
        self.db.refresh(db_shop)
        return db_shop
    
    def delete_shop(self, shop_id: str) -> bool:
        """
        Delete a shop
        """
        db_shop = self.get_shop(shop_id)
        if not db_shop:
            return False
        
        self.db.delete(db_shop)
        self.db.commit()
        return True 