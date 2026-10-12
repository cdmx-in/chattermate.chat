import { installSlack, listChannelAccounts, routeToAgent } from '../api/channels'
import { env } from '../env'
import { FakeExternals } from '../fakes/externals'
import { unique } from '../support/ids'
import { step } from '../support/step'
import { Chat, digits, hmac, postWebhook, sentWith, type ChannelConnector } from './chat'

interface OAuthAnswer { team: { id: string }; access_token: string }
interface SlackPost { channel: string; text: string }

/** The "typing…" placeholder the backend posts and then edits into the reply. */
const TYPING_PLACEHOLDER = '_typing…_'

/** A Slack workspace installed through the OAuth flow; customers DM the bot. */
export const slack: ChannelConnector = ({ api, request, agentId }) =>
  step('Install the Slack app in a workspace', async () => {
    const externals = new FakeExternals(request)
    const code = unique('slack-code')
    await installSlack(api, code)
    // The workspace is whatever Slack answered the code exchange with.
    const exchange = (await externals.calls('slack', 'oauth.v2.access')).find((c) => (c.body as { code?: string }).code === code)
    const answer = exchange?.response as OAuthAnswer | undefined
    const teamId = answer?.team.id
    const account = (await listChannelAccounts(api)).find((a) => a.channel_type === 'slack' && a.external_account_id === teamId)
    if (!account) throw new Error(`no Slack account for team ${teamId} after the OAuth callback`)
    await routeToAgent(api, account.id, agentId)

    return {
      chatWith(customerName) {
        const user = `U${digits(10)}`
        const channel = `D${digits(10)}`
        return new Chat('Slack', customerName, async (text) => {
          const ts = `${Math.floor(Date.now() / 1000)}.${digits(6)}`
          const json = JSON.stringify({
            type: 'event_callback',
            team_id: teamId,
            event_id: `Ev${digits(10)}`,
            event: { type: 'message', channel_type: 'im', channel, user, text, ts },
          })
          const timestamp = String(Math.floor(Date.now() / 1000))
          const signature = `v0=${hmac('sha256', env.channelSecrets.slack, `v0:${timestamp}:${json}`).toString('hex')}`
          await postWebhook(request, '/webhooks/slack', { json }, { 'x-slack-request-timestamp': timestamp, 'x-slack-signature': signature })
        }, async () => (await externals.calls('slack', undefined, { contains: channel }))
          // A reply is the placeholder edited by chat.update, or a fresh chat.postMessage,
          // sent with this workspace's bot token.
          .filter((c) => (c.action === 'chat.update' || c.action === 'chat.postMessage') && c.status === 200 && sentWith(c, answer!.access_token))
          .map((c) => c.body as SlackPost)
          .filter((b) => b.channel === channel && b.text !== TYPING_PLACEHOLDER)
          .map((b) => b.text))
      },
    }
  })
