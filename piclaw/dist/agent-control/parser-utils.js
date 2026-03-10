/**
 * agent-control/parser-utils.ts – Low-level parsing utilities for commands.
 *
 * Provides helpers for:
 *   - stripTrigger(): remove @BotName prefix from messages.
 *   - parseToggle(): parse on/off/true/false toggle values.
 *   - parseQueueMode(): parse "all" / "one-at-a-time" mode strings.
 *   - splitArgs(): split arguments respecting quoted strings.
 *   - parseTreeArgs(): parse complex /tree command arguments.
 *
 * Consumers:
 *   - agent-control-parser.ts (stripTrigger).
 *   - command-parsers.ts (all other helpers).
 */
/** Parse textual on/off toggle values used in slash-control commands. */
export function parseToggle(value) {
    if (!value)
        return undefined;
    const normalized = value.trim().toLowerCase();
    if (["on", "true", "yes", "1", "enable", "enabled"].includes(normalized))
        return true;
    if (["off", "false", "no", "0", "disable", "disabled"].includes(normalized))
        return false;
    return undefined;
}
/** Parse "all" or "one-at-a-time" queue mode string. */
export function parseQueueMode(value) {
    if (!value)
        return undefined;
    const normalized = value.trim().toLowerCase();
    if (normalized === "all")
        return "all";
    if (["one", "one-at-a-time", "one_at_a_time", "single"].includes(normalized))
        return "one-at-a-time";
    return undefined;
}
/** Split an argument string respecting quoted substrings. */
export function splitArgs(input) {
    const result = [];
    let current = "";
    let quote = "";
    for (let i = 0; i < input.length; i += 1) {
        const char = input[i];
        if (quote) {
            if (char === quote) {
                quote = "";
            }
            else {
                current += char;
            }
            continue;
        }
        if (char === '"' || char === "'") {
            quote = char;
            continue;
        }
        if (char === " " || char === "\t" || char === "\n") {
            if (current) {
                result.push(current);
                current = "";
            }
            continue;
        }
        current += char;
    }
    if (current)
        result.push(current);
    return result;
}
/** Parse the complex argument syntax for /tree commands. */
export function parseTreeArgs(args) {
    const tokens = splitArgs(args);
    let targetId;
    let summarize = false;
    let customInstructions;
    let replaceInstructions = false;
    let label;
    let limit;
    let offset;
    let mode = "tail";
    let modeExplicit = false;
    const readLimit = (value) => {
        if (!value)
            return undefined;
        const parsed = parseInt(value, 10);
        if (!Number.isNaN(parsed) && parsed > 0) {
            return parsed;
        }
        return undefined;
    };
    const readOffset = (value) => {
        if (!value)
            return undefined;
        const parsed = parseInt(value, 10);
        if (!Number.isNaN(parsed) && parsed >= 0) {
            return parsed;
        }
        return undefined;
    };
    let i = 0;
    while (i < tokens.length) {
        const token = tokens[i];
        if (!token.startsWith("--") && !targetId) {
            targetId = token;
            i += 1;
            continue;
        }
        if (token === "--summarize") {
            summarize = true;
            i += 1;
            continue;
        }
        if (token === "--summary") {
            summarize = true;
            const next = tokens[i + 1];
            if (next && !next.startsWith("--")) {
                customInstructions = next;
                i += 2;
            }
            else {
                i += 1;
            }
            continue;
        }
        if (token === "--replace") {
            replaceInstructions = true;
            i += 1;
            continue;
        }
        if (token === "--label") {
            const next = tokens[i + 1];
            if (next && !next.startsWith("--")) {
                label = next;
                i += 2;
            }
            else {
                i += 1;
            }
            continue;
        }
        if (token.startsWith("--label=")) {
            label = token.slice("--label=".length);
            i += 1;
            continue;
        }
        if (token === "--head" || token === "--first") {
            mode = "head";
            modeExplicit = true;
            const next = tokens[i + 1];
            const parsed = readLimit(next && !next.startsWith("--") ? next : undefined);
            if (parsed !== undefined) {
                limit = parsed;
                i += 2;
            }
            else {
                i += 1;
            }
            continue;
        }
        if (token.startsWith("--head=")) {
            mode = "head";
            modeExplicit = true;
            const parsed = readLimit(token.slice("--head=".length));
            if (parsed !== undefined)
                limit = parsed;
            i += 1;
            continue;
        }
        if (token.startsWith("--first=")) {
            mode = "head";
            modeExplicit = true;
            const parsed = readLimit(token.slice("--first=".length));
            if (parsed !== undefined)
                limit = parsed;
            i += 1;
            continue;
        }
        if (token === "--tail" || token === "--last") {
            mode = "tail";
            modeExplicit = true;
            const next = tokens[i + 1];
            const parsed = readLimit(next && !next.startsWith("--") ? next : undefined);
            if (parsed !== undefined) {
                limit = parsed;
                i += 2;
            }
            else {
                i += 1;
            }
            continue;
        }
        if (token.startsWith("--tail=")) {
            mode = "tail";
            modeExplicit = true;
            const parsed = readLimit(token.slice("--tail=".length));
            if (parsed !== undefined)
                limit = parsed;
            i += 1;
            continue;
        }
        if (token.startsWith("--last=")) {
            mode = "tail";
            modeExplicit = true;
            const parsed = readLimit(token.slice("--last=".length));
            if (parsed !== undefined)
                limit = parsed;
            i += 1;
            continue;
        }
        if (token === "--limit") {
            const next = tokens[i + 1];
            if (next && !next.startsWith("--")) {
                const parsed = readLimit(next);
                if (parsed !== undefined) {
                    limit = parsed;
                    if (!modeExplicit)
                        mode = "head";
                }
                i += 2;
            }
            else {
                i += 1;
            }
            continue;
        }
        if (token.startsWith("--limit=")) {
            const parsed = readLimit(token.slice("--limit=".length));
            if (parsed !== undefined) {
                limit = parsed;
                if (!modeExplicit)
                    mode = "head";
            }
            i += 1;
            continue;
        }
        if (token === "--offset") {
            const next = tokens[i + 1];
            if (next && !next.startsWith("--")) {
                const parsed = readOffset(next);
                if (parsed !== undefined) {
                    offset = parsed;
                    if (!modeExplicit)
                        mode = "head";
                }
                i += 2;
            }
            else {
                i += 1;
            }
            continue;
        }
        if (token.startsWith("--offset=")) {
            const parsed = readOffset(token.slice("--offset=".length));
            if (parsed !== undefined) {
                offset = parsed;
                if (!modeExplicit)
                    mode = "head";
            }
            i += 1;
            continue;
        }
        i += 1;
    }
    if (customInstructions)
        summarize = true;
    return { targetId, summarize, customInstructions, replaceInstructions, label, limit, offset, mode };
}
/** Remove the @BotName trigger prefix from a message. */
export function stripTrigger(text, triggerPattern) {
    if (!triggerPattern)
        return text.trim();
    const flags = triggerPattern.flags.includes("g") ? triggerPattern.flags : `${triggerPattern.flags}g`;
    const pattern = new RegExp(triggerPattern.source, flags);
    return text.replace(pattern, " ").trim();
}
