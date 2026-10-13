import type { Locator, Page } from '@playwright/test'
import { step } from '../support/step'

/** The "Finish setup" bar shown on dashboard pages until the org's agent is live. */
export class SetupBar {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  get bar(): Locator {
    return this.page.getByRole('region', { name: 'Finish setup' })
  }

  async continueSetup(): Promise<void> {
    await step('Continue setup from the bar', async () => {
      await this.bar.getByRole('button', { name: /Continue setup/ }).click()
    })
  }

  async hide(): Promise<void> {
    await step('Hide the setup bar', async () => {
      await this.bar.getByRole('button', { name: 'Hide' }).click()
    })
  }
}
