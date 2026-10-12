import { fileURLToPath } from 'node:url'

// The ONLY place the suite reads configuration. Ports must match scripts/stack.sh
// and .env.e2e — they are fixed so the stack never collides with a dev setup on
// localhost (different host and ports → its own cookies, DB and Redis).

const backendUrl = 'http://127.0.0.1:18000'

export const env = {
  edition: (process.env.E2E_EDITION ?? 'oss') as 'oss' | 'enterprise',
  frontendUrl: 'http://127.0.0.1:15173',
  backendUrl,
  apiUrl: `${backendUrl}/api/v1`,
  fakeLlmUrl: 'http://127.0.0.1:14010',
  /** The pretend customer website the widget is embedded on (services/customer-site). */
  customerSiteUrl: 'http://127.0.0.1:13000',
  /** Where the setup project writes the org contract (see src/org-state.ts). */
  authDir: fileURLToPath(new URL('../.auth/', import.meta.url)),
} as const

/**
 * Throwaway credentials for the throwaway e2e database. Passwords satisfy the
 * backend's strength rules; example.com passes the email validators.
 */
export const seedUsers = {
  admin: { name: 'Erin Admin', email: 'admin@e2e.example.com', password: 'E2e-Admin-Passw0rd!' },
  humanAgent: { name: 'Sam Agent', email: 'sam.agent@e2e.example.com', password: 'E2e-Agent-Passw0rd!' },
} as const

export const seedOrg = {
  name: 'E2E Org',
  domain: 'e2e.example.com',
  supportGroup: 'E2E Support',
  llmModel: 'e2e-fake',
} as const
