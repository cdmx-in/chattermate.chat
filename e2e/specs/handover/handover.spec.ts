import { test, expect } from '@e2e'

test.describe('human handover', () => {
  test.use({ agentSettings: { transferToHuman: true } })

  test('a customer asks for a person and the human agent\'s reply reaches them @smoke @handover', async ({ agent, widget, inbox, llm }) => {
    await llm.script(agent, (s) => s
      .when(/human|person/i).handOver('Let me connect you with a teammate.')
      .otherwise().reply('Happy to help!'))

    await widget.embed()
    await widget.open()
    await widget.send('I want to talk to a human')
    await widget.shareContactDetails()

    await inbox.goto()
    await inbox.openConversationWith(widget.customer.name)
    await inbox.takeOver()
    await inbox.reply('Hi, this is Sam. How can I help?')
    await expect(widget.lastAgentMessage()).toHaveText('Hi, this is Sam. How can I help?')

    await widget.send('My parcel never arrived')
    await expect(inbox.lastCustomerMessage()).toContainText('My parcel never arrived')
  })
})
