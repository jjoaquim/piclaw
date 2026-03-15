#!/usr/bin/env bash
# scripts/docker/install-agent-runtime.sh – Install Homebrew, Bun, and pi globally.
#
# Installs bun under /usr/local/lib/bun (via BUN_INSTALL). The directory is
# root-owned and world-readable so all users can run bun/pi/piclaw.
# All `bun add -g` calls use sudo to write into the system prefix.
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
      fi
      echo "Skipping unreachable Homebrew remote: $remote" >&2
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

BREW_INSTALL_SCRIPT="$(mktemp)"
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh -o "$BREW_INSTALL_SCRIPT"
/bin/bash "$BREW_INSTALL_SCRIPT"
rm -f "$BREW_INSTALL_SCRIPT"

if ! grep -Fq '/home/linuxbrew/.linuxbrew/bin/brew shellenv' "$HOME/.bashrc"; then
  echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> "$HOME/.bashrc"
fi
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

for attempt in 1 2 3 4 5; do
  if brew update; then
    break
  fi
  if [ "$attempt" -eq 5 ]; then
    echo "Homebrew update failed after retries." >&2
    exit 1
  fi
  sleep $((attempt * 5))
done

brew install lazygit

# Install Bun globally under /usr/local/lib/bun (root-owned, world-readable)
export BUN_INSTALL="/usr/local/lib/bun"
sudo mkdir -p "$BUN_INSTALL"
curl -fsSL https://bun.sh/install | sudo BUN_INSTALL="$BUN_INSTALL" bash

# Ensure world-readable so all users can run bun
sudo chmod -R a+rX "$BUN_INSTALL"

# Symlink bun/bunx into /usr/local/bin
sudo ln -sf "$BUN_INSTALL/bin/bun"  /usr/local/bin/bun
sudo ln -sf "$BUN_INSTALL/bin/bunx" /usr/local/bin/bunx

# Install pi-coding-agent globally (sudo so it writes to root-owned prefix)
PI_CODING_AGENT_VERSION="${PI_CODING_AGENT_VERSION:-0.57.1}"
sudo BUN_INSTALL="$BUN_INSTALL" "$BUN_INSTALL/bin/bun" add -g "@mariozechner/pi-coding-agent@${PI_CODING_AGENT_VERSION}"

# Ensure world-readable after install
sudo chmod -R a+rX "$BUN_INSTALL"

# Symlink pi into /usr/local/bin
sudo ln -sf "$BUN_INSTALL/bin/pi" /usr/local/bin/pi

PI_CLI="$(readlink -f "$BUN_INSTALL/bin/pi")"
if [ -f "$PI_CLI" ] && head -n1 "$PI_CLI" | grep -q 'env node'; then
  sudo sed -i '1s/env node/env bun/' "$PI_CLI"
fi
sudo chmod +x "$PI_CLI"

# --- Node.js via nvm (required by some pi extensions) ---
export NVM_DIR="$HOME/.nvm"
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
# shellcheck source=/dev/null
\. "$NVM_DIR/nvm.sh"
nvm install 24
nvm use 24

# Symlink node/npm into /usr/local/bin so they are available in non-interactive shells
# (supervisor runs piclaw non-interactively, skipping .bashrc's nvm init)
NVM_NODE_DIR="$HOME/.nvm/versions/node/$(node -v)"
sudo ln -sf "$NVM_NODE_DIR/bin/node" /usr/local/bin/node
sudo ln -sf "$NVM_NODE_DIR/bin/npm"  /usr/local/bin/npm
sudo ln -sf "$NVM_NODE_DIR/bin/npx"  /usr/local/bin/npx

# --- Pi extensions (multi-agent, web access, compaction, MCP) ---
HOME=/home/agent pi install npm:@tmustier/pi-agent-teams && \
    HOME=/home/agent pi install npm:pi-parallel-agents && \
    HOME=/home/agent pi install npm:pi-subagents && \
    HOME=/home/agent pi install npm:pi-web-access && \
    HOME=/home/agent pi install npm:pi-agentic-compaction && \
    HOME=/home/agent pi install git:github.com/tickernelz/pi-mcp-tools && \
    HOME=/home/agent pi install npm:@tmustier/pi-skill-creator && \
    HOME=/home/agent pi install npm:pi-mcp-adapter

# --- DuckDB CLI ---
curl https://install.duckdb.org | sh
