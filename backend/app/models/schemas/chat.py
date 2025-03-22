"""
ChatterMate - Chat
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

from pydantic import BaseModel, Field, model_validator
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from enum import Enum
from app.models.session_to_agent import SessionStatus


class CustomerInfo(BaseModel):
    id: UUID
    email: str
    full_name: Optional[str]
class AgentInfo(BaseModel):
    id: UUID
    name: str
    display_name: Optional[str]    

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

class Message(BaseModel):
    message: str
    message_type: str
    created_at: datetime
    attributes: Optional[dict] = None

class ChatOverviewResponse(BaseModel):
    customer: CustomerInfo
    agent: AgentInfo
    last_message: str
    updated_at: datetime
    message_count: int
    status: SessionStatus
    group_id: Optional[UUID]
    session_id: UUID

class ChatDetailResponse(BaseModel):
    customer: CustomerInfo
    agent: AgentInfo
    messages: List[Message]
    status: SessionStatus
    group_id: Optional[UUID]
    session_id: UUID
    user_id: Optional[UUID]
    user_name: Optional[str]
    created_at: datetime
    updated_at: datetime

class ChatResponse(BaseModel):
    message: str = Field(description="The response from the agent")
    transfer_to_human: bool = Field(description="Whether to transfer the conversation to a human")
    end_chat: bool = Field(description="Whether to end the chat and request rating")
    transfer_reason: Optional[TransferReasonType] = Field(default=None, description="Transfer reason Type should be one of the following: UNABLE_TO_ANSWER, NEED_MORE_INFO, KNOWLEDGE_GAP, NEED_TO_CALL, NEED_TO_EMAIL, NEED_TO_MEET, FRUSTRATED, REPEAT_INSTRUCTIONS, DIRECT_REQUEST, HIGH_PRIORITY_ISSUE, COMPLIANCE_ISSUE")
    transfer_description: Optional[str] = Field(default=None, description="Detailed description for the transfer")
    end_chat_reason: Optional[EndChatReasonType] = Field(default=None, description="End chat reason Type should be one of the following: ISSUE_RESOLVED, CUSTOMER_REQUEST, CONFIRMATION_RECEIVED, FAREWELL, THANK_YOU, NATURAL_CONCLUSION, TASK_COMPLETED")
    end_chat_description: Optional[str] = Field(default=None, description="Detailed description for ending the chat")
    request_rating: bool = Field(description="Whether to request a rating from the customer")
    
    # Ticket creation fields
    create_ticket: bool = Field(description="Whether to create a ticket in the integrated system (Jira, Zendesk, etc.)")
    ticket_summary: Optional[str] = Field(default=None, description="Summary/title for the ticket to be created")
    ticket_description: Optional[str] = Field(default=None, description="Detailed description for the ticket to be created")
    integration_type: Optional[str] = Field(default=None, description="Type of integration to use for ticket creation")
    ticket_id: Optional[str] = Field(default=None, description="ID of the created ticket (filled after creation)")
    ticket_status: Optional[str] = Field(default=None, description="Status of the created ticket (filled after creation)")
    ticket_priority: Optional[str] = Field(default=None, description="Priority level for the ticket (e.g., 'High', 'Medium', 'Low')")

    class Config:
        from_attributes = True
    
    @model_validator(mode='before')
    @classmethod
    def normalize_fields(cls, data: Dict[str, Any]) -> Dict[str, Any]:
        """Normalize incoming fields and provide default values for missing fields."""
        if isinstance(data, dict):
            normalized = dict(data)
            
            # Create a mapping of possible field variations to canonical field names
            key_mappings = {
                'requestRating': 'request_rating',
                'requestrating': 'request_rating',
                'transferToHuman': 'transfer_to_human',
                'transfertohuman': 'transfer_to_human',
                'endChat': 'end_chat',
                'endchat': 'end_chat',
                'createTicket': 'create_ticket',
                'createticket': 'create_ticket',
                'transferReason': 'transfer_reason',
                'transferreason': 'transfer_reason',
                'transferDescription': 'transfer_description',
                'transferdescription': 'transfer_description',
                'endChatReason': 'end_chat_reason',
                'endchatreason': 'end_chat_reason',
                'endChatDescription': 'end_chat_description',
                'endchatdescription': 'end_chat_description',
                'ticketSummary': 'ticket_summary',
                'ticketsummary': 'ticket_summary',
                'ticketDescription': 'ticket_description',
                'ticketdescription': 'ticket_description',
                'integrationType': 'integration_type',
                'integrationtype': 'integration_type',
                'ticketId': 'ticket_id',
                'ticketid': 'ticket_id',
                'ticketStatus': 'ticket_status',
                'ticketstatus': 'ticket_status',
                'ticketPriority': 'ticket_priority',
                'ticketpriority': 'ticket_priority',
                'content': 'message'  # Add mapping for 'content' to 'message'
            }
            
            # Normalize keys from camelCase to snake_case
            for key in list(normalized.keys()):
                if key in key_mappings:
                    normalized[key_mappings[key]] = normalized.pop(key)
                    
            # Set default values for required fields if they don't exist
            if 'message' not in normalized:
                normalized['message'] = "No response generated"
            
            if 'transfer_to_human' not in normalized:
                normalized['transfer_to_human'] = False
                
            if 'end_chat' not in normalized:
                normalized['end_chat'] = False
                
            if 'request_rating' not in normalized:
                normalized['request_rating'] = False
                
            if 'create_ticket' not in normalized:
                normalized['create_ticket'] = False
            
            return normalized
        return data