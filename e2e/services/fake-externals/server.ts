// A recording stand-in for the third-party APIs the backend calls on its own:
// Telegram, Meta Graph (WhatsApp / Messenger / Instagram), Slack, LINE, SMS
// providers, HubSpot. The backend reaches it through the *_API_BASE overrides in
// .env.e2e (see backend/app/core/external_urls.py); each provider is a path prefix.
//
// Every request is recorded (method, path, query, headers, body, the answer) and
// answered like the provider would:
//   - the smallest success the adapter accepts, by default;
//   - the provider's own rejection when a payload breaks its published limits
//     (limits.ts), so a backend that drifts past a real limit fails here too;
//   - a scripted failure while a fault the test registered matches (PUT /__faults).
// Tests then assert on what the backend sent ("the bot replied on Telegram with …")
// and read values the provider would have learned, such as the webhook secret
// Telegram receives in setWebhook.
//
// Where a provider tells the backend who the account is, the answer is derived
// from what the test sent, so every test gets its own account:
//   Meta tokens `owns:<id>[,<id>…]:<anything>`   own those nodes (pages, numbers, IG
//                                              accounts). Graph refuses such a token a
//                                              node another token owns, and debug_token
//                                              reports its first id as the page
//   Meta GET /<node>       id = <node>
//   LINE GET /info         userId derived from the channel access token
//   Slack oauth.v2.access  team id and bot token derived from the OAuth code
//   HubSpot oauth/v1/token  an access token derived from the code; introspecting it
//                           (oauth/v1/access-tokens/<token>) gives a hub id from it
//
// A call's `action` is the provider's method (Telegram, Slack) or else the last
// non-empty path segment (`/Account/<id>/Message/` → `Message`).
//
// Control API (src/fakes/externals.ts):
//   GET    /__calls?provider=&action=&contains=&since=   recorded calls, oldest first;
//                                                        contains = substring of path or body
//   DELETE /__calls                                       forget every call
//   PUT    /__faults/:id   { provider, action?, contains?, status, body?, times? }
//   DELETE /__faults/:id
//
// Run: node services/fake-externals/server.ts --port 14020

import { createHash } from 'node:crypto'
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { rejection } from './limits.ts'

export interface RecordedCall {
  at: string
  provider: string
  /** Provider-level operation: Telegram/Slack method name, else the last path segment. */
  action: string
  method: string
  path: string
  query: Record<string, string>
  /** Lower-cased request headers — e.g. authorization, to tell which account sent it. */
  headers: Record<string, string>
  body: unknown
  /** HTTP status the fake answered with. */
  status: number
  /** What the fake answered — e.g. the message_id Telegram assigned. */
  response: unknown
}

export interface Fault {
  provider: string
  action?: string
  /** Only calls whose path or body contains this — scope a fault to one test's account or customer. */
  contains?: string
  status: number
  body?: unknown
  /** How many matching calls fail; omitted = until the fault is deleted. */
  times?: number
}

const MAX_CALLS = 5000
const calls: RecordedCall[] = []
const faults = new Map<string, Fault>()
/** Every node some `owns:` token has claimed — what other tokens are refused. */
const claimed = new Set<string>()
let counter = 0

class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(JSON.stringify(body))
}

async function readRaw(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  return Buffer.concat(chunks).toString('utf8')
}

