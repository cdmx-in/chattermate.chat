import { test, expect, unique, AI_REPLY } from '@e2e'

test.describe('tickets', () => {
  test('the AI opens a ticket that an agent then works in the dashboard @tickets', async ({ agent, widget, llm, ticketsPage }) => {
    const summary = `Checkout button does nothing ${unique('T')}`
    await llm.script(agent, (s) => s
      .when(/broken|does nothing/i).createTicket('I have logged this for our team.', summary)
      .otherwise().reply('Happy to help!'))

    await widget.embed()
    await widget.open()
    await widget.send('The checkout button does nothing when I click it')
    await expect(widget.lastAgentMessage()).toHaveText('I have logged this for our team.', AI_REPLY)

    await ticketsPage.goto()
    await ticketsPage.open(summary)
    await ticketsPage.setStatus('In progress')
    await ticketsPage.page.reload()
    await expect(ticketsPage.statusLabel).toHaveText('In progress')
  })
})

test.describe('resolving a ticket', () => {
  test('the customer hears about the fix in the chat the ticket came from @tickets', async ({ agent, widget, llm, ticketsPage, adminApi }) => {
    const summary = `Coupon code rejected ${unique('T')}`
    await llm.script(agent, (s) => s
      .when(/coupon/i).createTicket('I have logged this for our team.', summary)
      .otherwise().reply('Happy to help!'))
    await widget.embed()
    await widget.open()
    await widget.send('My coupon code is rejected at checkout')
    await expect(widget.lastAgentMessage()).toHaveText('I have logged this for our team.', AI_REPLY)

    await ticketsPage.goto()
    await ticketsPage.open(summary)
    const ticketId = new URL(ticketsPage.page.url()).pathname.split('/').at(-1)
    await adminApi.post(`/tickets/${ticketId}/resolve`, {
      data: { outcome: 'fixed', resolution_summary: 'Expired promotion table', customer_message: 'Good news: your coupon works again.' },
    })

    await expect(widget.lastAgentMessage()).toContainText('Good news: your coupon works again.', AI_REPLY)
    await ticketsPage.page.reload()
    await expect(ticketsPage.statusLabel).toHaveText('Resolved · confirming')
  })
})
