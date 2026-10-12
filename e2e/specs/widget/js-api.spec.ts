import { test, expect } from '@e2e'

test.describe('widget JS API', () => {
  test('the host page opens and closes the chat with window.ChatterMate @widget', async ({ widget }) => {
    await widget.embed()

    await widget.api('open')
    await expect(widget.panel).toHaveClass(/\bactive\b/)
    await widget.expectReady()
    expect(await widget.api('isOpen')).toBe(true)

    await widget.api('close')
    await expect(widget.panel).not.toHaveClass(/\bactive\b/)
    expect(await widget.api('isOpen')).toBe(false)
  })

  test('a site can hide the launcher and open the chat from its own button @widget', async ({ widget }) => {
    await widget.embed({ config: { launcher: false }, withTriggerButton: true })
    await expect(widget.launcher).toBeHidden()

    await widget.hostChatButton.click()
    await expect(widget.panel).toHaveClass(/\bactive\b/)
    await widget.expectReady()
  })
})
