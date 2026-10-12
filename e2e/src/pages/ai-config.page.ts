import { expect, type Locator, type Page } from '@playwright/test'
import { step } from '../support/step'

export interface ModelSettings {
  baseUrl: string
  model: string
  apiKey: string
}

/** Settings → AI configuration ("Bring your own model"). */
export class AiConfigPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(): Promise<void> {
    await this.page.goto('/settings/ai-config')
    await expect(this.page.getByRole('main').getByRole('heading', { name: 'AI Configuration' })).toBeVisible()
  }

  async useOpenAiCompatible(settings: ModelSettings): Promise<void> {
    await step(`Save an OpenAI-compatible model (${settings.model})`, async () => {
      await this.page.getByRole('radio', { name: /OpenAI-compatible/ }).click()
      await this.page.getByLabel('Base URL').fill(settings.baseUrl)
      await this.page.getByLabel('Model Name').selectOption('__custom__')
      await this.page.getByPlaceholder('Enter the exact model ID (e.g. gpt-4o)').fill(settings.model)
      await this.page.getByLabel('API Key').fill(settings.apiKey)
      await this.page.getByRole('button', { name: /^(Save|Update) Configuration$/ }).click()
      await expect(this.page.getByRole('button', { name: 'Saving...' })).toBeHidden()
    })
  }

  get error(): Locator {
    return this.page.getByRole('alert')
  }
}
