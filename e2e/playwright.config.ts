import { defineConfig, devices } from '@playwright/test'
import { env } from './src/env'
import { storageStatePath } from './src/org-state'

const isCI = !!process.env.CI
// Locally, reuse a stack already started with `./scripts/stack.sh up` (fast reruns);
// on CI always start clean.
const reuse = !isCI

export default defineConfig({
  testDir: './specs',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: isCI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: env.frontendUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // The dashboard is a PWA; a service worker caching across tests only adds flake.
    serviceWorkers: 'block',
    // The widget launcher floats forever; with reduced motion (which the loader honours)
    // it holds still, so clicks don't wait on an element that is never "stable".
    contextOptions: { reducedMotion: 'reduce' },
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      dependencies: ['setup'],
      testIgnore: /\.org\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'], storageState: storageStatePath('admin') },
    },
    // Specs that change org-wide settings (AI config, business hours, …). Run them in a
    // separate invocation with --workers=1 (see package.json "test") so they never race
    // the parallel suite, and are not skipped when an unrelated parallel test fails.
    {
      name: 'org',
      dependencies: ['setup'],
      testMatch: /\.org\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'], storageState: storageStatePath('admin') },
    },
  ],

  webServer: [
    {
      name: 'fake-llm',
      command: './scripts/stack.sh fake-llm',
      url: `${env.fakeLlmUrl}/health`,
      reuseExistingServer: reuse,
      timeout: 30_000,
    },
    {
      name: 'customer-site',
      command: './scripts/stack.sh customer-site',
      url: `${env.customerSiteUrl}/health`,
      reuseExistingServer: reuse,
      timeout: 30_000,
    },
    {
      name: 'backend',
      command: './scripts/stack.sh backend',
      url: `${env.backendUrl}/health`,
      reuseExistingServer: reuse,
      timeout: 180_000,
    },
    {
      name: 'frontend',
      command: './scripts/stack.sh frontend',
      url: `${env.frontendUrl}/config.js`,
      reuseExistingServer: reuse,
      timeout: 300_000,
    },
  ],
})
