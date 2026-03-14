/**
 * agent-control/handlers/session.ts – Handlers for session management commands.
 *
 * Handles /session-name, /new-session, /switch-session, /session-rotate,
 * /fork, /forks, and /export-html commands for managing the pi-agent session tree.
 *
 * Consumers: agent-control-handlers.ts dispatches to these handlers.
 */

import type { AgentMessage } from "@mariozechner/pi-agent-core";
import type { AgentSession, SessionContext, SessionManager } from "@mariozechner/pi-coding-agent";
import { copyFileSync, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "fs";
import { basename, dirname, extname, join } from "path";
import type { AgentControlCommand, AgentControlResult } from "../agent-control-types.js";
import { formatBytes, truncateText } from "../agent-control-helpers.js";

type SessionNameCommand = Extract<AgentControlCommand, { type: "session_name" }>;
type NewSessionCommand = Extract<AgentControlCommand, { type: "new_session" }>;
type SwitchSessionCommand = Extract<AgentControlCommand, { type: "switch_session" }>;
type SessionRotateCommand = Extract<AgentControlCommand, { type: "session_rotate" }>;
type ForkCommand = Extract<AgentControlCommand, { type: "fork" }>;
type ForksCommand = Extract<AgentControlCommand, { type: "forks" }>;
type ExportHtmlCommand = Extract<AgentControlCommand, { type: "export_html" }>;
type PersistableSessionMessage = Parameters<SessionManager["appendMessage"]>[0];

const ROTATION_COMPACTION_INSTRUCTIONS = [
  "Prepare a concise continuity summary for session rotation.",
  "Preserve active goals, decisions, constraints, user preferences, and any pending work relevant to the next turns.",
  "Prefer compact operational context over narrative detail.",
].join(" ");

/** Return the byte size for a persisted session file, or null if unavailable. */
function getSessionFileSize(sessionFile: string | undefined): number | null {
  if (!sessionFile) return null;
  try {
    return statSync(sessionFile).size;
  } catch {
    return null;
  }
}

/** Choose a unique archive path inside the current session directory. */
function getArchivePath(sessionFile: string): string {
  const archiveDir = join(dirname(sessionFile), "archive");
  mkdirSync(archiveDir, { recursive: true });

  const base = basename(sessionFile);
  const extension = extname(base);
  const stem = extension ? base.slice(0, -extension.length) : base;

  let candidate = join(archiveDir, base);
  let counter = 1;
  while (existsSync(candidate)) {
    candidate = join(archiveDir, `${stem}.archived-${counter}${extension}`);
    counter += 1;
  }
  return candidate;
}

/** Persist the current session entries immediately, even before another assistant response arrives. */
function forcePersistSessionFile(session: AgentSession): void {
  const sessionFile = session.sessionFile;
  const header = session.sessionManager.getHeader();
  if (!sessionFile || !header) return;

  const entries = session.sessionManager.getEntries();
  const content = [header, ...entries].map((entry) => JSON.stringify(entry)).join("\n");
  writeFileSync(sessionFile, `${content}\n`);
}

/** Return true when compaction errors are safe to fall back from during rotation. */
function isRotationFallbackCompactionError(message: string): boolean {
  return [
    "Already compacted",
    "Nothing to compact (session too small)",
    "No model selected",
  ].includes(message);
}

/** Build a carried-forward summary from compaction and branch-summary messages. */
function collectCarriedSummary(messages: readonly AgentMessage[]): { summary: string | null; tokensBefore: number } {
  const parts: string[] = [];
  let tokensBefore = 0;

  for (const message of messages) {
    if (message.role === "compactionSummary") {
      parts.push(message.summary.trim());
      tokensBefore = Math.max(tokensBefore, message.tokensBefore);
    } else if (message.role === "branchSummary") {
      parts.push(`Branch summary:\n${message.summary.trim()}`);
    }
  }

  const summary = parts.map((part) => part.trim()).filter(Boolean).join("\n\n");
  return {
    summary: summary || null,
    tokensBefore,
  };
}

/** Seed a freshly-created session from the current effective session context. */
function seedRotatedSession(
  sessionManager: SessionManager,
  context: SessionContext,
  options: {
    sessionName?: string;
    model?: { provider: string; modelId: string } | null;
  }
): void {
  if (options.sessionName?.trim()) {
    sessionManager.appendSessionInfo(options.sessionName.trim());
  }

  if (options.model) {
    sessionManager.appendModelChange(options.model.provider, options.model.modelId);
  }

  const carried = collectCarriedSummary(context.messages);
  if (carried.summary) {
    sessionManager.appendCompaction(carried.summary, "rotated-context", carried.tokensBefore);
  }

  for (const message of context.messages) {
    if (message.role === "compactionSummary" || message.role === "branchSummary") {
      continue;
    }

    if (message.role === "custom") {
      sessionManager.appendCustomMessageEntry(
        message.customType,
        message.content,
        message.display,
        message.details
      );
      continue;
    }

    sessionManager.appendMessage(message as PersistableSessionMessage);
  }
}

/** Handle /session-name: rename the current session. */
export async function handleSessionName(session: AgentSession, command: SessionNameCommand): Promise<AgentControlResult> {
  if (!command.name) {
    return {
      status: "success",
      message: `Session name: ${session.sessionName || "none"}.`,
    };
  }
  const name = command.name.trim();
  const normalized = name.toLowerCase();
  if (["clear", "none", "off"].includes(normalized)) {
    session.setSessionName("");
    return { status: "success", message: "Session name cleared." };
  }
  session.setSessionName(name);
  return { status: "success", message: `Session name set to "${name}".` };
}

/** Handle /new-session: create a new session, optionally under a parent. */
export async function handleNewSession(session: AgentSession, command: NewSessionCommand): Promise<AgentControlResult> {
  const ok = await session.newSession(command.parent ? { parentSession: command.parent } : undefined);
  if (!ok) {
    return { status: "error", message: "New session cancelled." };
  }
  return { status: "success", message: "Started a new session." };
}

/** Handle /switch-session: switch to an existing session by path. */
export async function handleSwitchSession(session: AgentSession, command: SwitchSessionCommand): Promise<AgentControlResult> {
  if (!command.path) {
    return { status: "error", message: "Usage: /switch-session <path>" };
  }
  const ok = await session.switchSession(command.path.trim());
  if (!ok) {
    return { status: "error", message: "Switch session cancelled." };
  }
  return { status: "success", message: `Switched to session: ${command.path.trim()}.` };
}

/** Handle /session-rotate: archive the current session file and start a compact carried-forward successor. */
export async function handleSessionRotate(session: AgentSession, command: SessionRotateCommand): Promise<AgentControlResult> {
  if (session.isStreaming || session.isCompacting || session.isRetrying) {
    return {
      status: "error",
      message: "Cannot rotate the session while a response, compaction, or retry is active.",
    };
  }

  if (session.pendingMessageCount > 0) {
    return {
      status: "error",
      message: "Cannot rotate the session while queued steering or follow-up messages are pending.",
    };
  }

  const previousSessionFile = session.sessionFile?.trim();
  if (!previousSessionFile) {
    return { status: "error", message: "No persisted session file is active yet." };
  }

  if (!existsSync(previousSessionFile)) {
    return { status: "error", message: `Current session file does not exist: ${previousSessionFile}` };
  }

  const compactionInstructions = command.instructions?.trim() || ROTATION_COMPACTION_INSTRUCTIONS;
  let compacted = false;
  try {
    await session.compact(compactionInstructions);
    compacted = true;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!isRotationFallbackCompactionError(message)) {
      return { status: "error", message };
    }
  }

  const context = session.sessionManager.buildSessionContext();
  const archivePath = getArchivePath(previousSessionFile);
  const previousSize = getSessionFileSize(previousSessionFile);
  const currentModel = session.model
    ? { provider: session.model.provider, modelId: session.model.id }
    : context.model;
  const currentSessionName = session.sessionName?.trim() || undefined;

  let archived = false;
  try {
    copyFileSync(previousSessionFile, archivePath);
    archived = true;

    const ok = await session.newSession({
      parentSession: archivePath,
      setup: async (sessionManager) => {
        seedRotatedSession(sessionManager, context, {
          sessionName: currentSessionName,
          model: currentModel,
        });
      },
    });

    if (!ok) {
      if (archived) rmSync(archivePath, { force: true });
      return { status: "error", message: "Session rotation cancelled." };
    }

    forcePersistSessionFile(session);
    rmSync(previousSessionFile, { force: true });

    const nextSessionFile = session.sessionFile || "(unavailable)";
    const nextSize = getSessionFileSize(session.sessionFile);
    const summaryCount = collectCarriedSummary(context.messages).summary ? 1 : 0;
    const carriedMessageCount = context.messages.filter(
      (message) => message.role !== "compactionSummary" && message.role !== "branchSummary"
    ).length;

    const lines = [
      "Session rotated.",
      `Archived previous session: ${archivePath}`,
      `New session: ${nextSessionFile}`,
      `Previous file size: ${previousSize === null ? "unknown" : formatBytes(previousSize)}`,
      `New file size: ${nextSize === null ? "unknown" : formatBytes(nextSize)}`,
      `Continuity seed: ${summaryCount > 0 ? "summary + " : ""}${carriedMessageCount} carried message${carriedMessageCount === 1 ? "" : "s"}`,
      `Compaction before rotate: ${compacted ? "yes" : "no (used current effective context)"}`,
    ];

    return { status: "success", message: lines.join("\n") };
  } catch (err) {
    if (archived) {
      try {
        rmSync(archivePath, { force: true });
      } catch {
        // best effort cleanup only
      }
    }
    const message = err instanceof Error ? err.message : String(err);
    return { status: "error", message };
  }
}

