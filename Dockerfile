# PiClaw - Minimal Pi Coding Agent Sandbox
FROM debian:bookworm-slim

ARG HOMEBREW_BREW_GIT_REMOTES=""
ARG HOMEBREW_CORE_GIT_REMOTES=""

# Environment variables
ENV DEBIAN_FRONTEND=noninteractive \
    TERM=xterm-256color \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    HOME=/home/agent \
    HOMEBREW_NO_AUTO_UPDATE=1 \
    HOMEBREW_NO_INSTALL_CLEANUP=1 \
    HOMEBREW_BREW_GIT_REMOTES=${HOMEBREW_BREW_GIT_REMOTES} \
    HOMEBREW_CORE_GIT_REMOTES=${HOMEBREW_CORE_GIT_REMOTES} \
    BUN_INSTALL=/home/agent/.bun \
    PATH=/home/agent/.bun/bin:/home/linuxbrew/.linuxbrew/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

WORKDIR /tmp

# Layer 1: System packages (minimal set for bun/brew/pi)
RUN apt-get update && \
    apt-get install -y --no-install-recommends locales tzdata && \
    sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen en_US.UTF-8 && \
    update-locale LANG=en_US.UTF-8 && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    ca-certificates curl wget unzip \
    bash-completion sudo less man \
    git vim tmux htop tree ripgrep jq \
    net-tools iproute2 dnsutils \
    rsync file strace \
    build-essential cmake make pkg-config \
    procps psmisc supervisor && \
    mkdir -p /etc/supervisor/conf.d /var/log/supervisor /var/log/piclaw /var/run/supervisor && \
    apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Layer 2: Create user
RUN useradd -m -s /bin/bash -G sudo agent && \
    echo 'agent:agent' | chpasswd && \
    echo 'agent ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
    mkdir -p /etc/skel.agent && \
    chown -R agent:agent /var/log/piclaw

# Layer 3: Entrypoint + Supervisor
COPY entrypoint.sh /entrypoint.sh
COPY supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY supervisor/conf.d/ /etc/supervisor/conf.d/
COPY supervisor/run-piclaw.sh /usr/local/bin/run-piclaw.sh
RUN chmod +x /entrypoint.sh /usr/local/bin/run-piclaw.sh

# Layer 4: Install Homebrew, Bun, and Pi Coding Agent as agent
USER agent
WORKDIR /home/agent
RUN bash <<'EOF'
set -euo pipefail

DEFAULT_BREW_REMOTE="https://github.com/Homebrew/brew.git"
DEFAULT_CORE_REMOTE="https://github.com/Homebrew/homebrew-core.git"

choose_remote() {
  local fallback="$1"
  local raw="$2"
  local normalized remote
  if [ -n "$raw" ]; then
    normalized=$(printf '%s\n' "$raw" | tr ',;' '\n')
    while IFS= read -r remote; do
      remote=$(printf '%s' "$remote" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
      if [ -z "$remote" ]; then
        continue
      fi
      if git ls-remote "$remote" HEAD >/dev/null 2>&1; then
        printf '%s\n' "$remote"
        return 0
      else
        echo "Skipping unreachable Homebrew remote: $remote" >&2
      fi
    done <<<"$normalized"
  fi
  if git ls-remote "$fallback" HEAD >/dev/null 2>&1; then
    printf '%s\n' "$fallback"
    return 0
  fi
  echo "Fallback Homebrew remote $fallback is unreachable." >&2
  return 1
}

BREW_REMOTE=$(choose_remote "$DEFAULT_BREW_REMOTE" "${HOMEBREW_BREW_GIT_REMOTES:-}")
CORE_REMOTE=$(choose_remote "$DEFAULT_CORE_REMOTE" "${HOMEBREW_CORE_GIT_REMOTES:-}")
export HOMEBREW_BREW_GIT_REMOTE="$BREW_REMOTE"
export HOMEBREW_CORE_GIT_REMOTE="$CORE_REMOTE"

curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh -o /tmp/install-brew.sh
/bin/bash /tmp/install-brew.sh
rm /tmp/install-brew.sh
echo "eval \"$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)\"" >> ~/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
for attempt in {1..5}; do
  if brew update; then
    break
  fi
  if [ "$attempt" -eq 5 ]; then
    exit 1
  fi
  sleep $((attempt * 5))
done
brew install lazygit
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
bun add -g @mariozechner/pi-coding-agent
PI_CLI="$(readlink -f "$BUN_INSTALL/bin/pi")"
if [ -n "$PI_CLI" ] && [ -f "$PI_CLI" ]; then
  if head -n1 "$PI_CLI" | grep -q 'env node'; then
    sed -i '1s/env node/env bun/' "$PI_CLI"
  fi
  chmod +x "$PI_CLI"
fi
EOF

# Set up pi config directories and global AGENTS.md
RUN mkdir -p ~/.pi/agent/skills ~/.pi/agent/sessions \
             ~/.pi/agent/extensions ~/.pi/agent/prompts ~/.pi/agent/themes

# Ship workspace skeleton (includes .pi/skills/ and AGENTS.md)
COPY --chown=agent:agent skel/ /home/agent/workspace-skel/

# Ship piclaw global skills (IPC: schedule, send-message)
COPY --chown=agent:agent piclaw/skills/ /home/agent/.pi/agent/skills/

# Ship piclaw orchestrator and install as global binary
COPY --chown=agent:agent piclaw/piclaw/ /home/agent/piclaw/
RUN set -euo pipefail && \
    export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && \
    rm -f /tmp/piclaw-*.tgz && \
    cd /home/agent/piclaw && bun update && bun install && bun run build && bun run build:web && \
    bun pm pack --outdir /tmp && \
    TARBALL=$(ls -t /tmp/piclaw-*.tgz | head -1) && \
    DEST="$BUN_INSTALL/install/global/node_modules/piclaw" && \
    rm -rf "$DEST" && mkdir -p "$DEST" && \
    tar -xzf "$TARBALL" -C "$DEST" --strip-components=1 && \
    rm -f "$TARBALL" && \
    cd "$DEST" && bun install --production && \
    BUN_BIN="$BUN_INSTALL/bin/bun" && \
    mkdir -p "$BUN_INSTALL/bin" && \
    cat <<PICLAW_BIN > "$BUN_INSTALL/bin/piclaw" && \
    chmod +x "$BUN_INSTALL/bin/piclaw"
#!/usr/bin/env bash
set -euo pipefail
exec "$BUN_BIN" "$DEST/src/index.ts" "\$@"
PICLAW_BIN

# Layer 5: Save skeleton + global shims
USER root
RUN set -eux; \
    for bin in bun bunx pi piclaw; do \
        target="/home/agent/.bun/bin/${bin}"; \
        if [ -f "${target}" ]; then \
            ln -sf "${target}" "/usr/local/bin/${bin}"; \
        fi; \
    done; \
    cp -a /home/agent/. /etc/skel.agent/; \
    echo "Skeleton: $(find /etc/skel.agent -type f | wc -l) files"

ENTRYPOINT ["/entrypoint.sh"]
