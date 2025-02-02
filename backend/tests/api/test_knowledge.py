import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, TypeDecorator, String, Column, Integer, Boolean, ForeignKey, DateTime, Enum as SQLEnum, Text, Table, JSON
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from sqlalchemy.pool import StaticPool
from app.database import get_db
from fastapi import FastAPI
from app.models.user import User
from app.models.knowledge_queue import KnowledgeQueue, QueueStatus
from app.models.knowledge_to_agent import KnowledgeToAgent
from app.models.knowledge import Knowledge, SourceType
from app.models.role import Role
from app.models.permission import Permission, role_permissions
from app.models.agent import Agent, AgentType
from uuid import UUID, uuid4
from app.api import knowledge as knowledge_router
from app.core.auth import get_current_user, require_permissions
from datetime import datetime, timezone
import json
import os
from sqlalchemy.dialects.postgresql import UUID as PostgresUUID
from sqlalchemy.sql import func

# Custom UUID type for SQLite
class SqliteUUID(TypeDecorator):
    """Platform-independent UUID type.
    Uses PostgreSQL's UUID type, otherwise uses String(36).
    """
    impl = String(36)
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, UUID):
                try:
                    value = UUID(str(value))
                except (ValueError, AttributeError):
                    return None
            return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, str):
                try:
                    value = str(value)
                except (ValueError, AttributeError):
                    return None
            try:
                return UUID(value)
            except (ValueError, AttributeError):
                return None

    def compare_values(self, x, y):
        if x is None or y is None:
            return x == y
        try:
            if not isinstance(x, UUID):
                try:
                    x = UUID(str(x))
                except (ValueError, AttributeError):
                    return False
            if not isinstance(y, UUID):
                try:
                    y = UUID(str(y))
                except (ValueError, AttributeError):
                    return False
            return str(x) == str(y)
        except (ValueError, AttributeError):
            return False

# Create a custom base class for testing
TestBase = declarative_base()

# Junction table for role-permission many-to-many relationship
test_role_permissions = Table(
    'role_permissions',
    TestBase.metadata,
    Column('role_id', Integer, ForeignKey('roles.id')),
    Column('permission_id', Integer, ForeignKey('permissions.id'))
)

# Create custom test models with SQLite UUID (prefix with Mock to avoid pytest collection)
class MockOrganization(TestBase):
    __tablename__ = "organizations"
    id = Column(SqliteUUID(), primary_key=True, default=uuid4)
    name = Column(String)
    domain = Column(String)
    users = relationship("MockUser", back_populates="organization")
    knowledge_sources = relationship("MockKnowledge", back_populates="organization")

class MockPermission(TestBase):
    __tablename__ = "permissions"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String)

class MockRole(TestBase):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    is_default = Column(Boolean, default=False)
    users = relationship("MockUser", back_populates="role")
    permissions = relationship("MockPermission", secondary=test_role_permissions)

