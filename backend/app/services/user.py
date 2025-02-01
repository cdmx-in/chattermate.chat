from app.models.user import User
from app.models.notification import Notification
from app.core.logger import get_logger
from firebase_admin import messaging

logger = get_logger(__name__)


async def send_fcm_notification(user_id: str, notification: Notification, db):
    """Send FCM notification to user"""
    try:
        # Get user's FCM token
        user = db.query(User).filter(User.id == user_id).first()
        if not user or not user.fcm_token_web:
            return

        # Create FCM message
        message = messaging.Message(
            notification=messaging.Notification(
                title=notification.title,
                body=notification.message,
            ),
            data={
                'type': notification.type,
                'notification_id': str(notification.id),
                'metadata': str(notification.notification_metadata or {})
            },
            token=user.fcm_token_web,
        )

        # Send message
        response = messaging.send(message)
        logger.info(f"Successfully sent FCM notification: {response}")

    except Exception as e:
        logger.error(f"Failed to send FCM notification: {str(e)}")
