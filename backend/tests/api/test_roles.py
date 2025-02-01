import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.database import Base, get_db
from fastapi import FastAPI
from app.models.user import User
from app.models.role import Role
from app.models.permission import Permission, role_permissions
from uuid import UUID, uuid4
from app.api import roles as roles_router
from app.core.auth import get_current_user, require_permissions

# Test database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

# Create test engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a test FastAPI app
app = FastAPI()
app.include_router(
    roles_router.router,
    prefix="/api/roles",
    tags=["roles"]
)

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
def test_permissions(db) -> list[Permission]:
    """Create test permissions"""
    permissions = []
    for name in ["manage_roles", "view_roles", "manage_users"]:
        perm = Permission(
            name=name,
            description=f"Test permission for {name}"
        )
        db.add(perm)
        permissions.append(perm)
    db.commit()
    for p in permissions:
        db.refresh(p)
    return permissions

@pytest.fixture
def test_organization_id() -> UUID:
    """Create a consistent organization ID for all tests"""
    return uuid4()

@pytest.fixture
def test_role(db, test_permissions, test_organization_id) -> Role:
    """Create a test role with required permissions"""
    role = Role(
        name="Test Role",
        description="Test Role Description",
        organization_id=test_organization_id,
        is_default=True
    )
    db.add(role)
    db.commit()

    # Associate permissions with role
    for perm in test_permissions:
        db.execute(
            role_permissions.insert().values(
                role_id=role.id,
                permission_id=perm.id
            )
        )
    db.commit()
    db.refresh(role)
    return role

@pytest.fixture
def test_non_default_role(db, test_permissions, test_organization_id) -> Role:
    """Create a test role that is not default"""
    role = Role(
        name="Test Non-Default Role",
        description="Test Role Description",
        organization_id=test_organization_id,
        is_default=False
    )
    db.add(role)
    db.commit()

    # Associate permissions with role
    for perm in test_permissions:
        db.execute(
            role_permissions.insert().values(
                role_id=role.id,
                permission_id=perm.id
            )
        )
    db.commit()
    db.refresh(role)
    return role

