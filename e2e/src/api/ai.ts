import { env, seedOrg } from '../env'
import type { ApiClient } from './client'

/**
 * Points the org's AI at the fake LLM. The backend live-tests the key on save, so
 * the fake must already be running (playwright.config.ts starts it).
 */
export async function useFakeLlm(api: ApiClient): Promise<void> {
  await api.post('/ai/setup', {
    data: {
      model_type: 'OPENAI_COMPATIBLE',
      model_name: seedOrg.llmModel,
      api_key: 'e2e-fake-key',
      base_url: `${env.fakeLlmUrl}/v1`,
    },
  })
}
