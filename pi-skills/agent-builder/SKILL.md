---
name: agent-builder
description: Create custom pi agents, define team structures, and configure pi-agent-teams workflows. Use when building custom agent roles, setting up multi-agent teams with pi-agent-teams or pi-parallel-agents, defining specialized agent knowledge, or structuring team coordination.
---

# Pi Agent Builder

## Purpose

Create custom agent definitions and team configurations for pi-agent-teams and pi-parallel-agents.

## When to Use

- Need specialized agent with domain-specific knowledge
- Setting up a multi-agent team with `/swarm` or `/team spawn`
- Defining agent roles for pi-parallel-agents team mode
- User asks to "create agent", "define agent role", or "set up team"

## Pi Agent Ecosystem

### Available Extensions

- **pi-agent-teams**: Dynamic team spawning with `/swarm` and `/team spawn <name>`
- **pi-parallel-agents**: Structured parallel/sequential execution with role assignments
- **Agent definitions**: `~/.pi/agent/agents/` — referenced by pi-parallel-agents

### Pre-built Agents Available (in `~/.pi/agent/agents/`)

- **architecture-lead**: Cross-platform architecture decisions, team coordination
- **backend-specialist**: Node.js/TypeScript backend, APIs, databases
- **ios-specialist**: Swift, SwiftUI, iOS platform features
- **android-specialist**: Kotlin, Jetpack Compose, Android platform
- **performance-specialist**: Performance optimization, profiling
- **security-specialist**: Security reviews, authentication, compliance
- **python-specialist**: Django, FastAPI, data science, ML
- **api-developer**: REST and GraphQL endpoint implementation
- **database-architect**: Schema design, migrations, query optimization
- **auth-specialist**: JWT, OAuth 2.0, authentication flows
- **swiftui-architect**: Complex SwiftUI views and state management
- **compose-architect**: Jetpack Compose UI architecture
- Plus many more (see `~/.pi/agent/agents/`)

## Custom Agent Creation

### Step 1: Agent Definition File

Create `~/.pi/agent/agents/<agent-name>.md`:

```markdown
---
name: agent-name
description: What this agent does and when to use it.
---

You are a [role] specialist.

## Your Expertise
- [Domain knowledge]

## Best Practices
- [Key practices]

## When to Escalate
- [What to delegate to other agents]
```

### Step 2: Use with pi-parallel-agents Team Mode

```
Run a team with architect, implementer, and reviewer roles:
- architect uses architecture-lead agent to design the solution
- implementer uses backend-specialist to write the code
- reviewer uses security-specialist to review for vulnerabilities
```

### Step 3: Use with pi-agent-teams

```bash
# Spawn a team for a feature
/swarm implement the authentication module

# Or manually spawn specific agents
/team spawn architect
/team spawn backend
/team dm architect design the auth flow first
```

## Team Patterns

### Research → Implement → Review

```
Team members:
1. Researcher (read-only): Explore codebase, gather requirements
2. Implementer: Write code based on research
3. Reviewer: Check quality, security, and correctness
```

### Parallel Specialists

```
Parallel execution with pi-parallel-agents:
- iOS specialist implements mobile UI
- Backend specialist implements API endpoints
- Both work concurrently, then integrate
```

### Sequential Chain

```
Chain with pi-parallel-agents:
1. Database architect designs schema
2. Backend specialist implements API (uses schema output)
3. API developer adds documentation
```

## Quality Checklist

Before deploying a custom agent:
- [ ] Clear purpose and domain defined
- [ ] Escalation paths identified
- [ ] Tested with a simple task first
- [ ] Description is specific enough to trigger correctly

## Remember

- **Skills for reusable knowledge**: Use skills for documentation and patterns
- **Agents for coordination**: Use agent definitions for role-based team work
- **pi-agent-teams for dynamic teams**: `/swarm` is the fastest entry point
- **pi-parallel-agents for structured workflows**: Better for explicit DAG dependencies
