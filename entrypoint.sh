#!/usr/bin/env bash
set -euo pipefail

MARKER_FILE="/home/agent/.container_initialized"
HOME_DIR="/home/agent"
SKEL_DIR="/etc/skel.agent"
DEFAULT_SUPERVISOR_CONF="/etc/supervisor/supervisord.conf"
SUPERVISOR_CONF="${SUPERVISOR_CONF:-$DEFAULT_SUPERVISOR_CONF}"
WORKSPACE_SUPERVISOR_DIR="/workspace/.piclaw/supervisor"
SUPERVISOR_DEFAULTS_DIR="/usr/local/share/piclaw/supervisor"

if [ ! -f "$MARKER_FILE" ] || [ ! -f "$HOME_DIR/.bashrc" ]; then
    echo "Initializing home directory..."
    if [ -d "$SKEL_DIR" ] && [ "$(ls -A "$SKEL_DIR" 2>/dev/null)" ]; then
        cp -a "$SKEL_DIR/." "$HOME_DIR/"
    fi

    if [ ! -f "$HOME_DIR/.bashrc" ]; then
        cat > "$HOME_DIR/.bashrc" <<'BASHRC'
case $- in *i*) ;; *) return;; esac
HISTCONTROL=ignoreboth
shopt -s histappend
HISTSIZE=1000
HISTFILESIZE=2000
shopt -s checkwinsize
PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias grep='grep --color=auto'
fi
alias ll='ls -alF'
alias la='ls -A'
[ -d /home/linuxbrew/.linuxbrew ] && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
[ -d "$HOME/.bun" ] && export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH"
BASHRC
    fi

    if [ ! -f "$HOME_DIR/.profile" ]; then
        cat > "$HOME_DIR/.profile" <<'PROFILE'
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
[ -d "$HOME/bin" ] && PATH="$HOME/bin:$PATH"
PROFILE
    fi

    mkdir -p "$HOME_DIR/.pi/agent/skills" \
             "$HOME_DIR/.pi/agent/sessions" \
             "$HOME_DIR/.pi/agent/extensions" \
             "$HOME_DIR/.pi/agent/prompts" \
             "$HOME_DIR/.pi/agent/themes"

    for item in .gitconfig .pi; do
        target="/config/$item"
        link="$HOME_DIR/$item"
        if [ -e "$target" ] || [ -d "$target" ]; then
            rm -rf "$link" 2>/dev/null || true
            ln -sf "$target" "$link"
        fi
    done

    chown -R agent:agent "$HOME_DIR"
    echo "$(id -u agent):$(id -g agent)" > "$MARKER_FILE"
fi

if [ -d "/workspace" ] && [ ! -f "/workspace/AGENTS.md" ]; then
    if [ -f "$HOME_DIR/workspace-skel/AGENTS.md" ]; then
        cp "$HOME_DIR/workspace-skel/AGENTS.md" /workspace/AGENTS.md
        chown agent:agent /workspace/AGENTS.md
    fi
fi

if [ -d "/workspace" ] && [ ! -d "/workspace/.pi/skills" ]; then
    if [ -d "$HOME_DIR/workspace-skel/.pi/skills" ]; then
        mkdir -p /workspace/.pi
        cp -a "$HOME_DIR/workspace-skel/.pi/skills" /workspace/.pi/skills
        chown -R agent:agent /workspace/.pi
    fi
fi

if [ -d "/workspace" ]; then
    mkdir -p "$WORKSPACE_SUPERVISOR_DIR/conf.d"
    chown agent:agent "$WORKSPACE_SUPERVISOR_DIR" "$WORKSPACE_SUPERVISOR_DIR/conf.d" 2>/dev/null || true

    if [ -f "$SUPERVISOR_DEFAULTS_DIR/supervisord.conf" ] && [ ! -f "$WORKSPACE_SUPERVISOR_DIR/supervisord.conf" ]; then
        cp "$SUPERVISOR_DEFAULTS_DIR/supervisord.conf" "$WORKSPACE_SUPERVISOR_DIR/supervisord.conf"
        chown agent:agent "$WORKSPACE_SUPERVISOR_DIR/supervisord.conf"
    fi

    if [ -d "$SUPERVISOR_DEFAULTS_DIR/conf.d" ]; then
        while IFS= read -r -d '' conf; do
            conf_name="$(basename "$conf")"
            conf_target="$WORKSPACE_SUPERVISOR_DIR/conf.d/$conf_name"
            if [ ! -f "$conf_target" ]; then
                cp "$conf" "$conf_target"
                chown agent:agent "$conf_target"
            fi
        done < <(find "$SUPERVISOR_DEFAULTS_DIR/conf.d" -maxdepth 1 -type f -name '*.conf' -print0)
    fi

    if [ "$SUPERVISOR_CONF" = "$DEFAULT_SUPERVISOR_CONF" ] && [ -f "$WORKSPACE_SUPERVISOR_DIR/supervisord.conf" ]; then
        SUPERVISOR_CONF="$WORKSPACE_SUPERVISOR_DIR/supervisord.conf"
    fi
fi

mkdir -p /var/log/piclaw /var/run/supervisor
chown -R agent:agent /var/log/piclaw
chmod 755 /usr/local/bin/run-piclaw.sh 2>/dev/null || true

echo "=== PiClaw - Pi Coding Agent Sandbox ==="

if [ ! -f "$SUPERVISOR_CONF" ]; then
    echo "Missing supervisor config at $SUPERVISOR_CONF" >&2
    exit 1
fi

exec /usr/bin/supervisord -n -c "$SUPERVISOR_CONF"
