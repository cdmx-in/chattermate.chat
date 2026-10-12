// A recording stand-in for the third-party APIs the backend calls on its own:
// Telegram, Meta Graph (WhatsApp / Messenger / Instagram), Slack, LINE, SMS
// providers, HubSpot. The backend reaches it through the *_API_BASE overrides in
// .env.e2e (see backend/app/core/external_urls.py); each provider is a path prefix.
//
// Every request is recorded and answered with the smallest success the adapter
// accepts. Tests then assert on what the backend sent ("the bot replied on
// Telegram with …") — and read values the provider would have learned, such as
// the webhook secret Telegram receives in setWebhook.
//
// Where a provider tells the backend who the account is, the answer is derived
// from what the test sent, so every test gets its own account:
//   Meta debug_token    profile_id = the page id in a `page:<id>:…` token
//   Meta GET /<node>    id = <node>
//   LINE GET /info      userId derived from the channel access token
//   Slack oauth.v2.access   team id derived from the OAuth code
//
// A call's `action` is the provider's method (Telegram, Slack) or else the last
// non-empty path segment (`/Account/<id>/Message/` → `Message`).
//
//   GET    /__calls?provider=telegram&action=sendMessage   recorded calls, oldest first
//   DELETE /__calls                                         forget everything
//
// Run: node services/fake-externals/server.ts --port 14020

import { createHash } from 'node:crypto'
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'

export interface RecordedCall {
  at: string
  provider: string
  /** Provider-level operation: Telegram/Slack method name, else the last path segment. */
  action: string
  method: string
  path: string
  body: unknown
  /** What the fake answered — e.g. the message_id Telegram assigned. */
  response: unknown
}

const MAX_CALLS = 2000
const calls: RecordedCall[] = []
let counter = 0

function send(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(JSON.stringify(body))
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return null
  const type = req.headers['content-type'] ?? ''
  if (type.includes('application/x-www-form-urlencoded')) return Object.fromEntries(new URLSearchParams(raw))
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

function digest(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/** A stable numeric id per bot token, so reconnecting the same token finds the same bot. */
function botIdFor(token: string): number {
  return parseInt(digest(token).slice(0, 10), 16)
}

function bearer(req: IncomingMessage): string {
  return (req.headers.authorization ?? '').replace(/^Bearer\s+/i, '')
}

// ---------- per-provider answers ----------

function telegram(action: string, token: string, body: Record<string, unknown> | null) {
  counter += 1
  switch (action) {
    case 'getMe': {
      const id = botIdFor(token)
      return { ok: true, result: { id, is_bot: true, first_name: 'E2E Bot', username: `e2e_bot_${id}` } }
    }
    case 'sendMessage':
      return { ok: true, result: { message_id: counter, date: Math.floor(Date.now() / 1000), chat: { id: body?.chat_id }, text: body?.text } }
    default:
      // setWebhook, deleteWebhook, sendChatAction, answerCallbackQuery, editMessageReplyMarkup, …
      return { ok: true, result: true }
  }
}

interface Call {
  provider: string
  action: string
  method: string
  url: URL
  body: Record<string, unknown> | null
  req: IncomingMessage
}

function graph({ action, method, url, body }: Call): unknown {
  if (method !== 'GET') {
    return { messages: [{ id: `wamid.e2e.${counter}` }], message_id: `m_e2e_${counter}`, recipient_id: body?.recipient ?? null, success: true }
  }
  if (action === 'debug_token') {
    // Page tokens look like `page:<page id>:<anything>`; the backend checks the token belongs to that page.
    const pageId = (url.searchParams.get('input_token') ?? '').split(':')[1] ?? ''
    return { data: { is_valid: Boolean(pageId), type: 'PAGE', profile_id: pageId } }
  }
  // GET /<node>?fields=…: the node itself, as Graph answers for a page, number or IG account.
  return { id: action, name: `E2E ${action}`, username: `e2e_${action}`, data: [] }
}

function answer(call: Call): unknown {
  counter += 1
  const { provider, action, method, body, req } = call
  switch (provider) {
    case 'graph':
    case 'graph-instagram':
      return graph(call)
    case 'slack':
      if (action === 'oauth.v2.access') {
        const code = String(body?.code ?? '')
        return { ok: true, access_token: `xoxb-e2e-${digest(code).slice(0, 12)}`, bot_user_id: 'U0E2EBOT', team: { id: `T${digest(code).slice(0, 10).toUpperCase()}`, name: 'E2E Workspace' } }
      }
      return { ok: true, ts: `${Math.floor(Date.now() / 1000)}.${String(counter).padStart(6, '0')}`, channel: body?.channel ?? 'C0E2E' }
    case 'line':
      // GET /info is the bot's own profile; everything else (push, webhook endpoint) answers an empty 200.
      return action === 'info' ? { userId: `U${digest(bearer(req)).slice(0, 32)}`, displayName: 'E2E LINE Bot', basicId: '@e2e' } : {}
    case 'twilio':
      return { sid: `SM${String(counter).padStart(32, '0')}`, status: 'queued' }
    case 'plivo':
      return { message_uuid: [`e2e-${counter}`], api_id: `e2e-${counter}` }
    case 'hubspot':
      return method === 'GET' ? { results: [] } : { id: String(counter) }
    default:
      return {}
  }
}

async function route(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? '/', 'http://fake-externals')
  const path = url.pathname

  if (path === '/health') return send(res, 200, { status: 'ok', calls: calls.length })
  if (path === '/__calls' && req.method === 'GET') {
    const provider = url.searchParams.get('provider')
    const action = url.searchParams.get('action')
    return send(res, 200, calls.filter((c) => (!provider || c.provider === provider) && (!action || c.action === action)))
  }
  if (path === '/__calls' && req.method === 'DELETE') {
    calls.length = 0
    return send(res, 200, { ok: true })
  }

  const [, provider = '', ...rest] = path.split('/')
  const body = (await readBody(req)) as Record<string, unknown> | null

  // The last non-empty segment, so Plivo's `/Account/<id>/Message/` records as `Message`.
  let action = rest.filter(Boolean).at(-1) ?? ''
  let response: unknown
  if (provider === 'telegram') {
    // /telegram/bot<token>/<method>
    const token = (rest[0] ?? '').replace(/^bot/, '')
    action = rest[1] ?? ''
    response = telegram(action, token, body)
  } else {
    response = answer({ provider, action, method: req.method ?? 'GET', url, body, req })
  }

  calls.push({ at: new Date().toISOString(), provider, action, method: req.method ?? 'GET', path, body, response })
  if (calls.length > MAX_CALLS) calls.splice(0, calls.length - MAX_CALLS)
  return send(res, 200, response)
}

const portArg = process.argv.indexOf('--port')
const port = Number(portArg > -1 ? process.argv[portArg + 1] : 14020)

createServer((req, res) => {
  route(req, res).catch((err: unknown) => {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[fake-externals] ${req.method} ${req.url} -> 500: ${message}`)
    send(res, 500, { error: message })
  })
}).listen(port, '127.0.0.1', () => console.log(`[fake-externals] listening on http://127.0.0.1:${port}`))
