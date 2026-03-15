# SPEC.md Template

Use this structure when generating a SPEC.md from the interview. Not every section applies to every project—skip what's irrelevant, but don't skip sections just because they're hard to fill in. Mark those as TBD.

---

```markdown
# SPEC.md

## Overview

[1-3 sentences. What this is, who it's for, what problem it solves.]

---

## Architecture

| Layer | Technology |
|-------|------------|
| Frontend | [framework, approach] |
| Backend | [language, framework] |
| Database | [engine, key design decisions] |
| Live Updates | [mechanism if applicable] |
| Authentication | [approach] |
| Deployment | [target environment] |

---

## Features

[Bullet list of user-facing features. Keep it to MVP scope. Each feature should be concrete enough to verify.]

- Feature 1
- Feature 2
- ...

---

## Functional Spec

### [Subsystem 1, e.g. "Frontend"]

**Framework:** [name]

#### [Aspect, e.g. "Styling"]
- [Specific decisions]

#### [Aspect, e.g. "UI Layout"]
- [Component descriptions]

### [Subsystem 2, e.g. "Backend"]

**Framework:** [name]

#### [Integration, e.g. "API Design"]
- [Specific decisions]

#### [Concern, e.g. "Media Handling"]
- [Processing pipeline details]

[Add subsystems as needed]

---

## Data Model

### Design Principles
- [Key decisions about data storage, indexing, relationships]

### Tables / Collections / Schemas

#### `table_name`
| Column | Type | Notes |
|--------|------|-------|
| id | TYPE | Description |
| ... | ... | ... |

[Repeat for each table/collection. Include indexes, virtual columns, constraints.]

---

## API Endpoints

### [Group, e.g. "Public"]
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/path` | What it does |

### [Group, e.g. "Authenticated"]
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/path` | What it does |

---

## Non-Functional Requirements

### Performance
- [Response time targets, throughput, concurrent users]

### Security
- [Auth model, data protection, compliance requirements]

### Scalability
- [Growth expectations, scaling strategy]

### Deployment
- [Target environment, CI/CD, containerization]

---

## Acceptance Criteria

[How do we know each feature works? Be specific.]

- [ ] Criterion 1: [testable statement]
- [ ] Criterion 2: [testable statement]
- ...

---

## Notes

[Anything that doesn't fit above: assumptions, open questions, references to external docs or specs.]

---

## Future Enhancements

[Out of MVP scope but worth tracking.]

- Enhancement 1
- Enhancement 2

---

# Implementation Plan

## Phase 1: [Name]

- [ ] **1.1 [Task name]**
  - Subtask details
  - Subtask details

- [ ] **1.2 [Task name]**
  - Subtask details

## Phase 2: [Name]

- [ ] **2.1 [Task name]**
  - Subtask details

[Continue phases...]

---

## File Structure

` ` `
/
├── dir/
│   ├── file.ext        # Description
│   └── file.ext        # Description
├── dir/
│   └── file.ext        # Description
└── config-file.ext
` ` `
```

---

## Template Usage Notes

**Adapt, don't force-fit.** A CLI tool won't have a Frontend row in the Architecture table. A serverless function won't have a deployment section about Dockerfiles. Remove sections that don't apply rather than filling them with "N/A".

**Be specific.** Don't write "a modern database"—write "SQLite with JSON columns and virtual column indexes" or "PostgreSQL 16 with pgvector for embeddings". Agents need concrete decisions, not vibes.

**Implementation plan granularity.** Each task should be completable in a single focused session (30-90 minutes of agent work). If a task feels like it would take a full day, break it down further.

**File structure is not optional.** Agents perform measurably better when they know where files go before they start writing code. Include it even if it feels premature.
