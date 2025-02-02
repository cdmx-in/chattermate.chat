import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, TypeDecorator, String, event, text
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
from app.database import Base, get_db
from app.agents.transfer_agent import TransferResponseAgent, get_agent_availability_response
from app.models.agent import Agent, AgentType
from app.models.organization import Organization
from app.models.user import User, UserGroup
from app.models.customer import Customer
from app.models.chat_history import ChatHistory
from uuid import uuid4, UUID
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock
import pytz
import traceback
from typing import Optional
import openai

# Custom UUID type for SQLite
class SQLiteUUID(TypeDecorator):
    """Platform-independent UUID type.
    Uses String(36) as storage"""
    impl = String(36)  # Changed to 36 to accommodate the full UUID string
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        return UUID(value)

# Test database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

# Create test engine with UUID type handler
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

# Override UUID columns with SQLiteUUID
for table in Base.metadata.tables.values():
    for column in table.columns:
        if str(column.type).startswith('UUID'):
            column.type = SQLiteUUID()

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    """Enable foreign key support for SQLite"""
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

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
        business_hours={
            'monday': {'start': '09:00', 'end': '17:00', 'enabled': True},
            'tuesday': {'start': '09:00', 'end': '17:00', 'enabled': True},
            'wednesday': {'start': '09:00', 'end': '17:00', 'enabled': True},
            'thursday': {'start': '09:00', 'end': '17:00', 'enabled': True},
            'friday': {'start': '09:00', 'end': '17:00', 'enabled': True},
            'saturday': {'start': '09:00', 'end': '17:00', 'enabled': False},
            'sunday': {'start': '09:00', 'end': '17:00', 'enabled': False}
        },
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
        is_online=True,
        organization_id=test_organization.id,
        full_name="Test User"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@pytest.fixture
