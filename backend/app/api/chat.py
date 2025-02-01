from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.schemas.chat import ChatOverviewResponse, ChatDetailResponse
from app.core.auth import get_current_user
from app.models.user import User
from app.database import get_db
from app.repositories.chat import ChatRepository
from app.core.logger import get_logger
from uuid import UUID

from fastapi import status


router = APIRouter()
logger = get_logger(__name__)


@router.get("/")
async def get_chat_history():
    return {"message": "Chat history endpoint"}


@router.get("/recent", response_model=List[ChatOverviewResponse])
async def get_recent_chats(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    agent_id: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get recent chats based on user permissions and groups"""
    user_permissions = {p.name for p in current_user.role.permissions}
    can_view_all = "view_all_chats" in user_permissions
    can_view_assigned = "view_assigned_chats" in user_permissions
    
    if not (can_view_all or can_view_assigned):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    chat_repo = ChatRepository(db)
    
    try:
        # Get user's group IDs
        user_group_ids = [str(group.id) for group in current_user.groups]
        logger.debug(f"User groups: {user_group_ids}")
        logger.debug(f"current_user.user_id: {current_user.id}")
        
        # If user can only view assigned chats, filter by user_id and groups
        if not can_view_all and can_view_assigned:
            return chat_repo.get_recent_chats(
                skip=skip,
                limit=limit,
                agent_id=agent_id,
                user_id=current_user.id,  # Pass UUID directly
                user_groups=user_group_ids,
                organization_id=current_user.organization_id
            )
        
        # For users with view_all_chats permission
        return chat_repo.get_recent_chats(
            skip=skip,
            limit=limit,
            agent_id=agent_id,
            organization_id=current_user.organization_id
        )
    except ValueError as e:
        logger.error(f"Invalid UUID format: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid UUID format"
        )
    except Exception as e:
        logger.error(f"Error getting recent chats: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch recent chats"
        )

@router.get("/{session_id}", response_model=ChatDetailResponse)
async def get_chat_detail(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get detailed chat history for a session"""
    # Check permissions first
    user_permissions = {p.name for p in current_user.role.permissions}
    can_view_all = "view_all_chats" in user_permissions
    can_view_assigned = "view_assigned_chats" in user_permissions
    
    if not (can_view_all or can_view_assigned):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )

    try:
        # Convert session_id to UUID
        session_id_uuid = UUID(session_id)
        chat_repo = ChatRepository(db)
        
        # Get user's group IDs
        user_group_ids = [str(group.id) for group in current_user.groups]

        # If user can only view assigned chats, verify access
        if not can_view_all and can_view_assigned:
            has_access = await chat_repo.check_session_access(
                session_id=session_id_uuid,
                user_id=current_user.id,
                user_groups=user_group_ids
            )
            if not has_access:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Chat session not found"
                )
        
        # Get chat detail
        chat_detail = await chat_repo.get_chat_detail(
            session_id=session_id_uuid,
            org_id=current_user.organization_id
        )
        
        if not chat_detail:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat session not found"
            )
        
        return chat_detail
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid UUID format"
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting chat detail: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch chat detail"
        )

