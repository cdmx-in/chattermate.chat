import type { ApiClient } from './client'
import type { Schemas } from './types'

export type ChatOverview = Schemas['ChatOverviewResponse']

/** The org's conversations with one AI agent, newest first (admin view). */
export async function chatsWithAgent(api: ApiClient, agentId: string): Promise<ChatOverview[]> {
  return api.get<ChatOverview[]>('/chats/recent', { params: { agent_id: agentId, limit: 100 } })
}
