#!/usr/bin/env bash
set -euo pipefail

export BUN_INSTALL="${BUN_INSTALL:-$HOME/.bun}"
export PATH="$BUN_INSTALL/bin:$PATH"

rm -f /tmp/piclaw-*.tgz
cd /home/agent/piclaw

bun update
bun install
bun run build
bun run build:web

rm -f piclaw-*.tgz
PACK_DIR="$(mktemp -d)"
bun pm pack --outdir "$PACK_DIR"

TARBALL="$(find "$PACK_DIR" -maxdepth 1 -name 'piclaw-*.tgz' | head -n1)"
if [ -z "$TARBALL" ] || [ ! -f "$TARBALL" ]; then
  TARBALL="$(find . -maxdepth 1 -name 'piclaw-*.tgz' | head -n1)"
fi
if [ -z "$TARBALL" ] || [ ! -f "$TARBALL" ]; then
  echo "piclaw tarball not found" >&2
  exit 1
fi

DEST="$BUN_INSTALL/install/global/node_modules/piclaw"
rm -rf "$DEST"
mkdir -p "$DEST"
tar -xzf "$TARBALL" -C "$DEST" --strip-components=1
if [ "${TARBALL#${PACK_DIR}/}" = "$TARBALL" ]; then
  rm -f "$TARBALL"
fi
rm -rf "$PACK_DIR"

cd "$DEST"
bun install --production

mkdir -p "$BUN_INSTALL/bin"
LAUNCHER="$BUN_INSTALL/bin/piclaw"
printf '%s\n' \
  '#!/usr/bin/env bash' \
  'set -euo pipefail' \
  "exec \"$BUN_INSTALL/bin/bun\" \"$DEST/src/index.ts\" \"\$@\"" > "$LAUNCHER"
chmod +x "$LAUNCHER"
