---
id: login-command-passthrough
title: Pass /login command through to pi and effect successful logins
status: inbox
priority: medium
created: 2026-03-11
updated: 2026-03-11
tags:
  - work-item
  - kanban
  - auth
  - web
  - commands
owner: pi
---

# Pass /login command through to pi and effect successful logins

## Summary

The `/login` slash command should be intercepted in the web chat flow and passed
through to the pi coding agent's built-in login flow for backend provider
authentication. Currently `/login` is not registered as a recognized command in
piclaw's command parser, so it either gets sent as a chat message or ignored.

This ticket is specifically about handing off to pi's provider-auth flow and
surfacing whatever follow-up inputs, login URLs, or prompts that flow requires.
It is not about piclaw's own web/TOTP/passkey session login.

## Desired Behavior

- `/login` is recognized in the web chat slash-command path.
- The command is handed off directly to pi's built-in login/provider-auth flow.
- Any subsequent provider-auth steps are surfaced in the chat/UI as needed
  (for example input prompts, device/login URLs, or confirmation messages).
- After successful provider authentication, the user remains in the same chat view.
- This command is used to handle backend model-provider auth, not web-session auth.

## Acceptance Criteria

- [ ] `/login` recognized as a slash command in the web chat flow.
- [ ] Command is forwarded to pi's built-in `/login` handler rather than being sent as a normal chat message.
- [ ] Any follow-up provider-auth steps required by pi are surfaced correctly to the user.
- [ ] After successful provider authentication, the user stays in the same chat view.
- [ ] Scope remains limited to pi/provider-auth integration rather than piclaw's own web auth stack.
- [ ] Error cases handled gracefully for provider-auth failures or cancellations.

## Investigation Needed

- How does pi's built-in `/login` command work? (check pi SDK docs / command registry)
- What follow-up UI/message surfaces does it expect for provider authentication?
- How should provider-auth prompts/URLs be relayed through the web chat flow?

## Updates

### 2026-03-12
- Refined from 5-question pass:
  - scope is web chat slash-command handling only
  - hand off directly to pi's provider-auth flow
  - surface any follow-up provider inputs, login URLs, or prompts through the chat/UI
  - keep the user in the same chat view after success
  - keep scope limited to provider auth rather than piclaw web-session auth

### 2026-03-11
- Created ticket.

## Notes

- This has nothing to do with our own login/TOTP/authn flows.
- This is specifically for backend AI model-provider authentication handled by pi.
- The web chat should hand off immediately and then surface whatever provider-auth inputs, URLs, or confirmations pi emits.
- User stays in the current chat view throughout the flow.

## Links

- `piclaw/piclaw/src/agent-control/command-parsers.ts`
- `piclaw/piclaw/src/agent-control/command-registry.ts`
