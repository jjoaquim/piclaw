import type { AgentSessionEvent } from "@mariozechner/pi-coding-agent";
import type { WebChannel } from "../../web.js";
import type { AttachmentInfo } from "../../../agent-pool/attachments.js";
import { ASSISTANT_AVATAR, ASSISTANT_NAME, TRIGGER_PATTERN } from "../../../config.js";
import { parseControlCommand } from "../../../agent-control.js";
import { getMessagesSince } from "../../../db.js";
import { detectChannel, formatMessages, formatOutbound } from "../../../router.js";
import { buildPreview, createToolTitleTracker } from "../agent-utils.js";

export async function handleAgentMessage(
  channel: WebChannel,
  req: Request,
  pathname: string,
  chatJid: string,
  defaultAgentId: string
): Promise<Response> {
  const agentId = pathname.split("/")[2] || defaultAgentId;
  let data: {
    content?: string;
    thread_id?: number | null;
    media_ids?: number[];
    content_blocks?: unknown[];
    link_previews?: unknown[];
  };
  try {
    data = await req.json();
  } catch {
    return channel.json({ error: "Invalid JSON" }, 400);
  }

  if (!data.content) return channel.json({ error: "Missing 'content' field" }, 400);

  const mediaIds = Array.isArray(data.media_ids)
    ? data.media_ids.map((id) => Number(id)).filter((id) => Number.isFinite(id))
    : [];
  const contentBlocks = Array.isArray(data.content_blocks) ? data.content_blocks : undefined;
  const linkPreviews = Array.isArray(data.link_previews) ? data.link_previews : undefined;

  const interaction = channel.storeMessage(chatJid, data.content, false, mediaIds, {
    contentBlocks,
    linkPreviews,
  });

  if (!interaction) return channel.json({ error: "Failed to store message" }, 500);

  channel.broadcastEvent("new_post", interaction);

  const markCommandHandled = () => {
    if (interaction?.timestamp) {
      channel.lastAgentTimestamp[chatJid] = interaction.timestamp;
      channel.saveState();
    }
  };

  const command = parseControlCommand(data.content, TRIGGER_PATTERN);
  if (command) {
    const result = await channel.agentPool.applyControlCommand(chatJid, command);
    const formatted = formatOutbound(result.message, "web");
    const isQueueCommand = command.type === "queue" || command.type === "queue_all";
    if (formatted) {
      if (isQueueCommand && result.queued_followup) {
        channel.queueFollowupPlaceholder(chatJid, formatted, interaction.id);
      } else {
        await channel.sendMessage(chatJid, formatted);
      }
    }
    markCommandHandled();
    return channel.json(
      { user_message: interaction, thread_id: data.thread_id ?? interaction.id, command: result },
      201
    );
  }

  // If message looks like an extension slash command (starts with '/'), execute it directly
  const trimmed = (data.content || "").trim();
  if (trimmed.startsWith("/")) {
    const cmdResult = await channel.agentPool.applySlashCommand(chatJid, trimmed);
    try {
      const formatted = formatOutbound(cmdResult.message || "", "web");
      if (formatted) await channel.sendMessage(chatJid, formatted);
    } catch (e) {
      console.error('[web] Failed to send slash command response:', e);
    }
    markCommandHandled();
    return channel.json(
      { user_message: interaction, thread_id: data.thread_id ?? interaction.id, command: cmdResult },
      201
    );
  }

  const steerResult = await channel.agentPool.queueStreamingMessage(chatJid, data.content, "steer");
  if (steerResult.queued) {
    markCommandHandled();
    return channel.json(
      {
        user_message: interaction,
        thread_id: data.thread_id ?? interaction.id,
        queued: "steer",
      },
      201
    );
  }

  if (steerResult.error) {
    console.warn(`[web] Failed to queue steering message: ${steerResult.error}`);
  }

  channel.queue.enqueue(async () => {
    await processChat(channel, chatJid, agentId, interaction.id);
  }, `chat:${chatJid}`);

  return channel.json({ user_message: interaction, thread_id: data.thread_id ?? interaction.id }, 201);
}