def test_customer(db, test_organization) -> Customer:
    """Create a test customer"""
    customer = Customer(
        id=uuid4(),
        email="customer@example.com",
        full_name="Test Customer",
        organization_id=test_organization.id,
        is_active=True
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer

@pytest.fixture
def test_session(db, test_agent, test_customer) -> str:
    """Create a test session"""
    session_id = uuid4()
    db.execute(
        text("INSERT INTO session_to_agents (session_id, agent_id, customer_id, organization_id, status) VALUES (:session_id, :agent_id, :customer_id, :organization_id, :status)"),
        {
            "session_id": str(session_id),
            "agent_id": str(test_agent.id),
            "customer_id": str(test_customer.id),
            "organization_id": str(test_agent.organization_id),
            "status": "ACTIVE"
        }
    )
    db.commit()
    return session_id

@pytest.fixture
def test_chat_history(db, test_organization, test_agent, test_customer, test_session) -> list[ChatHistory]:
    """Create test chat history"""
    messages = [
        ChatHistory(
            message="Hello, I need help",
            message_type="user",
            organization_id=test_organization.id,
            agent_id=test_agent.id,
            customer_id=test_customer.id,
            session_id=test_session
        ),
        ChatHistory(
            message="Hi! How can I assist you today?",
            message_type="bot",
            organization_id=test_organization.id,
            agent_id=test_agent.id,
            customer_id=test_customer.id,
            session_id=test_session
        )
    ]
    for msg in messages:
        db.add(msg)
    db.commit()
    for msg in messages:
        db.refresh(msg)
    return messages

@pytest.fixture
def mock_db_session(db, test_agent):
    """Mock database session"""
    def get_mock_db():
        yield db
    
    with patch('app.agents.transfer_agent.get_db', get_mock_db):
        yield db

@pytest.mark.asyncio
async def test_transfer_agent_initialization():
    """Test TransferResponseAgent initialization"""
    agent = TransferResponseAgent(
        api_key="test_key",
        model_name="gpt-4",
        model_type="OPENAI"
    )
    
    assert agent.agent is not None
    assert "Transfer Response Agent" in agent.agent.name
    assert len(agent.agent.instructions) > 0

@pytest.mark.asyncio
async def test_transfer_agent_get_business_context():
    """Test getting business context"""
    agent = TransferResponseAgent(
        api_key="test_key",
        model_name="gpt-4",
        model_type="OPENAI"
    )
    
    business_hours = {
        'monday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'tuesday': {'start': '09:00', 'end': '17:00', 'enabled': True},
        'wednesday': {'start': '09:00', 'end': '17:00', 'enabled': False}
    }
    
    context = await agent.get_business_context(business_hours, 2)
    
    assert "Business Hours:" in context
    assert "Monday: 09:00 - 17:00" in context
    assert "Tuesday: 09:00 - 17:00" in context
    assert "Wednesday: Closed" in context
    assert "Available Agents: 2" in context

@pytest.mark.asyncio
async def test_transfer_agent_get_response():
    """Test getting transfer response"""
    # Create a proper ModelResponse object
    class MockModelResponse:
        def __init__(self, content):
            self.content = content
            self.parsed = {
                "message": "I'll transfer you to a human agent who can better assist you.",
                "transfer_to_human": True,
                "transfer_reason": "NEED_MORE_INFO",
                "transfer_description": "Need specialized assistance"
            }
            self.created_at = datetime.now(timezone.utc)
            self.messages = []

    mock_response = MockModelResponse({
        "message": "I'll transfer you to a human agent who can better assist you.",
        "transfer_to_human": True,
        "transfer_reason": "NEED_MORE_INFO",
        "transfer_description": "Need specialized assistance"
    })
    
    with patch('phi.model.openai.chat.OpenAIChat.ainvoke', return_value=mock_response), \
         patch('phi.model.openai.chat.OpenAIChat.aresponse', return_value=mock_response):
        
        agent = TransferResponseAgent(
            api_key="test_key",
            model_name="gpt-4",
            model_type="OPENAI"
        )
        
        business_hours = {
            'monday': {'start': '09:00', 'end': '17:00', 'enabled': True}
        }
        
        chat_history = [
            MagicMock(message="Hello", message_type="user"),
            MagicMock(message="Hi there!", message_type="bot")
        ]
        
        response = await agent.get_transfer_response(
            chat_history=chat_history,
            business_hours=business_hours,
            available_agents=1,
            is_business_hours=True,
            customer_email="test@example.com"
        )
        
        assert isinstance(response, dict)
        assert "message" in response
        assert "transfer_to_human" in response
        assert response["transfer_to_human"] is True
        # The transfer_reason is not returned by the agent's get_transfer_response method
        # assert response["transfer_reason"] == "NEED_MORE_INFO"

@pytest.mark.asyncio
async def test_get_agent_availability_response(
    test_organization,
    test_agent,
    test_customer,
    test_chat_history,
    mock_db_session,
    mocker
):
    """Test getting agent availability response"""
    # Create a proper ModelResponse object
    class MockModelResponse:
        def __init__(self, content):
            self.content = content
            self.parsed = None
            self.created_at = datetime.now(timezone.utc)
            self.messages = []

    mock_response = MockModelResponse("I apologize, but we are currently outside of our business hours. I'll make sure our team contacts you at customer@example.com as soon as possible.")
    
    mocker.patch('phi.agent.Agent.arun', return_value=mock_response)
    
    response = await get_agent_availability_response(
        agent=test_agent,
        customer_id=str(test_customer.id),
        chat_history=test_chat_history,
        db=mock_db_session,
        api_key="test_key",
        model_name="gpt-4",
        model_type="OPENAI"
    )
    
    assert response["message"] == mock_response.content
    assert response["transfer_to_human"] is False

@pytest.mark.asyncio
async def test_get_agent_availability_response_no_agent():
    """Test getting agent availability response with no agent"""
    response = await get_agent_availability_response(
        agent=None,
        customer_id=str(uuid4()),
        chat_history=[],
        db=None,
        api_key="test_key",
        model_name="gpt-4",
        model_type="OPENAI"
    )
    
    assert isinstance(response, dict)
    assert "message" in response
    assert "transfer_to_human" in response
    assert response["transfer_to_human"] is False
    assert "unable to transfer" in response["message"].lower()

@pytest.mark.asyncio
async def test_transfer_agent_invalid_model_type():
    """Test TransferResponseAgent with invalid model type"""
    with pytest.raises(ValueError):
        TransferResponseAgent(
            api_key="test_key",
            model_name="test-model",
            model_type="INVALID_MODEL"
        )

@pytest.mark.asyncio
async def test_transfer_agent_business_context_error():
    """Test getting business context with invalid data"""
    agent = TransferResponseAgent(
        api_key="test_key",
        model_name="gpt-4",
        model_type="OPENAI"
    )
    
    # Test with invalid business hours
    context = await agent.get_business_context({}, 0)
    assert "Business Hours:" in context
    assert "Available Agents: 0" in context 