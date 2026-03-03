# PiClaw - Minimal Pi Coding Agent Sandbox
FROM debian:bookworm-slim

# Environment variables
ENV DEBIAN_FRONTEND=noninteractive \
    TERM=xterm-256color \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    HOME=/home/agent \
    HOMEBREW_NO_AUTO_UPDATE=1 \
    HOMEBREW_NO_INSTALL_CLEANUP=1 \
    HOMEBREW_BREW_GIT_REMOTE=https://mirrors.edge.kernel.org/homebrew/brew.git \
    HOMEBREW_CORE_GIT_REMOTE=https://mirrors.edge.kernel.org/homebrew/homebrew-core.git \
    BREW_GIT_REMOTE=https://mirrors.edge.kernel.org/homebrew/brew.git

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
RUN /bin/bash -lc 'set -euo pipefail
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
rm "$BUN_INSTALL/bin/pi"
cat <<EOF > "$BUN_INSTALL/bin/pi"
#!/usr/bin/env bash
exec bun "$PI_CLI" "\$@"
EOF
chmod +x "$BUN_INSTALL/bin/pi"
'

# Set up pi config directories and global AGENTS.md
RUN mkdir -p ~/.pi/agent/skills ~/.pi/agent/sessions \
             ~/.pi/agent/extensions ~/.pi/agent/prompts ~/.pi/agent/themes

# Ship workspace skeleton (includes .pi/skills/ and AGENTS.md)
COPY --chown=agent:agent skel/ /home/agent/workspace-skel/

# Ship piclaw global skills (IPC: schedule, send-message)
COPY --chown=agent:agent piclaw/skills/ /home/agent/.pi/agent/skills/

# Ship piclaw orchestrator and install as global binary
COPY --chown=agent:agent piclaw/ /home/agent/piclaw/
RUN export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && \
    cd /home/agent/piclaw && bun update && bun install && \
    cd /tmp && bun add -g --no-save file:/home/agent/piclaw

# Layer 5: Save skeleton
USER root
RUN cp -a /home/agent/. /etc/skel.agent/ && \
    echo "Skeleton: $(find /etc/skel.agent -type f | wc -l) files"

ENTRYPOINT ["/entrypoint.sh"]
