import type { APIRequestContext } from '@playwright/test'
import { connectInstagram, connectMessenger, connectWhatsApp, routeToAgent, type ChannelAccount } from '../api/channels'
import type { ApiClient } from '../api/client'
import { env } from '../env'
import { FakeExternals, type RecordedCall } from '../fakes/externals'
import { unique } from '../support/ids'
import { step } from '../support/step'
import { ChatWithButtons, digits, hmac, phoneNumber, postWebhook, samePhone, sentWith, type Button, type ButtonChat, type ChannelConnector } from './chat'

// WhatsApp, Messenger and Instagram share one webhook (/webhooks/meta), signed
// with the Meta app secret; `object` in the body says which product sent it.

/** The X-Hub-Signature-256 header Meta puts on `json`. */
export function metaSignature(json: string): Record<string, string> {
  return { 'x-hub-signature-256': `sha256=${hmac('sha256', env.channelSecrets.meta, json).toString('hex')}` }
}

/** A Meta webhook POST, signed like Meta signs it. */
export async function deliverMeta(request: APIRequestContext, payload: Record<string, unknown>): Promise<void> {
  const json = JSON.stringify(payload)
  await postWebhook(request, '/webhooks/meta', { json }, metaSignature(json))
}

/** A Meta access token that owns `nodes` in the fake Graph (see fake-externals). */
export function metaToken(...nodes: string[]): string {
  return `owns:${nodes.join(',')}:${unique('token')}`
}

// ---------- WhatsApp ----------

interface WhatsAppSend {
  to: string
  type: string
  text?: { body: string }
  interactive?: {
    body: { text: string }
    action: { buttons?: Array<{ reply: Button }>; sections?: Array<{ rows: Button[] }> }
  }
}

type WhatsAppChoice = Button & { reply: 'button_reply' | 'list_reply' }

export interface WhatsAppNumber {
  account: ChannelAccount
  phoneNumberId: string
  token: string
}

/** Connects a WhatsApp Cloud API number by hand (phone number id + system-user token). */
export async function connectWhatsAppNumber(api: ApiClient, phoneNumberId = digits(15), token = metaToken(phoneNumberId)): Promise<WhatsAppNumber> {
  const account = await connectWhatsApp(api, phoneNumberId, token)
  return { account, phoneNumberId, token }
}

/** The webhook body WhatsApp sends for one inbound message. */
export function whatsappPayload(phoneNumberId: string, waId: string, name: string, message: Record<string, unknown>): Record<string, unknown> {
  return {
    object: 'whatsapp_business_account',
    entry: [{ id: digits(15), changes: [{ field: 'messages', value: {
      messaging_product: 'whatsapp',
      metadata: { phone_number_id: phoneNumberId },
      contacts: [{ wa_id: waId, profile: { name } }],
      messages: [{ from: waId, id: `wamid.${unique('in')}`, timestamp: String(Math.floor(Date.now() / 1000)), ...message }],
    } }] }],
  }
}

/** One WhatsApp user's chat with a connected number. */
export class WhatsAppChat extends ChatWithButtons<WhatsAppChoice> {
  readonly waId: string
  readonly number: WhatsAppNumber

  constructor(request: APIRequestContext, externals: FakeExternals, number: WhatsAppNumber, customerName: string) {
    const waId = phoneNumber().slice(1) // WhatsApp ids are the number without the +
    const inbound = (message: Record<string, unknown>) => deliverMeta(request, whatsappPayload(number.phoneNumberId, waId, customerName, message))
    // Only what this number sent: its path, its token. The same endpoint carries
    // read receipts and typing indicators, which have no `type`.
    const sends = async () => (await externals.calls('graph', 'messages', { contains: waId }))
      .filter((c) => c.status === 200 && c.path.includes(`/${number.phoneNumberId}/messages`) && sentWith(c, number.token))
      .map((c) => c.body as WhatsAppSend)
      .filter((b) => (b.type === 'text' || b.type === 'interactive') && samePhone(b.to, waId))
    const latestChoices = async (): Promise<WhatsAppChoice[]> => {
      const action = (await sends()).filter((b) => b.interactive).at(-1)?.interactive?.action
      if (action?.sections) return action.sections.flatMap((s) => s.rows).map((r) => ({ ...r, reply: 'list_reply' as const }))
      return (action?.buttons ?? []).map((b) => ({ ...b.reply, reply: 'button_reply' as const }))
    }

    super('WhatsApp', customerName, {
      deliver: (text) => inbound({ type: 'text', text: { body: text } }),
      read: async () => (await sends()).map((b) => (b.type === 'text' ? b.text!.body : b.interactive!.body.text)),
      latestButtons: latestChoices,
      // A pick from a list arrives as list_reply, a button tap as button_reply.
      deliverTap: (button) => inbound({ type: 'interactive', interactive: { type: button.reply, [button.reply]: { id: button.id, title: button.title } } }),
    })
    this.waId = waId
    this.number = number
  }
}

