import type { ApiClient } from './client'

export interface Widget {
  id: string
}

export async function createWidget(api: ApiClient, agentId: string, name: string): Promise<Widget> {
  const created = await api.post<{ id: string }>('/widgets', { data: { name, agent_id: agentId } })
  return { id: String(created.id) }
}
