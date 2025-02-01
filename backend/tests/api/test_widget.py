import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
from app.database import Base, get_db
from fastapi import FastAPI
from app.models.widget import Widget
from app.models.user import User
from app.models.agent import Agent, AgentType
from app.models.agent import AgentCustomization
from uuid import UUID, uuid4
from app.api import widget as widget_router
from app.core.auth import get_current_user
from app.main import app
from app.core.config import settings
from app.repositories.agent import AgentRepository
from app.models.schemas.widget import WidgetCreate
from app.repositories.widget import create_widget

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
    widget_router.router,
    prefix=f"{settings.API_V1_STR}/widgets",
    tags=["widgets"]
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
def test_organization_id() -> UUID:
    """Create a consistent organization ID for all tests"""
    return uuid4()

@pytest.fixture
def test_agent(db: Session, test_organization_id: UUID) -> Agent:
    """Create a test agent"""
    agent_repo = AgentRepository(db)
    agent = agent_repo.create_agent(
        name="Test Agent",
        agent_type=AgentType.CUSTOMER_SUPPORT,
        instructions=["Test instructions"],
        org_id=test_organization_id
    )
    return agent

@pytest.fixture
def test_user(db: Session, test_organization_id: UUID) -> User:
    """Create a test user"""
    user = User(
        id=uuid4(),
        email="test@test.com",
        hashed_password="hashed_password",
        organization_id=test_organization_id,
        is_active=True,
        full_name="Test User"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@pytest.fixture
def test_widget(db: Session, test_agent: Agent) -> Widget:
    """Create a test widget"""
    widget = create_widget(
        db=db,
        widget=WidgetCreate(name="Test Widget", agent_id=test_agent.id),
        organization_id=test_agent.organization_id
    )
    return widget

@pytest.fixture
def client(test_user: User) -> TestClient:
    """Create test client with mocked dependencies"""
    async def override_get_current_user():
        return test_user

    def override_get_db():
        try:
            db = TestingSessionLocal()
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_current_user] = override_get_current_user
    app.dependency_overrides[get_db] = override_get_db
    
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()

def test_create_widget(client: TestClient, test_agent: Agent):
    """Test creating a new widget"""
    widget_data = {
        "name": "New Widget",
        "agent_id": str(test_agent.id)
    }
    response = client.post("/api/v1/widgets", json=widget_data)
    assert response.status_code == 200
    data = response.json()
    assert data["agent"]["id"] == str(test_agent.id)
    assert data["agent"]["name"] == test_agent.name
    assert "organization_id" in data

def test_get_widget_details(client: TestClient, test_widget: Widget):
    """Test getting widget details"""
    response = client.get(f"/api/v1/widgets/{test_widget.id}/details")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == str(test_widget.id)
    assert UUID(data["agent"]["id"]) == test_widget.agent_id

def test_list_widgets(client: TestClient, test_widget: Widget):
    """Test listing all widgets"""
    response = client.get("/api/v1/widgets")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]["id"] == str(test_widget.id)

def test_delete_widget(client: TestClient, test_widget: Widget):
    """Test deleting a widget"""
    response = client.delete(f"/api/v1/widgets/{test_widget.id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Widget deleted"

    # Verify widget is deleted
    response = client.get(f"/api/v1/widgets/{test_widget.id}/details")
    assert response.status_code == 404

def test_get_nonexistent_widget(client: TestClient):
    """Test getting a nonexistent widget"""
    response = client.get(f"/api/v1/widgets/{uuid4()}/details")
    assert response.status_code == 404

def test_get_widget_ui(client: TestClient, test_widget: Widget):
    """Test getting widget UI"""
    response = client.get(f"/api/v1/widgets/{test_widget.id}/data")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert str(test_widget.id) in response.text
    assert test_widget.agent.display_name or test_widget.agent.name in response.text

def test_get_widget_data(client: TestClient, test_widget: Widget):
    """Test getting widget data with conversation token"""
    # First get the widget UI to set the conversation token
    ui_response = client.get(f"/api/v1/widgets/{test_widget.id}/data")
    assert ui_response.status_code == 200

    # Get the conversation token from cookie
    conversation_token = ui_response.cookies.get("conversation_token")
    assert conversation_token is not None

    # Test getting widget data with token and email to create customer
    response = client.get(
        f"/api/v1/widgets/{test_widget.id}",
        params={"email": "test@example.com"},
        cookies={"conversation_token": conversation_token}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == str(test_widget.id)
    assert data["organization_id"] == str(test_widget.organization_id)
    assert data["agent"]["id"] == str(test_widget.agent_id)
    assert "customer" in data  # Verify customer info is present

def test_get_widget_data_without_token(client: TestClient, test_widget: Widget):
    """Test getting widget data without conversation token"""
    response = client.get(f"/api/v1/widgets/{test_widget.id}")
    assert response.status_code == 401
    assert response.json()["detail"] == "Unauthorized" 