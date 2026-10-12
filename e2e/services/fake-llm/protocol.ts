// Wire types shared by the fake LLM server and the test-side client (src/fakes/llm.ts).
// Type-only: the server imports this with `import type`, so Node's type stripping
// needs nothing at runtime.

/** A serialisable RegExp. */
export interface Pattern {
  source: string
  flags: string
}

/**
 * What the model "says" for one matched turn.
 *
 * - `message` / `fields` fill a structured (json_schema) reply — e.g. ChatAgent's
 *   ChatResponse. `fields` overlays any schema field: transfer_to_human, create_ticket, …
 * - `text` is used for plain-text requests (the transfer agent, the key check).
 *   Falls back to `message`.
 */
export interface Reply {
  message?: string
  fields?: Record<string, unknown>
  text?: string
}

export interface ToolCall {
  name: string
  arguments: Record<string, unknown>
}

export interface ScenarioRule {
  /** Tested against the last user message. Omitted = matches anything (otherwise). */
  match?: Pattern
  /** Ask the backend to run a tool first; `reply` is sent after the tool result comes back. */
  toolCall?: ToolCall
  reply: Reply
}

export interface ScenarioSpec {
  /**
   * Some backend calls never see the agent's instructions (the transfer agent's prompt
   * has no `[[e2e:<id>]]` marker), so a scenario can also match on the unique agent name.
   */
  agentName?: string
  rules: ScenarioRule[]
}

export interface RecordedRequest {
  at: string
  system: string
  lastUser: string
  lastRole: string
  /** 'json_schema:<name>' | 'json_object' | null */
  responseFormat: string | null
  tools: string[]
  /** What the fake answered: 'tool_call:<name>' | 'structured' | 'text' */
  answeredWith: string
}