export const whatsapp: ChannelConnector<WhatsAppChat> = ({ api, request, agentId }) =>
  step('Connect a WhatsApp number', async () => {
    const number = await connectWhatsAppNumber(api)
    await routeToAgent(api, number.account.id, agentId)
    const externals = new FakeExternals(request)
    return { chatWith: (customerName) => new WhatsAppChat(request, externals, number, customerName) }
  })

// ---------- Messenger and Instagram (the Send API on a page) ----------

interface PageSend {
  recipient: { id: string }
  message?: { text?: string; quick_replies?: Array<{ title: string; payload: string }> }
}

function pageChat(
  label: string,
  request: APIRequestContext,
  externals: FakeExternals,
  object: 'page' | 'instagram',
  pageId: string,
  token: string,
  customerName: string,
): ChatWithButtons {
  const senderId = digits(16)
  const provider = object === 'page' ? 'graph' : 'graph-instagram'
  const inbound = (message: Record<string, unknown>) => deliverMeta(request, {
    object,
    entry: [{ id: pageId, time: Date.now(), messaging: [{
      sender: { id: senderId },
      recipient: { id: pageId },
      timestamp: Date.now(),
      message: { mid: `m_${unique('in')}`, ...message },
    }] }],
  })
  // `/me/messages` names no page: the token is the only proof of which page sent it.
  const sends = async () => (await externals.calls(provider, 'messages', { contains: senderId }))
    .filter((c: RecordedCall) => c.status === 200 && sentWith(c, token))
    .map((c) => c.body as PageSend)
    .filter((b) => b.recipient?.id === senderId && b.message?.text)

  return new ChatWithButtons(label, customerName, {
    deliver: (text) => inbound({ text }),
    read: async () => (await sends()).map((b) => b.message!.text!),
    latestButtons: async () => ((await sends())
      .filter((b) => b.message?.quick_replies?.length).at(-1)?.message?.quick_replies ?? [])
      .map((q) => ({ id: q.payload, title: q.title })),
    // A quick-reply tap is a message whose text is the title, with the payload attached.
    deliverTap: (button) => inbound({ text: button.title, quick_reply: { payload: button.id } }),
  })
}

/** A Facebook Page connected by hand (page id + page access token). */
export const messenger: ChannelConnector<ButtonChat> = ({ api, request, agentId }) =>
  step('Connect a Facebook Page', async () => {
    const pageId = digits(15)
    const token = metaToken(pageId)
    const account = await connectMessenger(api, pageId, token)
    await routeToAgent(api, account.id, agentId)
    const externals = new FakeExternals(request)
    return { chatWith: (customerName) => pageChat('Messenger', request, externals, 'page', pageId, token, customerName) }
  })

/** An Instagram professional account connected by hand (IG user id + page token). */
export const instagram: ChannelConnector<ButtonChat> = ({ api, request, agentId }) =>
  step('Connect an Instagram account', async () => {
    const igId = digits(17)
    const token = metaToken(igId)
    const account = await connectInstagram(api, igId, token)
    await routeToAgent(api, account.id, agentId)
    const externals = new FakeExternals(request)
    return { chatWith: (customerName) => pageChat('Instagram', request, externals, 'instagram', igId, token, customerName) }
  })
