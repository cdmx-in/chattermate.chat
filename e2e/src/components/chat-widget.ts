import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test'
import { env } from '../env'
import { unique } from '../support/ids'
import { step } from '../support/step'

/**
 * The customer's view: a pretend website with the widget embedded exactly the way the
 * dashboard's install snippet does it, and the chat inside the widget's iframe.
 *
 * Why CSS here: the loader's launcher (#chattermate-button) and the widget's message
 * bubbles have no accessible role or name yet. Keeping those selectors in this one
 * file means adding aria-labels later is a one-file change.
 */
export class ChatWidget {
  readonly page: Page
  readonly widgetId: string
  /** Who this visitor says they are when the widget asks (contact form). */
  readonly customer: { name: string; email: string }
  private readonly frame: FrameLocator

  constructor(page: Page, widgetId: string) {
    this.page = page
    this.widgetId = widgetId
    const id = unique('customer')
    this.customer = { name: `Customer ${id}`, email: `${id}@example.com` }
    this.frame = page.frameLocator('iframe.chattermate-iframe')
  }

  /** Opens the pretend customer site (services/customer-site) with this widget embedded. */
  async embed(): Promise<void> {
    await step('Customer opens a site with the widget', async () => {
      await this.page.goto(`${env.customerSiteUrl}/?widget=${encodeURIComponent(this.widgetId)}`)
    })
  }

  async open(): Promise<void> {
    await step('Customer opens the chat', async () => {
      await this.page.locator('#chattermate-button').click()
      // The placeholder reads "Connecting..." until the socket is up.
      await expect(this.messageInput).toBeEditable()
    })
  }

  async send(text: string): Promise<void> {
    await step(`Customer sends "${text}"`, async () => {
      await this.messageInput.fill(text)
      await this.messageInput.press('Enter')
      await expect(this.customerMessages.last()).toHaveText(text)
    })
  }

  /** Fills the "Before we connect you to a teammate" form the widget shows on handover. */
  async shareContactDetails(): Promise<void> {
    await step('Customer shares contact details', async () => {
      const form = this.contactForm
      await expect(form).toBeVisible()
      await form.getByLabel('Email').fill(this.customer.email)
      await form.getByLabel('Name').fill(this.customer.name)
      await form.getByRole('button', { name: 'Submit' }).click()
      await expect(form.getByRole('button', { name: 'Submit' })).toBeHidden()
    })
  }

  get messageInput(): Locator {
    return this.frame.getByPlaceholder('Type a message...', { exact: true })
  }

  /** Bot and human-agent replies — the widget renders both the same way. */
  get agentMessages(): Locator {
    return this.frame.locator('.message.agent-message .message-bubble')
  }

  lastAgentMessage(): Locator {
    return this.agentMessages.last()
  }

  get customerMessages(): Locator {
    return this.frame.locator('.message.user-message .message-bubble')
  }

  get contactForm(): Locator {
    return this.frame.locator('.form-message').filter({ hasText: 'Before we connect you to a teammate' })
  }
}
