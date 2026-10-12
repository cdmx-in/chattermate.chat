# ChatterMate end-to-end tests

Playwright tests that drive the real dashboard, the real widget and the real backend.

Each run gets its own stack:
- a throwaway Postgres database
- the backend
- a production build of the dashboard
- a fake LLM
- a pretend customer site

All of it runs on `127.0.0.1` ports that never touch a dev setup on `localhost`.

Unit tests (`backend/tests`, `frontend` vitest) still cover logic and edge cases. These tests cover **journeys**: what a customer or an agent actually does.

## Running

```bash
cd e2e
npm ci
npx playwright install chromium
npm test                      # starts the stack if needed, runs everything
npm run test:smoke            # just @smoke
npx playwright test specs/handover --headed   # one area, watch it
npm run test:ui               # Playwright UI mode
npm run report                # last HTML report (traces on failure)
```

**Prerequisites:**
- A local Postgres with pgvector, reachable as `postgresql://$USER@127.0.0.1:5432` (set `E2E_PG_URL` otherwise). The user must be able to create databases and the `vector` extension.
- `backend/venv` with the backend requirements (or set `E2E_PYTHON`).
- `frontend/node_modules` (or set `E2E_FRONTEND_NODE_MODULES`).

**Faster reruns:** keep the stack up between runs.

```bash
./scripts/stack.sh up         # start everything once
npx playwright test           # reuses the running stack
./scripts/stack.sh reset      # fresh database
./scripts/stack.sh logs backend
./scripts/stack.sh down
```

**Safety:**
- `stack.sh` only ever manages `chattermate_e2e` and its template `chattermate_e2e_tpl`. It refuses any database name that does not end in `_e2e`.
- The backend reads only `e2e/.env.e2e` (through `ENV_FILE`), never `backend/.env`.
- The OSS edition runs with `NO_ENTERPRISE=1`, and the dashboard is built without `src/modules/enterprise`, so it behaves like a community install even in a checkout that has the submodules.

## How the code is organised

```
specs/<feature>/*.spec.ts   what the product does — no selectors, no raw HTTP
src/pages/                  one class per dashboard screen; locators live ONLY here…
src/components/             …or here, for UI shared across screens (chat-widget.ts)
src/api/                    typed seeding calls, one module per backend area
src/fakes/llm.ts            scripts what the AI says (see below)
src/fixtures/               wires it together: agent, widget, inbox, llm, adminApi, org…
src/index.ts                the only import specs use: `import { test, expect } from '@e2e'`
specs/setup/*.setup.ts      runs once per run: org, AI config, support team, signed-in states
```

| When this changes… | …edit only this |
|---|---|
| A label or the DOM of a screen | that screen's page object (or the component) |
| An API route or payload | the module in `src/api/` |
| What a default test agent looks like | `src/fixtures/index.ts` |
| The model reply format | `services/fake-llm` (and run `contract_check.py`) |

## Rules

1. **Locators:** `getByRole` / `getByLabel` first, then `getByText` / `getByPlaceholder`. CSS only inside `src/pages` or `src/components`, with a comment saying why (usually "no accessible name yet"). When you need one, prefer adding an `aria-label` to the app instead.
2. **Web-first assertions only:** `await expect(locator).toHaveText(…)`. Never use `waitForTimeout`, and never `expect(await x.isVisible())`. Lint enforces both.
3. **Seed through the API, assert through the UI.** Use the UI for setup only when the setup *is* the feature under test.
4. **Every test is independent.** Fixtures give each test its own agent and widget with unique names. Never rely on another test's data or on test order.
5. **Org-wide settings** (AI config, business hours, ticket settings) are changed only in `*.org.spec.ts`. Those run in a separate `--workers=1` invocation (`npm run test:org`).
6. **Page objects don't assert,** except to wait for their own page to load. Assertions live in specs.
7. **Wrap user-level actions in `step()`** (`src/support/step.ts`), so reports read like a story.
8. **Tags in the title:**
   - `@smoke` runs on every PR.
   - `@<feature>` is the folder name.
   - `@slow` marks a slow test.
   - `@quarantine` excludes a test from required runs; it must link an issue.
9. **Never import `@playwright/test` in a spec.** Import `@e2e` instead, so every spec gets the shared fixtures. This is also what keeps the enterprise suite on a single Playwright copy.

## Scripting the AI

Each test's agent carries a hidden marker. The fake LLM uses it to find that test's script, so parallel tests never see each other's replies.

```ts
await llm.script(agent, (s) => s
  .when(/refund/i).handOver('Let me get a teammate.')                  // transfer_to_human
  .when(/broken/i).createTicket('I have logged it.', 'Widget broken')    // runs the create_ticket tool
  .when(/@/).captureLead('Thanks!', { email, name })                     // request_lead_capture + lead_*
  .when(/thanks/i).endChat('Goodbye!')                                   // end_chat (+ rating if the agent asks)
  .when(/pricing/i).callTool('search_knowledge_base', { query: 'pricing' }).thenReply('Plans start at $10.')
  .otherwise().reply('Happy to help!'))

const sent = await llm.requests(agent)    // what the backend sent the model: system, lastUser, toolResults…
```

- **Reply format:** replies are structured `ChatResponse` JSON, the same as with a real model. Handover, end-chat and lead capture are fields of that JSON. Tickets are a real tool call (`create_ticket`); the `create_ticket` JSON field alone creates nothing. `reply(message, fields)` sets any other field.
- **Pace conversations like a person:** wait for the agent's reply before the visitor's next message. Replies to back-to-back messages are produced concurrently and can arrive in either order.
- **Contract check:** `services/fake-llm/contract_check.py` runs agno itself against the fake. Run it after upgrading agno.

## Adding a test

1. Find or create `specs/<feature>/`, and add a row to `FEATURES.md`.
2. Write the spec in product language, using the fixtures (`agent`, `widget`, `inbox`, `llm`, `loginPage`, …).
3. If a screen isn't covered yet, add a page object in `src/pages/`. If seeding needs a new endpoint, add it to the module in `src/api/`.
4. `npx playwright test specs/<feature> --repeat-each=10` must pass before you open a PR.
5. Run `npm run lint && npm run typecheck`.

## Troubleshooting

- **Port already in use:** something else is on 18000, 15173, 14010 or 13000. Run `./scripts/stack.sh down`, or stop the other process.
- **The launcher never becomes clickable:** the suite runs with `reducedMotion: 'reduce'` because the launcher floats forever otherwise. Keep that option on any new browser context.
- **The customer site must be a real server:** Chrome blocks a page faked with `page.route` from calling `127.0.0.1` (Local Network Access).
- **The widget and loader are built from source on every run.** `stack.sh` builds the widget bundle and `chattermate.min.js` from the current `frontend/src/webclient` into `e2e/.cache`, and points the backend at that build with `WIDGET_ASSETS_DIR`. The committed production bundles in `backend/assets` and `frontend/public/webclient` are never rebuilt or modified.