export async function processChat(
  channel: WebChannel,
  chatJid: string,
  agentId: string,
  threadRootId?: number
): Promise<void> {
  const since = channel.lastAgentTimestamp[chatJid] || "";
  const messages = getMessagesSince(chatJid, since, ASSISTANT_NAME);
  if (messages.length === 0) return;

  const channelName = detectChannel(chatJid);
  const prompt = formatMessages(messages, channelName);
  const prevCursor = channel.lastAgentTimestamp[chatJid] || "";
  channel.lastAgentTimestamp[chatJid] = messages[messages.length - 1].timestamp;
  channel.saveState();

  const threadId = messages[messages.length - 1].timestamp;
  let thoughtBuffer = "";
  let draftBuffer = "";
  const { remember, lookup, forget } = createToolTitleTracker();

  const THOUGHT_PREVIEW_LINES = 8;
  const DRAFT_PREVIEW_LINES = 8;
  const PREVIEW_MAX_CHARS_PER_LINE = 160;

  const turnId = `turn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const withAgentProfile = (payload: Record<string, unknown>) => ({
    ...payload,
    agent_name: ASSISTANT_NAME,
    agent_avatar: ASSISTANT_AVATAR || null,
  });

  channel.broadcastEvent("agent_status", withAgentProfile({
    thread_id: threadId,
    agent_id: agentId,
    type: "thinking",
    title: "Thinking...",
    turn_id: turnId,
  }));

  const resolvedThreadRootId =
    threadRootId ?? channel.getThreadRootId(chatJid, messages[messages.length - 1].id ?? "");

  const storeAndBroadcast = (text: string, turnAttachments: AttachmentInfo[], opts?: { threadId?: number }) => {
    const mediaIds = turnAttachments.map((a) => a.id);
    const contentBlocks = turnAttachments.map((a) => ({
      type: a.kind === "image" ? "image" : "file",
      name: a.name,
      filename: a.name,
      mime_type: a.contentType,
      size: a.size,
    }));

    const formatted = formatOutbound(text, channelName);
    const threadId = opts?.threadId ?? resolvedThreadRootId ?? undefined;

    const placeholderId = channel.consumeQueuedFollowupPlaceholder(chatJid);
    if (placeholderId) {
      const updated = channel.replaceQueuedFollowupPlaceholder(
        chatJid,
        placeholderId,
        formatted,
        mediaIds,
        contentBlocks.length > 0 ? contentBlocks : undefined,
        threadId
      );
      if (updated) {
        return;
      }
    }

    const interaction = channel.storeMessage(chatJid, formatted, true, mediaIds, {
      contentBlocks: contentBlocks.length > 0 ? contentBlocks : undefined,
      threadId,
    });
    if (interaction) {
      channel.broadcastEvent("agent_response", {
        ...interaction,
        agent_name: ASSISTANT_NAME,
        agent_avatar: ASSISTANT_AVATAR || null,
      });
    }
  };

  const output = await channel.agentPool.runAgent(prompt, chatJid, {
    onAutoCompact: (notice) => {
      const phaseLabel = notice.phase === "pre"
        ? "Auto-compacting to free context"
        : "Auto-compacting after response";
      if (notice.status === "start") {
        channel.broadcastEvent("agent_status", withAgentProfile({
          thread_id: threadId,
          agent_id: agentId,
          type: "intent",
          title: phaseLabel,
          turn_id: turnId,
        }));
      } else if (notice.status === "end" && notice.phase === "pre") {
        channel.broadcastEvent("agent_status", withAgentProfile({
          thread_id: threadId,
          agent_id: agentId,
          type: "thinking",
          title: "Thinking...",
          turn_id: turnId,
        }));
      } else if (notice.status === "error" && notice.phase === "pre") {
        channel.broadcastEvent("agent_status", withAgentProfile({
          thread_id: threadId,
          agent_id: agentId,
          type: "intent",
          title: "Auto-compaction failed; continuing",
          turn_id: turnId,
        }));
        channel.broadcastEvent("agent_status", withAgentProfile({
          thread_id: threadId,
          agent_id: agentId,
          type: "thinking",
          title: "Thinking...",
          turn_id: turnId,
        }));
      }
    },
    onEvent: (event: AgentSessionEvent) => {
      if (event.type === "message_update") {
        const messageEvent = event.assistantMessageEvent;
        if (messageEvent.type === "thinking_start") {
          thoughtBuffer = "";
        }
        if (messageEvent.type === "thinking_delta") {
          thoughtBuffer += messageEvent.delta;
          const { preview, totalLines } = buildPreview(
            thoughtBuffer,
            THOUGHT_PREVIEW_LINES,
            PREVIEW_MAX_CHARS_PER_LINE
          );
          channel.broadcastEvent("agent_thought", withAgentProfile({
            thread_id: threadId,
            agent_id: agentId,
            text: preview,
            total_lines: totalLines,
            turn_id: turnId,
          }));
        }
        if (messageEvent.type === "thinking_end") {
          thoughtBuffer = messageEvent.content || thoughtBuffer;
          const { preview, totalLines } = buildPreview(
            thoughtBuffer,
            THOUGHT_PREVIEW_LINES,
            PREVIEW_MAX_CHARS_PER_LINE
          );
          channel.broadcastEvent("agent_thought", withAgentProfile({
            thread_id: threadId,
            agent_id: agentId,
            text: preview,
            total_lines: totalLines,
            turn_id: turnId,
          }));
        }
        if (messageEvent.type === "toolcall_end") {
          const title = remember(
            messageEvent.toolCall.id,
            messageEvent.toolCall.name,
            messageEvent.toolCall.arguments
          );
          channel.broadcastEvent("agent_status", withAgentProfile({
            thread_id: threadId,
            agent_id: agentId,
            type: "tool_call",
            title,
            turn_id: turnId,
          }));
        }
        if (messageEvent.type === "text_start") {
          draftBuffer = "";
          channel.broadcastEvent("agent_draft", withAgentProfile({
            thread_id: threadId,
            agent_id: agentId,
            text: "",
            total_lines: 0,
            kind: "draft",
            mode: "replace",
            turn_id: turnId,
          }));
          channel.broadcastEvent("agent_draft_delta", withAgentProfile({
            thread_id: threadId,
            agent_id: agentId,
            delta: "",
            reset: true,
            turn_id: turnId,
          }));
        }
        if (messageEvent.type === "text_delta") {
          draftBuffer += messageEvent.delta;
          const { preview, totalLines } = buildPreview(
            draftBuffer,
            DRAFT_PREVIEW_LINES,
            PREVIEW_MAX_CHARS_PER_LINE
          );
          channel.broadcastEvent("agent_draft", withAgentProfile({
            thread_id: threadId,
            agent_id: agentId,
            text: preview,
            total_lines: totalLines,
            kind: "draft",
            mode: "replace",
            turn_id: turnId,
          }));
          channel.broadcastEvent("agent_draft_delta", withAgentProfile({
            thread_id: threadId,
            agent_id: agentId,
            delta: messageEvent.delta,
            turn_id: turnId,
          }));
        }
      }

      if (event.type === "tool_execution_start") {
        const title = remember(event.toolCallId, event.toolName, event.args);
        channel.broadcastEvent("agent_status", withAgentProfile({
          thread_id: threadId,
          agent_id: agentId,
          type: "tool_call",
          title,
          turn_id: turnId,
        }));
      }

      if (event.type === "tool_execution_update") {
        const title = lookup(event.toolCallId, event.toolName, event.args);
        channel.broadcastEvent("agent_status", withAgentProfile({
          thread_id: threadId,
          agent_id: agentId,
          type: "tool_status",
          title,
          status: "Working...",
          turn_id: turnId,
        }));
      }

      if (event.type === "tool_execution_end") {
        const title = lookup(event.toolCallId, event.toolName);
        forget(event.toolCallId);
        channel.broadcastEvent("agent_status", withAgentProfile({
          thread_id: threadId,
          agent_id: agentId,
          type: "tool_status",
          title,
          status: event.isError ? "Failed" : "Done",
          turn_id: turnId,
        }));
      }
    },
    onTurnComplete: (turn) => {
      // Intermediate turn completed (follow-up boundary) — store as threaded message
      if (turn.text || turn.attachments.length > 0) {
        storeAndBroadcast(turn.text, turn.attachments);
      }
    },
  });

  if (output.status === "error") {
    channel.lastAgentTimestamp[chatJid] = prevCursor;
    channel.saveState();
    channel.broadcastEvent("agent_status", withAgentProfile({
      thread_id: threadId,
      agent_id: agentId,
      type: "error",
      title: output.error || "Agent error",
      turn_id: turnId,
    }));
    return;
  }

  // Store the final turn's output
  const finalAttachments = output.attachments ?? [];
  if (output.result || finalAttachments.length > 0) {
    storeAndBroadcast(output.result || "", finalAttachments);
  }

  channel.broadcastEvent("agent_status", withAgentProfile({
    thread_id: threadId,
    agent_id: agentId,
    type: "done",
    turn_id: turnId,
  }));
}
