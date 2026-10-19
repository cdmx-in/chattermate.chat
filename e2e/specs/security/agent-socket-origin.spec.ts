import type { APIRequestContext } from '@playwright/test'
import { test, expect, env, seedOrg, seedUsers } from '@e2e'

// The dashboard's live-chat socket signs in with the sign-in cookies, which
// browsers send on every socket request whatever the page. Sockets get no CORS
// check, so only our own pages may use them: a page on an org's website (an
// unverified signup domain, allowed to call the API) must not get a socket
// signed in as whoever is visiting it. Driven at the protocol level, the way
// such a page's requests would arrive.

const DASHBOARD = env.frontendUrl
const ORG_SITE = `https://${seedOrg.domain}`
const SOCKET = `${env.backendUrl}/socket.io/?EIO=4`

type Outcome = 'signed in' | 'refused'

/** The sign-in cookies, as a Cookie header a browser would attach. */
async function signInCookies(playwright: { request: { newContext(): Promise<APIRequestContext> } }): Promise<string> {
  const context = await playwright.request.newContext()
  const response = await context.post(`${env.apiUrl}/users/login`, {
    form: { username: seedUsers.admin.email, password: seedUsers.admin.password },
  })
  expect(response.ok()).toBe(true)
  const { cookies } = await context.storageState()
  await context.dispose()
  return cookies.filter((c) => ['access_token', 'refresh_token'].includes(c.name)).map((c) => `${c.name}=${c.value}`).join('; ')
}

/**
 * Open the /agent namespace over a WebSocket, as the dashboard does. Only the
 * namespace's own answer counts: a handshake refused before it (the origin not
 * allowed at all) fails the test rather than passing as a refusal.
 */
function overWebSocket(origin: string, cookie: string): Promise<Outcome> {
  return new Promise((resolve, reject) => {
    // Node's WebSocket takes headers, which a page can't set but a browser sends for it
    const ws = new WebSocket(`${SOCKET.replace(/^http/, 'ws')}&transport=websocket`, { headers: { Origin: origin, Cookie: cookie } } as never)
    const fail = (why: string) => { clearTimeout(timer); ws.close(); reject(new Error(`${origin}: ${why}`)) }
    const timer = setTimeout(() => fail('no answer to the namespace connect'), 10_000)
    ws.onmessage = ({ data }) => {
      const packet = String(data)
      if (packet.startsWith('0')) ws.send('40/agent,')
      else if (packet.startsWith('40/agent')) settle('signed in')
      else if (packet.startsWith('44/agent')) settle('refused')
    }
    ws.onerror = () => fail('the socket handshake was refused before the namespace answered')
    function settle(outcome: Outcome) { clearTimeout(timer); ws.onerror = null; ws.close(); resolve(outcome) }
  })
}

test.describe('the dashboard live-chat socket', () => {
  test('signs in from the dashboard but never from an org\'s website @security', async ({ playwright }) => {
    const cookie = await signInCookies(playwright)

    expect(await overWebSocket(DASHBOARD, cookie)).toBe('signed in')
    expect(await overWebSocket(ORG_SITE, cookie)).toBe('refused')
  })

  test('a <script>-tag (JSONP) handshake carries the cookies but not the page\'s origin, so it never signs in @security', async ({ playwright, request }) => {
    test.skip(env.multiWorker, 'polling needs every request on one worker; the prod-like run has two')
    const cookie = await signInCookies(playwright)

    // As the page would: the handshake from a <script> tag (cookies, no Origin),
    // then the namespace connect and the read from its own origin
    async function overPolling(handshake: Record<string, string>, query: string): Promise<Outcome> {
      const opened = await (await request.get(`${SOCKET}&transport=polling${query}`, { headers: { Cookie: cookie, ...handshake } })).text()
      const sid = opened.match(/sid\\?":\\?"([^"\\]+)/)?.[1]
      expect(sid, `handshake answered ${opened.slice(0, 80)}`).toBeTruthy()
      const session = `${SOCKET}&transport=polling&sid=${sid}`
      await request.post(session, { headers: { Origin: ORG_SITE, 'Content-Type': 'text/plain' }, data: '40/agent,' })
      const answer = await (await request.get(session, { headers: { Origin: ORG_SITE } })).text()
      return answer.includes('40/agent,{"sid"') ? 'signed in' : 'refused'
    }

    // The same flow does sign in when the handshake came from the dashboard
    expect(await overPolling({ Origin: DASHBOARD }, '')).toBe('signed in')
    expect(await overPolling({}, '&j=0')).toBe('refused')
    expect(await overPolling({ 'Sec-Fetch-Site': 'cross-site', 'Sec-Fetch-Dest': 'script' }, '')).toBe('refused')
  })
})
