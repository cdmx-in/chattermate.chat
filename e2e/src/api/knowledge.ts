import type { ApiClient } from './client'

/**
 * Pasted-text knowledge is indexed synchronously, so it is searchable as soon as
 * this returns. Returns the source's id.
 */
export async function addKnowledgeText(
  api: ApiClient,
  source: { orgId: string; agentId: string; title: string; content: string },
): Promise<number> {
  const body = await api.post<{ knowledge: { id: number } }>('/knowledge/add/text', {
    data: { org_id: source.orgId, agent_id: source.agentId, title: source.title, content: source.content },
  })
  return body.knowledge.id
}

export async function deleteKnowledge(api: ApiClient, knowledgeId: number): Promise<void> {
  await api.delete(`/knowledge/${knowledgeId}`)
}
