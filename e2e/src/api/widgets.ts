import type { ApiClient } from './client'

export interface Widget {
  id: string
}

export async function createWidget(api: ApiClient, agentId: string, name: string): Promise<Widget> {
  const created = await api.post<{ id: string }>('/widgets', { data: { name, agent_id: agentId } })
  return { id: String(created.id) }
}

/**
 * The widget's first request on a page, as a visitor's browser on `origin`
 * sends it (through our nginx, which appends the client IP). `api` should be
 * anonymous, like a visitor.
 */
export async function loadWidgetFrom(api: ApiClient, widgetId: string, origin: string, visitorIp: string): Promise<void> {
  // The endpoint serves the widget's HTML, not JSON: only the status matters
  const response = await api.raw('GET', `/widgets/${widgetId}/data`, {
    headers: { Origin: origin, 'X-Forwarded-For': visitorIp },
  })
  if (!response.ok()) throw new Error(`widget load from ${origin} → ${response.status()}`)
}

/** Limit where the widget may be embedded; an empty list allows any site. */
export async function setAllowedDomains(api: ApiClient, widgetId: string, domains: string[]): Promise<string[]> {
  const saved = await api.put<{ allowed_domains: string[] }>(`/widgets/${widgetId}/embed-settings`, { data: { allowed_domains: domains } })
  return saved.allowed_domains
}
