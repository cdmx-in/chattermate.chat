import type { BrowserContext } from '@playwright/test'

/**
 * Third-party hosts the app reaches for but no test depends on (the widget pulls
 * Google Fonts). Blocking them keeps runs offline-safe and fast; text still renders
 * with fallback fonts.
 */
const THIRD_PARTY = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|www\.googletagmanager\.com)\//

export async function blockThirdParty(context: BrowserContext): Promise<void> {
  await context.route(THIRD_PARTY, (route) => route.abort())
}
