import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test'
import { env } from '../env'
import { unique } from '../support/ids'
import { step } from '../support/step'

export interface EmbedOptions {
  /** window.chattermateConfig — launcher, displayMode, position, trigger, … */
  config?: Record<string, unknown>
  /** window.chattermateToken, for agents that require token auth. */
  token?: string
  /** Put a `[data-chattermate-open]` button on the page. */
  withTriggerButton?: boolean
}

type JsApiMethod = 'open' | 'close' | 'toggle' | 'isOpen' | 'showLauncher' | 'hideLauncher'

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
  /** Who this visitor says they are when the widget asks (contact form, lead details). */
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
  async embed(options: EmbedOptions = {}): Promise<void> {
    await step('Customer opens a site with the widget', async () => {
      const params = new URLSearchParams({ widget: this.widgetId })
      if (options.config) params.set('config', JSON.stringify(options.config))
      if (options.token) params.set('token', options.token)
      if (options.withTriggerButton) params.set('trigger', '1')
      await this.page.goto(`${env.customerSiteUrl}/?${params}`)
    })
  }

  async open(): Promise<void> {
    await step('Customer opens the chat', async () => {
      await this.launcher.click()
      await this.expectReady()
    })
  }

  /** The chat is connected and accepting messages ("Connecting..." until the socket is up). */
  async expectReady(): Promise<void> {
    await expect(this.messageInput).toBeEditable()
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

  /** Rates the finished chat; `stars` is 1–5. */
  async rate(stars: number, feedback?: string): Promise<void> {
    await step(`Customer rates the chat ${stars}/5`, async () => {
      // The star buttons are plain "★" glyphs with no accessible name.
      await this.frame.locator('.star-button').nth(stars - 1).click()
      if (feedback) await this.frame.getByPlaceholder('Please share your feedback (optional)').fill(feedback)
      await this.frame.getByRole('button', { name: 'Submit Rating' }).click()
    })
  }

  /** Calls the public `window.ChatterMate` API the host page uses. */
  async api(method: JsApiMethod, ...args: unknown[]): Promise<unknown> {
    await this.page.waitForFunction(() => 'ChatterMate' in window)
    return this.page.evaluate(
      ({ method, args }) => (window as unknown as { ChatterMate: Record<string, (...a: unknown[]) => unknown> }).ChatterMate[method](...args),
      { method, args },
    )
  }

  /** The page's own "Chat with us" button (embed with withTriggerButton). */
  get hostChatButton(): Locator {
    return this.page.getByRole('button', { name: 'Chat with us' })
  }

  get launcher(): Locator {
    return this.page.locator('#chattermate-button')
  }

  /** The chat panel; it carries `.active` while open. */
  get panel(): Locator {
    return this.page.locator('#chattermate-container')
  }

  /** Shown by the loader instead of a chat when the widget refuses to load (e.g. no token). */
  get unavailableNotice(): Locator {
    return this.page.getByText('Chat Unavailable')
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

  /** The agent's welcome message, shown when the chat opens. */
  get welcomeMessage(): Locator {
    return this.frame.locator('.cm-welcome-block .message-bubble')
  }

  get contactForm(): Locator {
    return this.frame.locator('.form-message').filter({ hasText: 'Before we connect you to a teammate' })
  }

  get ratingThanks(): Locator {
    return this.frame.getByText('Thank you for your rating!')
  }

  get ratingPrompt(): Locator {
    return this.frame.getByText(/Rate the chat session/)
  }
}
