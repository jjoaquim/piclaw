# Tools and skills

This document lists the tools and skills exposed to the agent, plus common slash commands.

## Agent tools

Core tools (from `pi`):

- `read` — read files
- `bash` — run shell commands
- `edit` — replace exact text
- `write` — write files

`piclaw` extensions:

- `attach_file` — attach a workspace file for download in the web UI (cards appear automatically; use `attachment:<filename>` only for inline embeds)
- `search_messages` — full‑text search across stored messages (FTS + hashtags + row lookup)
- `get_model_state` — show current model, thinking level, and context usage
- `list_models` — list available models/providers
- `switch_model` — switch to a different model
- `switch_thinking` — change thinking level (off → xhigh)

`search_messages` accepts `limit`, `offset`, and `details_max_chars` for controlling detail payloads.

## Skills

Skills live under:

- Project scope: `/workspace/.pi/skills`
- Global scope: `/home/agent/.pi/agent/skills`

Each skill keeps its script alongside its `SKILL.md` for portability. Current set:

| Skill | Purpose |
|------|---------|
| `debug` | Diagnose container issues and environment setup |
| `setup` | Scaffold a new project with bun + Makefile |
| `reload` | Force‑restart `piclaw` after code changes (tarball install, not symlinks) |
| `playwright` | Local Playwright browser automation |
| `schedule` | Create/modify scheduled tasks via IPC |
| `send-message` | Send chat messages immediately via IPC |
| `token-chart` | Generate token usage charts (from `token_usage`) |
| `graphite-power-chart` | Generate Zigbee/Graphite charts for the web timeline |
| `web-search` | Search the web via SearXNG and optionally convert pages to Markdown |
| `web-search-summary` | Search via SearXNG, fetch top results, return summaries + Markdown |
| `twitter-summary` | Fetch a user's recent tweets via Playwright + Nitter fallbacks |
| `glovo-lunch` | Find lunch dishes on Glovo using Playwright |
| `feed-digest` | Fetch and summarize RSS/Atom feeds |

## Slash commands

Common direct commands (no LLM round‑trip):

- `/model [provider/model]`
- `/cycle-model [back]`
- `/thinking [level]`
- `/cycle-thinking`
- `/tasks [active|paused|completed|all]`
- `/scheduled [filter]`
- `/stats`, `/context`, `/state`
- `/compact [instructions]`, `/auto-compact on|off`
- `/abort`, `/abort-retry`, `/abort-bash`
- `/queue <msg>`, `/queue-all <msg>`
- `/session-name`, `/new-session`, `/switch-session`
- `/fork`, `/forks`, `/tree`, `/labels`
- `/agent-name`, `/agent-avatar`
- `/export-html`, `/restart`, `/commands`

## Skill pipeline

Skills create tasks via IPC JSON files. Each task can optionally specify a `model` field (e.g. `anthropic/claude-sonnet-4-20250514`) to run on a cheaper or different model than the user's current one. The scheduler handles model switching and restoration automatically.

Tasks are isolated from the user's conversation using the **session tree** — the scheduler saves the tree position before execution and navigates back afterwards. This prevents the task's prompt/response from appearing in the user's conversation context while still preserving it in a side branch for inspection via `/tree`. See [runtime-flows.md](runtime-flows.md) for the full flow.

Model names are validated at task creation time — invalid or ambiguous model identifiers are rejected before the task is persisted.

```mermaid
flowchart LR
  Skill[Skill script] --> IPC[IPC file]
  IPC --> Scheduler[Task scheduler]
  Scheduler --> Tree[Save/restore tree position]
  Tree --> Pool[AgentPool]
  Pool --> Channel[Web UI / WhatsApp]
```
