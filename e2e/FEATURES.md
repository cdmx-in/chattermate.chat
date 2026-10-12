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
| Widget chat | End chat and rating | — | P1 | ⬜ |
| Human handover | AI hands over → contact form → agent takes over → two-way messages | `specs/handover/handover.spec.ts` | P1 | ✅ |
| Agents | Create, edit, delete; instructions; toggles; customization | — | P1 | ⬜ |
| Knowledge | Add text → answer is grounded in it (real search) | `specs/knowledge/knowledge-answer.spec.ts` | P1 | ✅ |
| AI config | Rejected key is reported and agents keep working; working key saves | `specs/settings/ai-config.org.spec.ts` | P1 | ✅ |
| Tickets | AI creates a ticket; list/detail; status; CSAT | — | P1 | ⬜ |
| Lead capture | Widget form → People | — | P1 | ⬜ |
| Team | Human agents, groups, role permissions, group-scoped inbox | — | P1 | ⬜ |
| Widget placement and JS API | Placements, open/close/toggle, `open({message})`, launcher, trigger | — | P1 | ⬜ |
| Token-auth widget | Widget-apps key → token → widget loads; none → 401 | — | P1 | ⬜ |
| Reply buttons | Quick replies; typed-number matching | — | P2 | ⬜ |
| Help center | Publish an article → public page; search | — | P2 | ⬜ |
| Workflows | Simple flow runs in the widget | — | P2 | ⬜ |
| MCP connectors | Add/edit/delete; agent calls a tool | — | P2 | ⬜ |
| Channels | Inbound webhook → AI reply (Telegram, WhatsApp, Messenger, Instagram, Slack, LINE, SMS, email) | — | P2 | ⬜ |
| Analytics, People | Pages render; counters move | — | P2 | ⬜ |
| CRM push, URL/PDF knowledge | Worker-backed | — | N | ⬜ |
| Visual and cross-browser widget | Light/dark; placements; Firefox/WebKit | — | P2 | ⬜ |

Enterprise journeys are tracked privately in `enterprise_frontend/e2e/FEATURES.md`.
