/**
 * channels/formatting.ts – Per-channel formatting instruction hints.
 *
 * Maps channel names to short instructions that are injected into the
 * agent's prompt (via router.ts → formatMessages()) so the agent knows
 * which markup is supported on the delivery channel.
 *
 * Consumers:
 *   - router.ts calls getChannelFormattingInstructions() when building
 *     the XML `<formatting>` block inside `<messages>`.
 */

/** Formatting hints keyed by channel name. */
export const CHANNEL_FORMATTING_HINTS: Record<string, string> = {
  web: "Use Markdown formatting in responses. Tables, headings, and links are allowed. To deliver files, use the attach_file tool on a workspace path; the UI will show a download card automatically. Use attachment:<filename> only if you want an inline embed.",
  whatsapp: "Use WhatsApp formatting only: *bold*, _italic_, • bullets, and ```code``` blocks. Avoid Markdown headings, tables, and links.",
};

/**
 * Return the formatting instructions for a given channel, or null if
 * the channel is unknown.
 */
export function getChannelFormattingInstructions(channel?: string | null): string | null {
  if (!channel) return null;
  const key = channel.toLowerCase();
  return CHANNEL_FORMATTING_HINTS[key] ?? null;
}
