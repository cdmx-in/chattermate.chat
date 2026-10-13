import { expect, type Locator, type Page } from '@playwright/test'
import { step } from '../support/step'

/**
 * The first-agent setup wizard on /ai-agents: Create -> Teach -> Test -> Launch.
 * Shows by itself while the org has no agents; /ai-agents?setup=1 reopens it at
 * the step the server says the org has reached.
 */
export class SetupWizard {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async resume(): Promise<void> {
    await this.page.goto('/ai-agents?setup=1')
  }

  async createAgent(name: string): Promise<void> {
    await step(`Create the first agent "${name}"`, async () => {
      await expect(this.createHeading).toBeVisible()
      await this.page.getByLabel('Agent name').fill(name)
      await this.page.getByRole('button', { name: 'Continue' }).click()
      await expect(this.teachHeading).toBeVisible()
    })
  }

  /** Continue on the Teach step, sending whatever sources are staged. */
  async continueFromTeach(): Promise<void> {
    await step('Continue from the Teach step', async () => {
      await this.page.getByRole('button', { name: /^Continue/ }).click()
    })
  }

  async pasteTextInstead(text: string): Promise<void> {
    await step('Paste some text instead of the website', async () => {
      await this.page.getByRole('button', { name: 'Paste some text instead' }).click()
      await this.page.getByLabel('Text about your business').fill(text)
      await this.page.getByRole('button', { name: 'Add this text' }).click()
    })
  }

  /** A staged source on the Teach step, e.g. the signup domain. */
  stagedSource(url: string): Locator {
    return this.page.getByRole('listitem').filter({ hasText: url })
  }

  /** The explanation shown when a website couldn't be read. */
  get crawlFailure(): Locator {
    return this.page.getByRole('alert').filter({ hasText: "We couldn't read" })
  }

  get createHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Create your agent' })
  }

  get teachHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Teach it your business' })
  }

  get testHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Try it out' })
  }
}
