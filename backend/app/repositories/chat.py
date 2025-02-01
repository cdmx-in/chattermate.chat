from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.chat_history import ChatHistory
from app.models.customer import Customer
from uuid import UUID
from sqlalchemy import func, or_, select
from app.models.agent import Agent
from app.models.session_to_agent import SessionToAgent
from app.core.logger import get_logger
from app.models.user import User
from sqlalchemy.orm import joinedload

logger = get_logger(__name__)

class ChatRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_message(self, message_data: dict) -> ChatHistory:
        """Create a new chat message"""
        # Convert string IDs to UUID if needed
        for field in ['organization_id', 'user_id', 'customer_id', 'agent_id', 'session_id']:
            if field in message_data and isinstance(message_data[field], str):
                try:
                    message_data[field] = UUID(message_data[field])
                except (ValueError, AttributeError):
                    message_data[field] = None

        message = ChatHistory(**message_data)
        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)
        return message

    def get_session_history(self, session_id: str | UUID) -> List[ChatHistory]:
        """Get chat history for a session with joined relationships"""
        if isinstance(session_id, str):
            session_id = UUID(session_id)
        
        return (
            self.db.query(ChatHistory)
            .options(
                joinedload(ChatHistory.user),
                joinedload(ChatHistory.agent)
            )
            .filter(ChatHistory.session_id == session_id)
            .order_by(ChatHistory.created_at.asc())
            .all()
        )

    def get_user_history(self, user_id: str | UUID) -> List[ChatHistory]:
        """Get chat history for a user"""
        if isinstance(user_id, str):
            user_id = UUID(user_id)
            
        return self.db.query(ChatHistory).filter(
            ChatHistory.user_id == user_id
        ).order_by(ChatHistory.created_at.desc()).all()

    def get_recent_chats(
        self,
        skip: int = 0,
        limit: int = 20,
        agent_id: Optional[str | UUID] = None,
        user_id: Optional[str | UUID] = None,
        user_groups: Optional[List[str]] = None,
        organization_id: Optional[str | UUID] = None
    ) -> List[dict]:
        """Get recent chat overviews grouped by conversation"""
        # Convert string IDs to UUID if needed
        if agent_id and isinstance(agent_id, str):
            agent_id = UUID(agent_id)
        if user_id and isinstance(user_id, str):
            user_id = UUID(user_id)
        if organization_id and isinstance(organization_id, str):
            organization_id = UUID(organization_id)
        if user_groups:
            user_groups = [UUID(g) if isinstance(g, str) else g for g in user_groups]

        query = self.db.query(
            Customer.id.label('customer_id'),
            Customer.email.label('customer_email'),
            Customer.full_name.label('customer_full_name'),
            Agent.id.label('agent_id'),
            Agent.name.label('agent_name'),
            Agent.display_name.label('agent_display_name'),
            SessionToAgent.status.label('status'),
            SessionToAgent.group_id.label('group_id'),
            func.max(ChatHistory.message).label('last_message'),
            func.max(ChatHistory.created_at).label('updated_at'),
            func.count(ChatHistory.id).label('message_count'),
            SessionToAgent.session_id.label('session_id')
        ).join(
            Agent, ChatHistory.agent_id == Agent.id
        ).join(
            Customer, ChatHistory.customer_id == Customer.id
        ).join(
            SessionToAgent, ChatHistory.session_id == SessionToAgent.session_id
        )

        # Filter conditions
        if agent_id:
            query = query.filter(Agent.id == agent_id)
        
        # Filter by organization
        if organization_id:
            query = query.filter(SessionToAgent.organization_id == organization_id)
        
        # Use OR condition for user_id and user_groups
        if user_id and user_groups:
            query = query.filter(
                or_(
                    SessionToAgent.user_id == user_id,
                    SessionToAgent.group_id.in_(user_groups)
                )
            )
        elif user_id:
            query = query.filter(SessionToAgent.user_id == user_id)
        elif user_groups:
            query = query.filter(SessionToAgent.group_id.in_(user_groups))

        # Group by and order
        query = query.group_by(
            Customer.id,
            Customer.email,
            Customer.full_name,
            Agent.id,
            Agent.name,
            Agent.display_name,
            SessionToAgent.status,
            SessionToAgent.group_id,
            SessionToAgent.session_id
        ).order_by(
            func.max(ChatHistory.created_at).desc()
        ).offset(skip).limit(limit)

        results = query.all()
        return [{
            'customer': {
                'id': r.customer_id,
                'email': r.customer_email,
                'full_name': r.customer_full_name
            },
            'agent': {
                'id': r.agent_id,
                'name': r.agent_name,
                'display_name': r.agent_display_name
            },
            'last_message': r.last_message,
            'updated_at': r.updated_at,
            'message_count': r.message_count,
            'status': r.status,
            'group_id': str(r.group_id) if r.group_id else None,
            'session_id': r.session_id
        } for r in results]

    async def check_session_access(
        self,
        session_id: str | UUID,
        user_id: str | UUID,
        user_groups: List[str]
    ) -> bool:
        """Check if user has access to a chat session"""
        if isinstance(session_id, str):
            session_id = UUID(session_id)
        if isinstance(user_id, str):
            user_id = UUID(user_id)

        session = (
            self.db.query(SessionToAgent)
            .filter(SessionToAgent.session_id == session_id)
            .first()
        )
        
        if not session:
            return False
            
        return (
            session.user_id == user_id or
            (session.group_id and str(session.group_id) in user_groups)
        )

    async def get_chat_detail(
        self,
        session_id: str | UUID,
        org_id: str | UUID
    ) -> Optional[dict]:
        """Get detailed chat information for a session"""
        if isinstance(session_id, str):
            session_id = UUID(session_id)
        if isinstance(org_id, str):
            org_id = UUID(org_id)

        result = (
            self.db.query(
                Customer.id.label('customer_id'),
                Customer.email.label('customer_email'),
                Customer.full_name.label('customer_full_name'),
                Agent.id.label('agent_id'),
                Agent.name.label('agent_name'),
                Agent.display_name.label('agent_display_name'),
                SessionToAgent.status.label('status'),
                SessionToAgent.group_id.label('group_id'),
                SessionToAgent.session_id.label('session_id'),
                SessionToAgent.user_id.label('user_id'),
                User.full_name.label('user_name'),
                func.min(ChatHistory.created_at).label('created_at'),
                func.max(ChatHistory.created_at).label('updated_at')
            )
            .join(Agent, ChatHistory.agent_id == Agent.id)
            .join(Customer, ChatHistory.customer_id == Customer.id)
            .join(SessionToAgent, ChatHistory.session_id == SessionToAgent.session_id)
            .outerjoin(User, SessionToAgent.user_id == User.id)
            .filter(
                ChatHistory.session_id == session_id,
                SessionToAgent.organization_id == org_id
            )
            .group_by(
                Customer.id,
                Customer.email,
                Customer.full_name,
                Agent.id,
                Agent.name,
                Agent.display_name,
                SessionToAgent.status,
                SessionToAgent.group_id,
                SessionToAgent.session_id,
                SessionToAgent.user_id,
                User.full_name
            )
            .first()
        )

        if not result:
            return None

        # Get messages for the session
        messages = self.get_session_history(session_id)
        
        # Convert result to dict
        return {
            'customer': {
                'id': result.customer_id,
                'email': result.customer_email,
                'full_name': result.customer_full_name
            },
            'agent': {
                'id': result.agent_id,
                'name': result.agent_name,
                'display_name': result.agent_display_name
            },
            'status': result.status,
            'group_id': str(result.group_id) if result.group_id else None,
            'session_id': result.session_id,
            'user_id': result.user_id,
            'user_name': result.user_name,
            'created_at': result.created_at,
            'updated_at': result.updated_at,
            'messages': [
                {
                    'message': msg.message,
                    'message_type': msg.message_type,
                    'created_at': msg.created_at,
                    'attributes': msg.attributes
                }
                for msg in messages
            ]
        }
