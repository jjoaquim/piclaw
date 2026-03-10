/**
 * agent-control/handlers/agent.ts – Handlers for /agent-name and /agent-avatar.
 *
 * Updates the assistant's display name and avatar URL at runtime, persisting
 * the changes to the config file so they survive restarts.
 *
 * Consumers: agent-control-handlers.ts dispatches to these handlers.
 */
import { statSync } from "fs";
import { ASSISTANT_AVATAR, ASSISTANT_NAME, setAssistantAvatar, setAssistantName } from "../../core/config.js";
import { ensureAvatarCache } from "../../channels/web/avatar-service.js";
import { updateAssistantConfig } from "../agent-control-helpers.js";
/** Handle /agent-name: update the assistant display name. */
export async function handleAgentName(_session, command) {
    if (!command.name) {
        return { status: "success", message: `Agent name: ${ASSISTANT_NAME}` };
    }
    const trimmed = command.name.trim();
    const normalized = trimmed.toLowerCase();
    const nextName = ["clear", "none", "off", "default"].includes(normalized) ? null : trimmed;
    const updated = updateAssistantConfig({ name: nextName });
    const fallback = process.env.PICLAW_ASSISTANT_NAME || process.env.ASSISTANT_NAME || "PiClaw";
    const effective = updated.name || fallback;
    setAssistantName(effective);
    return {
        status: "success",
        message: nextName ? `Agent name set to ${effective}.` : `Agent name reset to ${effective}.`,
    };
}
/** Handle /agent-avatar: update the assistant avatar URL. */
export async function handleAgentAvatar(_session, command) {
    if (!command.avatar) {
        const current = ASSISTANT_AVATAR || "(default)";
        return { status: "success", message: `Agent avatar: ${current}` };
    }
    const trimmed = command.avatar.trim();
    const normalized = trimmed.toLowerCase();
    const nextAvatar = ["clear", "none", "off", "default"].includes(normalized) ? null : trimmed;
    const updated = updateAssistantConfig({ avatar: nextAvatar });
    const fallback = process.env.PICLAW_ASSISTANT_AVATAR || process.env.ASSISTANT_AVATAR || "";
    const effective = updated.avatar || fallback;
    setAssistantAvatar(effective);
    if (!nextAvatar) {
        return {
            status: "success",
            message: "Agent avatar reset to default.",
        };
    }
    // Keep a local cached copy for web/icon usage and report cached size.
    let cacheSuffix;
    try {
        const cached = await ensureAvatarCache("agent", effective || nextAvatar);
        if (cached?.file) {
            const bytes = statSync(cached.file).size;
            cacheSuffix = ` Cached locally (${bytes} bytes).`;
        }
        else {
            cacheSuffix = " Avatar set; local cache pending first successful fetch.";
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        cacheSuffix = ` Avatar set; cache warning: ${message}.`;
    }
    return {
        status: "success",
        message: `Agent avatar set to ${effective || "(default)"}.${cacheSuffix}`,
    };
}
