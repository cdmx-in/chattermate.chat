from fastapi import APIRouter, Depends, HTTPException
from app.core import config
from app.core.logger import get_logger
from app.database import get_db
from app.models.user import User
from app.core.auth import get_current_user, require_permissions
from app.repositories.ai_config import AIConfigRepository
from app.agents.chat_agent import ChatAgent
from app.models.schemas.ai_config import AIConfigCreate, AIConfigResponse, AISetupResponse
from sqlalchemy.orm import Session

router = APIRouter()
logger = get_logger(__name__)


@router.post("/setup", response_model=AISetupResponse)
async def setup_ai(
    config_data: AIConfigCreate,
    current_user: User = Depends(require_permissions("manage_ai_config")),
    db: Session = Depends(get_db)
):
    """Setup AI configuration for the current user's organization"""
    try:
        # Test API key before creating config
        try:
            is_valid = await ChatAgent.test_api_key(
                api_key=config_data.api_key.get_secret_value(),
                model_type=config_data.model_type,
                model_name=config_data.model_name
            )
            if not is_valid:
                raise HTTPException(
                    status_code=400,
                    detail={
                        "error": "Invalid API key",
                        "type": "invalid_api_key",
                        "details": "The provided API key is invalid or does not have access to the selected model."
                    }
                )
        except Exception as e:
            if config_data.model_type.upper() == 'OLLAMA':
                raise HTTPException(
                status_code=400,
                detail={
                    "error": "validation failed",
                    "type": "api_key_validation_error",
                    "details": str(e)
                }
                )
            else:    
                raise HTTPException(
                    status_code=400,
                    detail={
                        "error": "API key validation failed",
                        "type": "api_key_validation_error",
                        "details": str(e)
                    }
                )

        # Create AI configuration
        ai_config_repo = AIConfigRepository(db)
        ai_config = ai_config_repo.create_config(
            org_id=current_user.organization_id,
            model_type=config_data.model_type,
            model_name=config_data.model_name,
            api_key="" if config_data.model_type.upper() == 'OLLAMA' else config_data.api_key.get_secret_value()
        )

        # Prepare response
        response = AISetupResponse(
            message="AI configuration completed successfully",
            config=AIConfigResponse(
                id=ai_config.id,
                organization_id=ai_config.organization_id,
                model_type=ai_config.model_type,
                model_name=ai_config.model_name,
                is_active=ai_config.is_active,
                settings=ai_config.settings
            )
        )

        logger.info(
            f"AI setup completed for org {current_user.organization_id}")
        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"AI setup error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to setup AI configuration"
        )


@router.get("/config", response_model=AIConfigResponse)
async def get_organization_ai_config(
    current_user: User = Depends(require_permissions("view_ai_config")),
    db: Session = Depends(get_db)
):
    """Get active AI configuration for the current user's organization"""
    try:
        ai_config_repo = AIConfigRepository(db)
        ai_config = ai_config_repo.get_active_config(
            current_user.organization_id)

        if not ai_config:
            raise HTTPException(
                status_code=404,
                detail="No active AI configuration found"
            )

        return AIConfigResponse(
            id=ai_config.id,
            organization_id=ai_config.organization_id,
            model_type=ai_config.model_type,
            model_name=ai_config.model_name,
            is_active=ai_config.is_active,
            settings=ai_config.settings
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting AI config: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get AI configuration"
        )
