---
name: project-spec
description: Project specification and requirements documentation. Use when creating project specs, documenting requirements, defining scope, or structuring technical specifications.
---

# Project Specification Builder

## Usage

Invoke this skill with:

/skill:project-spec


## Purpose
Guide users through defining a complete project specification that can be used by a team of agents to implement a project autonomously. Produces SPEC.md and identifies required skills, agents, and subagents.

## When to Use
- User wants to start a new project with agent-based implementation
- User says "spec out", "plan project", "define project", or similar
- User wants to create SPEC.md for agent teams
- Beginning of a new project that will use multiple agents

## Process

### Phase 1: Project Definition

Ask the user (using AskUserQuestion when multiple choice, or direct questions for open-ended):

1. **Project Goal**
   - What problem does this solve?
   - Who are the end users?
   - What's the primary value proposition?
   - Success criteria (how do we know it's done?)

2. **Tech Stack**
   - Language/Framework (e.g., Python/FastAPI, TypeScript/React, Go, Rust)
   - Database (PostgreSQL, MongoDB, SQLite, etc.)
   - Infrastructure (Docker, Kubernetes, Serverless, VPS)
   - Key libraries/frameworks
   - Any constraints (existing systems, team expertise, etc.)

3. **Deployment Strategy**
   - Environment (AWS, GCP, Azure, DigitalOcean, local, etc.)
   - CI/CD approach (GitHub Actions, GitLab CI, Jenkins, etc.)
   - Deployment model (containers, serverless, VPS, static)
   - Monitoring and logging strategy
   - Scaling requirements

4. **Architecture Approach**
   - Monolith vs microservices
   - API design (REST, GraphQL, gRPC)
   - Authentication/authorization approach
   - Data flow and state management
   - External integrations needed

### Phase 2: SPEC.md Generation

Create a comprehensive SPEC.md with these sections:

```markdown
# [Project Name]

## Project Overview
[Clear description of what we're building and why]

## Success Criteria
- [ ] [Specific, measurable outcomes]
- [ ] [User-facing features that must work]
- [ ] [Performance/quality metrics]

## Tech Stack

### Core Technologies
- **Language**: [Language + version]
- **Framework**: [Framework + version]
- **Database**: [Database + version]
- **Infrastructure**: [Container/hosting solution]

### Key Libraries
- [Library]: [Purpose]
- [Library]: [Purpose]

### Development Tools
- **Testing**: [Framework]
- **Linting**: [Tool]
- **Formatting**: [Tool]
- **CI/CD**: [Platform]

## Architecture

### System Design
[High-level architecture description]
[Component diagram or description of major pieces]

### Data Model
[Key entities and relationships]
[Database schema approach]

### API Design
[API patterns being used]
[Key endpoints/operations]

### Authentication & Authorization
[Auth approach]
[User roles/permissions if applicable]

### External Dependencies
[Third-party services]
[APIs to integrate]

## Deployment

### Environment
- **Hosting**: [Provider]
- **Deployment Model**: [How code gets deployed]
- **Environments**: [dev/staging/prod setup]

### CI/CD Pipeline
[Build process]
[Test strategy]
[Deployment process]

### Monitoring
[Logging approach]
[Metrics collection]
[Alerting strategy]

## Development Plan

### Phase 1: Foundation
[Initial setup, core infrastructure]

### Phase 2: Core Features
[Main functionality]

### Phase 3: Polish
[Testing, documentation, refinement]

### Phase 4: Deployment
[Production readiness]

## Implementation Stages

### Stage 1: [Name]
**Goal**: [Specific deliverable]
**Success Criteria**:
- [ ] [Testable outcome]
- [ ] [Testable outcome]
**Tests**: [Specific test cases needed]
**Assigned To**: [Agent role or TBD]

[Repeat for each stage]

## Required Capabilities

### Skills Needed
- [Skill name]: [Why needed]

### Agent Types Needed
- [Agent type]: [Responsibilities]

### Custom Components
- [Custom skill/agent]: [Purpose and scope]

## Constraints & Considerations

### Technical Constraints
[Any limitations or requirements]

### Timeline Considerations
[If applicable]

### Risk Factors
[Known challenges or unknowns]

## Open Questions
[Things that need clarification before starting]
```

### Phase 3: Capability Assessment

Analyze the spec and identify:

1. **Existing Skills to Use**
   - Check available skills from document-skills and others
   - Match capabilities to requirements
   - List which skills will be needed

2. **Standard Agents Needed**
   - general-purpose: Coordinate and implement
   - Explore: Research codebase patterns
   - Plan: Design implementation approaches
   - test-runner: Execute test suites
   - backend-specialist: API and server work
   - frontend-specialist: UI implementation
   - etc.

3. **Custom Skills to Create**
   - Identify reusable workflows not covered by existing skills
   - Spec out custom skill requirements
   - Note if skill-creator skill should be used

4. **Custom Agents/Subagents Needed**
   - Specialized agents for unique project needs
   - Configuration for custom agent types
   - Note if new agent definitions needed

Present this analysis to the user:

```markdown
## Capability Assessment

### Existing Skills
- **document-skills:pdf**: [How it will be used]
- **document-skills:xlsx**: [How it will be used]

### Standard Agents
- **Team Lead (general-purpose)**: Coordinate implementation, manage task list
- **Backend Specialist**: Implement API endpoints and database layer
- **Frontend Specialist**: Build UI components
- **Test Engineer**: Write and maintain test suite

### Recommended Custom Skills
1. **[skill-name]**: [Purpose, when to create]
2. **[skill-name]**: [Purpose, when to create]

### Custom Agents (if needed)
- **[agent-name]**: [Specialized role and configuration]
```

### Phase 4: Pre-Implementation Setup

Before starting the team:

1. **Create Custom Skills** (if needed)
   - Use skill-creator for each custom skill
   - Test skills work correctly
   - Document in SPEC.md

2. **Configure Custom Agents** (if needed)
   - Define agent types and tool access
   - Document agent responsibilities
   - Add to team configuration

3. **Validate SPEC.md**
   - Review with user
   - Clarify any open questions
   - Get explicit approval to proceed

4. **Initialize Project Structure**
   - Create IMPLEMENTATION_PLAN.md from stages
   - Set up initial task list
   - Prepare to spawn team

### Phase 5: Handoff

Once SPEC.md is complete and capabilities are ready:

```markdown
## Ready to Start Implementation

Your project is fully specified. Here's how to proceed:

### 1. Review SPEC.md
Make sure all open questions are resolved and you're happy with the approach.

### 2. Start the Team
I can now create a team and start implementation:
- Team will use SPEC.md as their guide
- Agents will follow AGENTS.md for coordination
- IMPLEMENTATION_PLAN.md will track progress
- Agents will ask clarification questions as needed

### 3. Monitor Progress
- Check task list status
- Review agent messages
- Respond to clarification requests
- Approve key decisions

Would you like me to start the team now?
```

## Key Principles

1. **Be thorough but not prescriptive**: Get enough detail for agents to work autonomously, but leave implementation details to them

2. **Identify gaps early**: Better to clarify requirements now than have agents blocked later

3. **Match capabilities to needs**: Don't create custom skills/agents unless truly needed

4. **Make it executable**: SPEC.md should be clear enough that agents can start working immediately

5. **Enable autonomy**: Provide decision frameworks so agents know when to proceed vs. ask

## Integration with Existing Workflows

- Works alongside CLAUDE.md (global dev guidelines)
- Works alongside AGENTS.md (team coordination)
- Produces SPEC.md (project requirements)
- Creates IMPLEMENTATION_PLAN.md (execution tracking)
- All documents work together for agent-based development

## Example Invocation

User: "I want to build a todo app with Go backend and React frontend, deployed on Railway"

Skill response:
1. Ask clarifying questions about requirements
2. Generate SPEC.md with architecture and stages
3. Assess what skills/agents are needed
4. Create any custom capabilities
5. Hand off to team for implementation
