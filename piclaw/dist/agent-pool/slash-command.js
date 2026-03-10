/**
 * agent-pool/slash-command.ts – Execute user slash commands via the agent session.
 *
 * When a user sends a message starting with `/`, it may be a skill invocation
 * (`/skill:web-search`), a prompt template, or an extension command. This module
 * routes the raw text through the pi-agent session's prompt() method, captures
 * the streaming output, and returns a structured result.
 *
 * The session's event subscription captures both streaming text deltas and
 * final message_end events to build the complete response text.
 *
 * Consumers:
 *   - agent-pool.ts calls executeSlashCommand() when a message is identified
 *     as a slash command (starts with "/" and matches a known skill/template/
 *     extension command).
 */
import { AGENT_TIMEOUT } from "../core/config.js";
import { detectChannel } from "../router.js";
import { withChatContext } from "../core/chat-context.js";
function extractTextFromContent(content) {
    if (!content)
        return "";
    if (typeof content === "string")
        return content;
    if (Array.isArray(content)) {
        return content
            .map((block) => {
            const contentBlock = block;
            if (contentBlock?.type !== "text")
                return "";
            return typeof contentBlock.text === "string" ? contentBlock.text : "";
        })
            .join("");
    }
    return "";
}
function toMessageRole(value) {
    return typeof value === "string" ? value : "unknown";
}
/** Execute a /skill or /prompt-template slash command within a session. */
export async function executeSlashCommand(session, chatJid, rawText) {
    const startTime = Date.now();
    try {
        console.log(`[agent-pool] Executing slash command for ${chatJid}: ${rawText}`);
        const trimmed = rawText.trim();
        if (!trimmed.startsWith("/")) {
            return { status: "error", message: "Not a slash command." };
        }
        const rawCommand = trimmed.slice(1);
        const spaceIndex = rawCommand.indexOf(" ");
        const commandName = spaceIndex === -1 ? rawCommand : rawCommand.slice(0, spaceIndex);
        const skills = session.resourceLoader.getSkills().skills;
        const templates = session.promptTemplates;
        const extensionRunner = session.extensionRunner;
        let known = false;
        if (rawCommand.startsWith("skill:")) {
            const skillName = rawCommand.slice(6).split(/\s+/)[0];
            known = skills.some((skill) => skill.name === skillName);
            if (!known) {
                return {
                    status: "error",
                    message: `Unknown skill: /skill:${skillName}. Use /commands to list available commands.`,
                };
            }
        }
        else if (templates.some((template) => template.name === commandName)) {
            known = true;
        }
        else if (extensionRunner?.getCommand(commandName)) {
            known = true;
        }
        if (!known) {
            return {
                status: "error",
                message: `Unknown command: /${commandName}. Use /commands to list available commands.`,
            };
        }
        // Collect textual output from events (both streaming deltas and final message_end)
        let assistantBuffer = "";
        const customBuffers = [];
        const capturedMessages = [];
        const onEvent = (event) => {
            try {
                if (event.type === "message_update") {
                    const messageUpdate = event.assistantMessageEvent;
                    if (messageUpdate?.type === "text_delta") {
                        assistantBuffer += messageUpdate.delta || "";
                    }
                    return;
                }
                if (event.type !== "message_end")
                    return;
                const message = event.message;
                const text = extractTextFromContent(message.content);
                if (text) {
                    capturedMessages.push({
                        role: toMessageRole(message.role),
                        text,
                        customType: typeof message.customType === "string" ? message.customType : undefined,
                    });
                }
                if (message.role === "assistant") {
                    assistantBuffer = text || assistantBuffer;
                    return;
                }
                if (text) {
                    customBuffers.push(text);
                }
            }
            catch {
                // ignore
            }
        };
        const unsub = session.subscribe(onEvent);
        let timedOut = false;
        let timeoutId = null;
        if (AGENT_TIMEOUT > 0) {
            timeoutId = setTimeout(async () => {
                timedOut = true;
                console.error(`[agent-pool] Slash command timeout after ${AGENT_TIMEOUT}ms for ${chatJid}`);
                try {
                    await session.abort();
                }
                catch { }
            }, AGENT_TIMEOUT);
        }
        const channel = detectChannel(chatJid);
        try {
            await withChatContext(chatJid, channel, async () => {
                await session.prompt(rawText);
            });
        }
        finally {
            if (timeoutId)
                clearTimeout(timeoutId);
            unsub();
        }
        if (timedOut) {
            return { status: "error", message: `Timed out after ${AGENT_TIMEOUT}ms` };
        }
        const finalText = (assistantBuffer && assistantBuffer.trim())
            ? assistantBuffer.trim()
            : customBuffers.join("\n\n").trim();
        const message = finalText || capturedMessages.map((captured) => captured.text).join("\n\n").trim();
        console.log(`[agent-pool] Slash command completed in ${Date.now() - startTime}ms (${message.length} chars)`);
        return { status: "success", message, messages: capturedMessages };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[agent-pool] Slash command error for ${chatJid}:`, message);
        return { status: "error", message };
    }
}
