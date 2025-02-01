from sqlalchemy.orm import Session
from app.models.customer import Customer
from uuid import UUID
from app.core.logger import get_logger

logger = get_logger(__name__)

class CustomerRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_or_create_customer(
        self,
        email: str,
        organization_id: UUID,
        full_name: str = None
    ) -> Customer:
        """Get existing customer or create new one"""

        customer = self.db.query(Customer).filter(
            Customer.email == email,
            Customer.organization_id == organization_id
        ).first()

        if not customer:
            customer = Customer(
                email=email,
                full_name=full_name,
                organization_id=organization_id
            )
            self.db.add(customer)
            self.db.commit()
            self.db.refresh(customer)

        return customer

    def get_by_id(self, customer_id: UUID) -> Customer | None:
        """Get customer by ID"""
        try:
            customer = self.db.query(Customer).filter(Customer.id == customer_id).first()
            return customer
        except Exception as e:
            logger.error(f"Error getting customer by ID: {str(e)}")
            return None

    def get_customer_email(self, customer_id: UUID) -> str | None:
        """Get customer email by ID"""
        try:
            customer = self.get_by_id(customer_id)
            return customer.email if customer else None
        except Exception as e:
            logger.error(f"Error getting customer email: {str(e)}")
            return None
