---
name: reload
description: Reinstall piclaw from workspace source and force-restart the running process. Use after making code changes to piclaw.
---

# Reload Piclaw (force)

Reinstall the piclaw package from workspace source and restart the running process
immediately. The new process takes over on the same port.

## Steps

Run the following as a **single bash invocation**:

```bash
set -e

# 1. Build
cd /workspace/piclaw && make build-piclaw

# 2. Pack and install globally (real files, not symlinks)
cd /workspace/piclaw/piclaw
bun pm pack --destination /tmp
TARBALL=$(ls -t /tmp/piclaw-*.tgz | head -1)
DEST=/home/agent/.bun/install/global/node_modules/piclaw
rm -rf "$DEST"
mkdir -p "$DEST"
tar -xzf "$TARBALL" -C "$DEST" --strip-components=1
rm -f "$TARBALL"
cd "$DEST" && bun install --production

# 3. Launch restart (self-detaches + waits for current turn to finish)
#    Logs stream to /tmp/restart-piclaw-force.log by default.
PICLAW_RELOAD_LOG=/tmp/restart-piclaw-force.log \
  /workspace/.pi/skills/reload/restart-piclaw.sh

echo "Reload scheduled. Check /tmp/restart-piclaw-force.log for status."
```

## How It Works

The restart script (`restart-piclaw.sh`):
1. Waits for the current agent turn to finish by polling `/agent/status`
2. Queues a `resume_pending` IPC task so interrupted turns can resume after restart (best-effort)
3. Attempts to restart the Supervisor-managed service (`supervisorctl restart ${PICLAW_SUPERVISOR_SERVICE:-piclaw}`). The binary, path, and config can be overridden via `PICLAW_SUPERVISORCTL_BIN`/`PICLAW_SUPERVISORCTL_CONFIG`.
4. If `supervisorctl` is **not found**, the script falls back to the legacy flow: kill the process (using `/tmp/piclaw.pid`), ensure the port is free, and launch the configured command under the script's tiny supervisor.
5. If `supervisorctl` **is found** but the restart command fails, the script **aborts** (exit 1) to avoid conflicting with Supervisor's own restart logic.

When Supervisor is available the script no longer writes `/tmp/piclaw-supervisor.pid` or runs its own long-lived supervisor loop-those steps still happen in the fallback path for environments without Supervisor.

## Important Notes

- The script waits (up to 120s) for the active agent turn to finish before initiating a restart. When Supervisor is available it delegates to `supervisorctl`; otherwise it kills/launches the process under the tiny supervisor.
- To debug synchronously, run `restart-piclaw.sh --sync ...` or set `PICLAW_RELOAD_ASYNC=0`.
- The restart script queues a `resume_pending` IPC task. If the IPC tasks directory cannot be created or a resume task already exists, it logs and continues.
- If `supervisorctl` is available but the restart fails (socket/config/service issues), the script aborts rather than falling back, to avoid fighting Supervisor.
- The fallback path starts with `piclaw --port 3000` by default. Pass a custom command after `--` (fallback only):
  `restart-piclaw.sh -- piclaw --port 8080`
- For Supervisor restarts, configure the service itself and optionally set `PICLAW_SUPERVISOR_SERVICE` (service name).
- WhatsApp session state persists across restarts (stored in SQLite + auth dir).
- Check `/tmp/restart-piclaw-force.log` if something goes wrong.
- `bun add -g file:` creates symlinks; the pack+extract approach ensures real file copies.
