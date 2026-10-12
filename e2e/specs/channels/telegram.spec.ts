import { test, expect, TelegramBot } from '@e2e'

test.describe('Telegram', () => {
  test('a Telegram user gets the agent\'s answer back on Telegram @channels', async ({ agent, llm, adminApi, request }) => {
    await llm.script(agent, (s) => s
      .when(/opening hours/i).reply('We are open 9am to 5pm, Monday to Friday.')
      .otherwise().reply('Happy to help!'))

    const bot = await TelegramBot.connect(adminApi, request, agent.id)
    const chat = bot.chatWith('Tess')
    await chat.send('What are your opening hours?')

    await expect.poll(() => chat.replies(), { timeout: 20_000 })
      .toContainEqual(expect.stringContaining('We are open 9am to 5pm'))
  })
})

test.describe('Telegram reply buttons', () => {
  test.use({ agentSettings: { channelQuickReplies: true } })

  test('the AI offers buttons on Telegram and a tap gets the next answer @channels', async ({ agent, llm, adminApi, request }) => {
    await llm.script(agent, (s) => s
      .when(/track my order/i).reply('Your order ships tomorrow.')
      .otherwise().reply('What can I help you with?', { quick_replies: ['Track my order', 'Returns'] }))

    const bot = await TelegramBot.connect(adminApi, request, agent.id)
    const chat = bot.chatWith('Tess')
    await chat.send('Hi')
    await expect.poll(() => chat.buttons(), { timeout: 20_000 }).toEqual(['Track my order', 'Returns'])

    await chat.tap('Track my order')
    await expect.poll(() => chat.replies(), { timeout: 20_000 })
      .toContainEqual(expect.stringContaining('Your order ships tomorrow.'))
  })
})
