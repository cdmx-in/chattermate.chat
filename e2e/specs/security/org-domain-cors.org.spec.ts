import { test, expect, seedOrg, setOrgDomain, ApiClient } from '@e2e'

// The org's website is what lets its site call the API. Changing it is org-wide,
// so this runs in the serial `org` project and puts the seeded domain back.

const OLD_SITE = 'https://old-site.e2e.example'
const NEW_SITE = 'https://new-site.e2e.example'

async function allowedOrigin(api: ApiClient, origin: string): Promise<string | undefined> {
  // A plain request, not a preflight: every CORS layer adds its header to these,
  // so a stale copy of the old origin list would still answer for the old site.
  const response = await api.raw('GET', '/organizations/setup-status', { headers: { Origin: origin } })
  return response.headers()['access-control-allow-origin']
}

test.describe('organization website and API access', () => {
  test.afterEach(async ({ adminApi, org }) => { await setOrgDomain(adminApi, org.orgId, seedOrg.domain) })

  test('changing the website moves API access to the new site and revokes the old one @security', async ({ adminApi, org, request }) => {
    const anonymous = new ApiClient(request)

    await setOrgDomain(adminApi, org.orgId, new URL(OLD_SITE).host)
    expect(await allowedOrigin(anonymous, OLD_SITE)).toBe(OLD_SITE)

    await setOrgDomain(adminApi, org.orgId, new URL(NEW_SITE).host)
    expect(await allowedOrigin(anonymous, NEW_SITE)).toBe(NEW_SITE)
    expect(await allowedOrigin(anonymous, OLD_SITE)).toBeUndefined()

    // Saving the same website again, then switching back, still allows only the current site
    await setOrgDomain(adminApi, org.orgId, new URL(NEW_SITE).host)
    expect(await allowedOrigin(anonymous, NEW_SITE)).toBe(NEW_SITE)
    await setOrgDomain(adminApi, org.orgId, new URL(OLD_SITE).host)
    expect(await allowedOrigin(anonymous, OLD_SITE)).toBe(OLD_SITE)
    expect(await allowedOrigin(anonymous, NEW_SITE)).toBeUndefined()
  })
})

test.describe('organization website and sign-in cookies', () => {
  test.afterEach(async ({ adminApi, org }) => { await setOrgDomain(adminApi, org.orgId, seedOrg.domain) })

  test('an org\'s website can call the API but never with a signed-in user\'s cookies @security', async ({ adminApi, org, request }) => {
    // Any signed-up domain lands in the CORS list, unverified: it must not be
    // able to read the dashboard's cookie-authenticated responses
    await setOrgDomain(adminApi, org.orgId, new URL(NEW_SITE).host)
    const anonymous = new ApiClient(request)

    const simple = await anonymous.raw('GET', '/users/me', { headers: { Origin: NEW_SITE, Cookie: 'access_token=x' } })
    expect(simple.headers()['access-control-allow-origin']).toBe(NEW_SITE)
    expect(simple.headers()['access-control-allow-credentials']).toBeUndefined()

    const preflight = await anonymous.raw('OPTIONS', '/users/me', {
      headers: { Origin: NEW_SITE, 'Access-Control-Request-Method': 'GET' },
    })
    expect(preflight.headers()['access-control-allow-credentials']).toBeUndefined()
  })
})
