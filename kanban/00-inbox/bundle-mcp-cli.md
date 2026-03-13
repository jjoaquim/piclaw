---
id: bundle-mcp-cli
title: Bundle mcp-cli for local MCP server management
status: inbox
priority: medium
created: 2026-03-11
updated: 2026-03-12
estimate: M
risk: low
tags:
  - work-item
  - kanban
  - tooling
  - mcp
owner: pi
---

# Bundle mcp-cli for local MCP server management

## Summary

Bundle [philschmid/mcp-cli](https://github.com/philschmid/mcp-cli) into the
piclaw container so MCP (Model Context Protocol) servers can be managed
locally. Include host-native installation instructions, but keep the first-pass
implementation target focused on the container.

This enables connecting to external tool servers, running local MCP servers for
development, and bridging MCP tools into the agent runtime. The first pass
should include both installation and initial wiring such as config location and
helper-skill guidance.

## Desired Behavior

- `mcp-cli` is available in the container PATH.
- Host-native installation is documented, but not required as part of the first implementation pass.
- Default MCP server config location is `.piclaw/mcp/`.
- A helper skill exists to document or streamline common `mcp-cli` workflows.
- Scope stays focused on consuming/managing external or local MCP servers, not exposing piclaw itself as an MCP server.
- Installation research explicitly checks whether `mcp-cli` can be installed and run cleanly in the Bun-oriented container environment.

## Acceptance Criteria

- [ ] `mcp-cli` binary available in container PATH.
- [ ] Host-native install instructions documented separately.
- [ ] Verify basic commands work in the container: `mcp-cli list`, `mcp-cli run`, `mcp-cli inspect`.
- [ ] Add install step to Dockerfile and/or bootstrap-container flow as appropriate.
- [ ] Default config location is defined as `.piclaw/mcp/`.
- [ ] Add a helper skill or equivalent guidance for common local MCP server management workflows.
- [ ] Bun/container compatibility is explicitly verified or limitations are documented.

## Investigation

- Review the repo for install method (Go binary? npm? pip?).
- Determine if it can be installed via `bun add -g`, `brew install`, or needs a binary release.
- Check compatibility with Bun runtime vs Node expectations.
- Verify whether `mcp-cli` can be installed and run cleanly in this container environment.
- Validate `.piclaw/mcp/` as the default config location.

## Relevant files

- `piclaw/Dockerfile` — container build
- `.pi/skills/bootstrap-container/SKILL.md` — container tool bootstrapping
- `notes/preferences/agent.md` — tooling preferences

## Updates

### 2026-03-12
- Board quality review: ticket already had a clear summary and rough acceptance criteria; kept in inbox pending install-method research.
- Refined from 5-question pass:
  - target container install for v1, with host instructions only
  - include both install and initial wiring
  - use `.piclaw/mcp/` as the default config location
  - add a helper skill for common workflows
  - scope stays on consuming MCP servers rather than exposing piclaw as one
  - explicitly verify whether install/runtime works cleanly in the Bun-oriented environment

## Notes

- MCP is the emerging standard for tool/resource servers alongside LLM agents.
- Could complement or replace some custom tool implementations long-term.
- This ticket is scoped to consuming/managing MCP servers, not exposing piclaw itself as an MCP server.
- Container install is the implementation target for v1; host-native support is documentation-only for now.
- Because this environment is Bun-oriented, install/runtime compatibility with Bun needs to be checked explicitly rather than assumed.
