// The harness public API. Specs (and the enterprise suite, via the `@e2e` alias)
// import from here only — never from '@playwright/test' directly, so there is one
// Playwright instance and one place to change shared behaviour.
export { test, expect, type AgentSettings, type TestAgent } from './fixtures'
export { ApiClient } from './api/client'
export { addKnowledgeText } from './api/knowledge'
export { ChatWidget } from './components/chat-widget'
export { env, seedOrg, seedUsers } from './env'
export { FakeLlm, Script, scenarioMarker } from './fakes/llm'
export { readOrgState, writeOrgState, storageStatePath, type OrgState } from './org-state'
export { AiConfigPage } from './pages/ai-config.page'
export { Dashboard } from './pages/dashboard.page'
export { InboxPage } from './pages/inbox.page'
export { LoginPage } from './pages/login.page'
export { SetupPage } from './pages/setup.page'
export { unique } from './support/ids'
export { step } from './support/step'
export type { Page, Locator, BrowserContext } from '@playwright/test'
