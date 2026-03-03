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

# 3. Launch restart (detached — survives pi exit)
#    Reads /tmp/piclaw.pid to find the old process automatically.
nohup setsid /workspace/.pi/skills/reload/restart-piclaw.sh \
  </dev/null >>/tmp/restart-piclaw-force.log 2>&1 &
disown

echo "Reload started. Check /tmp/restart-piclaw-force.log for status."
```

## How It Works

The restart script (`restart-piclaw.sh`):
1. Reads `/tmp/piclaw.pid` to find the currently running piclaw
2. Sends SIGTERM and waits up to 5s, then SIGKILL if needed
3. Writes the child piclaw PID to `/tmp/piclaw.pid`
4. Queues a `resume_pending` IPC task so interrupted turns can resume after restart (best-effort)
5. Runs as a lightweight supervisor so it can reap child exits and restart if needed

The supervisor PID is stored in `/tmp/piclaw-supervisor.pid` so the next reload can terminate it cleanly.

## Important Notes

- This kills the running piclaw immediately — the current response may be cut off.
- The restart script queues a `resume_pending` IPC task. If the IPC tasks directory cannot be created or a resume task already exists, it logs and continues.
- The new piclaw starts with `piclaw --port 3000` by default. Pass a custom command after `--`:
  `restart-piclaw.sh -- piclaw --port 8080`
- WhatsApp session state persists across restarts (stored in SQLite + auth dir).
- Check `/tmp/restart-piclaw-force.log` if something goes wrong.
- `bun add -g file:` creates symlinks; the pack+extract approach ensures real file copies.
