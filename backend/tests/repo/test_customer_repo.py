import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.database import Base
from app.models.customer import Customer
from app.repositories.customer import CustomerRepository
from uuid import UUID, uuid4

# Test database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

# Create test engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    """Create a fresh database for each test."""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture
def customer_repo(db):
    """Create a customer repository instance"""
    return CustomerRepository(db)

@pytest.fixture
def test_organization_id() -> UUID:
    """Create a consistent organization ID for all tests"""
    return uuid4()

def test_get_or_create_customer_new(customer_repo, test_organization_id):
    """Test creating a new customer when one doesn't exist"""
    email = "newcustomer@example.com"
    full_name = "New Customer"

    customer = customer_repo.get_or_create_customer(
        email=email,
        organization_id=test_organization_id,
        full_name=full_name
    )

    assert customer is not None
    assert customer.email == email
    assert customer.full_name == full_name
    assert customer.organization_id == test_organization_id

def test_get_or_create_customer_existing(customer_repo, test_organization_id):
    """Test retrieving an existing customer"""
    email = "existing@example.com"
    full_name = "Existing Customer"

    # Create initial customer
    customer1 = customer_repo.get_or_create_customer(
        email=email,
        organization_id=test_organization_id,
        full_name=full_name
    )

    # Try to create/get the same customer again
    customer2 = customer_repo.get_or_create_customer(
        email=email,
        organization_id=test_organization_id,
        full_name="Different Name"  # This should be ignored as customer exists
    )

    assert customer2 is not None
    assert customer2.id == customer1.id
    assert customer2.email == email
    assert customer2.full_name == full_name  # Should keep original name
    assert customer2.organization_id == test_organization_id

def test_get_or_create_customer_different_org(customer_repo, test_organization_id):
    """Test creating customers with same email but different organizations"""
    email = "customer@example.com"
    other_org_id = uuid4()

    # Create customer in first organization
    customer1 = customer_repo.get_or_create_customer(
        email=email,
        organization_id=test_organization_id,
        full_name="Customer One"
    )

    # Create customer with same email in different organization
    customer2 = customer_repo.get_or_create_customer(
        email=email,
        organization_id=other_org_id,
        full_name="Customer Two"
    )

    assert customer1.id != customer2.id
    assert customer1.email == customer2.email
    assert customer1.organization_id != customer2.organization_id

def test_get_by_id(customer_repo, test_organization_id):
    """Test retrieving a customer by ID"""
    # Create test customer
    customer = customer_repo.get_or_create_customer(
        email="test@example.com",
        organization_id=test_organization_id,
        full_name="Test Customer"
    )

    # Retrieve customer by ID
    retrieved_customer = customer_repo.get_by_id(customer.id)
    assert retrieved_customer is not None
    assert retrieved_customer.id == customer.id
    assert retrieved_customer.email == customer.email

def test_get_by_id_nonexistent(customer_repo):
    """Test retrieving a non-existent customer by ID"""
    non_existent_id = uuid4()
    customer = customer_repo.get_by_id(non_existent_id)
    assert customer is None

def test_get_customer_email(customer_repo, test_organization_id):
    """Test retrieving a customer's email by ID"""
    email = "test@example.com"
    
    # Create test customer
    customer = customer_repo.get_or_create_customer(
        email=email,
        organization_id=test_organization_id,
        full_name="Test Customer"
    )

    # Get customer email
    retrieved_email = customer_repo.get_customer_email(customer.id)
    assert retrieved_email == email

def test_get_customer_email_nonexistent(customer_repo):
    """Test retrieving email for a non-existent customer"""
    non_existent_id = uuid4()
    email = customer_repo.get_customer_email(non_existent_id)
    assert email is None

def test_get_or_create_customer_no_name(customer_repo, test_organization_id):
    """Test creating a customer without a full name"""
    email = "noname@example.com"

    customer = customer_repo.get_or_create_customer(
        email=email,
        organization_id=test_organization_id
    )

    assert customer is not None
    assert customer.email == email
    assert customer.full_name is None
    assert customer.organization_id == test_organization_id 