import { test, expect, expectNoNewA11yViolations, InboxPage } from '@e2e'

// Serious and critical axe findings, per screen, held to a baseline
// (a11y-baseline.json): today's known issues pass, anything new fails, and the
// baseline shrinks as they are fixed. The widget is checked in both themes.

test.describe('accessibility', () => {
  test('sign-in page @a11y', async ({ anonymousPage }) => {
    await anonymousPage.goto('/login')
    await expect(anonymousPage.getByRole('button', { name: /sign in/i })).toBeVisible()
    await expectNoNewA11yViolations(anonymousPage, 'login')
  })

  test('dashboard screens @a11y', async ({ page, agentsPage, aiConfigPage, ticketsPage, peoplePage }) => {
    await new InboxPage(page).goto()
    await expectNoNewA11yViolations(page, 'inbox')
    await agentsPage.goto()
    await expectNoNewA11yViolations(page, 'ai-agents')
    await aiConfigPage.goto()
    await expectNoNewA11yViolations(page, 'ai-config')
    await ticketsPage.goto()
    await expectNoNewA11yViolations(page, 'tickets')
    await peoplePage.goto()
    await expectNoNewA11yViolations(page, 'people')
  })

  for (const scheme of ['light', 'dark'] as const) {
    test(`widget, ${scheme} theme @a11y @widget`, async ({ widget }) => {
      await widget.page.emulateMedia({ colorScheme: scheme })
      await widget.embed()
      await widget.open()
      await expect(widget.messageInput).toBeEditable()
      await expectNoNewA11yViolations(widget.page, `widget-${scheme}`)
    })
  }
})
