import type { ApiClient } from './client'

export interface ChatOverview {
  session_id: string
  status: string
  agent: { id: string }
  customer: { id: string; email: string | null; full_name: string | null }
  group_id: string | null
  user_id: string | null
  message_count: number
}

/** The org's conversations with one AI agent, newest first (admin view). */
export async function chatsWithAgent(api: ApiClient, agentId: string): Promise<ChatOverview[]> {
  return api.get<ChatOverview[]>('/chats/recent', { params: { agent_id: agentId, limit: 100 } })
}