class MockUser(TestBase):
    __tablename__ = "users"
    id = Column(SqliteUUID(), primary_key=True, default=uuid4)
    email = Column(String)
    full_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    organization_id = Column(SqliteUUID(), ForeignKey("organizations.id"))
    role_id = Column(Integer, ForeignKey("roles.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    organization = relationship("MockOrganization", back_populates="users")
    role = relationship("MockRole", back_populates="users")
    knowledge_queue_items = relationship("MockKnowledgeQueue", back_populates="user")

class MockAgent(TestBase):
    __tablename__ = "agents"
    id = Column(SqliteUUID(), primary_key=True, default=uuid4)
    name = Column(String)
    display_name = Column(String)
    description = Column(Text)
    agent_type = Column(SQLEnum(AgentType))
    _instructions = Column('instructions', Text)
    is_active = Column(Boolean, default=True)
    organization_id = Column(SqliteUUID(), ForeignKey("organizations.id"))
    knowledge_links = relationship("MockKnowledgeToAgent", back_populates="agent")

class MockKnowledge(TestBase):
    __tablename__ = "knowledge"
    id = Column(Integer, primary_key=True)
    source = Column(String)
    source_type = Column(SQLEnum(SourceType))
    schema = Column(String)
    table_name = Column(String)
    organization_id = Column(SqliteUUID(), ForeignKey("organizations.id", ondelete="CASCADE"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    organization = relationship("MockOrganization", back_populates="knowledge_sources")
    agent_links = relationship("MockKnowledgeToAgent", back_populates="knowledge", cascade="all, delete-orphan")

class MockKnowledgeToAgent(TestBase):
    __tablename__ = "knowledge_to_agents"
    id = Column(Integer, primary_key=True)
    knowledge_id = Column(Integer, ForeignKey("knowledge.id", ondelete="CASCADE"))
    agent_id = Column(SqliteUUID(), ForeignKey("agents.id", ondelete="CASCADE"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    knowledge = relationship("MockKnowledge", back_populates="agent_links")
    agent = relationship("MockAgent", back_populates="knowledge_links")

class MockKnowledgeQueue(TestBase):
    __tablename__ = "knowledge_queue"
    id = Column(Integer, primary_key=True)
    organization_id = Column(SqliteUUID())
    agent_id = Column(SqliteUUID())
    user_id = Column(SqliteUUID(), ForeignKey("users.id"))
    source_type = Column(String)
    source = Column(String)
    status = Column(String, default=QueueStatus.PENDING)
    error = Column(String, nullable=True)
    queue_metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("MockUser", back_populates="knowledge_queue_items")

    def to_dict(self):
        return {
            "id": self.id,
            "status": self.status
        }

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
    knowledge_router.router,
    prefix="/api/v1/knowledge",
    tags=["knowledge"]
)

# Override dependencies
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="function")
def db():
    """Create a fresh database for each test."""
    TestBase.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        TestBase.metadata.drop_all(bind=engine)

@pytest.fixture
def test_permissions(db) -> list[MockPermission]:
    """Create test permissions"""
    permissions = []
    for name in ["manage_knowledge"]:
        perm = MockPermission(
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
def test_role(db, test_permissions) -> MockRole:
    """Create a test role with required permissions"""
    role = MockRole(
        id=1,
        name="Test Role",
        description="Test Role Description",
        is_default=True
    )
    db.add(role)
    db.commit()

    # Associate permissions with role
    for perm in test_permissions:
        db.execute(
            test_role_permissions.insert().values(
                role_id=role.id,
                permission_id=perm.id
            )
        )
    db.commit()
    db.refresh(role)
    return role

@pytest.fixture(scope="function")
def test_user(db, test_role) -> MockUser:
    """Create a test user with required permissions"""
    org_id = uuid4()
    org = MockOrganization(
        id=org_id,
        name="Test Org",
        domain="test.com"
    )
    db.add(org)
    db.commit()
    db.refresh(org)

    user_id = uuid4()
    user = MockUser(
        id=user_id,
        email="test@example.com",
        hashed_password="hashed_password",
        is_active=True,
        organization_id=org_id,
        full_name="Test User",
        role_id=test_role.id
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@pytest.fixture(scope="function")
def client(db, test_user) -> TestClient:
    """Create test client with mocked dependencies"""
    async def override_get_current_user():
        return test_user

    async def override_require_permissions(*args, **kwargs):
        return test_user

    def override_get_db():
        try:
            yield db
        finally:
            pass  # Don't close the session here, it's managed by the db fixture

    app.dependency_overrides[get_current_user] = override_get_current_user
    app.dependency_overrides[require_permissions] = override_require_permissions
    app.dependency_overrides[get_db] = override_get_db
    
    return TestClient(app)

@pytest.fixture(scope="function")
def test_agent(db, test_user) -> MockAgent:
    """Create a test agent"""
    agent_id = uuid4()
    agent = MockAgent(
        id=agent_id,
        name="Test Agent",
        display_name="Test Display Name",
        description="Test Description",
        agent_type=AgentType.CUSTOMER_SUPPORT,
        _instructions=json.dumps(["Test instruction"]),
        is_active=True,
        organization_id=test_user.organization_id
    )
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return agent

@pytest.fixture(scope="function")
def test_knowledge(db, test_user) -> MockKnowledge:
    """Create a test knowledge entry"""
    now = datetime.now(timezone.utc)
    knowledge = MockKnowledge(
        organization_id=test_user.organization_id,
        source="test_source",
        source_type=SourceType.FILE,
        table_name=None,
        schema=None,
        created_at=now,
        updated_at=now
    )
    db.add(knowledge)
    db.commit()
    db.refresh(knowledge)

    # Verify the knowledge was created
    created_knowledge = db.query(MockKnowledge).filter(
        MockKnowledge.id == knowledge.id,
        MockKnowledge.organization_id == test_user.organization_id
    ).first()
    assert created_knowledge is not None
    assert created_knowledge.organization_id == test_user.organization_id
    assert created_knowledge.source == "test_source"
    assert created_knowledge.source_type == SourceType.FILE

    return knowledge

@pytest.fixture
def test_queue_item(db, test_user, test_agent) -> MockKnowledgeQueue:
    """Create a test queue item"""
    queue_item = MockKnowledgeQueue(
        organization_id=test_user.organization_id,
        agent_id=test_agent.id,
        user_id=test_user.id,
        source_type="pdf_file",
        source="temp/test.pdf",
        status=QueueStatus.PENDING,
        created_at=datetime.now(timezone.utc)
    )
    db.add(queue_item)
    db.commit()
    db.refresh(queue_item)
    return queue_item

# Test cases
def test_upload_pdf_files(client, test_user, test_agent, db):
    """Test uploading PDF files"""
    os.makedirs("uploads/temp", exist_ok=True)
    
    test_content = b"test pdf content"
    files = [("files", ("test.pdf", test_content, "application/pdf"))]
    
    response = client.post(
        "/api/v1/knowledge/upload/pdf",
        files=files,
        data={
            "org_id": str(test_user.organization_id),
            "agent_id": str(test_agent.id)
        }
    )

    assert response.status_code == 200
    data = response.json()
    assert "PDFs queued for processing" in data["message"]
    assert len(data["queue_items"]) == 1
    
    queue_item = db.query(MockKnowledgeQueue).first()
    assert queue_item is not None
    assert queue_item.organization_id == test_user.organization_id
    assert queue_item.agent_id == test_agent.id
    assert queue_item.source_type == "pdf_file"

def test_add_urls(client, test_user, test_agent, db):
    """Test adding URLs for processing"""
    request_data = {
        "org_id": str(test_user.organization_id),
        "pdf_urls": ["https://example.com/test.pdf"],
        "websites": ["https://example.com"],
        "agent_id": str(test_agent.id)
    }

    response = client.post(
        "/api/v1/knowledge/add/urls",
        json=request_data
    )

    assert response.status_code == 200
    data = response.json()
    assert "URLs queued for processing" in data["message"]
    assert len(data["queue_items"]) == 2

def test_link_knowledge_to_agent(client, test_user, test_agent, test_knowledge, db):
    """Test linking knowledge to agent"""
    response = client.post(
        f"/api/v1/knowledge/link?knowledge_id={test_knowledge.id}&agent_id={str(test_agent.id)}"
    )

    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Knowledge linked to agent successfully"
    
    link = db.query(MockKnowledgeToAgent).first()
    assert link is not None
    assert link.knowledge_id == test_knowledge.id
    assert link.agent_id == test_agent.id

def test_get_knowledge_by_agent(client, test_user, test_agent, test_knowledge, db):
    """Test getting knowledge by agent"""
    # First, ensure test_knowledge is properly attached to the session
    db.refresh(test_knowledge)
    
    # Create and save the knowledge link
    knowledge_link = MockKnowledgeToAgent(
        knowledge_id=test_knowledge.id,
        agent_id=test_agent.id,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    db.add(knowledge_link)
    db.commit()
    
    # Refresh all objects to ensure relationships are loaded
    db.refresh(knowledge_link)
    db.refresh(test_knowledge)
    db.refresh(test_agent)
    db.refresh(test_user)
    
    # Explicitly expire and refresh the knowledge object to reload relationships
    db.expire(test_knowledge)
    db.refresh(test_knowledge)

    # Verify the link exists
    link = db.query(MockKnowledgeToAgent).filter(
        MockKnowledgeToAgent.knowledge_id == test_knowledge.id,
        MockKnowledgeToAgent.agent_id == test_agent.id
    ).first()
    assert link is not None

    # Verify the knowledge exists
    knowledge = db.query(MockKnowledge).filter(
        MockKnowledge.id == test_knowledge.id,
        MockKnowledge.organization_id == test_user.organization_id
    ).first()
    assert knowledge is not None
    assert knowledge.organization_id == test_user.organization_id
    assert knowledge.source == "test_source"
    assert knowledge.source_type == SourceType.FILE

    # Verify the agent exists
    agent = db.query(MockAgent).filter(
        MockAgent.id == test_agent.id,
        MockAgent.organization_id == test_user.organization_id
    ).first()
    assert agent is not None

    response = client.get(
        f"/api/v1/knowledge/agent/{str(test_agent.id)}?page=1&page_size=10"
    )

    assert response.status_code == 200
    data = response.json()
    assert "knowledge" in data
    assert "pagination" in data
    assert len(data["knowledge"]) == 1
    assert data["knowledge"][0]["id"] == test_knowledge.id
    assert data["knowledge"][0]["name"] == test_knowledge.source
    assert data["knowledge"][0]["type"] == test_knowledge.source_type.value  # Note: need to get the value from enum

def test_get_knowledge_by_organization(client, test_user, test_knowledge, db):
    """Test getting knowledge by organization"""
    # First, ensure test_knowledge is properly attached to the session
    db.refresh(test_knowledge)
    
    # Ensure test_user is properly attached to the session
    db.refresh(test_user)
    
    # Explicitly expire and refresh the knowledge object to reload relationships
    db.expire(test_knowledge)
    db.refresh(test_knowledge)

    # Verify the knowledge exists and belongs to the organization
    knowledge = db.query(MockKnowledge).filter(
        MockKnowledge.id == test_knowledge.id,
        MockKnowledge.organization_id == test_user.organization_id
    ).first()
    assert knowledge is not None
    assert knowledge.organization_id == test_user.organization_id
    assert knowledge.source == "test_source"
    assert knowledge.source_type == SourceType.FILE

    # Verify the organization exists
    org = db.query(MockOrganization).filter(
        MockOrganization.id == test_user.organization_id
    ).first()
    assert org is not None

    response = client.get(
        f"/api/v1/knowledge/organization/{str(test_user.organization_id)}?page=1&page_size=10"
    )

    assert response.status_code == 200
    data = response.json()
    assert "knowledge" in data
    assert "pagination" in data
    assert len(data["knowledge"]) == 1
    assert data["knowledge"][0]["id"] == test_knowledge.id
    assert data["knowledge"][0]["name"] == test_knowledge.source
    assert data["knowledge"][0]["type"] == test_knowledge.source_type.value  # Note: need to get the value from enum

def test_get_queue_status(client, test_user, test_queue_item):
    """Test getting queue status"""
    response = client.get(f"/api/v1/knowledge/queue/{test_queue_item.id}")

    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["status"] == QueueStatus.PENDING

def test_delete_knowledge(client, test_user, test_knowledge, db):
    """Test deleting knowledge"""
    # Store the ID before deletion
    knowledge_id = test_knowledge.id
    
    # Create knowledge to agent link to test cascade delete
    knowledge_link = MockKnowledgeToAgent(
        knowledge_id=knowledge_id,
        agent_id=uuid4()
    )
    db.add(knowledge_link)
    db.commit()

    response = client.delete(f"/api/v1/knowledge/{knowledge_id}")

    assert response.status_code == 200
    data = response.json()
    assert "Knowledge source deleted successfully" in data["message"]

    # Verify deletion using the same test database session
    knowledge = db.query(MockKnowledge).filter_by(id=knowledge_id).first()
    assert knowledge is None  # Knowledge should be deleted
    
    link = db.query(MockKnowledgeToAgent).filter_by(knowledge_id=knowledge_id).first()
    assert link is None  # Link should be deleted due to cascade

def test_unauthorized_access(client, db, test_user, test_agent):
    """Test access without required permissions"""
    db.execute(test_role_permissions.delete())
    db.commit()

    response = client.post(
        "/api/v1/knowledge/upload/pdf",
        files=[("files", ("test.pdf", b"test content", "application/pdf"))],
        data={
            "org_id": str(test_user.organization_id),
            "agent_id": str(test_agent.id)
        }
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Not enough permissions" 