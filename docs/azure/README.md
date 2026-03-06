# Piclaw on Azure VM (setup guide)

This is a concise checklist for deploying Piclaw on an Azure VM.

## 1) Provision the VM

- Create a Linux VM (Debian/Ubuntu recommended).
- Open inbound ports for:
  - **SSH** (consider a non‑standard port)
  - **HTTP/HTTPS** (80/443) for the web UI
- Create a non‑root user (e.g. `agent`) and enable passwordless sudo.

## 2) Install prerequisites

```bash
sudo apt update
sudo apt install -y git curl build-essential ca-certificates

# Install bun system-wide
export BUN_INSTALL="/usr/local/lib/bun"
sudo mkdir -p "$BUN_INSTALL"
curl -fsSL https://bun.sh/install | sudo BUN_INSTALL="$BUN_INSTALL" bash
sudo chmod -R a+rX "$BUN_INSTALL"
sudo ln -sf "$BUN_INSTALL/bin/bun"  /usr/local/bin/bun
sudo ln -sf "$BUN_INSTALL/bin/bunx" /usr/local/bin/bunx
```

## 3) Prepare workspace

```bash
sudo mkdir -p /workspace
sudo chown -R $USER:$USER /workspace
```

Clone your Piclaw repo into `/workspace/piclaw`.

## 4) Build + install Piclaw globally

```bash
cd /workspace/piclaw && make build-piclaw
cd /workspace/piclaw/piclaw
bun pm pack --destination /tmp
TARBALL=$(ls -t /tmp/piclaw-*.tgz | head -1)
sudo BUN_INSTALL=/usr/local/lib/bun bun add -g "$TARBALL"
sudo chmod -R a+rX /usr/local/lib/bun
rm -f "$TARBALL"

# Symlink piclaw into PATH
sudo ln -sf /usr/local/lib/bun/bin/piclaw /usr/local/bin/piclaw
```

## 5) Systemd user service

Create `~/.config/systemd/user/piclaw.service`:

```
[Unit]
Description=Piclaw agent
After=network.target

[Service]
Type=simple
WorkingDirectory=/workspace
Environment=HOME=/home/agent
Environment=BUN_INSTALL=/usr/local/lib/bun
Environment=PATH=/usr/local/lib/bun/bin:/home/linuxbrew/.linuxbrew/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
Environment=PICLAW_WORKSPACE=/workspace
Environment=PICLAW_STORE=/workspace/.piclaw/store
Environment=PICLAW_DATA=/workspace/.piclaw/data
Environment=PICLAW_AGENT_TIMEOUT=1800000
ExecStart=/usr/local/bin/piclaw --port 3000
Restart=always
RestartSec=2

[Install]
WantedBy=default.target
```

Enable linger and start the service:

```bash
loginctl enable-linger $USER
systemctl --user daemon-reload
systemctl --user enable --now piclaw.service
```

## 6) Reverse proxy (Caddy example)

Use a basic reverse proxy with TLS and basic auth. Example snippet:

```
example.yourdomain.tld {
  basicauth {
    username <hashed-password>
  }
  reverse_proxy 127.0.0.1:3000
}
```

Ensure ports 80/443 are open and DNS points to the VM.

## 7) Optional: SSH hardening

- Move SSH to a custom port.
- Disable password login after key auth is working.

## 8) Optional: Azure OpenAI + Foundry managed-identity extension

If you want managed‑identity Azure OpenAI + Foundry providers:

- The extension is bundled at `piclaw/extensions/azure-openai.ts` inside the package — no manual copy needed.
- Configure:
  - `AOAI_BASE_URL` (Responses API base URL)
  - `AOAI_MODEL_ID` / `AOAI_MODEL_NAME` / `AOAI_MODEL_IDS`
  - `AOAI_RESOURCE` (defaults to `https://cognitiveservices.azure.com/`)
  - `FOUNDRY_BASE_URL` / `FOUNDRY_MODEL_IDS` / `FOUNDRY_MODEL_NAMES` (optional)
  - `FOUNDRY_RESOURCE` (defaults to `https://cognitiveservices.azure.com/`)
- Restart Piclaw after installing.

The extension uses **custom API names** (`azure-openai-responses-mi`, `azure-foundry-openai-completions-mi`) so it does **not** override global OpenAI handlers. See `docs/azure/azure-openai-extension.md` for design notes and pitfalls.

## Operational notes

- The restart script (`restart-piclaw.sh`) auto-detects the service manager:
  - Supervisord → `supervisorctl restart piclaw`
  - systemd --user → `systemctl --user restart piclaw.service`
  - Neither → manual kill/start fallback
- Override with `PICLAW_SERVICE_MANAGER=supervisor|systemd|manual`.
- Keep `/workspace/.piclaw` on persistent storage if possible.
- See `docs/azure/azurevm-ops.md` for ops notes.

## Known issues

- `gpt-5-3-codex` can still emit `response.failed` / "Unknown error" after model switching. Phase replay and tool/ reasoning toggles reduce some errors but do not fully eliminate failures yet. See `docs/azure/azure-openai-extension.md`.
