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

type JsApiMethod = 'open' | 'close' | 'toggle' | 'isOpen' | 'showLauncher' | 'hideLauncher' | 'identify'

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

  /** `customer` defaults to a new, unique visitor. */
  constructor(page: Page, widgetId: string, customer?: { name: string; email: string }) {
    this.page = page
    this.widgetId = widgetId
    const id = unique('customer')
    this.customer = customer ?? { name: `Customer ${id}`, email: `${id}@example.com` }
    this.frame = page.frameLocator('iframe.chattermate-iframe')
  }

  /**
   * The first authorization answer that would bind the visitor to a customer
   * arrives without its token (a browser served an earlier stored answer, as one
   * did in production), so the widget dials the socket with the page's anonymous
   * token. Call before embed().
   */
  async loseFirstAuthorization(): Promise<void> {
    let lost = false
    await this.page.route(new RegExp(`/api/v1/widgets/${this.widgetId}(\\?|$)`), async (route) => {
      if (lost || route.request().method() !== 'GET') return route.fallback()
      const response = await route.fetch()
      const answer = await response.json()
      if (answer.token) {
        lost = true
        delete answer.token
      }
      await route.fulfill({ response, json: answer })
    })
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

  /** Opens the chat of an agent that asks for an email before the conversation. */
  async openToEmailGate(): Promise<void> {
    await step('Customer opens the chat and is asked for an email', async () => {
      await this.launcher.click()
      await expect(this.emailGate).toBeVisible()
    })
  }

  /** Answers the email gate with this visitor's email; the chat is then ready. */
  async giveEmail(): Promise<void> {
    await step(`Customer gives ${this.customer.email}`, async () => {
      await this.emailGate.fill(this.customer.email)
      await this.frame.getByRole('button', { name: 'Continue to chat' }).click()
      await this.expectReady()
    })
  }

  /** Opens an "Ask anything" agent: its answer panel, not the chat window. */
  async openAskAnything(): Promise<void> {
    await step('Customer opens the Ask anything panel', async () => {
      await this.launcher.click()
      await expect(this.askBox).toBeEditable()
    })
  }

  async ask(text: string): Promise<void> {
    await step(`Customer asks "${text}"`, async () => {
      await this.askBox.fill(text)
      await this.askBox.press('Enter')
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

  /** Attaches a file and sends it with `text`, as a visitor picking it from their device. */
  async sendFile(file: { name: string; mimeType: string; content: string }, text: string): Promise<void> {
    await step(`Customer sends ${file.name}`, async () => {
      await this.frame.locator('input[type="file"]').setInputFiles({ name: file.name, mimeType: file.mimeType, buffer: Buffer.from(file.content) })
      await this.messageInput.fill(text)
      await this.messageInput.press('Enter')
      await expect(this.customerMessages.last()).toContainText(text)
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

  /** The same visitor in another tab of the same browser: same site storage, same token. */
  async inAnotherTab(): Promise<ChatWidget> {
    return new ChatWidget(await this.page.context().newPage(), this.widgetId, this.customer)
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

  /** The email field an email-first agent shows before the chat. */
  get emailGate(): Locator {
    return this.frame.getByPlaceholder('you@example.com', { exact: true })
  }

  /** The "Ask anything" panel's question box ("Connecting..." until the socket is up). */
  get askBox(): Locator {
    return this.frame.getByPlaceholder('Ask me anything...', { exact: true })
  }

  /** Answers in the "Ask anything" panel. CSS: the answers have no role or name. */
  lastAnswer(): Locator {
    return this.frame.locator('.askai__answer').last()
  }

  get messageInput(): Locator {
    return this.frame.getByPlaceholder('Type a message...', { exact: true })
  }

  /** The conversation — the widget's message log. */
  get messageLog(): Locator {
    return this.frame.getByRole('log', { name: 'Messages' })
  }

  /** Bot and human-agent replies — the widget renders both the same way. */
  get agentMessages(): Locator {
    return this.messageLog.locator('.message.agent-message .message-bubble')
  }

  lastAgentMessage(): Locator {
    return this.agentMessages.last()
  }

  get customerMessages(): Locator {
    return this.messageLog.locator('.message.user-message .message-bubble')
  }

  /** The agent's name in the chat header. */
  get agentName(): Locator {
    return this.frame.locator('.header-info h3')
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