/** Handle /fork: fork the conversation from a specific entry. */
export async function handleFork(session: AgentSession, command: ForkCommand): Promise<AgentControlResult> {
  if (!command.entryId) {
    return { status: "error", message: "Usage: /fork <entryId>" };
  }
  try {
    const result = await session.fork(command.entryId.trim());
    if (result.cancelled) {
      return { status: "error", message: "Fork cancelled." };
    }
    const selected = result.selectedText ? `Selected text:\n${result.selectedText}` : "Fork created.";
    return { status: "success", message: selected };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { status: "error", message };
  }
}

/** Handle /fork: fork the conversation from a specific entry. */
export async function handleForks(session: AgentSession, _command: ForksCommand): Promise<AgentControlResult> {
  const messages = session.getUserMessagesForForking();
  if (messages.length === 0) {
    return { status: "success", message: "No user messages available for forking." };
  }
  const lines = ["Forkable messages:", ...messages.map((msg) => `• ${msg.entryId}: ${truncateText(msg.text, 120)}`)];
  return { status: "success", message: lines.join("\n") };
}

/** Handle /export-html: export the session as an HTML file. */
export async function handleExportHtml(session: AgentSession, command: ExportHtmlCommand): Promise<AgentControlResult> {
  try {
    const outputPath = command.path?.trim() || undefined;
    const path = await session.exportToHtml(outputPath);
    return { status: "success", message: `Exported session to ${path}.` };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { status: "error", message };
  }
}
