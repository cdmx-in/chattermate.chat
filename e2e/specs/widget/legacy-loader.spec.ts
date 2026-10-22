import { test, expect, setAllowedDomains, AI_REPLY } from '@e2e'

// Browsers keep the last release's loader cached for a while after an upgrade. It
// fetches the widget cross-origin (/data) and renders it in a srcdoc frame on the
// site's own origin, so it needs the site in CORS - and it must keep working.

test.describe('the last release\'s cached loader', () => {
  test('still chats, and the conversation survives a reload @widget', async ({ agent, widget, llm }) => {
    await llm.script(agent, (s) => s.otherwise().reply('Hello from the old loader.'))

    await widget.embed({ legacyLoader: true })
    await widget.open()
    await widget.send('Hi')
    await expect(widget.lastAgentMessage()).toHaveText('Hello from the old loader.', AI_REPLY)
    // The old loader's own way: the widget rendered in place, never the framed page
    expect(widget.frameLoads).toBe(0)

    await widget.embed({ legacyLoader: true })
    await widget.open()
    await expect(widget.customerMessages).toHaveText(['Hi'])
    await expect(widget.lastAgentMessage()).toHaveText('Hello from the old loader.')
  })

  // By design: allowed domains are enforced by the browser on the framed widget
  // (frame-ancestors), which the old loader never asks for
  test('is not limited by the widget\'s allowed domains @widget', async ({ agent, widget, llm, adminApi }) => {
    await setAllowedDomains(adminApi, widget.widgetId, ['shop.example.com'])
    await llm.script(agent, (s) => s.otherwise().reply('Still here.'))

    await widget.embed({ legacyLoader: true })
    await widget.open()
    await widget.send('Hi')
    await expect(widget.lastAgentMessage()).toHaveText('Still here.', AI_REPLY)
  })
})
