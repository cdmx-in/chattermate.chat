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
from agno.agent import Agent
from app.utils.agno_utils import create_model
from app.core.logger import get_logger
from app.tools.knowledge_search_byagent import KnowledgeSearchByAgent
from app.database import get_db
from agno.storage.agent.postgres import PostgresAgentStorage
from app.repositories.chat import ChatRepository
from app.repositories.session_to_agent import SessionToAgentRepository
from app.models.session_to_agent import SessionStatus
from app.models.schemas.chat import ChatResponse,TransferReasonType, EndChatReasonType
from app.core.config import settings
from app.agents.transfer_agent import get_agent_availability_response
from app.models.notification import Notification
from app.services.user import send_fcm_notification
from app.models.user import User, user_groups
from datetime import datetime
from app.repositories.jira import JiraRepository
from app.tools.jira_toolkit import JiraTools
from app.tools.shopify_toolkit import ShopifyTools
from app.utils.response_parser import parse_response_content
from app.repositories.agent_shopify_config_repository import AgentShopifyConfigRepository

logger = get_logger(__name__)

class ChatAgent:
    def __init__(self, api_key: str, model_name: str = "gpt-4o-mini", model_type: str = "OPENAI", org_id: str = None, agent_id: str = None, customer_id: str = None, session_id: str = None):
        # Initialize knowledge search tool if org_id and agent_id provided
        tools = []
        if org_id and agent_id:
            knowledge_tool = KnowledgeSearchByAgent(
                agent_id=agent_id, org_id=org_id)
            tools.append(knowledge_tool)

        # Get template instructions and Jira config in a single optimized query
        db = next(get_db())
        jira_repo = JiraRepository(db)
        if agent_id:
            self.agent_data = jira_repo.get_agent_with_jira_config(agent_id)
        else:
            self.agent_data = None
        
        self.api_key = api_key
        self.model_name = model_name
        self.model_type = model_type
        self.jira_instructions_added = False
        self.shopify_instructions_added = False
        self.org_id = org_id
        self.agent_id = agent_id
        self.customer_id = customer_id
        self.session_id = session_id

        # Initialize tools
        self.tools = []
        
        # Add Jira tools if agent_id, org_id, and session_id are provided
        if self.agent_id and self.org_id and self.session_id and not self.agent_data.transfer_to_human and self.agent_data.jira_enabled:
            try:
                self.jira_tools = JiraTools(
                    agent_id=self.agent_id,
                    org_id=self.org_id,
                    session_id=self.session_id
                )
                self.tools.append(self.jira_tools)
            except Exception as e:
                logger.error(f"Failed to initialize Jira tools: {e}")
        
        # Add Shopify tools if agent has Shopify enabled
        if self.agent_id and self.org_id and self.session_id and not self.agent_data.transfer_to_human:
            try:
                # Check if Shopify is enabled for this agent
                shopify_config_repo = AgentShopifyConfigRepository(db)
                shopify_config = shopify_config_repo.get_agent_shopify_config(self.agent_id)
                if shopify_config and shopify_config.enabled:
                    self.shopify_tools = ShopifyTools(
                        agent_id=self.agent_id,
                        org_id=self.org_id,
                        session_id=self.session_id
                    )
                    self.tools.append(self.shopify_tools)
            except Exception as e:
                logger.error(f"Failed to initialize Shopify tools: {e}")

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
                "this is often just politeness and not an indication that they want to end the conversation. "
                "Always check the conversation history to confirm the issue has been properly addressed before ending the chat. Also generate a response in message field for end chat. e.g: Thank you for your time. Have a great day!"
            )
            
            # Build system message
            system_message = ""
            if self.agent_data.instructions:
                system_message = "\n".join(self.agent_data.instructions) + "Use the knowledge search tool to provide accurate company information. Only use the tool if required, dont use it for general greeting or general queries"

            
            # Add transfer instructions if enabled
            if self.agent_data.transfer_to_human:
                system_message += """
                You have the ability to transfer this conversation to a human agent if needed. You should transfer the conversation if:
                1. You are unable to answer the customer's question or solve their problem
                2. The customer explicitly asks to speak to a human
                3. The customer is expressing frustration with your responses
                4. The customer's request requires human judgment or decision-making
                5. The customer's issue is complex and would benefit from human expertise
                6. The customer needs to perform an action that you cannot assist with
                
                To transfer to a human, set transfer_to_human to true in your response and provide a transfer_reason and transfer_description.
                """
            
            # Add end chat instructions
            if self.agent_data.ask_for_rating:
                system_message += f"\n{end_chat_with_rating}"
            else:
                system_message += f"\n{end_chat_without_rating}"
            
            # Add Jira instructions if Jira is enabled
            if self.agent_data and self.agent_data.jira_enabled and not self.agent_data.transfer_to_human:
                jira_instructions = """
                You have access to Jira integration tools. You can use these tools to:
                1. Create a Jira ticket for issues that need further attention
                2. Check if a ticket already exists for the current conversation
                3. Get the status of an existing ticket

                To create a ticket, you can either:
                - Use the create_jira_ticket function directly
                - Include the following fields in your response:
                - create_ticket: Set to true to create a ticket
                - ticket_summary: A brief summary of the issue (required if create_ticket is true)
                - ticket_description: A detailed description of the issue (required if create_ticket is true)
                - ticket_priority: The priority level of the ticket (optional, defaults to "Medium")

                Only create a ticket if:
                - The issue is complex and requires human intervention
                - The user explicitly requests to create a ticket
                - You've tried to resolve the issue but were unable to do so
                - No ticket already exists for this conversation
                """
                system_message += "\n\n" + jira_instructions
                self.jira_instructions_added = True
            
            # Add Shopify instructions if Shopify is enabled
            if shopify_config and shopify_config.enabled and not self.agent_data.transfer_to_human:
                shopify_instructions = """
                You have access to Shopify tools that allow you to help customers with products and orders in the connected Shopify store.
                
                For customer product inquiries, you can:
                1. Search for products using keywords
                2. Get detailed information about specific products
                3. Recommend similar products based on customer interests
                4. List all available products
                
                For customer order inquiries, you can:
                1. Search for a customer's orders (using email, order number, or general queries)
                2. Check the status of specific orders
                3. Provide shipping/tracking information for orders
                
                Remember to:
                - Be helpful and informative about product details (price, description, etc.)
                - Ask clarifying questions when customers provide vague inquiries
                - Suggest similar or complementary products when appropriate
                - Be empathetic when handling order status inquiries, especially for delayed orders
                - Collect necessary information before searching (order number, email, etc.)
                - Explain order status in customer-friendly terms
                
                Only create or modify products if you have explicit permission to manage store inventory.
                """
                system_message += "\n\n" + shopify_instructions
                self.shopify_instructions_added = True
        else:
            system_message = [
                "You are a helpful customer service agent.",
            ]

        # Initialize model with utility function
        model = create_model(
            model_type=model_type,
            api_key=api_key,
            model_name=model_name,
            max_tokens=1000,
            response_format={"type": "json_object"} if model_type.upper() != 'GROQ' else {"type": "text"}
        )

        storage = PostgresAgentStorage(table_name="agent_sessions", db_url=settings.DATABASE_URL)
        
        # Combine all tools
        all_tools = tools.copy()
        if hasattr(self, 'tools') and self.tools:
           all_tools.extend(self.tools)

        self.agent = Agent(
           name=self.agent_data.name if self.agent_data else "Default Agent",
           session_id=session_id,
           model=model,
           tools=all_tools,
           instructions=system_message,
           agent_id=str(agent_id),
           storage=storage,
           add_history_to_messages=True,
           tool_call_limit=2,
           num_history_responses=10,
           read_chat_history=True,
           markdown=False,
           debug_mode=settings.ENVIRONMENT == "development",
           user_id=str(customer_id),
           session_state={"status": "active"},
           response_model=ChatResponse,
           structured_outputs=True,
           system_message_role="system",
           user_message_role="user",
           show_tool_calls=settings.ENVIRONMENT == "development"
          )

    async def get_response(self, message: str, session_id: str = None, org_id: str = None, agent_id: str = None, customer_id: str = None) -> ChatResponse:
        """
        Get a response from the agent.
        """
        try:
            # Update session and IDs if provided
            if session_id:
                self.session_id = session_id
            if org_id:
                self.org_id = org_id
            if agent_id:
                self.agent_id = agent_id
            if customer_id:
                self.customer_id = customer_id
                
            # Get database connection
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

            # Use the utility function to parse the response
            response_content = parse_response_content(response)

            logger.debug(f"Response content: {response_content}")
            
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
            if self.agent_data and self.agent_data.transfer_to_human and response_content.transfer_to_human and hasattr(self.agent_data, 'groups') and self.agent_data.groups:
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
                    model_type=self.model_type,
                    session_id=session_id
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
                    request_rating=False,
                    create_ticket=False
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

            # Store AI response with all attributes
            attributes = {
                "transfer_to_human": response_content.transfer_to_human,
                "transfer_reason": response_content.transfer_reason.value if response_content.transfer_reason else None,
                "transfer_description": response_content.transfer_description,
                "end_chat": response_content.end_chat,
                "end_chat_reason": response_content.end_chat_reason.value if response_content.end_chat_reason else None,
                "end_chat_description": response_content.end_chat_description,
                "request_rating": response_content.request_rating
            }
            
            # Add ticket attributes if present
            if response_content.create_ticket:
                attributes.update({
                    "create_ticket": response_content.create_ticket,
                    "ticket_summary": response_content.ticket_summary,
                    "ticket_description": response_content.ticket_description,
                    "integration_type": response_content.integration_type,
                    "ticket_id": response_content.ticket_id,
                    "ticket_status": response_content.ticket_status,
                    "ticket_priority": response_content.ticket_priority
                })
            
            # Add product attributes if present (for Shopify integration)
            if hasattr(response_content, 'product_id') and response_content.product_id:
                attributes.update({
                    "product_id": response_content.product_id,
                    "product_title": response_content.product_title if hasattr(response_content, 'product_title') else None,
                    "integration_type": "SHOPIFY"
                })
            
            chat_repo.create_message({
                "message": response_content.message,
                "message_type": "bot",
                "session_id": session_id,
                "organization_id": org_id,
                "agent_id": agent_id,
                "customer_id": customer_id,
                "attributes": attributes
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
                request_rating=False,
                create_ticket=False
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
        try:
            from app.utils.agno_utils import test_model_api_key
            return await test_model_api_key(api_key, model_type, model_name)
        except Exception as e:
            traceback.print_exc()
            logger.error(f"Error testing API key: {str(e)}")
            return False