@pytest.fixture
def test_user(db, test_role, test_organization_id) -> User:
    """Create a test user with required permissions"""
    user = User(
        id=uuid4(),
        email="test@example.com",
        hashed_password="hashed_password",
        is_active=True,
        organization_id=test_organization_id,
        full_name="Test User",
        role_id=test_role.id
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@pytest.fixture
def client(test_user) -> TestClient:
    """Create test client with mocked dependencies"""
    async def override_get_current_user():
        return test_user

    async def override_require_permissions(*args, **kwargs):
        return test_user

    app.dependency_overrides[get_current_user] = override_get_current_user
    app.dependency_overrides[require_permissions] = override_require_permissions
    app.dependency_overrides[get_db] = lambda: TestingSessionLocal()
    
    return TestClient(app)

# Test cases
def test_create_role(client, db, test_permissions, test_user):
    """Test creating a new role"""
    role_data = {
        "name": "New Role",
        "description": "New Role Description",
        "is_default": False,
        "permissions": [
            {
                "id": test_permissions[0].id,
                "name": test_permissions[0].name,
                "description": test_permissions[0].description
            }
        ]
    }
    
    response = client.post("/api/roles", json=role_data)
    assert response.status_code == 200
    data = response.json()
    
    # Validate response
    assert data["name"] == role_data["name"]
    assert data["description"] == role_data["description"]
    assert data["is_default"] == role_data["is_default"]
    assert len(data["permissions"]) == 1
    assert data["permissions"][0]["id"] == test_permissions[0].id

def test_list_roles(client, test_role):
    """Test listing all roles"""
    response = client.get("/api/roles")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(role["id"] == test_role.id for role in data)

def test_get_role(client, test_role):
    """Test getting a specific role"""
    response = client.get(f"/api/roles/{test_role.id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_role.id
    assert data["name"] == test_role.name
    assert len(data["permissions"]) > 0

def test_update_role(client, test_non_default_role, test_permissions):
    """Test updating a role"""
    update_data = {
        "name": "Updated Role",
        "description": "Updated Description",
        "permissions": [
            {
                "id": test_permissions[0].id,
                "name": test_permissions[0].name,
                "description": test_permissions[0].description
            }
        ]
    }
    
    response = client.put(f"/api/roles/{str(test_non_default_role.id)}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == update_data["name"]
    assert data["description"] == update_data["description"]
    assert len(data["permissions"]) == 1

def test_delete_role(client, db, test_user, test_organization_id):
    """Test deleting a role"""
    # Create a new role to delete
    role = Role(
        name="Role to Delete",
        description="This role will be deleted",
        organization_id=test_organization_id,
        is_default=False
    )
    db.add(role)
    db.commit()
    db.refresh(role)
    
    response = client.delete(f"/api/roles/{str(role.id)}")
    assert response.status_code == 204
    
    # Verify role is deleted
    deleted_role = db.query(Role).filter(Role.id == role.id).first()
    assert deleted_role is None

def test_add_role_permission(client, test_role, test_permissions):
    """Test adding a permission to a role"""
    permission = test_permissions[0]
    response = client.post(f"/api/roles/{str(test_role.id)}/permissions/{permission.name}")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Permission added to role"

def test_remove_role_permission(client, test_role, test_permissions):
    """Test removing a permission from a role"""
    permission = test_permissions[0]
    response = client.delete(f"/api/roles/{str(test_role.id)}/permissions/{permission.name}")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Permission removed from role"

def test_list_permissions(client):
    """Test listing all available permissions"""
    response = client.get("/api/roles/permissions/all")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert all(isinstance(p["id"], int) for p in data)
    assert all("name" in p for p in data)

def test_create_duplicate_default_role(client, test_role, test_permissions):
    """Test creating a role when default role already exists"""
    role_data = {
        "name": "Another Default Role",
        "description": "This should fail",
        "is_default": True,
        "permissions": [
            {
                "id": test_permissions[0].id,
                "name": test_permissions[0].name,
                "description": test_permissions[0].description
            }
        ]
    }
    
    response = client.post("/api/roles", json=role_data)
    assert response.status_code == 400
    assert "Organization already has a default role" in response.json()["detail"]

def test_update_default_role(client, test_role):
    """Test updating a default role (should fail)"""
    update_data = {
        "name": "Try Update Default",
        "description": "This should fail"
    }
    
    response = client.put(f"/api/roles/{str(test_role.id)}", json=update_data)
    assert response.status_code == 400
    assert "Cannot modify default role" in response.json()["detail"]

def test_delete_default_role(client, test_role):
    """Test deleting a default role (should fail)"""
    response = client.delete(f"/api/roles/{str(test_role.id)}")
    assert response.status_code == 400
    assert "Cannot delete default role" in response.json()["detail"]

def test_get_nonexistent_role(client):
    """Test getting a non-existent role"""
    response = client.get("/api/roles/99999")
    assert response.status_code == 404
    assert "Role not found" in response.json()["detail"]

def test_update_nonexistent_role(client):
    """Test updating a non-existent role"""
    update_data = {
        "name": "Updated Role",
        "description": "Updated Description"
    }
    response = client.put("/api/roles/99999", json=update_data)
    assert response.status_code == 404
    assert "Role not found" in response.json()["detail"]

def test_delete_role_with_users(client, db, test_user, test_non_default_role):
    """Test deleting a role that is assigned to users"""
    # Update test user to use the non-default role
    test_user.role_id = test_non_default_role.id
    db.commit()
    
    response = client.delete(f"/api/roles/{test_non_default_role.id}")
    assert response.status_code == 400
    assert "Cannot delete role that is assigned to users" in response.json()["detail"]

def test_add_invalid_permission(client, test_role):
    """Test adding a non-existent permission to a role"""
    response = client.post(f"/api/roles/{test_role.id}/permissions/nonexistent_permission")
    assert response.status_code == 404
    assert "Permission not found" in response.json()["detail"]

def test_remove_invalid_permission(client, test_role):
    """Test removing a non-existent permission from a role"""
    response = client.delete(f"/api/roles/{test_role.id}/permissions/nonexistent_permission")
    assert response.status_code == 404
    assert "Permission not found" in response.json()["detail"]

def test_create_role_with_invalid_permissions(client, test_permissions):
    """Test creating a role with non-existent permissions"""
    role_data = {
        "name": "New Role",
        "description": "New Role Description",
        "is_default": False,
        "permissions": [
            {
                "id": 99999,  # Non-existent permission ID
                "name": "invalid_permission",
                "description": "Invalid Permission"
            }
        ]
    }
    
    response = client.post("/api/roles", json=role_data)
    assert response.status_code == 400
    assert "Invalid permission" in response.json()["detail"]

def test_create_role_with_duplicate_name(client, test_role, test_permissions):
    """Test creating a role with a name that already exists in the organization"""
    role_data = {
        "name": test_role.name,  # Using existing role name
        "description": "New Role Description",
        "is_default": False,
        "permissions": [
            {
                "id": test_permissions[0].id,
                "name": test_permissions[0].name,
                "description": test_permissions[0].description
            }
        ]
    }
    
    response = client.post("/api/roles", json=role_data)
    assert response.status_code == 400
    assert "Role with this name already exists" in response.json()["detail"]

def test_update_role_with_duplicate_name(client, test_role, test_non_default_role):
    """Test updating a role with a name that already exists"""
    update_data = {
        "name": test_role.name,  # Using existing role name
        "description": "Updated Description"
    }
    
    response = client.put(f"/api/roles/{test_non_default_role.id}", json=update_data)
    assert response.status_code == 400
    assert "Role with this name already exists" in response.json()["detail"] 