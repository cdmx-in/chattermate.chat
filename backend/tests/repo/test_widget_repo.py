"""
ChatterMate - Test Widget Repo
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

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models.widget import Widget
from app.models.schemas.widget import WidgetCreate
from app.repositories import widget as widget_repo
from uuid import UUID, uuid4

# Test database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

@pytest.fixture(scope="function")
def engine():
    """Create a test database engine"""
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
    Base.metadata.create_all(bind=engine)
    yield engine
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def db_session(engine):
    """Create a test database session"""
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture
def test_org_id():
    """Create a test organization ID"""
    return uuid4()

@pytest.fixture
def test_agent_id():
    """Create a test agent ID"""
    return uuid4()

@pytest.fixture
def test_widget(db_session, test_org_id, test_agent_id):
    """Create a test widget"""
    widget_data = WidgetCreate(
        name="Test Widget",
        agent_id=test_agent_id
    )
    widget = widget_repo.create_widget(db_session, widget_data, test_org_id)
    return widget

def test_create_widget(db_session, test_org_id, test_agent_id):
    """Test creating a new widget"""
    widget_data = WidgetCreate(
        name="New Widget",
        agent_id=test_agent_id
    )
    
    widget = widget_repo.create_widget(db_session, widget_data, test_org_id)
    assert widget is not None
    assert widget.name == widget_data.name
    assert widget.agent_id == test_agent_id
    assert widget.organization_id == test_org_id

    # Verify widget was saved to database
    saved_widget = widget_repo.get_widget(db_session, str(widget.id))
    assert saved_widget is not None
    assert saved_widget.name == widget_data.name

def test_get_widget(db_session, test_widget):
    """Test retrieving a widget by ID"""
    # Get existing widget
    widget = widget_repo.get_widget(db_session, str(test_widget.id))
    assert widget is not None
    assert widget.id == test_widget.id
    assert widget.name == test_widget.name
    assert widget.agent_id == test_widget.agent_id
    assert widget.organization_id == test_widget.organization_id

    # Try to get non-existent widget
    non_existent_widget = widget_repo.get_widget(db_session, str(uuid4()))
    assert non_existent_widget is None

def test_get_widgets(db_session, test_org_id, test_widget):
    """Test retrieving widgets by organization"""
    # Create another widget in a different organization
    other_org_id = uuid4()
    other_widget_data = WidgetCreate(
        name="Other Widget",
        agent_id=uuid4()
    )
    widget_repo.create_widget(db_session, other_widget_data, other_org_id)

    # Get widgets for test organization
    widgets = widget_repo.get_widgets(db_session, test_org_id)
    assert len(widgets) == 1
    assert widgets[0].id == test_widget.id
    assert widgets[0].name == test_widget.name
    assert widgets[0].organization_id == test_org_id

    # Get widgets for other organization
    other_widgets = widget_repo.get_widgets(db_session, other_org_id)
    assert len(other_widgets) == 1
    assert other_widgets[0].name == other_widget_data.name
    assert other_widgets[0].organization_id == other_org_id

def test_delete_widget(db_session, test_widget):
    """Test deleting a widget"""
    # Delete existing widget
    widget_repo.delete_widget(db_session, str(test_widget.id))

    # Verify widget was deleted
    deleted_widget = widget_repo.get_widget(db_session, str(test_widget.id))
    assert deleted_widget is None

    # Try to delete non-existent widget (should not raise error)
    widget_repo.delete_widget(db_session, str(uuid4())) 