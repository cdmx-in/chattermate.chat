import { test, expect, createWidgetApp, issueConversationToken, unique, AI_REPLY } from '@e2e'

test.describe('token-authenticated widget', () => {
  test.use({ agentSettings: { requireTokenAuth: true } })

  test('a visitor with a token from the site\'s server can chat @widget', async ({ agent, widget, llm, adminApi }) => {
    const { apiKey } = await createWidgetApp(adminApi, unique('acme-site'))
    const token = await issueConversationToken(adminApi, apiKey, widget.widgetId, widget.customer)
    await llm.script(agent, (s) => s.otherwise().reply('Welcome back!'))

    await widget.embed({ token })
    await widget.open()
    await widget.send('Hi')
    await expect(widget.lastAgentMessage()).toHaveText('Welcome back!', AI_REPLY)
  })

  test('without a token the widget refuses to load @widget', async ({ widget }) => {
    await widget.embed()
    // The notice lives in the chat panel, so the visitor sees it when they click the launcher.
    await widget.launcher.click()
    await expect(widget.unavailableNotice).toBeVisible()
  })
})
