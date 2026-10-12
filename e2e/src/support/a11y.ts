import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import AxeBuilder from '@axe-core/playwright'
import { expect, type Page } from '@playwright/test'
import { step } from './step'

/**
 * Accessibility checks against a baseline. Each screen may keep the serious and
 * critical axe violations it has today (a11y-baseline.json); anything new fails,
 * and fixing one shrinks the baseline. Regenerate after a fix with
 * UPDATE_A11Y_BASELINE=1 npx playwright test specs/a11y.
 */
const BASELINE = fileURLToPath(new URL('../../a11y-baseline.json', import.meta.url))
const SERIOUS = new Set(['serious', 'critical'])

function readBaseline(): Record<string, string[]> {
  return existsSync(BASELINE) ? (JSON.parse(readFileSync(BASELINE, 'utf8')) as Record<string, string[]>) : {}
}

/** Rule ids of the serious and critical violations on the page now (iframes included). */
async function violations(page: Page): Promise<string[]> {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  return [...new Set(results.violations.filter((v) => SERIOUS.has(v.impact ?? '')).map((v) => v.id))].sort()
}

export async function expectNoNewA11yViolations(page: Page, screen: string): Promise<void> {
  await step(`Accessibility check: ${screen}`, async () => {
    const found = await violations(page)
    if (process.env.UPDATE_A11Y_BASELINE) {
      const baseline = readBaseline()
      baseline[screen] = found
      writeFileSync(BASELINE, `${JSON.stringify(Object.fromEntries(Object.entries(baseline).sort()), null, 2)}\n`)
      return
    }
    const known = new Set(readBaseline()[screen] ?? [])
    expect(found.filter((id) => !known.has(id)), `new accessibility violations on ${screen}`).toEqual([])
  })
}
