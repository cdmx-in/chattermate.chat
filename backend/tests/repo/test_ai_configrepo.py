"""
ChatterMate - Test Ai Configrepo
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
from app.models.ai_config import AIConfig, AIModelType
from app.repositories.ai_config import AIConfigRepository
from app.core.security import decrypt_api_key
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
def ai_config_repo(db):
    """Create an AI config repository instance"""
    return AIConfigRepository(db)

@pytest.fixture
def test_organization_id():
    """Create a consistent organization ID for all tests"""
    return str(uuid4())

def test_create_config(ai_config_repo, test_organization_id):
    """Test creating a new AI configuration"""
    model_type = "openai"
    model_name = "gpt-4"
    api_key = "test-api-key-123"

    config = ai_config_repo.create_config(
        org_id=UUID(test_organization_id),
        model_type=model_type,
        model_name=model_name,
        api_key=api_key
    )

    assert config is not None
    assert config.organization_id == UUID(test_organization_id)
    assert config.model_type == AIModelType.OPENAI
    assert config.model_name == model_name
    assert config.is_active is True
    # Verify API key is encrypted
    assert config.encrypted_api_key != api_key
    # Verify API key can be decrypted
    decrypted_key = decrypt_api_key(config.encrypted_api_key)
    assert decrypted_key == api_key

def test_create_config_deactivates_existing(ai_config_repo, test_organization_id):
    """Test that creating a new config deactivates existing ones"""
    # Create first config
    config1 = ai_config_repo.create_config(
        org_id=UUID(test_organization_id),
        model_type="openai",
        model_name="gpt-4",
        api_key="key1"
    )

    # Create second config
    config2 = ai_config_repo.create_config(
        org_id=UUID(test_organization_id),
        model_type="anthropic",
        model_name="claude-2",
        api_key="key2"
    )

    # Verify first config is deactivated
    assert config1.is_active is False
    # Verify second config is active
    assert config2.is_active is True

def test_get_active_config(ai_config_repo, test_organization_id):
    """Test retrieving active AI configuration"""
    # Create a config
    original_config = ai_config_repo.create_config(
        org_id=UUID(test_organization_id),
        model_type="openai",
        model_name="gpt-4",
        api_key="test-key"
    )

    # Get active config
    active_config = ai_config_repo.get_active_config(UUID(test_organization_id))
    assert active_config is not None
    assert active_config.id == original_config.id
    assert active_config.model_type == original_config.model_type
    assert active_config.model_name == original_config.model_name

def test_get_active_config_none_exists(ai_config_repo, test_organization_id):
    """Test retrieving active config when none exists"""
    config = ai_config_repo.get_active_config(UUID(test_organization_id))
    assert config is None

def test_update_config(ai_config_repo, test_organization_id):
    """Test updating an AI configuration"""
    # Create initial config
    config = ai_config_repo.create_config(
        org_id=UUID(test_organization_id),
        model_type="openai",
        model_name="gpt-4",
        api_key="old-key"
    )

    # Update config
    new_model_name = "gpt-4-turbo"
    new_api_key = "new-key"
    updated_config = ai_config_repo.update_config(
        config_id=config.id,
        model_name=new_model_name,
        api_key=new_api_key
    )

    assert updated_config is not None
    assert updated_config.id == config.id
    assert updated_config.model_name == new_model_name
    # Verify new API key is encrypted and can be decrypted
    decrypted_key = decrypt_api_key(updated_config.encrypted_api_key)
    assert decrypted_key == new_api_key

def test_update_nonexistent_config(ai_config_repo):
    """Test updating a non-existent configuration"""
    result = ai_config_repo.update_config(
        config_id=999,
        model_name="new-model"
    )
    assert result is None

def test_deactivate_config(ai_config_repo, test_organization_id):
    """Test deactivating an AI configuration"""
    # Create config
    config = ai_config_repo.create_config(
        org_id=UUID(test_organization_id),
        model_type="openai",
        model_name="gpt-4",
        api_key="test-key"
    )

    # Deactivate config
    success = ai_config_repo.deactivate_config(config.id)
    assert success is True

    # Verify config is deactivated
    active_config = ai_config_repo.get_active_config(UUID(test_organization_id))
    assert active_config is None

def test_deactivate_nonexistent_config(ai_config_repo):
    """Test deactivating a non-existent configuration"""
    success = ai_config_repo.deactivate_config(999)
    assert success is False

def test_multiple_organizations_configs(ai_config_repo):
    """Test handling configs for multiple organizations"""
    org1_id = uuid4()
    org2_id = uuid4()

    # Create configs for both organizations
    config1 = ai_config_repo.create_config(
        org_id=org1_id,
        model_type="openai",
        model_name="gpt-4",
        api_key="key1"
    )

    config2 = ai_config_repo.create_config(
        org_id=org2_id,
        model_type="anthropic",
        model_name="claude-2",
        api_key="key2"
    )

    # Verify both configs are active
    active1 = ai_config_repo.get_active_config(org1_id)
    active2 = ai_config_repo.get_active_config(org2_id)

    assert active1.id == config1.id
    assert active2.id == config2.id
    assert active1.is_active is True
    assert active2.is_active is True

def test_create_config_invalid_model_type(ai_config_repo, test_organization_id):
    """Test creating config with invalid model type"""
    with pytest.raises(ValueError):
        ai_config_repo.create_config(
            org_id=UUID(test_organization_id),
            model_type="invalid",
            model_name="model",
            api_key="key"
        ) 