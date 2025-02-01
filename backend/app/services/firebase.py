import firebase_admin
from firebase_admin import credentials, messaging
from app.core.config import settings
import json
from app.repositories.user import UserRepository
from app.core.logger import get_logger

logger = get_logger(__name__)


def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    try:
        # Check if already initialized
        if not firebase_admin._apps:
            # Initialize with service account
            cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
            firebase_admin.initialize_app(cred)
            logger.info("Firebase Admin SDK initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Firebase: {str(e)}")
        raise


async def send_firebase_notification(notification, db):
    """Send notification through Firebase Cloud Messaging"""
    try:
        # Get user's FCM token from database
        user_repo = UserRepository(db)
        user_token = user_repo.get_user_fcm_token(notification.user_id)
        if not user_token:
            logger.warning(f"No FCM token found for user {
                           notification.user_id}")
            return

        message = messaging.Message(
            notification=messaging.Notification(
                title=notification.title,
                body=notification.message,
            ),
            data={
                "type": notification.type,
                "id": str(notification.id),
                "metadata": json.dumps(notification.metadata)
            },
            token=user_token,
        )

        response = messaging.send(message)
        logger.info(f"Successfully sent notification: {response}")

    except Exception as e:
        logger.error(f"Error sending Firebase notification: {str(e)}")
