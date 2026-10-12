import type { APIRequestContext } from '@playwright/test'
import { connectInstagram, connectMessenger, connectWhatsApp, routeToAgent } from '../api/channels'
import { env } from '../env'
import { FakeExternals } from '../fakes/externals'
import { unique } from '../support/ids'
import { step } from '../support/step'
import { ChatWithButtons, digits, hmac, phoneNumber, postWebhook, samePhone, type Button, type ButtonChat, type ChannelConnector } from './chat'

// WhatsApp, Messenger and Instagram share one webhook (/webhooks/meta), signed
// with the Meta app secret; `object` in the body says which product sent it.

async function deliver(request: APIRequestContext, payload: Record<string, unknown>): Promise<void> {
  const json = JSON.stringify(payload)
  const signature = `sha256=${hmac('sha256', env.channelSecrets.meta, json).toString('hex')}`
  await postWebhook(request, '/webhooks/meta', { json }, { 'x-hub-signature-256': signature })
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

async function whatsappSends(externals: FakeExternals, waId: string): Promise<WhatsAppSend[]> {
  // The same endpoint carries read receipts and typing indicators, which have no `type`.
  return (await externals.calls('graph', 'messages'))
    .map((c) => c.body as WhatsAppSend)
    .filter((b) => (b.type === 'text' || b.type === 'interactive') && samePhone(b.to, waId))
}

type WhatsAppChoice = Button & { reply: 'button_reply' | 'list_reply' }

/** The choices on the latest interactive message, each with how WhatsApp reports picking it. */
async function latestChoices(externals: FakeExternals, waId: string): Promise<WhatsAppChoice[]> {
  const action = (await whatsappSends(externals, waId)).filter((b) => b.interactive).at(-1)?.interactive?.action
  if (action?.sections) return action.sections.flatMap((s) => s.rows).map((r) => ({ ...r, reply: 'list_reply' as const }))
  return (action?.buttons ?? []).map((b) => ({ ...b.reply, reply: 'button_reply' as const }))
}

/** A WhatsApp Cloud API number connected by hand (phone number id + token). */
export const whatsapp: ChannelConnector<ButtonChat> = ({ api, request, agentId }) =>
  step('Connect a WhatsApp number', async () => {
    const phoneNumberId = digits(15)
    const account = await connectWhatsApp(api, phoneNumberId, unique('e2e-wa-token'))
    await routeToAgent(api, account.id, agentId)
    const externals = new FakeExternals(request)

    return {
      chatWith(customerName) {
        const waId = phoneNumber().slice(1) // WhatsApp ids are the number without the +
        const inbound = (message: Record<string, unknown>) => deliver(request, {
          object: 'whatsapp_business_account',
          entry: [{ id: digits(15), changes: [{ field: 'messages', value: {
            messaging_product: 'whatsapp',
            metadata: { phone_number_id: phoneNumberId },
            contacts: [{ wa_id: waId, profile: { name: customerName } }],
            messages: [{ from: waId, id: `wamid.${unique('in')}`, timestamp: String(Math.floor(Date.now() / 1000)), ...message }],
          } }] }],
        })

        return new ChatWithButtons('WhatsApp', customerName, {
          deliver: (text) => inbound({ type: 'text', text: { body: text } }),
          read: async () => (await whatsappSends(externals, waId))
            .map((b) => (b.type === 'text' ? b.text!.body : b.interactive!.body.text)),
          latestButtons: () => latestChoices(externals, waId),
          // A pick from a list arrives as list_reply, a button tap as button_reply.
          deliverTap: (button) => inbound({ type: 'interactive', interactive: { type: button.reply, [button.reply]: { id: button.id, title: button.title } } }),
        })
      },
    }
  })

// ---------- Messenger and Instagram (the Send API on a page) ----------

interface PageSend {
  recipient: { id: string }
  message?: { text?: string; quick_replies?: Array<{ title: string; payload: string }> }
}

async function pageSends(externals: FakeExternals, provider: string, recipientId: string): Promise<PageSend[]> {
  return (await externals.calls(provider, 'messages'))
    .map((c) => c.body as PageSend)
    .filter((b) => b.recipient?.id === recipientId && b.message?.text)
}

function pageChat(
  label: string,
  request: APIRequestContext,
  externals: FakeExternals,
  object: 'page' | 'instagram',
  pageId: string,
  customerName: string,
): ChatWithButtons {
  const senderId = digits(16)
  const provider = object === 'page' ? 'graph' : 'graph-instagram'
  const inbound = (message: Record<string, unknown>) => deliver(request, {
    object,
    entry: [{ id: pageId, time: Date.now(), messaging: [{
      sender: { id: senderId },
      recipient: { id: pageId },
      timestamp: Date.now(),
      message: { mid: `m_${unique('in')}`, ...message },
    }] }],
  })

  return new ChatWithButtons(label, customerName, {
    deliver: (text) => inbound({ text }),
    read: async () => (await pageSends(externals, provider, senderId)).map((b) => b.message!.text!),
    latestButtons: async () => ((await pageSends(externals, provider, senderId))
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
    // The fake's debug_token reads the page id out of the token (see fake-externals).
    const account = await connectMessenger(api, pageId, `page:${pageId}:${unique('token')}`)
    await routeToAgent(api, account.id, agentId)
    const externals = new FakeExternals(request)
    return { chatWith: (customerName) => pageChat('Messenger', request, externals, 'page', pageId, customerName) }
  })

/** An Instagram professional account connected by hand (IG user id + page token). */
export const instagram: ChannelConnector<ButtonChat> = ({ api, request, agentId }) =>
  step('Connect an Instagram account', async () => {
    const igId = digits(17)
    const account = await connectInstagram(api, igId, unique('e2e-ig-token'))
    await routeToAgent(api, account.id, agentId)
    const externals = new FakeExternals(request)
    return { chatWith: (customerName) => pageChat('Instagram', request, externals, 'instagram', igId, customerName) }
  })
