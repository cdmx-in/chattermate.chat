import type { ApiClient } from './client'

export interface ChannelAccount {
  id: string
  display_name: string
}

/** Connects a Telegram bot (the backend checks the token with getMe and registers its webhook). */
export async function connectTelegram(api: ApiClient, botToken: string): Promise<ChannelAccount> {
  const account = await api.post<ChannelAccount>('/channels/telegram', { data: { bot_token: botToken } })
  return { ...account, id: String(account.id) }
}

/** Routes a connected channel account's conversations to an AI agent. */
export async function routeToAgent(api: ApiClient, accountId: string, agentId: string): Promise<void> {
  await api.post(`/channels/agent-config/${accountId}`, { data: { agent_id: agentId, is_active: true } })
}
