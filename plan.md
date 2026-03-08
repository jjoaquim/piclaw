# piclaw code quality improvement plan

Date: 2026-03-08
Scope reviewed: `piclaw/piclaw/src`, `piclaw/piclaw/extensions`, `piclaw/piclaw/web/src`, packaging/build config.

## Review snapshot

- Backend size: **125 TS files / 20,738 LOC** (`src/`)
- Frontend size: **6,838 LOC** (`web/src/`)
- Tests: **480 passing**
- Lint: passing
- Coverage (line): **57.97%** (`coverage/lcov.info`)
- Pack dry-run: **420 files / 8.34 MB**, including `src/`, `dist/`, `test/`, `coverage/` temp files

---

## 1) Overview table (maintainability, reusability, security, architecture, dead code)

| Area | Current state | Risk | Priority | Main improvements |
|---|---|---:|---:|---|
| Architecture boundaries | Core orchestration is concentrated in large modules (`src/runtime.ts`, `src/channels/web.ts`, `src/channels/web/request-router-service.ts`) with dynamic imports and cross-layer knowledge | High | P0 | Split into domain services + explicit ports/adapters; reduce god modules; remove internal field peeking (`runtime.ts` casts into `agentPool` internals) |
| Maintainability | Very large files (e.g. `web.ts` 1524 LOC, `web/src/app.ts` 1533 LOC), duplicated helper logic, mixed sync I/O in runtime paths | High | P1 | File/module decomposition, shared utility extraction, async I/O in request-heavy paths |
| Reusability | Optional extensions import internal `src/*` and deep `node_modules/*/dist/*` paths; runtime has provider registration logic partly duplicated with extension behavior | High | P1 | Define stable internal extension API, remove fragile deep imports, consolidate provider registration responsibilities |
| Type safety / best practices | `any` usage is still broad (**89 hits** in `src`) and weakly-typed inter-module contracts | Medium | P1 | Add typed DTOs/schemas for IPC, events, and external payloads; tighten lint rules in stages |
| Security (local execution) | `validateShellCwd()` uses `startsWith()` path check (`src/utils/task-validation.ts`) | High | **P0** | Replace with `path.relative()` boundary check (same approach used in workspace path logic) |
| Security (web + remote) | Rate-limit keys trust `x-forwarded-for`; CSRF check compares hostname only; SSRF callback validation does not perform DNS/IP resolution | High | P0 | Trusted-proxy mode, strict Origin check (scheme+host+port), DNS/IP resolution + deny private ranges for callback hosts |
| Dead code / stale artifacts | `src/db/auto-compaction.ts` appears unused; `src/channels/web/ui-context.ts` appears prod-unused; `dist/` contains stale extra JS artifacts; package ships coverage/test artifacts | Medium | P0 | Remove or wire dead modules, clean dist before build, add packaging allowlist (`files`) |
| Quality gates | Good test breadth but moderate coverage and no architecture/static dead-code gate | Medium | P1 | Add CI bars: coverage floor, dead-export scan, import-boundary checks, tarball content check |

---

## 2) Detailed checklist of fixes

## P0 (do first)

- [ ] **Fix path traversal boundary check for scheduled shell cwd**
  - File: `src/utils/task-validation.ts`
  - Replace `resolved.startsWith(workspaceDir)` with robust relative-path check.
  - Add regression tests for `/workspace2`, `/workspace-malicious`, symlink cases.

- [ ] **Harden client identity for rate limiting/auth logs**
  - Files: `src/channels/web/request-router-service.ts`, `src/channels/web.ts`, `src/remote/service.ts`
  - Add trusted-proxy config; only honor `x-forwarded-*` when enabled.
  - Default to socket address / Bun request metadata when not proxied.

- [ ] **Strengthen CSRF origin validation**
  - File: `src/channels/web/request-router-service.ts`
  - Validate full origin tuple (scheme + host + port), not hostname-only.
  - Add tests for same-host-different-port and mixed http/https behavior.

- [ ] **Harden remote callback SSRF defenses**
  - File: `src/remote/ssrf.ts`
  - Add DNS resolution and reject callbacks resolving to loopback/private/link-local ranges (IPv4 + IPv6).
  - Re-check resolved IPs on connect if possible.

- [ ] **Packaging cleanup / release safety**
  - Files: `piclaw/piclaw/package.json`, `piclaw/piclaw/.gitignore`, build scripts
  - Add `files` allowlist so tarball excludes `test/`, `coverage/`, temp lcov files, and non-runtime artifacts.
  - Ensure `dist/` is either the runtime artifact or not shipped at all (single strategy).

