import type { ApiClient } from './client'

export interface Widget {
  id: string
}

export async function createWidget(api: ApiClient, agentId: string, name: string): Promise<Widget> {
  const created = await api.post<{ id: string }>('/widgets', { data: { name, agent_id: agentId } })
  return { id: String(created.id) }
}

export interface WidgetInstallStatus {
  installed_origin: string | null
  blocked_origin: string | null
  allowed_domain: string | null
}

/**
 * The widget's first request on a page, as a visitor's browser on `origin`
 * sends it (through our nginx, which appends the client IP). `api` should be
 * anonymous, like a visitor.
 */
export async function loadWidgetFrom(api: ApiClient, widgetId: string, origin: string, visitorIp: string): Promise<void> {
  await api.get(`/widgets/${widgetId}/data`, { headers: { Origin: origin, 'X-Forwarded-For': visitorIp } })
}

export async function installStatus(api: ApiClient, widgetId: string): Promise<WidgetInstallStatus> {
  return api.get<WidgetInstallStatus>(`/widgets/${widgetId}/install`)
}
