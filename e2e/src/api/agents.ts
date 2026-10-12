import type { ApiClient } from './client'

export interface Agent {
  id: string
  name: string
}

export interface NewAgent {
  name: string
  instructions: string[]
  agentType?: 'customer_support' | 'sales' | 'tech_support' | 'general' | 'custom'
  transferToHuman?: boolean
  /** Handover only happens if the agent has at least one group with an online member. */
  groupIds?: string[]
}

export async function createAgent(api: ApiClient, agent: NewAgent): Promise<Agent> {
  const created = await api.post<Agent>('/agent', {
    data: {
      name: agent.name,
      agent_type: agent.agentType ?? 'customer_support',
      instructions: agent.instructions,
      transfer_to_human: agent.transferToHuman ?? false,
    },
  })
  if (agent.groupIds?.length) {
    await api.put(`/agent/${created.id}/groups`, { data: agent.groupIds })
  }
  return { id: String(created.id), name: created.name }
}
