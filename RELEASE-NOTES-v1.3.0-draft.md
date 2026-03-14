# v1.3.0

This release is mostly about making the web UI behave like it has some adult supervision: queueing is clearer, restart recovery is less sloppy, the compose flow stays usable under load, and the workspace surfaces are a bit less awkward.

## What changed

### Web chat queueing and steering

The active-turn follow-up flow has been tightened up so queued follow-ups behave more predictably instead of leaking into the normal timeline path and generally making a mess.

Notably:

- queued follow-ups are handled more explicitly during active turns
- steering and ordinary follow-ups are more clearly separated
- queue controls in the web UI are less muddled
- the compose flow remains usable while Pi is already busy

In other words: continuing a conversation mid-run is less of an improvised experiment.

### Restart and reconnect recovery

The web chat recovery path has had a proper hardening pass.

This includes better handling for:

- interrupted turns after restart
- queued follow-ups surviving backend restarts
- avoiding duplicate or half-finished terminal outcomes
- re-surfacing final responses after reconnects and recovery windows

So if the process restarts at an inconvenient moment — which computers are occasionally rude enough to do — recovery is much more likely to end in the right place.

### Compose flow remains responsive

The compose box is no longer treated as something that must be frozen whenever work is in progress.

That means:

- input remains usable during active turns
- submissions can express clearer follow-up intent
- active-turn UI state is less brittle

A fairly basic expectation, admittedly, but still nice to have.

## Workspace and preview improvements

### Workspace explorer polish

The workspace explorer has had a round of practical clean-up:

- row/icon sizing is more consistent across scale modes
- icon/text alignment is improved
- several smaller queue/upload-related UI details were tidied up

Nothing theatrical, just less visual friction.

### Preview groundwork

Preview-related work has moved further towards a cleaner and more modular model, which should make richer preview behaviour easier to add without stapling yet more special cases onto the frontend.

## Frontend structure and reliability

### Stronger web channel contracts

The web channel boundary is stricter now, which reduces drift between frontend and backend behaviour during active turns and makes further web work less error-prone.

### Less frontend fragility during live updates

There has also been a broader clean-up of redraw churn, ambiguous state transitions, and cross-module coupling in the web stack. The result is a steadier UI while streaming, queueing, and recovering from interruptions.

Which is to say: fewer mysterious states that only fix themselves after glaring at the browser for a while.

## Tooling, scaffold, and runtime updates

- the project-local kanban workflow is now reflected more explicitly in the shipped scaffold
- the `kanban-management` skill and ticket/template structure are included for new installs
- the `feature-refinement-flow` skill is now present in `skel` as well
- the Docker/runtime base has been refreshed onto newer Debian Trixie images for the container path
- recent upstream packages were updated, including `pi-coding-agent` to `0.58.0`
- circular dependencies in the web/runtime layer were reduced
- queue, recovery, and runtime documentation were updated
- static asset freshness was tightened so the web UI is less likely to cling to stale bundles out of sheer spite

## Upgrade notes

- Refresh the web UI after upgrading so it actually uses the new bundles.
- No data migration should be required.
- If you use the web UI heavily, especially active-turn queueing, this release is worth taking.
