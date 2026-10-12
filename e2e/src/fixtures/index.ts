import { test as base, expect } from '@playwright/test'
import { ApiClient } from '../api/client'
import { login } from '../api/auth'
import { createAgent } from '../api/agents'
import { createWidget } from '../api/widgets'
import { ChatWidget } from '../components/chat-widget'
import { env } from '../env'
import { FakeLlm, scenarioMarker, type ScriptedAgent } from '../fakes/llm'
import { readOrgState, type OrgState } from '../org-state'
import { AiConfigPage } from '../pages/ai-config.page'
import { Dashboard } from '../pages/dashboard.page'
import { InboxPage } from '../pages/inbox.page'
import { LoginPage } from '../pages/login.page'
import { unique } from '../support/ids'
import { blockThirdParty } from './network'

export interface AgentSettings {
  /** Hand chats to the org's support group (Sam Agent) when the model asks to. */
  transferToHuman: boolean
}

export type TestAgent = ScriptedAgent & { id: string }

interface Options {
  agentSettings: AgentSettings
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
  /** Sam Agent's dashboard inbox, in a separate signed-in browser. */
  inbox: InboxPage
  loginPage: LoginPage
  dashboard: Dashboard
  aiConfigPage: AiConfigPage
}

export const test = base.extend<TestFixtures & Options, WorkerFixtures>({
  agentSettings: [{ transferToHuman: false }, { option: true }],

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
    const scenarioId = unique('scn')
    const name = `E2E Agent ${scenarioId}`
    const created = await createAgent(adminApi, {
      name,
      instructions: [`You are a helpful support agent. ${scenarioMarker(scenarioId)}`],
      transferToHuman: agentSettings.transferToHuman,
      groupIds: agentSettings.transferToHuman ? [org.supportGroupId] : [],
    })
    await use({ ...created, scenarioId })
  }, { box: true }],

  widget: [async ({ adminApi, agent, page }, use) => {
    const widget = await createWidget(adminApi, agent.id, `${agent.name} widget`)
    await use(new ChatWidget(page, widget.id))
  }, { box: true }],

  inbox: [async ({ browser, org }, use) => {
    const context = await browser.newContext({
      baseURL: env.frontendUrl,
      storageState: org.humanAgent.storageState,
      reducedMotion: 'reduce',
      serviceWorkers: 'block',
    })
    await blockThirdParty(context)
    await use(new InboxPage(await context.newPage()))
    await context.close()
  }, { box: true }],

  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboard: async ({ page }, use) => use(new Dashboard(page)),
  aiConfigPage: async ({ page }, use) => use(new AiConfigPage(page)),
})

export { expect }
