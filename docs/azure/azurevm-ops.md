# Azure VM Piclaw ops notes (sanitized)

## Access
- Host: `your-vm.example.com`
- Alternate IP: `203.0.113.10`
- SSH user: `agent`
- Key: `~/.ssh/azurevm_ed25519`

Example:
```
ssh -i ~/.ssh/azurevm_ed25519 agent@your-vm.example.com
```

### If SSH refuses connections
Common cause: ssh.socket only listening on IPv6 (`[::]:22`) while the host has no AAAA record.

Check:
```
dig +short AAAA your-vm.example.com
```

Fix listening on IPv4 + IPv6:
```
sudo tee /etc/systemd/system/ssh.socket.d/override.conf >/dev/null <<'EOF'
[Socket]
ListenStream=
ListenStream=0.0.0.0:22
ListenStream=[::]:22
BindIPv6Only=both
EOF
sudo systemctl daemon-reload
sudo systemctl restart ssh.socket ssh.service
sudo ss -lntp | grep 22
```

## Piclaw service
Systemd user unit:
- `~/.config/systemd/user/piclaw.service`

Expected ExecStart (adjust to your install path):
```
ExecStart=/home/agent/.bun/bin/piclaw --port 3000
```

Restart:
```
systemctl --user restart piclaw.service
systemctl --user status piclaw.service --no-pager -l | head -n 15
```

## Bun + global installs
- Bun should live at `/home/agent/.bun/bin/bun`
- PATH should include `~/.bun/bin` in `~/.bashrc`

Reinstall bun (if missing):
```
curl -fsSL https://bun.sh/install | bash
```

Global installs:
```
# pi CLI
/home/agent/.bun/bin/bun add -g @mariozechner/pi-coding-agent

# piclaw from workspace
/home/agent/.bun/bin/bun add -g --no-save file:/workspace/piclaw/piclaw
```

## Remote changes audit + import
Check commit history on VM:
```
git -C /workspace/piclaw log --oneline -n 10
```

If a new commit exists, pull a patch from the VM and apply locally:
```
# On local machine
ssh -i ~/.ssh/azurevm_ed25519 agent@your-vm.example.com \
  "git -C /workspace/piclaw format-patch -1 <commit> --stdout" \
  > /workspace/tmp/azurevm.patch

# Apply locally
cd /workspace/piclaw

git am /workspace/tmp/azurevm.patch
```

Only import code/UI changes.

Do not import:
- `piclaw/dist/`
- `piclaw/skills/`
- `skel/.pi/skills/`
- `docs/`
