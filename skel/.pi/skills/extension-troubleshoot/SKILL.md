---
name: extension-troubleshoot
description: Diagnose and fix piclaw extension issues (imports, DB init errors, watcher perms), update skel, and restart safely.
distribution: public
---

# Extension Troubleshoot (piclaw)

Use this when piclaw web chats only show thinking or extensions throw errors.

## Steps

1) Check extension errors
```bash
tail -n 80 /var/log/piclaw/piclaw.stderr.log
```

2) Inspect current extension file(s)
```bash
readlink -f /workspace/.pi/extensions/context-mode.ts
sed -n '1,120p' /workspace/.pi/extensions/context-mode.ts
```

3) Ensure imports reference installed piclaw (not workspace src)
- Use installed path:
  /home/agent/.bun/install/global/node_modules/piclaw/dist/...
- Avoid /workspace/piclaw or node_modules symlinked to workspace.

4) Harden extension
- Remove/avoid startup cleanup that touches DB before init.
- Wrap tool executes with try/catch to prevent crashes.
- Guard saveToolOutput with try/catch.

5) Update skel extension too
```bash
cp /workspace/.pi/extensions/context-mode.ts /workspace/piclaw/skel/.pi/extensions/context-mode.ts
```

6) Fix workspace watcher permissions (if fs.watch warns on tailscale)
```bash
sudo chown -R agent:agent /workspace/.piclaw/tailscale
```

7) Restart piclaw
```bash
supervisorctl restart piclaw
```

8) Verify
```bash
tail -n 40 /var/log/piclaw/piclaw.stderr.log
```