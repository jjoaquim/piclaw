import type { AgentSessionEvent } from "@mariozechner/pi-coding-agent";
import type { WebChannel } from "../web.js";
import { buildPreview, createToolTitleTracker, type AgentProfileBuilder } from "./agent-utils.js";

export interface AgentEventEmitter {
  status: (payload: Record<string, unknown>) => void;
  thought: (payload: Record<string, unknown>) => void;
  draft: (payload: Record<string, unknown>) => void;
  draftDelta: (payload: Record<string, unknown>) => void;
  response: (payload: object) => void;
}

export function createAgentEventEmitter(
  channel: WebChannel,
  withAgentProfile: AgentProfileBuilder
): AgentEventEmitter {
  return {
    status: (payload) => channel.broadcastEvent("agent_status", withAgentProfile(payload)),
    thought: (payload) => channel.broadcastEvent("agent_thought", withAgentProfile(payload)),
    draft: (payload) => channel.broadcastEvent("agent_draft", withAgentProfile(payload)),
    draftDelta: (payload) => channel.broadcastEvent("agent_draft_delta", withAgentProfile(payload)),
    response: (payload) => channel.broadcastEvent("agent_response", withAgentProfile(payload)),
  };
}

export interface StreamingEventHandlerOptions {
  emitter: AgentEventEmitter;
  agentId: string;
  threadId: string;
  turnId: string;
  thoughtPreviewLines?: number;
  draftPreviewLines?: number;
  previewMaxCharsPerLine?: number;
}

export function createStreamingEventHandler(options: StreamingEventHandlerOptions): (event: AgentSessionEvent) => void {
  const thoughtPreviewLines = options.thoughtPreviewLines ?? 8;
  const draftPreviewLines = options.draftPreviewLines ?? 8;
  const previewMaxCharsPerLine = options.previewMaxCharsPerLine ?? 160;

  let thoughtBuffer = "";
  let draftBuffer = "";
  const { remember, lookup, forget } = createToolTitleTracker();

  const base = {
    thread_id: options.threadId,
    agent_id: options.agentId,
    turn_id: options.turnId,
  };

  return (event: AgentSessionEvent) => {
    if (event.type === "message_update") {
      const messageEvent = event.assistantMessageEvent;
      if (messageEvent.type === "thinking_start") {
        thoughtBuffer = "";
      }
      if (messageEvent.type === "thinking_delta") {
        thoughtBuffer += messageEvent.delta;
        const { preview, totalLines } = buildPreview(
          thoughtBuffer,
          thoughtPreviewLines,
          previewMaxCharsPerLine
        );
        options.emitter.thought({
          ...base,
          text: preview,
          total_lines: totalLines,
        });
      }
      if (messageEvent.type === "thinking_end") {
        thoughtBuffer = messageEvent.content || thoughtBuffer;
        const { preview, totalLines } = buildPreview(
          thoughtBuffer,
          thoughtPreviewLines,
          previewMaxCharsPerLine
        );
        options.emitter.thought({
          ...base,
          text: preview,
          total_lines: totalLines,
        });
      }
      if (messageEvent.type === "toolcall_end") {
        const title = remember(
          messageEvent.toolCall.id,
          messageEvent.toolCall.name,
          messageEvent.toolCall.arguments
        );
        options.emitter.status({
          ...base,
          type: "tool_call",
          title,
        });
      }
      if (messageEvent.type === "text_start") {
        draftBuffer = "";
        options.emitter.draft({
          ...base,
          text: "",
          total_lines: 0,
          kind: "draft",
          mode: "replace",
        });
        options.emitter.draftDelta({
          ...base,
          delta: "",
          reset: true,
        });
      }
      if (messageEvent.type === "text_delta") {
        draftBuffer += messageEvent.delta;
        const { preview, totalLines } = buildPreview(
          draftBuffer,
          draftPreviewLines,
          previewMaxCharsPerLine
        );
        options.emitter.draft({
          ...base,
          text: preview,
          total_lines: totalLines,
          kind: "draft",
          mode: "replace",
        });
        options.emitter.draftDelta({
          ...base,
          delta: messageEvent.delta,
        });
      }
    }

    if (event.type === "tool_execution_start") {
      const title = remember(event.toolCallId, event.toolName, event.args);
      options.emitter.status({
        ...base,
        type: "tool_call",
        title,
      });
    }

    if (event.type === "tool_execution_update") {
      const title = lookup(event.toolCallId, event.toolName, event.args);
      options.emitter.status({
        ...base,
        type: "tool_status",
        title,
        status: "Working...",
      });
    }

    if (event.type === "tool_execution_end") {
      const title = lookup(event.toolCallId, event.toolName);
      forget(event.toolCallId);
      options.emitter.status({
        ...base,
        type: "tool_status",
        title,
        status: event.isError ? "Failed" : "Done",
      });
    }
  };
}
