/**
 * agent-pool/usage.ts – Extract and persist LLM token usage from agent events.
 *
 * Listens for `message_end` events with `role: "assistant"` and usage metadata,
 * then writes a TokenUsageRecord to the database (db/token-usage.ts).
 *
 * Consumers:
 *   - agent-pool.ts calls recordMessageUsage() inside its event handler for
 *     each assistant message completion during an agent run.
 */
import { storeTokenUsage } from "../db.js";
function asRecord(value) {
    if (!value || typeof value !== "object")
        return null;
    return value;
}
function asNumber(record, key) {
    const value = record[key];
    return typeof value === "number" ? value : 0;
}
function asStringOrNull(value) {
    return typeof value === "string" ? value : null;
}
/**
 * Extract token usage from an assistant message and store it in the database.
 * Called on each `message_end` event during agent execution.
 */
export function recordMessageUsage(chatJid, message) {
    const msg = asRecord(message);
    if (!msg || msg.role !== "assistant")
        return;
    const usage = asRecord(msg.usage);
    if (!usage)
        return;
    const input = asNumber(usage, "input");
    const output = asNumber(usage, "output");
    const cacheRead = asNumber(usage, "cacheRead");
    const cacheWrite = asNumber(usage, "cacheWrite");
    const totalTokens = asNumber(usage, "totalTokens") ||
        asNumber(usage, "total") ||
        input + output + cacheRead + cacheWrite;
    const cost = asRecord(usage.cost) ?? {};
    const costInput = asNumber(cost, "input");
    const costOutput = asNumber(cost, "output");
    const costCacheRead = asNumber(cost, "cacheRead");
    const costCacheWrite = asNumber(cost, "cacheWrite");
    const costTotal = asNumber(cost, "total") ||
        costInput + costOutput + costCacheRead + costCacheWrite;
    const runAt = typeof msg.timestamp === "string"
        ? (() => {
            const ts = new Date(msg.timestamp);
            return Number.isNaN(ts.getTime()) ? new Date().toISOString() : ts.toISOString();
        })()
        : new Date().toISOString();
    storeTokenUsage({
        chat_jid: chatJid,
        run_at: runAt,
        input_tokens: input,
        output_tokens: output,
        cache_read_tokens: cacheRead,
        cache_write_tokens: cacheWrite,
        total_tokens: totalTokens,
        cost_input: costInput,
        cost_output: costOutput,
        cost_cache_read: costCacheRead,
        cost_cache_write: costCacheWrite,
        cost_total: costTotal,
        model: asStringOrNull(msg.model),
        provider: asStringOrNull(msg.provider),
        api: asStringOrNull(msg.api),
        turns: 1,
    });
}
