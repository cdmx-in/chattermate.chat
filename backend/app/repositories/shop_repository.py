"""
ChatterMate - Shop Repository
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
from app.models import Shop
from app.models.schemas.shop import ShopCreate, ShopUpdate
from typing import List, Optional
import uuid

def get_shop(db: Session, shop_id: str) -> Optional[Shop]:
    """
    Get a shop by ID
    """
    return db.query(Shop).filter(Shop.id == shop_id).first()

def get_shop_by_domain(db: Session, shop_domain: str) -> Optional[Shop]:
    """
    Get a shop by domain
    """
    return db.query(Shop).filter(Shop.shop_domain == shop_domain).first()

def get_shops(db: Session, skip: int = 0, limit: int = 100) -> List[Shop]:
    """
    Get all shops with pagination
    """
    return db.query(Shop).offset(skip).limit(limit).all()

def get_shops_by_organization(db: Session, organization_id: str) -> List[Shop]:
    """
    Get all shops for an organization
    """
    return db.query(Shop).filter(Shop.organization_id == organization_id).all()

def create_shop(db: Session, shop: ShopCreate) -> Shop:
    """
    Create a new shop
    """
    db_shop = Shop(
        id=str(uuid.uuid4()),
        shop_domain=shop.shop_domain,
        access_token=shop.access_token,
        scope=shop.scope,
        is_installed=shop.is_installed,
        organization_id=shop.organization_id
    )
    db.add(db_shop)
    db.commit()
    db.refresh(db_shop)
    return db_shop

def update_shop(db: Session, shop_id: str, shop_update: ShopUpdate) -> Optional[Shop]:
    """
    Update a shop
    """
    db_shop = get_shop(db, shop_id)
    if not db_shop:
        return None
    
    update_data = shop_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_shop, key, value)
    
    db.commit()
    db.refresh(db_shop)
    return db_shop

def delete_shop(db: Session, shop_id: str) -> bool:
    """
    Delete a shop
    """
    db_shop = get_shop(db, shop_id)
    if not db_shop:
        return False
    
    db.delete(db_shop)
    db.commit()
    return True 