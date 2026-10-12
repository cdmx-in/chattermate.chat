import type { APIRequestContext } from '@playwright/test'
import type { RecordedRequest, ScenarioRule, ScenarioSpec } from '../../services/fake-llm/protocol'
import { env } from '../env'

/** What a script needs to know about the agent it drives (see fixtures/resources.ts). */
export interface ScriptedAgent {
  name: string
  scenarioId: string
}

/** The text an agent's instructions carry so the fake LLM can find its script. */
export function scenarioMarker(scenarioId: string): string {
  return `[[e2e:${scenarioId}]]`
}

class RuleBuilder {
  private readonly script: Script
  private readonly match: ScenarioRule['match']

  constructor(script: Script, match: ScenarioRule['match']) {
    this.script = script
    this.match = match
  }

  /** A normal answer. `fields` sets any other reply field, e.g. { end_chat: true }. */
  reply(message: string, fields?: Record<string, unknown>): Script {
    return this.script.add({ match: this.match, reply: { message, fields } })
  }

  /** The agent decides to hand the chat to a human. */
  handOver(message: string): Script {
    return this.reply(message, { transfer_to_human: true, transfer_reason: 'DIRECT_REQUEST' })
  }

  /** The agent decides to open a ticket. */
  createTicket(message: string, summary: string): Script {
    return this.reply(message, { create_ticket: true, ticket_summary: summary, ticket_description: summary })
  }

  /** The model calls a backend tool first, then answers with `reply` once the result is back. */
  callTool(name: string, args: Record<string, unknown>) {
    return {
      thenReply: (message: string, fields?: Record<string, unknown>): Script =>
        this.script.add({ match: this.match, toolCall: { name, arguments: args }, reply: { message, fields } }),
    }
  }
}

/** Ordered rules: the first whose pattern matches the customer's last message wins. */
export class Script {
  readonly rules: ScenarioRule[] = []

  when(pattern: RegExp): RuleBuilder {
    return new RuleBuilder(this, { source: pattern.source, flags: pattern.flags })
  }

  otherwise(): RuleBuilder {
    return new RuleBuilder(this, undefined)
  }

  add(rule: ScenarioRule): Script {
    this.rules.push(rule)
    return this
  }
}

/** Test-side client for services/fake-llm. */
export class FakeLlm {
  private readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  /**
   * Scripts what `agent` says. Example:
   *   await llm.script(agent, (s) => s.when(/human/i).handOver('Connecting you.').otherwise().reply('Hi!'))
   */
  async script(agent: ScriptedAgent, build: (script: Script) => Script): Promise<void> {
    const spec: ScenarioSpec = { agentName: agent.name, rules: build(new Script()).rules }
    const response = await this.request.put(`${env.fakeLlmUrl}/__scenarios/${agent.scenarioId}`, { data: spec })
    if (!response.ok()) throw new Error(`fake LLM rejected the script: ${await response.text()}`)
  }

  /** Forgets every script — the setup project calls this so a long-running fake starts each run clean. */
  async reset(): Promise<void> {
    await this.request.delete(`${env.fakeLlmUrl}/__scenarios`)
  }

  /** Every request the backend sent for this agent — to assert on what reached the model. */
  async requests(agent: ScriptedAgent): Promise<RecordedRequest[]> {
    const response = await this.request.get(`${env.fakeLlmUrl}/__scenarios/${agent.scenarioId}/requests`)
    return (await response.json()) as RecordedRequest[]
  }
}

