# Feature coverage (OSS)

One row per user journey. Every feature PR adds or updates its row and the spec that covers it.

- **Priority:** P1 is the first waves, P2 comes later, N runs nightly only.
- **Status:** ✅ covered · 🚧 in progress · ⬜ not yet

| Feature | Journey | Spec | Pri | Status |
|---|---|---|---|---|
| Setup and auth | First-run setup creates the org and lands on the dashboard | `specs/setup/org.setup.ts` | P1 | ✅ |
| Setup and auth | Admin signs in | `specs/auth/login.spec.ts` | P1 | ✅ |
| Setup and auth | Wrong password shows an error | `specs/auth/login.spec.ts` | P1 | ✅ |
| Setup and auth | Sign out | `specs/auth/login.spec.ts` | P1 | ✅ |
| Setup and auth | Agent role is denied AI settings | `specs/auth/login.spec.ts` | P1 | ✅ |
| Widget chat | Customer gets the AI answer | `specs/widget/widget-chat.spec.ts` | P1 | ✅ |
| Widget chat | History survives a reload | `specs/widget/widget-chat.spec.ts` | P1 | ✅ |
| Widget chat | Agent wraps up → customer rates the chat | `specs/widget/rating.spec.ts` | P1 | ✅ |
| Human handover | AI hands over → contact form → agent takes over → two-way messages | `specs/handover/handover.spec.ts` | P1 | ✅ |
| Agents | Create in the dashboard → edit instructions → they reach the model | `specs/agents/agent-editor.spec.ts` | P1 | ✅ |
| Agents | Toggles (handover, rating, reply buttons); customization | — | P1 | ⬜ |
| Knowledge | Add text → answer is grounded in it (real search) | `specs/knowledge/knowledge-answer.spec.ts` | P1 | ✅ |
| AI config | Rejected key is reported and agents keep working; working key saves | `specs/settings/ai-config.org.spec.ts` | P1 | ✅ |
| Tickets | AI opens a ticket → listed → agent changes status | `specs/tickets/ai-ticket.spec.ts` | P1 | ✅ |
| Tickets | Resolve/notify; CSAT | — | P1 | ⬜ |
| Lead capture | Visitor shares details → appears as a Lead in People | `specs/leads/lead-capture.spec.ts` | P1 | ✅ |
| Team | Admin adds an agent who signs in to the inbox; Agent role sees only Inbox/People/Settings | `specs/team/team.spec.ts` | P1 | ✅ |
| Team | Groups management; group-scoped inbox | — | P1 | ⬜ |
| Widget JS API | open/close/isOpen; hidden launcher + page's own trigger button | `specs/widget/js-api.spec.ts` | P1 | ✅ |
| Widget placement | displayMode, position, `open({message})`, events | — | P1 | ⬜ |
| Token-auth widget | Server-issued token → chat works; no token → "Chat Unavailable" | `specs/widget/token-auth.spec.ts` | P1 | ✅ |
| Reply buttons | Telegram: AI offers buttons, a tap gets the next answer | `specs/channels/telegram.spec.ts` | P2 | ✅ |
| Reply buttons | Widget quick replies; typed-number matching; other channels | — | P2 | ⬜ |
| Help center | Publish an article → public page; search | — | P2 | ⬜ |
| Workflows | Simple flow runs in the widget | — | P2 | ⬜ |
| MCP connectors | Add/edit/delete; agent calls a tool | — | P2 | ⬜ |
| Channels | Telegram: inbound update → AI reply sent back through the Bot API | `specs/channels/telegram.spec.ts` | P2 | ✅ |
| Channels | WhatsApp, Messenger, Instagram, Slack, LINE, SMS, email (fake-externals already answers for each) | — | P2 | ⬜ |
| Analytics, People | Pages render; counters move | — | P2 | ⬜ |
| CRM push, URL/PDF knowledge | Worker-backed | — | N | ⬜ |
| Visual and cross-browser widget | Light/dark; placements; Firefox/WebKit | — | P2 | ⬜ |

Enterprise journeys are tracked privately in `enterprise_frontend/e2e/FEATURES.md`.
