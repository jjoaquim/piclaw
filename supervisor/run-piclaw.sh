#!/usr/bin/env bash
set -euo pipefail

export HOME="/home/agent"
export BUN_INSTALL="/home/agent/.bun"
export PATH="$BUN_INSTALL/bin:/home/linuxbrew/.linuxbrew/bin:$PATH"

# Ensure login environment matches interactive shell
if [ -f "$HOME/.bashrc" ]; then
  # shellcheck source=/dev/null
  source "$HOME/.bashrc" >/dev/null 2>&1 || true
fi

if [ "${PICLAW_AUTOSTART:-1}" != "1" ]; then
  echo "[run-piclaw] PICLAW_AUTOSTART=0; supervisor service is idle."
  tail -f /dev/null & wait $!
fi

PORT="${PICLAW_WEB_PORT:-8080}"
WORKDIR="${PICLAW_WORKSPACE:-/workspace}"
PICLAW_BIN="${PICLAW_BIN:-$BUN_INSTALL/bin/piclaw}"

if [ ! -x "$PICLAW_BIN" ]; then
  echo "[run-piclaw] Unable to find piclaw binary at $PICLAW_BIN" >&2
  exit 1
fi

cd "$WORKDIR" 2>/dev/null || cd "$HOME"
echo "[run-piclaw] Starting piclaw from ${PICLAW_BIN} (port ${PORT}) in $(pwd)"
exec "$PICLAW_BIN" --port "$PORT"
