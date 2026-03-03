import { buildPreviewLines, countSoftLines, splitLines } from "../../utils/preview.js";
export function createAgentProfileBuilder(agentName, agentAvatar, userName, userAvatar, userAvatarBackground) {
    return (payload) => ({
        ...payload,
        agent_name: agentName,
        agent_avatar: agentAvatar ?? null,
        user_name: userName ?? null,
        user_avatar: userAvatar ?? null,
        user_avatar_background: userAvatarBackground ?? null,
    });
}
export function buildPreview(text, maxLines, maxCharsPerLine) {
    const lines = splitLines(text || "");
    if (!lines.length)
        return { preview: "", totalLines: 0 };
    const totalLines = countSoftLines(lines, maxCharsPerLine);
    const { preview } = buildPreviewLines(lines, { maxLines });
    return { preview, totalLines };
}
function extractToolArgs(args) {
    if (!args)
        return null;
    if (typeof args === "string") {
        try {
            const parsed = JSON.parse(args);
            if (parsed && typeof parsed === "object")
                return parsed;
        }
        catch {
            return null;
        }
    }
    if (typeof args === "object") {
        const record = args;
        const nested = record.arguments ||
            record.input ||
            record.params ||
            record.parameters ||
            record.args ||
            record.payload;
        return nested ?? record;
    }
    return null;
}
function formatToolTitle(toolName, args) {
    const record = extractToolArgs(args);
    if (!record)
        return toolName;
    let detail = null;
    const command = record.command;
    if (typeof command === "string")
        detail = command;
    if (!detail && Array.isArray(record.commands)) {
        detail = record.commands.filter((item) => typeof item === "string").join(" && ");
    }
    const path = record.path || record.filePath || record.target;
    if (!detail && typeof path === "string")
        detail = path;
    if (!detail && Array.isArray(record.paths)) {
        detail = record.paths.filter((item) => typeof item === "string").join(", ");
    }
    const filename = record.fileName || record.filename || record.file;
    if (!detail && typeof filename === "string")
        detail = filename;
    const url = record.url;
    if (!detail && typeof url === "string")
        detail = url;
    const query = record.query;
    if (!detail && typeof query === "string")
        detail = query;
    if (!detail)
        return toolName;
    const normalized = detail.replace(/\s+/g, " ").trim();
    const maxLen = 120;
    const clipped = normalized.length > maxLen ? `${normalized.slice(0, maxLen)}…` : normalized;
    return `${toolName}: ${clipped}`;
}
export function createToolTitleTracker() {
    const toolTitles = new Map();
    const remember = (toolCallId, toolName, args) => {
        const title = formatToolTitle(toolName, args);
        toolTitles.set(toolCallId, title);
        return title;
    };
    const lookup = (toolCallId, toolName, args) => {
        return toolTitles.get(toolCallId) ?? formatToolTitle(toolName, args);
    };
    const forget = (toolCallId) => {
        toolTitles.delete(toolCallId);
    };
    return { remember, lookup, forget };
}
