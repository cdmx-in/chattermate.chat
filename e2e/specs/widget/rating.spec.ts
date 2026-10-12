import { test, expect } from '@e2e'

test.describe('chat rating', () => {
  test.use({ agentSettings: { askForRating: true } })

  test('a customer rates the chat when the agent wraps up @widget', async ({ agent, widget, llm }) => {
    await llm.script(agent, (s) => s
      .when(/that is all|thanks/i).endChat('Glad I could help. Goodbye!')
      .otherwise().reply('Sure thing.'))

    await widget.embed()
    await widget.open()
    await widget.send('That is all, thanks')

    await expect(widget.ratingPrompt).toBeVisible()
    await widget.rate(5)
    await expect(widget.ratingThanks).toBeVisible()
  })
})
