import pytest
from unittest.mock import patch, MagicMock
from app.services.firebase import initialize_firebase, send_firebase_notification
from firebase_admin import messaging
from app.models.notification import Notification
from uuid import uuid4
import json

@pytest.fixture
def mock_db():
    """Create a mock database session"""
    db = MagicMock()
    return db

@pytest.fixture
def mock_notification():
    """Create a mock notification"""
    user_id = uuid4()
    return Notification(
        id=uuid4(),
        user_id=user_id,
        title="Test Notification",
        message="This is a test notification",
        type="test",
        metadata={"key": "value"}
    )

@pytest.fixture
def mock_user_repo():
    """Create a mock user repository"""
    repo = MagicMock()
    repo.get_user_fcm_token.return_value = "test_fcm_token"
    return repo

def test_initialize_firebase_success():
    """Test successful Firebase initialization"""
    with patch('firebase_admin.credentials.Certificate') as mock_cert, \
         patch('firebase_admin.initialize_app') as mock_init, \
         patch('firebase_admin._apps', new={}):  # Simulate uninitialized state
        
        # Execute
        initialize_firebase()
        
        # Assert
        mock_cert.assert_called_once()
        mock_init.assert_called_once()

def test_initialize_firebase_already_initialized():
    """Test Firebase initialization when already initialized"""
    with patch('firebase_admin._apps', new={'[DEFAULT]': MagicMock()}):  # Simulate initialized state
        # Execute
        initialize_firebase()
        # No assertions needed as function should return without doing anything

def test_initialize_firebase_failure():
    """Test Firebase initialization failure"""
    with patch('firebase_admin.credentials.Certificate') as mock_cert, \
         patch('firebase_admin._apps', new={}):  # Simulate uninitialized state
        
        # Configure mock to raise exception
        mock_cert.side_effect = Exception("Failed to initialize")
        
        # Execute and Assert
        with pytest.raises(Exception, match="Failed to initialize"):
            initialize_firebase()

@pytest.mark.asyncio
async def test_send_firebase_notification_success(mock_db, mock_notification, mock_user_repo):
    """Test successful sending of Firebase notification"""
    with patch('app.services.firebase.UserRepository') as mock_user_repo_class, \
         patch('firebase_admin.messaging.send') as mock_send:
        
        # Configure mocks
        mock_user_repo_class.return_value = mock_user_repo
        mock_send.return_value = "message_id"
        
        # Execute
        await send_firebase_notification(mock_notification, mock_db)
        
        # Assert
        mock_user_repo.get_user_fcm_token.assert_called_once_with(mock_notification.user_id)
        mock_send.assert_called_once()
        
        # Verify the message structure
        call_args = mock_send.call_args[0][0]
        assert isinstance(call_args, messaging.Message)
        assert call_args.token == "test_fcm_token"
        assert call_args.notification.title == mock_notification.title
        assert call_args.notification.body == mock_notification.message
        assert call_args.data["type"] == mock_notification.type
        assert call_args.data["id"] == str(mock_notification.id)
        assert json.loads(call_args.data["metadata"]) == mock_notification.metadata

@pytest.mark.asyncio
async def test_send_firebase_notification_no_token(mock_db, mock_notification, mock_user_repo):
    """Test sending Firebase notification when user has no FCM token"""
    with patch('app.services.firebase.UserRepository') as mock_user_repo_class, \
         patch('firebase_admin.messaging.send') as mock_send:
        
        # Configure mock to return no token
        mock_user_repo.get_user_fcm_token.return_value = None
        mock_user_repo_class.return_value = mock_user_repo
        
        # Execute
        await send_firebase_notification(mock_notification, mock_db)
        
        # Assert
        mock_user_repo.get_user_fcm_token.assert_called_once_with(mock_notification.user_id)
        mock_send.assert_not_called()

@pytest.mark.asyncio
async def test_send_firebase_notification_failure(mock_db, mock_notification, mock_user_repo):
    """Test handling of Firebase notification sending failure"""
    with patch('app.services.firebase.UserRepository') as mock_user_repo_class, \
         patch('firebase_admin.messaging.send') as mock_send:
        
        # Configure mocks
        mock_user_repo_class.return_value = mock_user_repo
        mock_send.side_effect = Exception("Failed to send message")
        
        # Execute
        await send_firebase_notification(mock_notification, mock_db)
        
        # Assert
        mock_user_repo.get_user_fcm_token.assert_called_once_with(mock_notification.user_id)
        mock_send.assert_called_once() 