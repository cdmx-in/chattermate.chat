import { test, expect } from '@e2e'

test.describe('lead capture', () => {
  test.use({ agentSettings: { leadCapture: true } })

  test('a visitor who shares their details shows up as a lead @leads', async ({ agent, widget, llm, peoplePage }) => {
    const { email, name } = widget.customer
    await llm.script(agent, (s) => s
      .when(/@/).captureLead('Thanks! Someone from sales will reach out.', { email, name, company: 'Acme Corp' })
      .otherwise().reply('Happy to set that up — what is your email?'))

    await widget.embed()
    await widget.open()
    await widget.send('I would like a demo')
    // A visitor answers the question once it is asked; replies to back-to-back
    // messages are produced concurrently and may arrive in either order.
    await expect(widget.lastAgentMessage()).toHaveText('Happy to set that up — what is your email?')
    await widget.send(`Sure, I am ${name}, ${email}`)
    await expect(widget.lastAgentMessage()).toHaveText('Thanks! Someone from sales will reach out.')

    await peoplePage.goto()
    await peoplePage.findLead(email)
    await expect(peoplePage.person(email)).toContainText('Lead')
  })
})
