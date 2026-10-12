import type { ApiClient } from './client'

/** Pasted-text knowledge is indexed synchronously, so it is searchable as soon as this returns. */
export async function addKnowledgeText(
  api: ApiClient,
  source: { orgId: string; agentId: string; title: string; content: string },
): Promise<void> {
  await api.post('/knowledge/add/text', {
    data: { org_id: source.orgId, agent_id: source.agentId, title: source.title, content: source.content },
  })
}
