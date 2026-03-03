#!/usr/bin/env bash
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
curl -fsSL https://bun.sh/install | bash

export BUN_INSTALL="${BUN_INSTALL:-$HOME/.bun}"
export PATH="$BUN_INSTALL/bin:$PATH"
bun add -g @mariozechner/pi-coding-agent

PI_LINK="$BUN_INSTALL/bin/pi"
if [ ! -e "$PI_LINK" ]; then
  echo "pi CLI was not installed at $PI_LINK" >&2
  exit 1
fi

PI_CLI="$(readlink -f "$PI_LINK")"
if [ -f "$PI_CLI" ] && head -n1 "$PI_CLI" | grep -q 'env node'; then
  sed -i '1s/env node/env bun/' "$PI_CLI"
fi
chmod +x "$PI_CLI"
