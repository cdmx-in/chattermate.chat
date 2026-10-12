import { test, expect, channels, unique } from '@e2e'

// The inbox side is the same for every channel, and a human's reply leaves through
// the same adapter call as the AI's (covered per channel in replies.spec), so one
// channel is enough here.
test.describe('human handover on a channel', () => {
  test.use({ agentSettings: { transferToHuman: true } })

  test('a WhatsApp customer asks for a person and the agent\'s reply reaches them on WhatsApp @channels @handover', async ({ agent, llm, adminApi, request, inbox }) => {
    await llm.script(agent, (s) => s
      .when(/human|person/i).handOver('Let me connect you with a teammate.')
      .otherwise().reply('Happy to help!'))

    const customer = unique('Wanda')
    const chat = (await channels.WhatsApp({ api: adminApi, request, agentId: agent.id })).chatWith(customer)
    await chat.send('I want to talk to a person')
    await expect.poll(() => chat.replies(), { timeout: 20_000 })
      .toContainEqual(expect.stringContaining('Let me connect you with a teammate.'))

    await inbox.goto()
    await inbox.openConversationWith(customer)
    await expect(inbox.lastCustomerMessage()).toContainText('I want to talk to a person')
    await inbox.takeOver()
    await inbox.reply('Hi, this is Sam. How can I help?')
    await expect.poll(() => chat.replies(), { timeout: 20_000 })
      .toContainEqual('Hi, this is Sam. How can I help?')

    await chat.send('My parcel never arrived')
    await expect(inbox.lastCustomerMessage()).toContainText('My parcel never arrived')
  })
})
