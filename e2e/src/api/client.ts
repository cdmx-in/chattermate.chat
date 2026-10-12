import type { APIRequestContext, APIResponse } from '@playwright/test'
import { env } from '../env'

type Body = Record<string, unknown> | unknown[]

interface CallOptions {
  data?: Body
  form?: Record<string, string>
  params?: Record<string, string | number | boolean>
  /** 0 to read a redirect's Location instead of following it. */
  maxRedirects?: number
}

/**
 * Thin JSON client for the backend API, used to SEED data — specs assert through
 * the UI. Domain modules (agents.ts, widgets.ts, …) build on this, so a route or
 * payload change is one edit there and nowhere else.
 */
export class ApiClient {
  readonly request: APIRequestContext
  private readonly token?: string

  constructor(request: APIRequestContext, token?: string) {
    this.request = request
    this.token = token
  }

  withToken(token: string): ApiClient {
    return new ApiClient(this.request, token)
  }

  get<T>(path: string, options: CallOptions = {}) { return this.call<T>('GET', path, options) }
  post<T>(path: string, options: CallOptions = {}) { return this.call<T>('POST', path, options) }
  put<T>(path: string, options: CallOptions = {}) { return this.call<T>('PUT', path, options) }
  patch<T>(path: string, options: CallOptions = {}) { return this.call<T>('PATCH', path, options) }
  delete<T>(path: string, options: CallOptions = {}) { return this.call<T>('DELETE', path, options) }

  /** Like call(), but hands back the raw response instead of throwing on a non-2xx. */
  async raw(method: string, path: string, options: CallOptions = {}): Promise<APIResponse> {
    return this.request.fetch(`${env.apiUrl}${path}`, {
      method,
      data: options.data,
      form: options.form,
      params: options.params,
      maxRedirects: options.maxRedirects,
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : undefined,
      failOnStatusCode: false,
    })
  }

  private async call<T>(method: string, path: string, options: CallOptions): Promise<T> {
    const response = await this.raw(method, path, options)
    if (!response.ok()) {
      // The status and body in the message are what make a seeding failure debuggable.
      throw new Error(`${method} ${path} → ${response.status()}: ${(await response.text()).slice(0, 500)}`)
    }
    const text = await response.text()
    return (text ? JSON.parse(text) : undefined) as T
  }
}
