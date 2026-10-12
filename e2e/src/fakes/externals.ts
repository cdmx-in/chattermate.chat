import { expect, type APIRequestContext } from '@playwright/test'
import type { RecordedCall } from '../../services/fake-externals/server'
import { env } from '../env'

/** Test-side client for services/fake-externals: what the backend sent to third parties. */
export class FakeExternals {
  private readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  async calls(provider: string, action?: string): Promise<RecordedCall[]> {
    const response = await this.request.get(`${env.fakeExternalsUrl}/__calls`, { params: { provider, ...(action ? { action } : {}) } })
    return (await response.json()) as RecordedCall[]
  }

  /** Waits for the first call matching `match` and returns its body. */
  async waitForCall<T = Record<string, unknown>>(
    provider: string,
    action: string,
    match: (body: T) => boolean = () => true,
  ): Promise<T> {
    let found: T | undefined
    await expect.poll(async () => {
      found = (await this.calls(provider, action)).map((c) => c.body as T).find(match)
      return found !== undefined
    }, { message: `a ${provider} ${action} call`, timeout: 20_000 }).toBe(true)
    return found!
  }
}