- [ ] **Dead/stale artifact cleanup**
  - Remove stale extra `dist` outputs (examples from pack: `dist/chat-context.js`, `dist/config.js`, `dist/channels/web/request-router.js`, etc.).
  - Clean build output before compile.

## P1 (next wave)

- [ ] **Refactor god modules into smaller services**
  - `src/channels/web.ts` → auth/session service, status service, passkey service, transport wrapper.
  - `src/channels/web/request-router-service.ts` → middleware pipeline + route map.
  - `src/runtime.ts` → composition root + startup tasks + shutdown manager.

- [ ] **Architectural dependency boundaries**
  - Introduce domain interfaces for messaging, auth, scheduler, and remote interop.
  - Prevent runtime/adapters from reaching into internals via casts (e.g. `runtime.ts` model registry access).

- [ ] **Extension contract hardening**
  - Files: `extensions/azure-openai.ts`, `extensions/context-mode.ts`, `src/agent-pool/session.ts`
  - Remove deep imports into `../node_modules/.../dist/...`.
  - Replace direct `../src/...` imports with a stable exported internal API package/module.

- [ ] **Type quality pass**
  - Prioritize files with highest `any` usage (`src/ipc.ts`, `src/runtime.ts`, `src/channels/web.ts`, `src/agent-pool.ts`).
  - Add typed schemas for IPC command payloads, remote requests, and agent event payloads.

- [ ] **Dead code review and removal**
  - Confirm whether `src/db/auto-compaction.ts` should be deleted or integrated.
  - Confirm if `src/channels/web/ui-context.ts` is public API or test-only shim; remove/relocate if shim.

- [ ] **I/O and concurrency hygiene**
  - Move synchronous disk operations out of hot request paths where possible.
  - Add stop/dispose handles for long-running polling loops (`ipc`, scheduler) for cleaner lifecycle/testability.

## P2 (stabilization and polish)

- [ ] **Frontend modularization**
  - Split `web/src/app.ts` and large component files into feature modules/hooks.
  - Introduce view-model/state boundaries to reduce cross-component coupling.

- [ ] **Security-in-depth extras**
  - Consider hashing session tokens at rest in DB.
  - Consider encrypted-at-rest remote private identity key (or key-provider abstraction).

- [ ] **Operational observability**
  - Add structured logging with request IDs for web/remote endpoints.
  - Add metrics around queue depth, retry counts, scheduler task failure rate.

---

## 3) Dead code / stale code inventory (initial)

- `src/db/auto-compaction.ts` appears unreferenced in production code.
- `src/channels/web/ui-context.ts` appears only used by tests/shim layer, not runtime path.
- `dist/` contains stale extra JS files not mapped from current `src` layout (likely old build leftovers).
- Tarball currently includes non-runtime artifacts:
  - `coverage/*.tmp`, `coverage/lcov.info`
  - full `test/` tree
  - both `src/` and `dist/` (duplication)

Action: validate each item, then remove or rewire intentionally.

---

## 4) Quality bars (acceptance criteria)

## Security bars
- [ ] No path-boundary checks using raw `startsWith` for workspace containment.
- [ ] Forwarded headers only trusted when proxy mode is explicitly enabled.
- [ ] CSRF origin validation matches scheme+host+port.
- [ ] SSRF callback validation includes DNS/IP private-range protections.

## Architecture bars
- [ ] No backend module > 600 LOC in `src/` (except explicitly justified generated/vendor code).
- [ ] `runtime.ts` reduced to composition/bootstrap responsibility only.
- [ ] No cross-layer internal field peeking via `as any` or private property casts.

## Maintainability/reusability bars
- [ ] `any` references in `src/` reduced from 89 to < 25.
- [ ] Common helpers (client key extraction, JSON parse guards, response wrappers) centralized.
- [ ] Optional extensions depend only on stable exported APIs (no deep `node_modules/dist` imports).

## Testing/quality bars
- [ ] Line coverage >= 75% overall and >= 85% for security-critical modules.
- [ ] Add CI check for dead exports/modules and stale build artifacts.
- [ ] Add packaging CI check: tarball includes runtime-only allowlisted files.

## Release/package bars
- [ ] Tarball excludes coverage, test files, and stale artifacts.
- [ ] Single runtime strategy: either `src`-runtime or `dist`-runtime (not both).

---

## 5) Suggested execution order

1. Security-critical fixes (path validation, CSRF, forwarded headers, SSRF) + tests.
2. Packaging/dead artifact cleanup to prevent shipping risk.
3. Architecture split of web/runtime and typed boundary contracts.
4. Type-safety reduction (`any`) and frontend modularization.
5. Add/enforce quality bars in CI.
