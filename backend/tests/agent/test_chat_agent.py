import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
from app.database import Base, get_db
from app.agents.chat_agent import ChatAgent, ChatResponse, TransferReasonType
from app.models.agent import Agent, AgentType
from app.models.organization import Organization
from app.models.user import User, UserGroup
from app.models.role import Role
from app.models.permission import Permission
from uuid import uuid4
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock

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
def test_organization(db) -> Organization:
    """Create a test organization"""
    org = Organization(
        id=uuid4(),
        name="Test Organization",
        domain="test.com",
        timezone="UTC",
        business_hours={},
        settings={},
        is_active=True
    )
    db.add(org)
    db.commit()
    db.refresh(org)
    return org

@pytest.fixture
def test_group(db, test_organization) -> UserGroup:
    """Create a test group"""
    group = UserGroup(
        id=uuid4(),
        name="Test Group",
        description="Test Group Description",
        organization_id=test_organization.id
    )
    db.add(group)
    db.commit()
    db.refresh(group)
    return group

@pytest.fixture
def test_agent(db, test_organization, test_group) -> Agent:
    """Create a test agent"""
    agent = Agent(
        id=uuid4(),
        name="Test Agent",
        display_name="Test Display Name",
        organization_id=test_organization.id,
        instructions=["Be helpful", "Be concise"],
        transfer_to_human=True,
        groups=[test_group],
        is_active=True,
        agent_type=AgentType.CUSTOMER_SUPPORT,
        description="A test agent"
    )
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return agent

@pytest.fixture
def test_user(db, test_organization) -> User:
    """Create a test user"""
    user = User(
        id=uuid4(),
        email="test@example.com",
        hashed_password="hashed_password",
        is_active=True,
        organization_id=test_organization.id,
        full_name="Test User"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@pytest.fixture
def mock_db_session(db, test_agent):
    """Mock database session for ChatAgent"""
    def get_mock_db():
        yield db
    
    with patch('app.agents.chat_agent.get_db', get_mock_db):
        yield db

@pytest.mark.asyncio
async def test_chat_agent_initialization(test_organization, test_agent, mock_db_session):
    """Test ChatAgent initialization"""
    chat_agent = ChatAgent(
        api_key="test_key",
        model_name="gpt-4",
        model_type="OPENAI",
        org_id=str(test_organization.id),
        agent_id=str(test_agent.id)
    )
    
    assert chat_agent.agent_data is not None
    assert chat_agent.agent_data.name == "Test Agent"
    assert chat_agent.agent_data.display_name == "Test Display Name"
    assert chat_agent.api_key == "test_key"
    assert chat_agent.model_name == "gpt-4"
    assert chat_agent.model_type == "OPENAI"

@pytest.mark.asyncio
async def test_chat_agent_get_response(test_organization, test_agent, test_user, mock_db_session):
    """Test ChatAgent get_response method"""
    chat_agent = ChatAgent(
        api_key="test_key",
        model_name="gpt-4",
        model_type="OPENAI",
        org_id=str(test_organization.id),
        agent_id=str(test_agent.id),
        customer_id=str(test_user.id)
    )
    
    session_id = str(uuid4())
    response = await chat_agent.get_response(
        message="Hello",
        session_id=session_id,
        org_id=str(test_organization.id),
        agent_id=str(test_agent.id),
        customer_id=str(test_user.id)
    )
    
    assert isinstance(response, ChatResponse)
    assert isinstance(response.message, str)
    assert isinstance(response.transfer_to_human, bool)
    if response.transfer_reason:
        assert isinstance(response.transfer_reason, TransferReasonType)

@pytest.mark.asyncio
async def test_chat_agent_api_key_validation():
    """Test API key validation for different model types"""
    # Test invalid model type
    with pytest.raises(ValueError, match="Unsupported model type: INVALID_MODEL"):
        await ChatAgent(
            api_key="test_key",
            model_name="test-model",
            model_type="INVALID_MODEL"
        )

@pytest.mark.asyncio
async def test_chat_agent_error_handling(test_organization, test_agent, test_user, mock_db_session):
    """Test ChatAgent error handling"""
    chat_agent = ChatAgent(
        api_key="invalid_key",  # Invalid key to trigger error
        model_name="gpt-4",
        model_type="OPENAI",
        org_id=str(test_organization.id),
        agent_id=str(test_agent.id),
        customer_id=str(test_user.id)
    )
    
    session_id = str(uuid4())
    response = await chat_agent.get_response(
        message="Hello",
        session_id=session_id,
        org_id=str(test_organization.id),
        agent_id=str(test_agent.id),
        customer_id=str(test_user.id)
    )
    
    assert isinstance(response, ChatResponse)
    assert "error" in response.message.lower()
    assert not response.transfer_to_human
    assert response.transfer_reason is None
    assert response.transfer_description is None 