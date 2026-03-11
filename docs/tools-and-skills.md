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
- `get_message` — retrieve full message content by row_id (with optional context)
- `search_workspace` — full‑text search across notes + skills (FTS, with aggressive cleanup and size limits)
- `get_model_state` — show current model, thinking level, and context usage
- `list_models` — list available models/providers
- `switch_model` — switch to a different model
- `switch_thinking` — change thinking level (off → xhigh)
- `keychain` — list, get, set, and delete encrypted keychain entries
- `schedule_task` — schedule agent prompts or shell commands (cron, interval, or one-shot)
- `sql_introspect` — run read-only SQL queries against the messages database
- `list_internal_tools` — list available tools with descriptions

`search_messages` accepts `limit`, `offset`, and `details_max_chars` for controlling detail payloads.

`search_workspace` accepts:
- `query` — FTS query text
- `scope` — `notes`, `skills`, or `all` (default)
- `limit`, `offset`
- `refresh` — re-index notes/skills before searching (default `true`)
- `max_kb` — max file size to index (default 512KB, clamped 16–2048KB)

The workspace index is **aggressively cleaned** on each refresh:
- deleted files are removed from the index
- oversized files are dropped immediately

## Skills

Skills live under:

- Project scope: `/workspace/.pi/skills`
- Global scope: `/home/agent/.pi/agent/skills`

Each skill keeps its script alongside its `SKILL.md` for portability. Current set:

| Skill | Purpose |
|------|---------|
| `debug` | Diagnose container issues and environment setup |
| `setup` | Scaffold a new project with Bun + Makefile |
| `reload` | Force-restart `piclaw` after code changes (tarball install, not symlinks) |
| `playwright` | Local Playwright browser automation |
| `schedule` | Create/modify scheduled tasks via IPC |
| `send-message` | Send chat messages immediately via IPC (supports optional `media` attachments via `media` array) |
| `token-chart` | Generate token usage charts (from `token_usage`) |
| `graphite-power-chart` | Generate Zigbee/Graphite charts for the web timeline |
| `web-search` | Search the web via SearXNG and convert pages to Markdown |
| `web-search-summary` | Search via SearXNG with auto-summarised results |
| `twitter-summary` | Fetch a user's recent tweets via Playwright + Nitter |
| `feed-digest` | Build a deduped Markdown digest from an RSS/Atom feed index |
| `bootstrap-container` | Validate required tools and install missing dependencies |
| `extension-design` | Design and audit Pi extensions safely |
| `extension-troubleshoot` | Diagnose and fix extension issues (imports, DB init, watcher perms) |
| `kanban-management` | Manage kanban board: ideation, triage, quality scoring, definition-of-done tracking |

## Slash commands

Direct commands (no LLM round-trip):

| Command | Purpose |
|---------|---------|
| `/model [provider/model]` (alias `/models`) | Select model or list available models |
| `/cycle-model [back]` | Cycle to the next available model |
| `/thinking [level]` | Show or set thinking level |
| `/cycle-thinking` | Cycle thinking level |
| `/theme [name]` | Set UI theme (use `/theme list` to see options) |
| `/tint [#hex|name|off]` | Tint the default light/dark UI (e.g. `/tint #3b82f6`, `/tint orange`) |
| `/state` | Show current session state |
| `/stats` | Show session token and cost stats |
| `/context` (alias `/ctx`) | Show context window usage |
| `/last` | Show last assistant response |
| `/compact [instructions]` | Manually compact the session |
| `/auto-compact on\|off` | Toggle auto-compaction |
| `/auto-retry on\|off` | Toggle auto-retry |
| `/abort` | Abort the current response |
| `/abort-retry` | Abort retry backoff |
| `/abort-bash` | Abort running bash command |
| `/shell <cmd>` | Run a shell command and return output |
| `/bash <cmd>` | Run a shell command and add output to context |
| `/queue <msg>` | Queue a follow-up message (one at a time) |
| `/queue-all <msg>` | Queue a follow-up message (batch all) |
| `/steering-mode all\|one` | Set steering mode |
| `/followup-mode all\|one` | Set follow-up mode |
| `/session-name [name]` | Set or show the session name |
| `/new-session` | Start a new session |
| `/switch-session <file>` | Switch to a session file |
| `/fork` | Fork from a previous message |
| `/forks` | List forkable messages |
| `/tree` | List the session tree and navigate branches |
| `/label` | Set or clear a label on a tree entry |
| `/labels` | List labelled entries |
| `/agent-name [name]` | Set or show the agent display name |
| `/agent-avatar [url]` | Set or show the agent avatar URL |
| `/user-name [name]` | Set or show your display name |
| `/user-avatar [url]` | Set or show your avatar URL |
| `/user-github <url>` | Set your name/avatar from a GitHub profile |
| `/export-html` | Export session to HTML |
| `/passkey [enrol|list|delete]` | Manage passkeys (enrolment link, list, delete) |
| `/totp enrol` | Show a TOTP enrolment QR code |
| `/qr <text>` | Generate a QR code for text or a URL |
| `/search <query>` | Search notes and skills in the workspace |
| `/restart` | Restart the agent and stop subprocesses |
| `/commands` | List available commands |
| `/tasks [filter]` | List scheduled tasks (via extension) |
| `/scheduled [filter]` | Alias for `/tasks` |

`/search` performs a workspace full‑text search (notes + skills) without calling the LLM:

```
/search "graphite power"
/search --scope notes restic
/search --scope skills --no-refresh "search_workspace"
/search --scope notes --limit 20 --offset 20 "token pricing"
```

Supported flags: `--scope notes|skills|all`, `--limit`, `--offset`, `--refresh`, `--no-refresh`, `--max-kb`.

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
