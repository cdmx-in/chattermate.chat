import { test as setup, expect } from '@playwright/test'
import { useFakeLlm } from '../../src/api/ai'
import { login } from '../../src/api/auth'
import { ApiClient } from '../../src/api/client'
import { isSetUp, setAlwaysOpen } from '../../src/api/organizations'
import { ensureGroup, ensureUser } from '../../src/api/team'
import { env, seedOrg, seedUsers } from '../../src/env'
import { FakeLlm } from '../../src/fakes/llm'
import { storageStatePath, writeOrgState } from '../../src/org-state'
import { LoginPage } from '../../src/pages/login.page'
import { SetupPage } from '../../src/pages/setup.page'

// OSS edition setup. Runs once per run, before every other project, and writes the
// org contract (src/org-state.ts) that all specs read.
//
// Idempotent: on a fresh database it goes through the real first-run form (which is
// also the test that the form works); on a database left by an earlier run it signs in.

setup('organization, AI and support team are ready', async ({ page, request, browser }) => {
  const anonymous = new ApiClient(request)
  await new FakeLlm(request).reset()
  const { admin, humanAgent } = seedUsers

  if (await isSetUp(anonymous)) {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.signIn(admin.email, admin.password)
    await expect(page).not.toHaveURL(/\/login/)
  } else {
    const setupPage = new SetupPage(page)
    await setupPage.goto()
    await setupPage.createOrganization({
      orgName: seedOrg.name,
      domain: seedOrg.domain,
      adminName: admin.name,
      adminEmail: admin.email,
      adminPassword: admin.password,
    })
  }
  const adminState = storageStatePath('admin')
  await page.context().storageState({ path: adminState })

  const session = await login(anonymous, admin.email, admin.password)
  const api = anonymous.withToken(session.token)
  const orgId = session.organizationId
  await useFakeLlm(api)
  await setAlwaysOpen(api, orgId)
  const sam = await ensureUser(api, { ...humanAgent, role: 'Agent' })
  const supportGroupId = await ensureGroup(api, seedOrg.supportGroup, [sam])

  // Signing in is what marks Sam online — handover needs an online group member.
  const agentContext = await browser.newContext({ baseURL: env.frontendUrl })
  const agentLogin = new LoginPage(await agentContext.newPage())
  await agentLogin.goto()
  await agentLogin.signIn(humanAgent.email, humanAgent.password)
  await expect(agentLogin.page).not.toHaveURL(/\/login/)
  const agentState = storageStatePath('human-agent')
  await agentContext.storageState({ path: agentState })
  await agentContext.close()

  writeOrgState({
    edition: env.edition,
    orgId,
    supportGroupId,
    admin: { ...admin, storageState: adminState },
    humanAgent: { ...humanAgent, id: sam.id, storageState: agentState },
  })
})
