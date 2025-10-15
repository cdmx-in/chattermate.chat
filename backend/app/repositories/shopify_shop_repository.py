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

from typing import List, Optional, Union
import uuid
from sqlalchemy.orm import Session
from app.models.shopify.shopify_shop import ShopifyShop
from app.models.schemas.shopify import ShopifyShopCreate, ShopifyShopUpdate
from uuid import UUID
from app.core.logger import get_logger

logger = get_logger(__name__)

class ShopifyShopRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_shop(self, shop_id: str) -> Optional[ShopifyShop]:
        """
        Get a shop by ID
        """
        return self.db.query(ShopifyShop).filter(ShopifyShop.id == shop_id).first()
    
    def get_shop_by_domain(self, shop_domain: str) -> Optional[ShopifyShop]:
        """
        Get a shop by domain
        """
        return self.db.query(ShopifyShop).filter(ShopifyShop.shop_domain == shop_domain).first()
    
    def get_shops(self, skip: int = 0, limit: int = 100) -> List[ShopifyShop]:
        """
        Get all shops
        """
        return self.db.query(ShopifyShop).offset(skip).limit(limit).all()
    
    def get_shops_by_organization(self, organization_id: Union[str, UUID], skip: int = 0, limit: int = 100) -> List[ShopifyShop]:
        """
        Get all shops for an organization
        """
        # Convert organization_id to UUID if it's a string
        org_id = organization_id
        if organization_id and isinstance(organization_id, str):
            try:
                org_id = UUID(organization_id)
            except ValueError:
                # If not a valid UUID, continue with string version
                pass
                
        return self.db.query(ShopifyShop).filter(ShopifyShop.organization_id == org_id).offset(skip).limit(limit).all()
    
    def create_shop(self, shop: ShopifyShopCreate) -> ShopifyShop:
        """
        Create a new shop
        """
        # Convert organization_id to UUID if it's a string
        org_id = shop.organization_id
        if shop.organization_id and isinstance(shop.organization_id, str):
            try:
                org_id = UUID(shop.organization_id)
            except ValueError:
                # If not a valid UUID, continue with string version
                pass
                
        db_shop = ShopifyShop(
            id=str(uuid.uuid4()),
            shop_domain=shop.shop_domain,
            access_token=shop.access_token,
            scope=shop.scope,
            is_installed=shop.is_installed,
            organization_id=org_id
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
        
        # Convert organization_id to UUID if it's a string
        if 'organization_id' in update_data and update_data['organization_id'] and isinstance(update_data['organization_id'], str):
            try:
                update_data['organization_id'] = UUID(update_data['organization_id'])
            except ValueError:
                # If not a valid UUID, continue with string version
                pass
        
        for key, value in update_data.items():
            setattr(db_shop, key, value)
        
        self.db.commit()
        self.db.refresh(db_shop)
        return db_shop
    
    def update(self, shop: ShopifyShop) -> ShopifyShop:
        """
        Update an existing shop object
        """
        self.db.commit()
        self.db.refresh(shop)
        return shop
    
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