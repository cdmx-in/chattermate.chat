/*
ChatterMate - Webhook Service
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
*/

import api from './api'

// Types
export type AuthType = 'none' | 'bearer' | 'basic' | 'api_key' | 'custom_header'
export type HttpMethod = 'POST' | 'PUT' | 'PATCH'
export type WebhookEventType = 
  | 'ticket_created'
  | 'conversation_started'
  | 'rating_received'

export interface CustomWebhook {
  id: number
  agent_id: string
  name: string
  webhook_url: string
  http_method: HttpMethod
  auth_type: AuthType | null
  auth_token?: string
  auth_header_name?: string
  auth_username?: string
  custom_headers: Record<string, string>
  payload_template: string | null
  content_type: string
  is_active: boolean
  event_types: WebhookEventType[]
  created_at: string
  updated_at: string
}

export interface CustomWebhookCreate {
  name: string
  webhook_url: string
  http_method?: HttpMethod
  auth_type?: AuthType
  auth_token?: string
  auth_header_name?: string
  auth_username?: string
  custom_headers?: Record<string, string>
  payload_template?: string
  content_type?: string
  is_active?: boolean
  event_types?: WebhookEventType[]
}

export interface CustomWebhookUpdate {
  name?: string
  webhook_url?: string
  http_method?: HttpMethod
  auth_type?: AuthType
  auth_token?: string
  auth_header_name?: string
  auth_username?: string
  custom_headers?: Record<string, string>
  payload_template?: string
  content_type?: string
  is_active?: boolean
  event_types?: WebhookEventType[]
}

export interface WebhookListResponse {
  webhooks: CustomWebhook[]
  total: number
}

export interface WebhookTestResponse {
  success: boolean
  status_code: number | null
  response_body: string | null
  error_message: string | null
}

export interface WebhookLog {
  id: number
  webhook_id: number
  success: boolean
  response_status_code: number | null
  error_message: string | null
  executed_at: string
}

/**
 * Get all webhooks for the organization
 */
export const getWebhooks = async (): Promise<WebhookListResponse> => {
  try {
    const response = await api.get('/integrations/webhooks')
    return response.data
  } catch (error) {
    console.error('Error fetching webhooks:', error)
    throw error
  }
}

/**
 * Get a specific webhook by ID
 */
export const getWebhook = async (webhookId: number): Promise<CustomWebhook> => {
  try {
    const response = await api.get(`/integrations/webhooks/${webhookId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching webhook:', error)
    throw error
  }
}

/**
 * Create a new webhook
 */
export const createWebhook = async (data: CustomWebhookCreate): Promise<CustomWebhook> => {
  try {
    const response = await api.post('/integrations/webhooks', data)
    return response.data
  } catch (error) {
    console.error('Error creating webhook:', error)
    throw error
  }
}

/**
 * Update an existing webhook
 */
export const updateWebhook = async (webhookId: number, data: CustomWebhookUpdate): Promise<CustomWebhook> => {
  try {
    const response = await api.put(`/integrations/webhooks/${webhookId}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating webhook:', error)
    throw error
  }
}

/**
 * Delete a webhook
 */
export const deleteWebhook = async (webhookId: number): Promise<void> => {
  try {
    await api.delete(`/integrations/webhooks/${webhookId}`)
  } catch (error) {
    console.error('Error deleting webhook:', error)
    throw error
  }
}

/**
 * Test a webhook with sample data
 */
export const testWebhook = async (webhookId: number, testData?: Record<string, unknown>): Promise<WebhookTestResponse> => {
  try {
    const response = await api.post(`/integrations/webhooks/${webhookId}/test`, { test_data: testData })
    return response.data
  } catch (error) {
    console.error('Error testing webhook:', error)
    throw error
  }
}

/**
 * Trigger a webhook with actual data
 */
export const triggerWebhook = async (webhookId: number, data: {
  title: string
  description: string
  priority?: string
  customer_email?: string
  customer_name?: string
  session_id?: string
  agent_name?: string
  custom_fields?: Record<string, unknown>
}): Promise<WebhookTestResponse> => {
  try {
    const response = await api.post(`/integrations/webhooks/${webhookId}/trigger`, data)
    return response.data
  } catch (error) {
    console.error('Error triggering webhook:', error)
    throw error
  }
}

/**
 * Get webhook logs
 */
export const getWebhookLogs = async (webhookId: number, limit: number = 50): Promise<WebhookLog[]> => {
  try {
    const response = await api.get(`/integrations/webhooks/${webhookId}/logs`, {
      params: { limit }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching webhook logs:', error)
    throw error
  }
}

// ============================================================================
// AGENT-SPECIFIC WEBHOOK FUNCTIONS (New Agent-Based Architecture)
// ============================================================================

/**
 * Get all webhooks for a specific agent
 */
export const getAgentWebhooks = async (agentId: string): Promise<WebhookListResponse> => {
  try {
    const response = await api.get(`/integrations/agents/${agentId}/webhooks`)
    return response.data
  } catch (error) {
    console.error('Error fetching agent webhooks:', error)
    throw error
  }
}

/**
 * Get a specific webhook by ID for an agent
 */
export const getAgentWebhook = async (agentId: string, webhookId: number): Promise<CustomWebhook> => {
  try {
    const response = await api.get(`/integrations/agents/${agentId}/webhooks/${webhookId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching agent webhook:', error)
    throw error
  }
}

/**
 * Create a new webhook for a specific agent
 */
export const createAgentWebhook = async (agentId: string, data: CustomWebhookCreate): Promise<CustomWebhook> => {
  try {
    const response = await api.post(`/integrations/agents/${agentId}/webhooks`, data)
    return response.data
  } catch (error) {
    console.error('Error creating agent webhook:', error)
    throw error
  }
}

/**
 * Update an existing webhook for an agent
 */
export const updateAgentWebhook = async (agentId: string, webhookId: number, data: CustomWebhookUpdate): Promise<CustomWebhook> => {
  try {
    const response = await api.put(`/integrations/agents/${agentId}/webhooks/${webhookId}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating agent webhook:', error)
    throw error
  }
}

/**
 * Delete a webhook for an agent
 */
export const deleteAgentWebhook = async (agentId: string, webhookId: number): Promise<void> => {
  try {
    await api.delete(`/integrations/agents/${agentId}/webhooks/${webhookId}`)
  } catch (error) {
    console.error('Error deleting agent webhook:', error)
    throw error
  }
}

/**
 * Test a webhook with sample data for an agent
 */
export const testAgentWebhook = async (agentId: string, webhookId: number, testData?: Record<string, unknown>): Promise<WebhookTestResponse> => {
  try {
    const response = await api.post(`/integrations/agents/${agentId}/webhooks/${webhookId}/test`, { test_data: testData })
    return response.data
  } catch (error) {
    console.error('Error testing agent webhook:', error)
    throw error
  }
}

/**
 * Get webhook logs for an agent's webhook
 */
export const getAgentWebhookLogs = async (agentId: string, webhookId: number, limit: number = 50): Promise<WebhookLog[]> => {
  try {
    const response = await api.get(`/integrations/agents/${agentId}/webhooks/${webhookId}/logs`, {
      params: { limit }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching agent webhook logs:', error)
    throw error
  }
}

