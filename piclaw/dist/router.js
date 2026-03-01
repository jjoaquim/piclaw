import { getChannelFormattingInstructions } from "./channels/formatting.js";
export function detectChannel(chatJid) {
    if (!chatJid)
        return "unknown";
    if (chatJid.startsWith("web:"))
        return "web";
    return "whatsapp";
}
export function escapeXml(s) {
    if (!s)
        return "";
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
export function formatMessages(messages, channel) {
    const lines = messages.map((m) => `<message sender=\"${escapeXml(m.sender_name)}\" time=\"${m.timestamp}\">${escapeXml(m.content)}</message>`);
    const knownChannel = channel && channel !== "unknown" ? channel : undefined;
    const channelAttr = knownChannel ? ` channel=\"${knownChannel}\"` : "";
    const metaLines = [];
    if (knownChannel)
        metaLines.push(`<channel>${knownChannel}</channel>`);
    const formatting = getChannelFormattingInstructions(knownChannel);
    if (formatting)
        metaLines.push(`<formatting>${formatting}</formatting>`);
    const meta = metaLines.length > 0 ? `${metaLines.join("\n")}\n` : "";
    return `<messages${channelAttr}>\n${meta}${lines.join("\n")}\n</messages>`;
}
export function stripInternalTags(text) {
    return text.replace(/<internal>[\s\S]*?<\/internal>/g, "").trim();
}
export function formatOutbound(rawText, channel) {
    const text = stripInternalTags(rawText);
    if (!text)
        return "";
    if (channel === "web") {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return text;
}
