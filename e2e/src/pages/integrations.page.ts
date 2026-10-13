import { expect, type Locator, type Page } from '@playwright/test'
import { step } from '../support/step'

/** /settings/integrations: one card per integration, with Connect or Manage/Disconnect. */
export class IntegrationsPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(): Promise<void> {
    await this.page.goto('/settings/integrations')
    await expect(this.card('Jira')).toBeVisible()
  }

  card(name: string): Locator {
    return this.page.locator('.integration-card').filter({ has: this.page.getByText(name, { exact: true }) })
  }

  /** Starts the integration's OAuth flow; the provider's consent screen sends the browser back here. */
  async connect(name: string): Promise<void> {
    await step(`Connect ${name}`, async () => {
      await this.card(name).getByRole('button', { name: 'Connect' }).click()
      await expect(this.page).toHaveURL(/\/settings\/integrations/)
    })
  }
}
