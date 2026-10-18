#!/usr/bin/env python3
"""
Test script for webhook event triggering
Tests all webhook event types: conversation_started, rating_received, ticket_created
"""

import asyncio
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.database import get_db
from app.repositories.webhook import WebhookRepository
from app.repositories.session_to_agent import SessionToAgentRepository
from app.services.webhook_service import WebhookService
from uuid import uuid4, UUID
from datetime import datetime


async def test_webhooks():
    """Test all webhook event types"""
    
    db = next(get_db())
    webhook_repo = WebhookRepository(db)
    webhook_service = WebhookService()
    
    print("=" * 80)
    print("WEBHOOK EVENT TESTING")
    print("=" * 80)
    
    # Get all active webhooks
    try:
        # You'll need to provide an actual agent_id from your database
        agent_id = input("Enter agent_id to test (UUID): ").strip()
        agent_id = UUID(agent_id)
        
        webhooks = webhook_repo.get_webhooks_by_agent(agent_id=agent_id)
        
        if not webhooks:
            print(f"\n❌ No webhooks found for agent {agent_id}")
            print("Please create a webhook first in the UI")
            return
        
        print(f"\n✅ Found {len(webhooks)} webhook(s) for agent {agent_id}")
        
        for webhook in webhooks:
            print(f"\nWebhook: {webhook.name}")
            print(f"  ID: {webhook.id}")
            print(f"  URL: {webhook.webhook_url}")
            print(f"  Active: {webhook.is_active}")
            print(f"  Event Types: {webhook.event_types}")
        
        # Test each event type
        print("\n" + "=" * 80)
        print("TESTING EVENT TYPES")
        print("=" * 80)
        
        # 1. Test conversation_started
        print("\n[1/5] Testing conversation_started event...")
        test_session_id = str(uuid4())
        test_customer_id = str(uuid4())
        
        payload_started = {
            "event": "conversation_started",
            "session_id": test_session_id,
            "customer_id": test_customer_id,
            "agent_id": str(agent_id),
            "widget_id": "test-widget-123",
            "timestamp": datetime.utcnow().isoformat()
        }
        
        started_count = 0
        for webhook in webhooks:
            if not webhook.is_active:
                continue
            event_types = webhook.event_types or ["ticket_created"]
            if "conversation_started" in event_types:
                success, status, body, error = await webhook_service.execute_webhook(webhook, payload_started)
                if success:
                    print(f"  ✅ Webhook '{webhook.name}' - SUCCESS (Status: {status})")
                    started_count += 1
                else:
                    print(f"  ❌ Webhook '{webhook.name}' - FAILED")
                    print(f"     Error: {error}")
                    print(f"     Status: {status}")
        
        if started_count == 0:
            print("  ⚠️  No webhooks configured for 'conversation_started' event")
        
        # 2. Test rating_received
        print("\n[2/4] Testing rating_received event...")
        payload_rating = {
            "event": "rating_received",
            "session_id": test_session_id,
            "customer_id": test_customer_id,
            "agent_id": str(agent_id),
            "user_id": str(uuid4()),
            "rating": 5,
            "feedback": "Great service!",
            "timestamp": datetime.utcnow().isoformat()
        }
        
        rating_count = 0
        for webhook in webhooks:
            if not webhook.is_active:
                continue
            event_types = webhook.event_types or ["ticket_created"]
            if "rating_received" in event_types:
                success, status, body, error = await webhook_service.execute_webhook(webhook, payload_rating)
                if success:
                    print(f"  ✅ Webhook '{webhook.name}' - SUCCESS (Status: {status})")
                    rating_count += 1
                else:
                    print(f"  ❌ Webhook '{webhook.name}' - FAILED")
                    print(f"     Error: {error}")
        
        if rating_count == 0:
            print("  ⚠️  No webhooks configured for 'rating_received' event")
        
        # 3. Test ticket_created
        print("\n[3/4] Testing ticket_created event...")
        payload_ticket = {
            "event": "ticket_created",
            "title": "Test Ticket",
            "description": "This is a test ticket created by the webhook test script",
            "priority": "high",
            "customer_email": "test@example.com",
            "customer_name": "Test Customer",
            "session_id": test_session_id,
            "agent_name": "Test Agent",
            "timestamp": datetime.utcnow().isoformat()
        }
        
        ticket_count = 0
        for webhook in webhooks:
            if not webhook.is_active:
                continue
            event_types = webhook.event_types or ["ticket_created"]
            if "ticket_created" in event_types:
                success, status, body, error = await webhook_service.execute_webhook(webhook, payload_ticket)
                if success:
                    print(f"  ✅ Webhook '{webhook.name}' - SUCCESS (Status: {status})")
                    ticket_count += 1
                else:
                    print(f"  ❌ Webhook '{webhook.name}' - FAILED")
                    print(f"     Error: {error}")
        
        if ticket_count == 0:
            print("  ⚠️  No webhooks configured for 'ticket_created' event")
        
        # Summary
        print("\n" + "=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        print(f"conversation_started:     {started_count} webhook(s) triggered")
        print(f"rating_received:          {rating_count} webhook(s) triggered")
        print(f"ticket_created:           {ticket_count} webhook(s) triggered")
        print("=" * 80)
        
        total = started_count + rating_count + ticket_count
        if total > 0:
            print(f"\n✅ Successfully triggered {total} webhook(s)")
        else:
            print(f"\n⚠️  No webhooks were triggered. Please check:")
            print("   1. Webhook is active (is_active = true)")
            print("   2. Webhook has correct event_types configured")
            print("   3. Webhook URL is accessible")
        
    except Exception as e:
        print(f"\n❌ Error testing webhooks: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    print("Starting webhook tests...\n")
    asyncio.run(test_webhooks())
