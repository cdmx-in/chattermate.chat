import { test, expect, installShopify, uninstallShopify, useShopForAgent, FakeExternals, seedOrg, unique, AI_REPLY } from '@e2e'

// Linking a shop sets the org's domain, so this runs in the serial `org` project and
// uninstalls (restoring the domain) afterwards.

test.describe('Shopify', () => {
  let shop: string
  let shopId: string | undefined

  test.beforeEach(async ({ agent, adminApi }) => {
    shop = `${unique('e2e-shop')}.myshopify.com`
    shopId = await installShopify(adminApi, shop)
    await useShopForAgent(adminApi, agent.id, shopId)
  })

  test.afterEach(async ({ adminApi, org }) => {
    if (shopId) await uninstallShopify(adminApi, shopId, org.orgId, seedOrg.domain)
  })

  test('a customer asks where their order is and the AI answers from the shop @integrations', async ({ agent, widget, llm, request }) => {
    const email = widget.customer.email
    await llm.script(agent, (s) => s
      .when(/1042/).callTool('get_order_status', { order_number: '#1042', customer_email: email })
      .thenReply('Order #1042 has shipped with UPS.')
      .otherwise().reply('Happy to check — what is your order number and email?'))
    await widget.embed()
    await widget.open()
    await widget.send('Where is my order?')
    await expect(widget.lastAgentMessage()).toHaveText('Happy to check — what is your order number and email?', AI_REPLY)
    await widget.send(`It is 1042, ${email}`)
    await expect(widget.lastAgentMessage()).toHaveText('Order #1042 has shipped with UPS.', AI_REPLY)

    // The shop was searched for this customer's order with the token its install
    // was granted, then the order itself was read.
    const externals = new FakeExternals(request)
    const [install] = await externals.calls('shopify', 'access_token', { contains: shop })
    const [search, read] = await externals.calls('shopify', 'graphql.json', { contains: shop })
    expect(search.headers['x-shopify-access-token']).toBe((install.response as { access_token: string }).access_token)
    expect(search.body).toMatchObject({ variables: { query: `email:${email.toLowerCase()} AND name:1042` } })
    expect(read.body).toMatchObject({ query: expect.stringContaining('query GetOrder') })

    // What the model was told: the shipment and its tracking number.
    const toolResults = (await llm.requests(agent)).flatMap((r) => r.toolResults).join('\n')
    expect(toolResults).toContain('FULFILLED')
    expect(toolResults).toMatch(/1ZE2E\d+/)
  })

  test('an order lookup without the customer\'s email never reaches the shop @integrations', async ({ agent, widget, llm, request }) => {
    await llm.script(agent, (s) => s
      .otherwise().callTool('get_order_status', { order_number: '1042', customer_email: '' })
      .thenReply('Could you tell me the email you ordered with?'))
    await widget.embed()
    await widget.open()
    await widget.send('Where is order 1042?')
    await expect(widget.lastAgentMessage()).toHaveText('Could you tell me the email you ordered with?', AI_REPLY)

    const externals = new FakeExternals(request)
    expect(await externals.calls('shopify', 'graphql.json', { contains: shop })).toHaveLength(0)
    const toolResults = (await llm.requests(agent)).flatMap((r) => r.toolResults).join('\n')
    expect(toolResults).toContain('requires_user_input')
  })
})
