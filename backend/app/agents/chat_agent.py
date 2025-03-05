"""
ChatterMate - Chat Agent
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

import traceback
from typing import Optional
from phi.agent import Agent
from phi.model.openai import OpenAIChat
from app.core.logger import get_logger
from phi.model.message import Message
from app.tools.knowledge_search_byagent import KnowledgeSearchByAgent
from app.repositories.agent import AgentRepository
from app.database import get_db
from phi.storage.agent.postgres import PgAgentStorage
from app.repositories.chat import ChatRepository
import uuid
from app.repositories.session_to_agent import SessionToAgentRepository
from app.models.session_to_agent import SessionStatus
from pydantic import BaseModel, Field
from enum import Enum
from app.core.config import settings
from app.agents.transfer_agent import get_agent_availability_response
from app.models.notification import Notification
from app.services.user import send_fcm_notification
from app.models.user import User, user_groups
from datetime import datetime

logger = get_logger(__name__)

class TransferReasonType(str, Enum):
    UNABLE_TO_ANSWER = "UNABLE_TO_ANSWER"
    NEED_MORE_INFO = "NEED_MORE_INFO"
    KNOWLEDGE_GAP = "KNOWLEDGE_GAP"
    NEED_TO_CALL = "NEED_TO_CALL"
    NEED_TO_EMAIL = "NEED_TO_EMAIL"
    NEED_TO_MEET = "NEED_TO_MEET"
    FRUSTRATED = "FRUSTRATED"
    REPEAT_INSTRUCTIONS = "REPEAT_INSTRUCTIONS"
    DIRECT_REQUEST = "DIRECT_REQUEST"
    HIGH_PRIORITY_ISSUE = "HIGH_PRIORITY_ISSUE"
    COMPLIANCE_ISSUE = "COMPLIANCE_ISSUE"

class EndChatReasonType(str, Enum):
    ISSUE_RESOLVED = "ISSUE_RESOLVED"
    CUSTOMER_REQUEST = "CUSTOMER_REQUEST"
    CONFIRMATION_RECEIVED = "CONFIRMATION_RECEIVED"
    FAREWELL = "FAREWELL"
    THANK_YOU = "THANK_YOU"
    NATURAL_CONCLUSION = "NATURAL_CONCLUSION"
    TASK_COMPLETED = "TASK_COMPLETED"

class ChatResponse(BaseModel):
    message: str = Field(description="The response from the agent")
    transfer_to_human: bool = Field(description="Whether to transfer the conversation to a human")
    end_chat: bool = Field(default=False, description="Whether to end the chat and request rating")
    transfer_reason: Optional[TransferReasonType] = Field(default=None, description="Transfer reason Type should be one of the following: UNABLE_TO_ANSWER, NEED_MORE_INFO, KNOWLEDGE_GAP, NEED_TO_CALL, NEED_TO_EMAIL, NEED_TO_MEET, FRUSTRATED, REPEAT_INSTRUCTIONS, DIRECT_REQUEST, HIGH_PRIORITY_ISSUE, COMPLIANCE_ISSUE")
    transfer_description: Optional[str] = Field(default=None, description="Detailed description for the transfer")
    end_chat_reason: Optional[EndChatReasonType] = Field(default=None, description="End chat reason Type should be one of the following: ISSUE_RESOLVED, CUSTOMER_REQUEST, CONFIRMATION_RECEIVED, FAREWELL, THANK_YOU, NATURAL_CONCLUSION, TASK_COMPLETED")
    end_chat_description: Optional[str] = Field(default=None, description="Detailed description for ending the chat")
    request_rating: bool = Field(default=False, description="Whether to request a rating from the customer")

    class Config:
        from_attributes = True

class ChatAgent:
    def __init__(self, api_key: str, model_name: str = "gpt-4o-mini", model_type: str = "OPENAI", org_id: str = None, agent_id: str = None, customer_id: str = None, session_id: str = None):
        # Initialize knowledge search tool if org_id and agent_id provided
        tools = []
        if org_id and agent_id:
            knowledge_tool = KnowledgeSearchByAgent(
                agent_id=agent_id, org_id=org_id)
            tools.append(knowledge_tool)

        # Get template instructions
        agent_data_repo = AgentRepository(next(get_db()))
        self.agent_data = agent_data_repo.get_by_agent_id(
            agent_id) if agent_id else None
        self.api_key = api_key
        self.model_name = model_name
        self.model_type = model_type

        if self.agent_data:
            # Define end chat instructions to avoid long lines
            end_chat_with_rating = (
                "You should end the chat and request a rating ONLY when you are confident that: "
                "1) The customer's issue has been fully resolved and they have confirmed this, "
                "2) The customer explicitly requests to end the chat, "
                "3) There's a clear confirmation or acknowledgment from the customer that their needs have been met, "
                "4) The conversation has reached a natural conclusion after resolving the customer's query, or "
                "5) The requested task has been completed and confirmed by the customer. "
                "DO NOT end the chat just because the customer says \"thank you\" or \"thanks\" - "
                "this is often just politeness and not an indication that they want to end the conversation. "
                "Always check the conversation history to confirm the issue has been properly addressed before ending the chat."
            )
            
            end_chat_without_rating = (
                "You should end the chat ONLY when: "
                "1) The customer's issue has been fully resolved and they have confirmed this, "
                "2) The customer explicitly requests to end the chat, "
                "3) There's a clear confirmation or acknowledgment from the customer that their needs have been met, "
                "4) The conversation has reached a natural conclusion after resolving the customer's query, or "
                "5) The requested task has been completed and confirmed by the customer. "
                "DO NOT end the chat just because the customer says \"thank you\" or \"thanks\" - "
                "this is often just politeness and not an indication that they want to end the conversation."
            )
            
            transfer_instructions = (
                "You are allowed to transfer the conversation to a human if one of the following conditions is met: "
                "UNABLE_TO_ANSWER, NEED_MORE_INFO, KNOWLEDGE_GAP, NEED_TO_CALL, NEED_TO_EMAIL, NEED_TO_MEET, "
                "FRUSTRATED, REPEAT_INSTRUCTIONS, DIRECT_REQUEST, HIGH_PRIORITY_ISSUE, COMPLIANCE_ISSUE."
            )
            
            instructions = [
                f"You are {self.agent_data.display_name if self.agent_data.display_name else self.agent_data.name}, representing our company.",
                f" { transfer_instructions if self.agent_data.transfer_to_human else ''} ",
                f" { end_chat_with_rating if self.agent_data.ask_for_rating else end_chat_without_rating} ",
                *self.agent_data.instructions
            ]
        else:
            instructions = [
                "You are a helpful customer service agent.",
            ]

        model_type = model_type.upper()
        if model_type == 'OPENAI':
            model = OpenAIChat(api_key=api_key, id=model_name, max_tokens=1000)
        elif model_type == 'ANTHROPIC':
            from phi.model.anthropic import Claude
            model = Claude(api_key=api_key, id=model_name, max_tokens=1000)
        elif model_type == 'DEEPSEEK':
            from phi.model.deepseek import DeepSeekChat
            model = DeepSeekChat(api_key=api_key, id=model_name, max_tokens=1000)
        elif model_type == 'GOOGLE':
            from phi.model.google import Gemini
            model = Gemini(api_key=api_key, id=model_name, max_tokens=1000)
        elif model_type == 'GOOGLEVERTEX':
            from phi.model.vertexai import Gemini
            model = Gemini(api_key=api_key, id=model_name, max_tokens=1000)
        elif model_type == 'GROQ':
            from phi.model.groq import Groq
            model = Groq(api_key=api_key, id=model_name, max_tokens=1000)
        elif model_type == 'MISTRAL':
            from phi.model.mistral import MistralChat
            model = MistralChat(api_key=api_key, id=model_name, max_tokens=1000)
        elif model_type == 'HUGGINGFACE':
            from phi.model.huggingface import HuggingFaceChat
            model = HuggingFaceChat(api_key=api_key, id=model_name, max_tokens=1000)
        elif model_type == 'OLLAMA':
            from phi.model.ollama import Ollama
            model = Ollama(id=model_name)
        elif model_type == 'XAI':
            from phi.model.xai import xAI
            model = xAI(api_key=api_key, id=model_name, max_tokens=1000)
        else:
            raise ValueError(f"Unsupported model type: {model_type}")

        storage = PgAgentStorage(table_name="agent_sessions", db_url=settings.DATABASE_URL)

        self.agent = Agent(
            name="Customer Service Agent",
            session_id=session_id,
            model=model,
            tools=tools,
            instructions=instructions,
            agent_id=str(agent_id),
            storage=storage,
            add_history_to_messages=True,
            num_history_responses=10,
            read_chat_history=True,
            markdown=False,
            debug_mode=settings.ENVIRONMENT == "development",
            user_id=str(customer_id),
            session_data={"status": "active"},
            response_model=ChatResponse,
            structured_output=True,
        )

    async def get_response(self, message: str, session_id: str = None, org_id: str = None, agent_id: str = None, customer_id: str = None) -> ChatResponse:
        try:
            db = next(get_db())
            chat_repo = ChatRepository(db)
            
            self.agent.session_id = session_id

            # Create user message
            chat_repo.create_message({
                "message": message,
                "message_type": "user",
                "session_id": session_id,
                "organization_id": org_id,
                "agent_id": agent_id,
                "customer_id": customer_id,
                "attributes": {}
            })

            # Get AI response
            response = await self.agent.arun(
                message=message,
                session_id=session_id,
                stream=False
            )

            response_content = ""
            if hasattr(response, 'content'):
                if isinstance(response.content, dict):
                    response_content = ChatResponse(**response.content)
                elif isinstance(response.content, str):
                    try:
                        import json
                        content_dict = json.loads(response.content)
                        response_content = ChatResponse(**content_dict)
                    except json.JSONDecodeError as e:
                        logger.error(f"Failed to parse response content as JSON: {e}")
                        response_content = ChatResponse(
                            message=response.content,
                            transfer_to_human=False,
                            end_chat=False,
                            end_chat_reason=None,
                            end_chat_description=None,
                            request_rating=False
                        )
                else:
                    response_content = response.content
            else:
                if isinstance(response, dict):
                    response_content = ChatResponse(**response)
                elif isinstance(response, str):
                    try:
                        import json
                        response_dict = json.loads(response)
                        response_content = ChatResponse(**response_dict)
                    except json.JSONDecodeError as e:
                        logger.error(f"Failed to parse response as JSON: {e}")
                        response_content = ChatResponse(
                            message=response,
                            transfer_to_human=False,
                            end_chat=False,
                            end_chat_reason=None,
                            end_chat_description=None,
                            request_rating=False
                        )
                else:
                    response_content = response

            logger.info(f"Response content: {response_content}")
            # Handle end chat and rating request
            if response_content.end_chat:
                session_repo = SessionToAgentRepository(db)
                
                # Only request rating if enabled for this agent
                should_request_rating = self.agent_data and self.agent_data.ask_for_rating
                response_content.request_rating = should_request_rating

                session_repo.update_session(
                    session_id,
                    {
                        "status": SessionStatus.CLOSED,
                        "end_chat_reason": response_content.end_chat_reason.value if response_content.end_chat_reason else None,
                        "end_chat_description": response_content.end_chat_description,
                        "closed_at": datetime.now()
                    }
                )

                # Add rating request to the message if enabled
                if should_request_rating:
                    rating_message = "\n\nThank you for chatting with us! Would you please take a moment to rate your experience? Your feedback helps us improve our service."
                    response_content.message += rating_message

            # Handle transfer (existing code)
            if self.agent_data.transfer_to_human and response_content.transfer_to_human and self.agent_data.groups:
                # Get chat history
                chat_history = []
                chat_history = chat_repo.get_session_history(session_id)
                
                session_repo = SessionToAgentRepository(db)
                session_repo.update_session(
                    session_id, 
                    {
                        "status": "TRANSFERRED",
                        "transfer_reason": response_content.transfer_reason.value if response_content.transfer_reason else None,
                        "transfer_description": response_content.transfer_description,
                        "group_id": self.agent_data.groups[0].id
                    }
                )
                
                # Get all users in the group
                group_id = self.agent_data.groups[0].id
                users = db.query(User).join(user_groups).filter(user_groups.c.group_id == group_id).all()
                
                for user in users:
                    # Create notification record
                    notification = Notification(
                        user_id=user.id,
                        title="New Chat Transfer",
                        message=f"A chat has been transferred to your group. Reason: {response_content.transfer_reason.value if response_content.transfer_reason else 'Not specified'}",
                        type="SYSTEM",
                        notification_metadata={
                            "session_id": session_id,
                            "transfer_reason": response_content.transfer_reason.value if response_content.transfer_reason else None,
                            "transfer_description": response_content.transfer_description
                        }
                    )
                    db.add(notification)
                    db.commit()
                    
                    # Send FCM notification
                    await send_fcm_notification(str(user.id), notification, db)
                
                # Get availability-based response
                availability_response = await get_agent_availability_response(
                    agent=self.agent_data,
                    customer_id=customer_id,
                    chat_history=chat_history,
                    db=db,
                    api_key=self.api_key,
                    model_name=self.model_name,
                    model_type=self.model_type
                )
                
                # Create ChatResponse object
                response_content = ChatResponse(
                    message=availability_response["message"],
                    transfer_to_human=availability_response["transfer_to_human"],
                    transfer_reason=availability_response.get("transfer_reason"),
                    transfer_description=availability_response.get("transfer_description"),
                    end_chat=False,
                    end_chat_reason=None,
                    end_chat_description=None,
                    request_rating=False
                )
                
                # Store AI response with transfer status
                chat_repo.create_message({
                    "message": response_content.message,
                    "message_type": "bot",
                    "session_id": session_id,
                    "organization_id": org_id,
                    "agent_id": agent_id,
                    "customer_id": customer_id,
                    "attributes": {
                        "transfer_to_human": response_content.transfer_to_human,
                        "transfer_reason": response_content.transfer_reason.value if response_content.transfer_reason else None,
                        "transfer_description": response_content.transfer_description,
                        "end_chat": response_content.end_chat,
                        "end_chat_reason": response_content.end_chat_reason.value if response_content.end_chat_reason else None,
                        "end_chat_description": response_content.end_chat_description,
                        "request_rating": response_content.request_rating
                    }
                })

                return response_content

            # Store AI response with end chat and rating status
            chat_repo.create_message({
                "message": response_content.message,
                "message_type": "bot",
                "session_id": session_id,
                "organization_id": org_id,
                "agent_id": agent_id,
                "customer_id": customer_id,
                "attributes": {
                    "transfer_to_human": response_content.transfer_to_human,
                    "transfer_reason": response_content.transfer_reason.value if response_content.transfer_reason else None,
                    "transfer_description": response_content.transfer_description,
                    "end_chat": response_content.end_chat,
                    "end_chat_reason": response_content.end_chat_reason.value if response_content.end_chat_reason else None,
                    "end_chat_description": response_content.end_chat_description,
                    "request_rating": response_content.request_rating
                }
            })
            
            return response_content

        except Exception as e:
            traceback.print_exc()
            logger.error(f"Chat agent error: {str(e)}")
            error_message = f"I apologize, but I encountered an error, please try again later."
            
            # Create error response
            error_response = ChatResponse(
                message=error_message,
                transfer_to_human=False,
                transfer_reason=None,
                transfer_description=None,
                end_chat=False,
                end_chat_reason=None,
                end_chat_description=None,
                request_rating=False
            )
            
            # Store error message
            try:
                db = next(get_db())
                chat_repo = ChatRepository(db)
                chat_repo.create_message({
                    "message": error_message,
                    "message_type": "bot",
                    "session_id": session_id,
                    "organization_id": org_id,
                    "agent_id": agent_id,
                    "customer_id": customer_id,
                    "attributes": {"error": str(e)}
                })
            except Exception as store_error:
                logger.error(f"Failed to store error message: {str(store_error)}")
            
            return error_response

    @staticmethod
    async def test_api_key(api_key: str, model_type: str, model_name: str) -> bool:
        """Test if the API key is valid for the given model type.
        
        Args:
            api_key: The API key to test
            model_type: The type of model (OPENAI, ANTHROPIC, etc.)
            model_name: The name of the model
            
        Returns:
            bool: True if the API key is valid
            
        Raises:
            ValueError: If the model type is not supported
        """
        model_type = model_type.upper()
        valid_model_types = {
            'OPENAI', 'ANTHROPIC', 'DEEPSEEK', 'GOOGLE', 'GOOGLEVERTEX',
            'GROQ', 'MISTRAL', 'HUGGINGFACE', 'OLLAMA', 'XAI'
        }
        
        if model_type not in valid_model_types:
            raise ValueError(f"Unsupported model type: {model_type}")
            
        try:
            # Initialize a test agent with minimal configuration
            agent = ChatAgent(
                api_key=api_key,
                model_name=model_name,
                model_type=model_type
            )
            await agent.agent.arun(message="Hello, how are you?")
            return True
        except Exception as e:
            logger.error(f"Error testing API key: {str(e)}")
            return False
