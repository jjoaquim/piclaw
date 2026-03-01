export const CHANNEL_FORMATTING_HINTS = {
    web: "Use Markdown formatting in responses. Tables, headings, and links are allowed. To deliver files, use the attach_file tool on a workspace path; the UI will show a download card automatically. Use attachment:<filename> only if you want an inline embed.",
    whatsapp: "Use WhatsApp formatting only: *bold*, _italic_, • bullets, and ```code``` blocks. Avoid Markdown headings, tables, and links.",
};
export function getChannelFormattingInstructions(channel) {
    if (!channel)
        return null;
    const key = channel.toLowerCase();
    return CHANNEL_FORMATTING_HINTS[key] ?? null;
}
