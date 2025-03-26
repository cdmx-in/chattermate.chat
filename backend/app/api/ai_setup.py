"""
ChatterMate - Ai Setup
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

from fastapi import APIRouter, Depends, HTTPException
from app.core import config
from app.core.logger import get_logger
from app.database import get_db
from app.models.user import User
from app.core.auth import get_current_user, require_permissions
from app.repositories.ai_config import AIConfigRepository
from app.agents.chat_agent import ChatAgent
from app.models.schemas.ai_config import AIConfigCreate, AIConfigResponse, AISetupResponse, AIConfigUpdate
from sqlalchemy.orm import Session
import os

# Try to import enterprise modules
try:
    from app.enterprise.repositories.subscription import SubscriptionRepository
    HAS_ENTERPRISE = True
except ImportError:
    HAS_ENTERPRISE = False

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
        # Check if using ChatterMate model
        if HAS_ENTERPRISE and config_data.model_type.lower() == 'chattermate' and config_data.model_name.lower() == 'chattermate':
            # Use Groq as provider with keys from env
            model_type = 'GROQ'
            model_name = os.getenv('CHATTERMATE_MODEL_NAME', 'llama3-70b-8192')
            api_key = os.getenv('CHATTERMATE_API_KEY', '')
        
                
            if not api_key:
                logger.error("ChatterMate API key not found in environment")
                raise HTTPException(
                        status_code=500,
                        detail="ChatterMate API configuration missing"
                )
                
            # Create AI configuration
            ai_config_repo = AIConfigRepository(db)
            ai_config = ai_config_repo.create_config(
                org_id=current_user.organization_id,
                model_type=model_type,
                model_name=model_name,
                api_key=api_key
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
                f"ChatterMate AI setup completed for org {current_user.organization_id}")
            return response
        
        # Regular custom model setup
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


@router.put("/config", response_model=AISetupResponse)
async def update_ai_config(
    config_data: AIConfigUpdate,
    current_user: User = Depends(require_permissions("manage_ai_config")),
    db: Session = Depends(get_db)
):
    """Update AI configuration for the current user's organization"""
    try:
        # Get current config
        ai_config_repo = AIConfigRepository(db)
        current_config = ai_config_repo.get_active_config(current_user.organization_id)
        
        if not current_config:
            raise HTTPException(
                status_code=404,
                detail="No active AI configuration found to update"
            )
        
        # Check if using ChatterMate model
        if HAS_ENTERPRISE and config_data.model_type.lower() == 'chattermate' and config_data.model_name.lower() == 'chattermate':
            # Use Groq as provider with keys from env
            model_type = 'GROQ'
            model_name = os.getenv('CHATTERMATE_MODEL_NAME', 'llama3-70b-8192')
            api_key = os.getenv('CHATTERMATE_API_KEY', '')
            
            if not api_key:
                logger.error("ChatterMate API key not found in environment")
                raise HTTPException(
                    status_code=500,
                    detail="ChatterMate API configuration missing"
                )
                
            # Update AI configuration
            updated_config = ai_config_repo.update_config(
                config_id=current_config.id,
                model_type=model_type,
                model_name=model_name,
                api_key=api_key
            )
            
            logger.info(f"ChatterMate AI config updated for org {current_user.organization_id}")
        else:
            # For custom model, validate API key first if provided
            if config_data.api_key and config_data.model_type.upper() != 'OLLAMA':
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
                    raise HTTPException(
                        status_code=400,
                        detail={
                            "error": "API key validation failed",
                            "type": "api_key_validation_error",
                            "details": str(e)
                        }
                    )
            
            # Determine the API key to use
            api_key = ""
            if config_data.model_type.upper() == 'OLLAMA':
                api_key = ""
            elif config_data.api_key:
                api_key = config_data.api_key.get_secret_value()
            else:
                # Keep existing API key if not provided
                api_key = None  # None indicates no change
            
            # Update AI configuration
            updated_config = ai_config_repo.update_config(
                config_id=current_config.id,
                model_type=config_data.model_type,
                model_name=config_data.model_name,
                api_key=api_key
            )
            
            logger.info(f"AI config updated for org {current_user.organization_id}")
        
        # Prepare response
        response = AISetupResponse(
            message="AI configuration updated successfully",
            config=AIConfigResponse(
                id=updated_config.id,
                organization_id=updated_config.organization_id,
                model_type=updated_config.model_type,
                model_name=updated_config.model_name,
                is_active=updated_config.is_active,
                settings=updated_config.settings
            )
        )
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"AI config update error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to update AI configuration"
        )
