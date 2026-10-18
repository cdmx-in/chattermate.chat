"""
ChatterMate - Custom Webhook Service
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

import httpx
import json
import base64
from typing import Optional, Dict, Any, Tuple
from string import Template

from app.core.logger import get_logger
from app.models.webhook import CustomWebhook

logger = get_logger(__name__)


class WebhookService:
    """Service for executing custom webhooks."""

    def __init__(self):
        self.timeout = 30.0  # 30 second timeout

    def _build_headers(self, webhook: CustomWebhook) -> Dict[str, str]:
        """Build request headers including authentication."""
        headers = {
            "Content-Type": webhook.content_type or "application/json"
        }

        # Add custom headers
        if webhook.custom_headers:
            headers.update(webhook.custom_headers)

        # Add authentication
        if webhook.auth_type:
            auth_type = webhook.auth_type.lower()
            
            if auth_type == "bearer" and webhook.auth_token:
                headers["Authorization"] = f"Bearer {webhook.auth_token}"
            
            elif auth_type == "basic" and webhook.auth_username and webhook.auth_token:
                credentials = f"{webhook.auth_username}:{webhook.auth_token}"
                encoded = base64.b64encode(credentials.encode()).decode()
                headers["Authorization"] = f"Basic {encoded}"
            
            elif auth_type == "api_key" and webhook.auth_header_name and webhook.auth_token:
                headers[webhook.auth_header_name] = webhook.auth_token
            
            elif auth_type == "custom_header" and webhook.auth_header_name and webhook.auth_token:
                headers[webhook.auth_header_name] = webhook.auth_token

        return headers

    def _build_payload(self, webhook: CustomWebhook, data: Dict[str, Any]) -> str:
        """Build the request payload using the template or default structure."""
        if webhook.payload_template:
            try:
                # Use Template for safe substitution with ${variable} or $variable syntax
                template = Template(webhook.payload_template)
                # Flatten nested data for template substitution
                flat_data = self._flatten_dict(data)
                return template.safe_substitute(flat_data)
            except Exception as e:
                logger.warning(f"Error applying payload template: {e}, using raw data")
                return json.dumps(data)
        else:
            # Default: send data as-is
            return json.dumps(data)

    def _flatten_dict(self, d: Dict[str, Any], parent_key: str = '', sep: str = '_') -> Dict[str, Any]:
        """Flatten a nested dictionary for template substitution."""
        items = []
        for k, v in d.items():
            new_key = f"{parent_key}{sep}{k}" if parent_key else k
            if isinstance(v, dict):
                items.extend(self._flatten_dict(v, new_key, sep).items())
            else:
                items.append((new_key, str(v) if v is not None else ''))
        return dict(items)

    async def execute_webhook(
        self, 
        webhook: CustomWebhook, 
        data: Dict[str, Any]
    ) -> Tuple[bool, Optional[int], Optional[str], Optional[str]]:
        """
        Execute a webhook call.
        
        Returns:
            Tuple of (success, status_code, response_body, error_message)
        """
        try:
            headers = self._build_headers(webhook)
            payload = self._build_payload(webhook, data)
            
            logger.info(f"Executing webhook '{webhook.name}' to {webhook.webhook_url}")
            logger.debug(f"Webhook payload: {payload[:500]}...")  # Log first 500 chars

            async with httpx.AsyncClient(timeout=self.timeout) as client:
                method = webhook.http_method.upper()
                
                if method == "POST":
                    response = await client.post(
                        webhook.webhook_url,
                        headers=headers,
                        content=payload
                    )
                elif method == "PUT":
                    response = await client.put(
                        webhook.webhook_url,
                        headers=headers,
                        content=payload
                    )
                elif method == "PATCH":
                    response = await client.patch(
                        webhook.webhook_url,
                        headers=headers,
                        content=payload
                    )
                else:
                    return False, None, None, f"Unsupported HTTP method: {method}"

                response_body = response.text[:5000] if response.text else None  # Limit response size
                success = 200 <= response.status_code < 300

                if success:
                    logger.info(f"Webhook '{webhook.name}' executed successfully with status {response.status_code}")
                else:
                    logger.warning(f"Webhook '{webhook.name}' returned non-success status {response.status_code}")

                return success, response.status_code, response_body, None

        except httpx.TimeoutException:
            error_msg = f"Webhook request timed out after {self.timeout} seconds"
            logger.error(f"Webhook '{webhook.name}' timeout: {error_msg}")
            return False, None, None, error_msg
        
        except httpx.RequestError as e:
            error_msg = f"Request error: {str(e)}"
            logger.error(f"Webhook '{webhook.name}' request error: {error_msg}")
            return False, None, None, error_msg
        
        except Exception as e:
            error_msg = f"Unexpected error: {str(e)}"
            logger.error(f"Webhook '{webhook.name}' unexpected error: {error_msg}")
            return False, None, None, error_msg

    async def test_webhook(
        self, 
        webhook: CustomWebhook, 
        test_data: Optional[Dict[str, Any]] = None
    ) -> Tuple[bool, Optional[int], Optional[str], Optional[str]]:
        """
        Test a webhook with sample data.
        
        Args:
            webhook: The webhook to test
            test_data: Optional custom test data
            
        Returns:
            Tuple of (success, status_code, response_body, error_message)
        """
        default_test_data = {
            "title": "Test Ticket from ChatterMate",
            "description": "This is a test ticket to verify webhook connectivity.",
            "priority": "low",
            "customer_email": "test@example.com",
            "customer_name": "Test User",
            "session_id": "test-session-000",
            "agent_name": "ChatterMate Test",
            "timestamp": "2024-01-01T00:00:00Z",
            "source": "chattermate_test"
        }
        
        data = test_data if test_data else default_test_data
        return await self.execute_webhook(webhook, data)


# Singleton instance
webhook_service = WebhookService()
