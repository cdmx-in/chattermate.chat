"""
ChatterMate - Test Organization Repo
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
from sqlalchemy.pool import StaticPool
from app.database import Base
from app.models.organization import Organization
from app.repositories.organization import OrganizationRepository
from uuid import uuid4

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
def org_repo(db):
    """Create an organization repository instance"""
    return OrganizationRepository(db)

def test_create_organization(org_repo):
    """Test creating a new organization"""
    name = "Test Organization"
    domain = "test.com"
    timezone = "UTC"
    business_hours = {
        "monday": {"start": "09:00", "end": "17:00"},
        "tuesday": {"start": "09:00", "end": "17:00"}
    }

    org = org_repo.create_organization(
        name=name,
        domain=domain,
        timezone=timezone,
        business_hours=business_hours
    )

    assert org.name == name
    assert org.domain == domain
    assert org.timezone == timezone
    assert org.business_hours == business_hours
    assert org.is_active is True

def test_get_organization(org_repo):
    """Test retrieving an organization by ID"""
    # Create test organization
    org = org_repo.create_organization(
        name="Test Organization",
        domain="test.com",
        timezone="UTC"
    )

    # Retrieve organization
    retrieved_org = org_repo.get_organization(org.id)
    assert retrieved_org.id == org.id
    assert retrieved_org.name == org.name

def test_get_organization_by_domain(org_repo):
    """Test retrieving an organization by domain"""
    domain = "test.com"
    org = org_repo.create_organization(
        name="Test Organization",
        domain=domain,
        timezone="UTC"
    )

    retrieved_org = org_repo.get_organization_by_domain(domain)
    assert retrieved_org.id == org.id
    assert retrieved_org.domain == domain

def test_get_multi(org_repo):
    """Test retrieving multiple organizations with pagination"""
    # Create multiple organizations
    orgs = []
    for i in range(5):
        org = org_repo.create_organization(
            name=f"Organization {i}",
            domain=f"org{i}.com",
            timezone="UTC"
        )
        orgs.append(org)

    # Test pagination
    active_orgs = org_repo.get_active_organizations()
    assert len(active_orgs) == 5

def test_update_organization(org_repo):
    """Test updating an organization"""
    # Create test organization
    org = org_repo.create_organization(
        name="Test Organization",
        domain="test.com",
        timezone="UTC"
    )

    # Update organization
    new_name = "Updated Organization"
    new_settings = {"new_setting": "new_value"}
    updated_org = org_repo.update_organization(
        org_id=org.id,
        name=new_name,
        settings=new_settings
    )

    assert updated_org.name == new_name
    assert updated_org.settings == new_settings
    assert updated_org.id == org.id

def test_delete_organization(org_repo):
    """Test soft deleting an organization"""
    # Create test organization
    org = org_repo.create_organization(
        name="Test Organization",
        domain="test.com",
        timezone="UTC"
    )

    # Delete organization
    success = org_repo.delete_organization(org.id)
    assert success is True

    # Verify organization is deleted
    deleted_org = org_repo.get_organization(org.id)
    assert deleted_org is None

def test_get_active_organizations(org_repo):
    """Test retrieving only active organizations"""
    # Create active and inactive organizations
    active_org = org_repo.create_organization(
        name="Active Organization",
        domain="active.com",
        timezone="UTC"
    )
    inactive_org = org_repo.create_organization(
        name="Inactive Organization",
        domain="inactive.com",
        timezone="UTC"
    )
    org_repo.delete_organization(inactive_org.id)

    # Get active organizations
    active_orgs = org_repo.get_active_organizations()
    assert len(active_orgs) == 1
    assert active_orgs[0].id == active_org.id
    assert active_orgs[0].is_active is True

def test_organization_with_business_hours(org_repo):
    """Test organization with business hours"""
    business_hours = {
        "monday": {"start": "09:00", "end": "17:00"},
        "tuesday": {"start": "09:00", "end": "17:00"},
        "wednesday": {"start": "09:00", "end": "17:00"},
        "thursday": {"start": "09:00", "end": "17:00"},
        "friday": {"start": "09:00", "end": "17:00"}
    }

    org = org_repo.create_organization(
        name="Test Organization",
        domain="test.com",
        timezone="UTC",
        business_hours=business_hours
    )

    retrieved_org = org_repo.get_organization(org.id)
    assert retrieved_org.business_hours == business_hours

def test_organization_with_settings(org_repo):
    """Test organization with custom settings"""
    settings = {
        "chat_timeout": 300,
        "max_sessions": 10,
        "welcome_message": "Welcome to our organization!"
    }

    org = org_repo.create_organization(
        name="Test Organization",
        domain="test.com",
        timezone="UTC"
    )

    # Update settings
    updated_org = org_repo.update_settings(org.id, settings)
    assert updated_org.settings == settings 