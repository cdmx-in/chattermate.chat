import { env } from '../env'
import type { ApiClient } from './client'

export interface Article {
  id: string
  slug: string | null
  status: 'draft' | 'published'
}

/** Turns the org's public help center on (idempotent) and returns its public base URL. */
export async function enableHelpCenter(api: ApiClient): Promise<string> {
  const settings = await api.put<{ slug: string }>('/help-center/settings', { data: { enabled: true } })
  // .env.e2e serves help centers by path (HELP_CENTER_PUBLIC_MODE=path), as self-hosters do.
  return `${env.backendUrl}/help/${settings.slug}`
}

export async function createArticle(api: ApiClient, article: { question: string; answer: string }): Promise<Article> {
  return api.post<Article>('/help-center/faqs', { data: { ...article, status: 'draft' } })
}

export async function setArticleStatus(api: ApiClient, id: string, status: Article['status']): Promise<Article> {
  return api.put<Article>(`/help-center/faqs/${id}`, { data: { status } })
}