function parseBody(raw: string, contentType: string): unknown {
  if (!raw) return null
  if (contentType.includes('application/x-www-form-urlencoded')) return Object.fromEntries(new URLSearchParams(raw))
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

function bearer(headers: Record<string, string>): string {
  return (headers.authorization ?? '').replace(/^Bearer\s+/i, '')
}

// ---------- per-provider answers ----------

interface Call {
  provider: string
  action: string
  method: string
  url: URL
  headers: Record<string, string>
  body: Record<string, unknown> | null
}

interface Answer {
  status: number
  body: unknown
}

const ok = (body: unknown): Answer => ({ status: 200, body })

function telegram(action: string, token: string, body: Record<string, unknown> | null): Answer {
  switch (action) {
    case 'getMe': {
      const id = botIdFor(token)
      return ok({ ok: true, result: { id, is_bot: true, first_name: 'E2E Bot', username: `e2e_bot_${id}` } })
    }
    case 'sendMessage':
      return ok({ ok: true, result: { message_id: counter, date: Math.floor(Date.now() / 1000), chat: { id: body?.chat_id }, text: body?.text } })
    default:
      // setWebhook, deleteWebhook, sendChatAction, answerCallbackQuery, editMessageReplyMarkup, …
      return ok({ ok: true, result: true })
  }
}

/** The node ids a Meta token owns, or null for a token that makes no claim. */
function ownedNodes(token: string): string[] | null {
  const match = /^owns:([^:]+):/.exec(token)
  if (!match) return null
  const nodes = match[1].split(',')
  for (const node of nodes) claimed.add(node)
  return nodes
}

function graphError(message: string, code = 100): Answer {
  return { status: 400, body: { error: { message, type: 'OAuthException', code, fbtrace_id: 'e2e' } } }
}

function graph({ action, method, url, headers, body }: Call): Answer {
  if (action === 'debug_token') {
    const inspected = ownedNodes(url.searchParams.get('input_token') ?? '')
    return ok({ data: { is_valid: Boolean(inspected), type: 'PAGE', profile_id: inspected?.[0] ?? '' } })
  }
  // `/<provider>/v21.0/<node>[/<edge>]`. A token can't reach a page, number or IG
  // account another token owns; anything unclaimed (a customer's PSID, `me`) is fine.
  const owned = ownedNodes(bearer(headers))
  const node = url.pathname.split('/').filter(Boolean)[2] ?? ''
  if (owned && claimed.has(node) && !owned.includes(node)) {
    return graphError(`Unsupported request - object with ID '${node}' does not exist, cannot be loaded due to missing permissions, or does not support this operation`)
  }
  if (method !== 'GET') {
    return ok({ messages: [{ id: `wamid.e2e.${counter}` }], message_id: `m_e2e_${counter}`, recipient_id: body?.recipient ?? null, success: true })
  }
  return ok({ id: action, name: `E2E ${action}`, username: `e2e_${action}`, data: [] })
}

function answer(call: Call): Answer {
  const { provider, action, headers, body } = call
  switch (provider) {
    case 'graph':
    case 'graph-instagram':
      return graph(call)
    case 'slack':
      if (action === 'oauth.v2.access') {
        const code = String(body?.code ?? '')
        return ok({ ok: true, access_token: `xoxb-e2e-${digest(code).slice(0, 12)}`, bot_user_id: 'U0E2EBOT', team: { id: `T${digest(code).slice(0, 10).toUpperCase()}`, name: 'E2E Workspace' } })
      }
      return ok({ ok: true, ts: `${Math.floor(Date.now() / 1000)}.${String(counter).padStart(6, '0')}`, channel: body?.channel ?? 'C0E2E' })
    case 'line':
      // GET /info is the bot's own profile; everything else (push, webhook endpoint) answers an empty 200.
      return ok(action === 'info' ? { userId: `U${digest(bearer(headers)).slice(0, 32)}`, displayName: 'E2E LINE Bot', basicId: '@e2e' } : {})
    case 'twilio':
      return ok({ sid: `SM${String(counter).padStart(32, '0')}`, status: 'queued' })
    case 'plivo':
      return ok({ message_uuid: [`e2e-${counter}`], api_id: `e2e-${counter}` })
    case 'hubspot':
      return hubspot(call)
    default:
      return ok({})
  }
}

function hubspot({ method, url, body }: Call): Answer {
  const path = url.pathname
  if (path.endsWith('/oauth/v1/token')) {
    const seed = String(body?.code ?? body?.refresh_token ?? '')
    return ok({ access_token: `hs-${digest(seed).slice(0, 16)}`, refresh_token: `hs-refresh-${digest(seed).slice(0, 8)}`, expires_in: 1800, token_type: 'bearer' })
  }
  const introspected = /\/oauth\/v1\/access-tokens\/([^/]+)$/.exec(path)
  if (introspected) return ok({ hub_id: parseInt(digest(introspected[1]).slice(0, 7), 16), hub_domain: 'e2e.hubspot.com', token: introspected[1] })
  if (path.endsWith('/contacts/batch/upsert')) return ok({ status: 'COMPLETE', results: [{ id: String(counter), new: true }] })
  return ok(method === 'GET' ? { results: [] } : { id: String(counter) })
}

/** How each provider says "bad request", so the backend's error handling sees the real shape. */
function providerRejection(provider: string, message: string): Answer {
  switch (provider) {
    case 'graph':
    case 'graph-instagram': return graphError(message)
    case 'telegram': return { status: 400, body: { ok: false, error_code: 400, description: `Bad Request: ${message}` } }
    case 'slack': return ok({ ok: false, error: 'msg_too_long', detail: message })
    case 'twilio': return { status: 400, body: { code: 21617, message, status: 400 } }
    default: return { status: 400, body: { message, error: message } }
  }
}

// ---------- faults ----------

function matchingFault(provider: string, action: string, haystack: string): Fault | undefined {
  for (const [id, fault] of faults) {
    if (fault.provider !== provider) continue
    if (fault.action && fault.action !== action) continue
    if (fault.contains && !haystack.includes(fault.contains)) continue
    if (fault.times !== undefined) {
      fault.times -= 1
      if (fault.times <= 0) faults.delete(id)
    }
    return fault
  }
  return undefined
}

// ---------- http ----------

async function route(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? '/', 'http://fake-externals')
  const path = url.pathname

  if (path === '/health') return send(res, 200, { status: 'ok', calls: calls.length, faults: faults.size })
  if (path === '/__calls' && req.method === 'GET') {
    const q = url.searchParams
    const since = q.get('since')
    const contains = q.get('contains')
    return send(res, 200, calls.filter((c) =>
      (!q.get('provider') || c.provider === q.get('provider'))
      && (!q.get('action') || c.action === q.get('action'))
      && (!since || c.at >= since)
      && (!contains || `${c.path}\n${JSON.stringify(c.body)}`.includes(contains))))
  }
  if (path === '/__calls' && req.method === 'DELETE') {
    calls.length = 0
    return send(res, 200, { ok: true })
  }
  const faultPath = /^\/__faults\/([\w.-]+)$/.exec(path)
  if (faultPath && req.method === 'PUT') {
    const fault = parseBody(await readRaw(req), 'application/json') as Fault | null
    if (!fault?.provider || !fault.status) throw new HttpError(400, 'a fault needs provider and status')
    faults.set(faultPath[1], fault)
    return send(res, 200, { ok: true })
  }
  if (faultPath && req.method === 'DELETE') {
    faults.delete(faultPath[1])
    return send(res, 200, { ok: true })
  }

  const [, provider = '', ...rest] = path.split('/')
  const raw = await readRaw(req)
  const headers = Object.fromEntries(Object.entries(req.headers).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v ?? '']))
  const body = parseBody(raw, headers['content-type'] ?? '') as Record<string, unknown> | null
  const method = req.method ?? 'GET'
  counter += 1

  let action = rest.filter(Boolean).at(-1) ?? ''
  let token = ''
  if (provider === 'telegram') {
    // /telegram/bot<token>/<method>
    token = (rest[0] ?? '').replace(/^bot/, '')
    action = rest[1] ?? ''
  }

  const fault = matchingFault(provider, action, `${path}\n${raw}`)
  const rejected = fault ? null : rejection(provider, action, method, body)
  let result: Answer
  if (fault) result = { status: fault.status, body: fault.body ?? {} }
  else if (rejected) result = providerRejection(provider, rejected)
  else if (provider === 'telegram') result = telegram(action, token, body)
  else result = answer({ provider, action, method, url, headers, body })

  calls.push({
    at: new Date().toISOString(),
    provider, action, method, path,
    query: Object.fromEntries(url.searchParams),
    headers, body,
    status: result.status,
    response: result.body,
  })
  if (calls.length > MAX_CALLS) calls.splice(0, calls.length - MAX_CALLS)
  return send(res, result.status, result.body)
}

const portArg = process.argv.indexOf('--port')
const port = Number(portArg > -1 ? process.argv[portArg + 1] : 14020)

createServer((req, res) => {
  route(req, res).catch((err: unknown) => {
    const status = err instanceof HttpError ? err.status : 500
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[fake-externals] ${req.method} ${req.url} -> ${status}: ${message}`)
    send(res, status, { error: message })
  })
}).listen(port, '127.0.0.1', () => console.log(`[fake-externals] listening on http://127.0.0.1:${port}`))
