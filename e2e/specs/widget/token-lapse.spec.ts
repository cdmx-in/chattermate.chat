import { test, expect, createWidgetApp, revokeConversationToken, unique, AI_REPLY } from '@e2e'

// A tab left open past its conversation token's life used to reconnect with the
// dead token about once a minute for hours and never chat again (prod, Oct 2026).
// Revoking is how a test kills a token mid-visit; it needs Redis, so @redis (nightly).
test.describe('a visitor whose token stops working while the page is open', () => {
  test('gets the chat back when the connection drops and comes back @widget @redis', async ({ agent, widget, llm, adminApi }) => {
    await llm.script(agent, (s) => s.otherwise().reply('Happy to help!'))
    const connection = await widget.watchConnection()

    await widget.embed()
    await widget.open()
    await widget.send('Before')
    await expect(widget.lastAgentMessage()).toHaveText('Happy to help!', AI_REPLY)

    const { apiKey } = await createWidgetApp(adminApi, unique('acme-site'))
    const revoked = connection.token()
    await revokeConversationToken(adminApi, apiKey, revoked)
    await connection.drop()

    // The widget authorizes again for a live token instead of retrying the dead one
    await expect.poll(() => connection.token()).not.toBe(revoked)
    await widget.expectReady()
    await widget.send('After')
    await expect(widget.agentMessages.last()).toHaveText('Happy to help!', AI_REPLY)
  })
})
