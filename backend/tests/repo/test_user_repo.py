import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.database import Base
from app.models.user import User
from app.repositories.user import UserRepository
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
def user_repo(db):
    """Create a user repository instance"""
    return UserRepository(db)

@pytest.fixture
def test_organization_id() -> UUID:
    """Create a consistent organization ID for all tests"""
    return uuid4()

def test_create_user(user_repo, test_organization_id):
    """Test creating a new user"""
    email = "test@example.com"
    password = "testpassword"
    full_name = "Test User"
    hashed_password = User.get_password_hash(password)

    user = user_repo.create_user(
        email=email,
        hashed_password=hashed_password,
        full_name=full_name,
        organization_id=test_organization_id
    )

    assert user.email == email
    assert user.full_name == full_name
    assert user.organization_id == test_organization_id
    assert user.verify_password(password)  # Verify the password works

def test_get_user_by_email(user_repo, test_organization_id):
    """Test retrieving a user by email"""
    # Create test user
    email = "test@example.com"
    hashed_password = User.get_password_hash("testpassword")
    user = user_repo.create_user(
        email=email,
        hashed_password=hashed_password,
        full_name="Test User",
        organization_id=test_organization_id
    )

    # Retrieve user
    retrieved_user = user_repo.get_user_by_email(email)
    assert retrieved_user.id == user.id
    assert retrieved_user.email == email

def test_get_user_by_id(user_repo, test_organization_id):
    """Test retrieving a user by ID"""
    # Create test user
    hashed_password = User.get_password_hash("testpassword")
    user = user_repo.create_user(
        email="test@example.com",
        hashed_password=hashed_password,
        full_name="Test User",
        organization_id=test_organization_id
    )

    # Retrieve user
    retrieved_user = user_repo.get_user(user.id)
    assert retrieved_user.id == user.id
    assert retrieved_user.email == user.email

def test_get_users_by_organization(user_repo, test_organization_id):
    """Test retrieving all users for an organization"""
    # Create multiple users
    hashed_password = User.get_password_hash("testpassword")
    user1 = user_repo.create_user(
        email="user1@example.com",
        hashed_password=hashed_password,
        full_name="User One",
        organization_id=test_organization_id
    )
    user2 = user_repo.create_user(
        email="user2@example.com",
        hashed_password=hashed_password,
        full_name="User Two",
        organization_id=test_organization_id
    )

    # Create user in different organization
    other_org_id = uuid4()
    user_repo.create_user(
        email="other@example.com",
        hashed_password=hashed_password,
        full_name="Other User",
        organization_id=other_org_id
    )

    # Get users for organization
    users = user_repo.get_users_by_organization(test_organization_id)
    assert len(users) == 2
    assert all(u.organization_id == test_organization_id for u in users)

def test_update_user(user_repo, test_organization_id):
    """Test updating a user"""
    # Create test user
    hashed_password = User.get_password_hash("testpassword")
    user = user_repo.create_user(
        email="test@example.com",
        hashed_password=hashed_password,
        full_name="Test User",
        organization_id=test_organization_id
    )

    # Update user
    new_name = "Updated User"
    updated_user = user_repo.update_user(
        user_id=str(user.id),
        full_name=new_name
    )

    assert updated_user.full_name == new_name
    assert updated_user.id == user.id

def test_authenticate_user(user_repo, test_organization_id):
    """Test user authentication"""
    email = "test@example.com"
    password = "testpassword"
    hashed_password = User.get_password_hash(password)
    
    # Create test user
    user = user_repo.create_user(
        email=email,
        hashed_password=hashed_password,
        full_name="Test User",
        organization_id=test_organization_id
    )

    # Test valid password
    assert user.verify_password(password)

    # Test invalid password
    assert not user.verify_password("wrongpassword")

def test_get_multi(user_repo, test_organization_id):
    """Test retrieving multiple users with pagination"""
    # Create multiple users
    users = []
    hashed_password = User.get_password_hash("testpassword")
    for i in range(5):
        user = user_repo.create_user(
            email=f"user{i}@example.com",
            hashed_password=hashed_password,
            full_name=f"User {i}",
            organization_id=test_organization_id
        )
        users.append(user)

    # Test pagination
    first_page = user_repo.get_users_by_organization(test_organization_id)[:2]
    assert len(first_page) == 2

    second_page = user_repo.get_users_by_organization(test_organization_id)[2:4]
    assert len(second_page) == 2

    last_page = user_repo.get_users_by_organization(test_organization_id)[4:]
    assert len(last_page) == 1 