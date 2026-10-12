import type { ApiClient } from './client'

/**
 * HubSpot connects through OAuth only: /install hands out a state, HubSpot sends
 * the browser back to /callback with a code, and the backend trades it for tokens.
 * One connection per org — an org-wide change (`*.org.spec.ts`).
 */
export async function connectHubSpot(api: ApiClient, code: string): Promise<void> {
  const install = await api.raw('GET', '/crm/hubspot/install', { maxRedirects: 0 })
  const state = new URL(install.headers().location ?? 'about:blank').searchParams.get('state')
  if (!state) throw new Error(`HubSpot install → ${install.status()}: ${await install.text()}`)
  const callback = await api.raw('GET', '/crm/hubspot/callback', { params: { code, state }, maxRedirects: 0 })
  const location = callback.headers().location ?? ''
  if (!location.includes('status=success')) throw new Error(`HubSpot callback → ${location || callback.status()}`)
}

export async function disconnectHubSpot(api: ApiClient): Promise<void> {
  await api.raw('DELETE', '/crm/hubspot')
}

/** "Sync now" on a person: pushes them to every connected CRM, synchronously. */
export async function syncPersonToCrm(api: ApiClient, personId: string): Promise<{ synced: Array<{ provider: string }> }> {
  return api.post(`/people/${personId}/crm-sync`)
}
