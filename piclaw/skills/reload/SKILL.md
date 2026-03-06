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
export BUN_INSTALL="/usr/local/lib/bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# 1. Build
cd /workspace/piclaw && make build-piclaw

# 2. Pack and install globally via bun (sudo for system-wide prefix)
cd /workspace/piclaw/piclaw
bun pm pack --destination /tmp
TARBALL=$(ls -t /tmp/piclaw-*.tgz | head -1)
sudo BUN_INSTALL="$BUN_INSTALL" bun add -g "$TARBALL"
sudo chmod -R a+rX "$BUN_INSTALL"
rm -f "$TARBALL"

# 3. Launch restart (self-detaches + waits for current turn to finish)
#    Logs stream to /tmp/restart-piclaw-force.log by default.
PICLAW_RELOAD_LOG=/tmp/restart-piclaw-force.log \
  /workspace/.pi/skills/reload/restart-piclaw.sh

echo "Reload scheduled. Check /tmp/restart-piclaw-force.log for status."
```

## How It Works

The restart script (`restart-piclaw.sh`) auto-detects the service manager and restarts
piclaw through it. Detection order (first match wins):

| Priority | Check | Method |
|----------|-------|--------|
| 0 | `PICLAW_SERVICE_MANAGER` env var set | Use its value directly (`supervisor`, `systemd`, `manual`) |
| 1 | `supervisorctl` binary exists AND a `piclaw` program is registered | `supervisorctl restart piclaw` |
| 2 | `systemctl` binary exists AND a `piclaw.service` user unit exists | `systemctl --user restart piclaw.service` |
| 3 | Neither found | Manual kill + start fallback |

Before restarting, the script:
1. Waits (up to 120s) for the active agent turn to finish by polling `/agent/status`
2. Queues a `resume_pending` IPC task so interrupted turns can resume after restart

### Supervisor path (default in Docker containers)

Uses `supervisorctl -c <config> restart piclaw`. The config path is auto-detected:
- `/workspace/.piclaw/supervisor/supervisord.conf` (preferred)
- `/etc/supervisor/supervisord.conf` (fallback)
- Override with `PICLAW_SUPERVISORCTL_CONFIG`

If `supervisorctl` is found but the restart fails, the script **aborts** (exit 1) to avoid
conflicting with Supervisor's own restart logic.

### Systemd --user path (for non-Docker hosts)

Uses `systemctl --user restart piclaw.service`. Override the unit name with
`PICLAW_SYSTEMD_UNIT`.

If the restart fails, the script aborts.

### Manual fallback

Kills the old process (via PID file or `OLD_PID` arg), waits for the port to free up,
and starts `piclaw --port 3000` in a tiny supervisor loop (5 retries). Override the
command with `-- piclaw --port 8080`.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PICLAW_SERVICE_MANAGER` | (auto) | Force `supervisor`, `systemd`, or `manual` |
| `PICLAW_SUPERVISOR_SERVICE` | `piclaw` | Supervisor program name |
| `PICLAW_SUPERVISORCTL_BIN` | `supervisorctl` | supervisorctl binary |
| `PICLAW_SUPERVISORCTL_CONFIG` | (auto) | Supervisor config path |
| `PICLAW_SYSTEMD_UNIT` | `piclaw.service` | systemd --user unit name |
| `PICLAW_WEB_PORT` | `3000` | Port to wait for / pass to piclaw |
| `PICLAW_RELOAD_LOG` | `/tmp/restart-piclaw-force.log` | Async log file |
| `PICLAW_RELOAD_ASYNC` | `1` | Set `0` for sync (foreground) mode |

## Important Notes

- Bun and piclaw are installed globally under `/usr/local/lib/bun` (root-owned). Use `sudo bun add -g` to install.
- The script logs the detected service manager at startup for easy debugging.
- WhatsApp session state persists across restarts (stored in SQLite + auth dir).
- Check `/tmp/restart-piclaw-force.log` if something goes wrong.
