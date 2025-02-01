import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.repositories.group import GroupRepository
from app.models.user import UserGroup, User
from app.models.organization import Organization
from app.database import Base
from uuid import uuid4, UUID

# Test database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

@pytest.fixture(scope="function")
def db():
    # Create test database
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Create a new session for testing
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture
def group_repo(db):
    return GroupRepository(db)

@pytest.fixture
def test_organization(db):
    """Create a test organization"""
    org = Organization(
        id=uuid4(),
        name="Test Organization",
        domain="test.com",
        timezone="UTC"
    )
    db.add(org)
    db.commit()
    db.refresh(org)
    return org

@pytest.fixture
def test_group(db, test_organization):
    """Create a test group with users"""
    group = UserGroup(
        id=uuid4(),
        name="Test Group",
        description="A test group",
        organization_id=test_organization.id
    )
    db.add(group)
    
    # Create test users
    users = []
    for i in range(3):
        user = User(
            id=uuid4(),
            email=f"user{i}@test.com",
            full_name=f"Test User {i}",
            hashed_password="dummy_hash",
            is_active=True,
            organization_id=test_organization.id
        )
        users.append(user)
        db.add(user)
    
    # Associate users with the group
    group.users.extend(users)
    db.commit()
    db.refresh(group)
    return group

def test_get_group_with_users(group_repo, test_group):
    """Test retrieving a group with its associated users"""
    # Get the group with users
    group = group_repo.get_group_with_users(test_group.id)
    
    # Verify group data
    assert group is not None
    assert group.id == test_group.id
    assert group.name == "Test Group"
    assert group.description == "A test group"
    
    # Verify associated users
    assert len(group.users) == 3
    for i, user in enumerate(group.users):
        assert user.email == f"user{i}@test.com"
        assert user.full_name == f"Test User {i}"
        assert user.is_active is True

def test_get_nonexistent_group(group_repo):
    """Test retrieving a group that doesn't exist"""
    group = group_repo.get_group_with_users(uuid4())
    assert group is None 