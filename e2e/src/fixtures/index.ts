import { test as base, expect, type Browser, type BrowserContextOptions, type Page } from '@playwright/test'
import { ApiClient } from '../api/client'
import { login } from '../api/auth'
import { createAgent, enableLeadCapture } from '../api/agents'
import { createWidget } from '../api/widgets'
import { ChatWidget } from '../components/chat-widget'
import { Sidebar } from '../components/sidebar'
import { env } from '../env'
import { FakeLlm, scenarioMarker, type ScriptedAgent } from '../fakes/llm'
import { readOrgState, type OrgState } from '../org-state'
import { AgentsPage } from '../pages/agents.page'
import { AiConfigPage } from '../pages/ai-config.page'
import { Dashboard } from '../pages/dashboard.page'
import { HumanAgentsPage } from '../pages/human-agents.page'
import { InboxPage } from '../pages/inbox.page'
import { LoginPage } from '../pages/login.page'
import { PeoplePage } from '../pages/people.page'
import { TicketsPage } from '../pages/tickets.page'
import { unique } from '../support/ids'
import { blockThirdParty } from './network'

export interface AgentSettings {
  /** Hand chats to the org's support group (Sam Agent) when the model asks to. */
  transferToHuman: boolean
  /** The widget asks for a star rating when the agent ends the chat. */
  askForRating: boolean
  /** The widget only loads with a conversation token (see api/widget-apps.ts). */
  requireTokenAuth: boolean
  /** Lead capture on, without the consent gate. */
  leadCapture: boolean
  /** Quick replies become tappable buttons on messaging channels. */
  channelQuickReplies: boolean
}

const DEFAULT_AGENT_SETTINGS: AgentSettings = {
  transferToHuman: false,
  askForRating: false,
  requireTokenAuth: false,
  leadCapture: false,
  channelQuickReplies: false,
}

export type TestAgent = ScriptedAgent & { id: string }

interface Options {
  /** Override per describe: test.use({ agentSettings: { transferToHuman: true } }). */
  agentSettings: Partial<AgentSettings>
}

interface WorkerFixtures {
  org: OrgState
  /** Seeding client signed in as the org admin. */
  adminApi: ApiClient
}

interface TestFixtures {
  llm: FakeLlm
  /** A fresh AI agent per test, scripted through `llm`. */
  agent: TestAgent
  /** The customer-facing widget for `agent`, on `page`. */
  widget: ChatWidget
  /** A widget for any agent id — e.g. one a test created through the UI. */
  makeWidget: (agentId: string) => Promise<ChatWidget>
  /** Sam Agent's dashboard inbox, in a separate signed-in browser. */
  inbox: InboxPage
  /** A second, signed-out browser — for signing in as someone a test just created. */
  anonymousPage: Page
  loginPage: LoginPage
  dashboard: Dashboard
  sidebar: Sidebar
  aiConfigPage: AiConfigPage
  agentsPage: AgentsPage
  ticketsPage: TicketsPage
  peoplePage: PeoplePage
  humanAgentsPage: HumanAgentsPage
}

/** Every extra browser a fixture opens gets the same settings as the config's `use`. */
async function newContext(browser: Browser, options: BrowserContextOptions = {}) {
  const context = await browser.newContext({
    baseURL: env.frontendUrl,
    reducedMotion: 'reduce',
    serviceWorkers: 'block',
    ...options,
  })
  await blockThirdParty(context)
  return context
}

export const test = base.extend<TestFixtures & Options, WorkerFixtures>({
  agentSettings: [{}, { option: true }],

  org: [async ({}, use) => use(readOrgState()), { scope: 'worker', box: true }],

  adminApi: [async ({ playwright, org }, use) => {
    const request = await playwright.request.newContext()
    const anonymous = new ApiClient(request)
    const session = await login(anonymous, org.admin.email, org.admin.password)
    await use(anonymous.withToken(session.token))
    await request.dispose()
  }, { scope: 'worker', box: true }],

  context: async ({ context }, use) => {
    await blockThirdParty(context)
    await use(context)
  },

  llm: [async ({ request }, use) => use(new FakeLlm(request)), { box: true }],

  agent: [async ({ adminApi, agentSettings, org }, use) => {
    const settings = { ...DEFAULT_AGENT_SETTINGS, ...agentSettings }
    const scenarioId = unique('scn')
    const name = `E2E Agent ${scenarioId}`
    const created = await createAgent(adminApi, {
      name,
      instructions: [`You are a helpful support agent. ${scenarioMarker(scenarioId)}`],
      transferToHuman: settings.transferToHuman,
      groupIds: settings.transferToHuman ? [org.supportGroupId] : [],
      askForRating: settings.askForRating,
      requireTokenAuth: settings.requireTokenAuth,
      channelQuickReplies: settings.channelQuickReplies,
    })
    if (settings.leadCapture) await enableLeadCapture(adminApi, created.id)
    await use({ ...created, scenarioId })
  }, { box: true }],

  makeWidget: [async ({ adminApi, page }, use) => {
    await use(async (agentId) => {
      const widget = await createWidget(adminApi, agentId, unique('widget'))
      return new ChatWidget(page, widget.id)
    })
  }, { box: true }],

  widget: [async ({ agent, makeWidget }, use) => use(await makeWidget(agent.id)), { box: true }],

  inbox: [async ({ browser, org }, use) => {
    const context = await newContext(browser, { storageState: org.humanAgent.storageState })
    await use(new InboxPage(await context.newPage()))
    await context.close()
  }, { box: true }],

  anonymousPage: [async ({ browser }, use) => {
    const context = await newContext(browser)
    await use(await context.newPage())
    await context.close()
  }, { box: true }],

  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboard: async ({ page }, use) => use(new Dashboard(page)),
  sidebar: async ({ page }, use) => use(new Sidebar(page)),
  aiConfigPage: async ({ page }, use) => use(new AiConfigPage(page)),
  agentsPage: async ({ page }, use) => use(new AgentsPage(page)),
  ticketsPage: async ({ page }, use) => use(new TicketsPage(page)),
  peoplePage: async ({ page }, use) => use(new PeoplePage(page)),
  humanAgentsPage: async ({ page }, use) => use(new HumanAgentsPage(page)),
})

export { expect }
