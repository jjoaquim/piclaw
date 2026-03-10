/**
 * db/token-usage.ts – Records LLM token consumption and cost per agent run.
 *
 * After each agent turn completes, the agent pool (agent-pool/usage.ts)
 * calls storeTokenUsage() to persist the token counts, cost breakdown, and
 * model/provider metadata.
 *
 * Consumers:
 *   - agent-pool/usage.ts calls storeTokenUsage() after every agent run.
 *   - agent-control/handlers/info.ts queries the table for `/usage` reports.
 *   - The token-chart skill reads the table to generate usage visualisations.
 */
import { getDb } from "./connection.js";
/** Insert a token-usage record for a completed agent run. */
export function storeTokenUsage(record) {
    const db = getDb();
    db.prepare(`INSERT INTO token_usage (
      chat_jid,
      run_at,
      input_tokens,
      output_tokens,
      cache_read_tokens,
      cache_write_tokens,
      total_tokens,
      cost_input,
      cost_output,
      cost_cache_read,
      cost_cache_write,
      cost_total,
      model,
      provider,
      api,
      turns
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(record.chat_jid, record.run_at, record.input_tokens, record.output_tokens, record.cache_read_tokens, record.cache_write_tokens, record.total_tokens, record.cost_input, record.cost_output, record.cost_cache_read, record.cost_cache_write, record.cost_total, record.model ?? null, record.provider ?? null, record.api ?? null, record.turns ?? null);
}
function normalizeLimit(limit) {
    return Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 5;
}
/** Return overall token and cost totals for a chat. */
export function getTokenUsageTotals(chatJid) {
    const db = getDb();
    const row = db.prepare(`SELECT
      COALESCE(SUM(input_tokens), 0) AS input_tokens,
      COALESCE(SUM(output_tokens), 0) AS output_tokens,
      COALESCE(SUM(cache_read_tokens), 0) AS cache_read_tokens,
      COALESCE(SUM(cache_write_tokens), 0) AS cache_write_tokens,
      COALESCE(SUM(total_tokens), 0) AS total_tokens,
      COALESCE(SUM(cost_total), 0) AS cost_total,
      COUNT(*) AS runs
     FROM token_usage
     WHERE chat_jid = ?`).get(chatJid);
    return row ?? {
        input_tokens: 0,
        output_tokens: 0,
        cache_read_tokens: 0,
        cache_write_tokens: 0,
        total_tokens: 0,
        cost_total: 0,
        runs: 0,
    };
}
/** Return per-provider token and cost totals for a chat, sorted by total tokens. */
export function getTokenUsageByProvider(chatJid, limit = 5) {
    const db = getDb();
    return db.prepare(`SELECT
      provider,
      SUM(input_tokens) AS input_tokens,
      SUM(output_tokens) AS output_tokens,
      SUM(cache_read_tokens) AS cache_read_tokens,
      SUM(cache_write_tokens) AS cache_write_tokens,
      SUM(total_tokens) AS total_tokens,
      SUM(cost_total) AS cost_total,
      COUNT(*) AS runs
     FROM token_usage
     WHERE chat_jid = ?
     GROUP BY provider
     ORDER BY total_tokens DESC
     LIMIT ?`).all(chatJid, normalizeLimit(limit));
}
/** Return per-model token and cost totals for a chat, sorted by total tokens. */
export function getTokenUsageByModel(chatJid, limit = 5) {
    const db = getDb();
    return db.prepare(`SELECT
      model,
      SUM(input_tokens) AS input_tokens,
      SUM(output_tokens) AS output_tokens,
      SUM(cache_read_tokens) AS cache_read_tokens,
      SUM(cache_write_tokens) AS cache_write_tokens,
      SUM(total_tokens) AS total_tokens,
      SUM(cost_total) AS cost_total,
      COUNT(*) AS runs
     FROM token_usage
     WHERE chat_jid = ?
     GROUP BY model
     ORDER BY total_tokens DESC
     LIMIT ?`).all(chatJid, normalizeLimit(limit));
}
