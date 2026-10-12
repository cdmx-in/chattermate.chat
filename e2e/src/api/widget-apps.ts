import type { ApiClient } from './client'

/** A widget app is a customer's server: its API key mints conversation tokens. */
export async function createWidgetApp(api: ApiClient, name: string): Promise<{ apiKey: string }> {
  const app = await api.post<{ api_key: string }>('/widget-apps', { data: { name } })
  return { apiKey: app.api_key }
}

/** What the customer's server does for a signed-in visitor before rendering the widget. */
export async function issueConversationToken(
  api: ApiClient,
  apiKey: string,
  widgetId: string,
  customer: { email: string; name: string },
): Promise<string> {
  const body = await api.withToken(apiKey).post<{ data: { token: string } }>('/generate-token', {
    data: { widget_id: widgetId, customer_email: customer.email, customer_name: customer.name },
  })
  return body.data.token
}
