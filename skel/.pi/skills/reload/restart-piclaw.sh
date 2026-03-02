#!/bin/bash
# Restart piclaw: kill old process, exec into new one.
#
# Usage: restart-piclaw.sh [OLD_PID] [-- CMD...]
#   OLD_PID  PID to kill first (default: read from /tmp/piclaw.pid)
#   CMD      command to run (default: piclaw --port 3000)
#
# Launch detached:
#   nohup setsid /path/to/restart-piclaw.sh </dev/null >>/tmp/restart-piclaw-force.log 2>&1 &
#
# Uses exec to replace itself with piclaw, so this script's PID
# becomes piclaw's PID. Only one process, no wrapper zombies.

export PATH="/home/agent/.bun/bin:/home/linuxbrew/.linuxbrew/bin:$PATH"
export BUN_INSTALL="/home/agent/.bun"

PIDFILE=/tmp/piclaw.pid
LOCKFILE=/tmp/piclaw-restart.lock

exec 9>"$LOCKFILE"
if ! flock -n 9; then
  echo "[reload] Another restart is in progress. Exiting."
  exit 1
fi

# Parse args
OLD_PID=""
if [ $# -ge 1 ] && [ "$1" != "--" ]; then
  OLD_PID="$1"
  shift
fi
[ "${1:-}" = "--" ] && shift

if [ $# -eq 0 ]; then
  set -- piclaw --port 3000
fi

# Fall back to pidfile
if [ -z "$OLD_PID" ] && [ -f "$PIDFILE" ]; then
  OLD_PID=$(cat "$PIDFILE" 2>/dev/null || true)
fi

PORT=3000
for ((i=1;i<=$#;i++)); do
  arg="${!i}"
  if [ "$arg" = "--port" ]; then
    next_index=$((i+1))
    PORT="${!next_index:-3000}"
  elif [[ "$arg" == --port=* ]]; then
    PORT="${arg#--port=}"
  fi
done

COMMAND="$1"
if ! command -v "$COMMAND" >/dev/null 2>&1; then
  echo "[reload] Command not found: $COMMAND"
  exit 1
fi

echo ""
echo "[reload] === $(date -Iseconds) ==="

wait_for_exit() {
  local pid="$1"
  local label="$2"
  for _ in $(seq 1 20); do
    if ! kill -0 "$pid" 2>/dev/null; then
      return 0
    fi
    sleep 0.5
  done
  echo "[reload] ${label} still running after timeout"
  return 1
}

find_port_pid() {
  ss -ltnp "sport = :$PORT" 2>/dev/null | awk -F 'pid=' 'NR>1 {split($2,a,","); print a[1]}' | head -1
}

kill_pid() {
  local pid="$1"
  local label="$2"
  if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
    echo "[reload] Stopping ${label} ($pid)..."
    kill "$pid" 2>/dev/null || true
    wait_for_exit "$pid" "$label" || true
    if kill -0 "$pid" 2>/dev/null; then
      echo "[reload] Force-killing ${label} ($pid)"
      kill -9 "$pid" 2>/dev/null || true
      sleep 1
    fi
  fi
}

# Kill old piclaw
kill_pid "$OLD_PID" "old piclaw"

# Ensure port is free (kill stray piclaw if needed)
PORT_PID=$(find_port_pid)
if [ -n "$PORT_PID" ]; then
  CMDLINE=$(ps -p "$PORT_PID" -o cmd= 2>/dev/null || true)
  if echo "$CMDLINE" | grep -qi "piclaw"; then
    kill_pid "$PORT_PID" "piclaw on port $PORT"
  else
    echo "[reload] Port $PORT is in use by PID $PORT_PID ($CMDLINE). Aborting."
    exit 1
  fi
fi

# Write PID and exec
echo $$ > "$PIDFILE"
echo "[reload] Starting: $* (PID $$)"
exec "$@"
