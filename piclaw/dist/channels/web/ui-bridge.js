/**
 * web/ui-bridge.ts – Bridges pi-agent's ExtensionUIContext to SSE events.
 *
 * Translates extension UI requests (confirmation dialogs, input prompts)
 * into SSE events for the web UI, and resolves them when the user responds
 * via the API. This allows agent extensions to interact with the user
 * through the web UI in real time.
 *
 * Consumers: channels/web.ts sets up the UI bridge during agent runs.
 */
import { createFallbackTheme } from "./theme.js";
const WEB_THEME_NAMES = [
    "default",
    "tango",
    "xterm",
    "monokai",
    "monokai-pro",
    "ristretto",
    "dracula",
    "catppuccin",
    "nord",
    "gruvbox",
    "solarized",
    "tokyo",
    "miasma",
    "github",
    "gotham",
];
function normalizeThemePayload(input) {
    if (!input)
        return null;
    if (typeof input === "string") {
        return { theme: input };
    }
    if (typeof input === "object") {
        const obj = input;
        const name = typeof obj.theme === "string" ? obj.theme : typeof obj.name === "string" ? obj.name : "";
        if (!name)
            return null;
        const tint = typeof obj.tint === "string" ? obj.tint : obj.tint === null ? null : undefined;
        return { theme: name, tint };
    }
    return null;
}
/** Bridges extension UI prompts (confirm/input) to SSE events and API responses. */
export class UiBridge {
    channel;
    pendingUiRequests = new Map();
    uiRequestCounter = 0;
    editorTextByChat = new Map();
    themeByChat = new Map();
    fallbackTheme = createFallbackTheme();
    constructor(channel) {
        this.channel = channel;
    }
    async bindSession(session, chatJid) {
        if (!chatJid.startsWith("web:"))
            return;
        const waitForIdle = async () => {
            if (!session.isStreaming)
                return;
            await new Promise((resolve) => {
                const unsub = session.subscribe((event) => {
                    if (event.type === "agent_end") {
                        unsub();
                        resolve();
                    }
                });
            });
        };
        const uiContext = this.createUiContext(chatJid);
        await session.bindExtensions({
            uiContext,
            commandContextActions: {
                waitForIdle,
                newSession: async (options) => {
                    const ok = await session.newSession(options);
                    return { cancelled: !ok };
                },
                fork: async (entryId) => {
                    const result = await session.fork(entryId);
                    return { cancelled: result.cancelled };
                },
                navigateTree: async (targetId, options) => {
                    const result = await session.navigateTree(targetId, options);
                    return { cancelled: result.cancelled };
                },
                switchSession: async (sessionPath) => {
                    const ok = await session.switchSession(sessionPath);
                    return { cancelled: !ok };
                },
                reload: () => session.reload(),
            },
            onError: (error) => {
                console.error("[web] Extension error:", error);
                this.channel.broadcastEvent("extension_ui_error", error);
            },
        });
    }
    createUiContext(chatJid) {
        const requestUiResponse = async (kind, payload, timeoutMs = 120000) => {
            const requestId = `ui-${Date.now()}-${++this.uiRequestCounter}`;
            return new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    this.pendingUiRequests.delete(requestId);
                    this.channel.broadcastEvent("extension_ui_timeout", { request_id: requestId, kind, chat_jid: chatJid });
                    resolve(undefined);
                }, timeoutMs);
                this.pendingUiRequests.set(requestId, { resolve, reject, timeoutId, kind });
                this.channel.broadcastEvent("extension_ui_request", {
                    request_id: requestId,
                    kind,
                    chat_jid: chatJid,
                    ...payload,
                });
            });
        };
        const fallbackTheme = this.fallbackTheme;
        return {
            select: async (title, options, opts) => {
                const timeoutMs = typeof opts?.timeout === "number" ? opts.timeout : 120000;
                const result = await requestUiResponse("select", { title, options, opts }, timeoutMs);
                return typeof result === "string" ? result : undefined;
            },
            confirm: async (title, message, opts) => {
                const timeoutMs = typeof opts?.timeout === "number" ? opts.timeout : 120000;
                const result = await requestUiResponse("confirm", { title, message, opts }, timeoutMs);
                return Boolean(result);
            },
            input: async (title, placeholder, opts) => {
                const timeoutMs = typeof opts?.timeout === "number" ? opts.timeout : 120000;
                const result = await requestUiResponse("input", { title, placeholder, opts }, timeoutMs);
                return typeof result === "string" ? result : undefined;
            },
            notify: (message, type) => {
                this.channel.broadcastEvent("extension_ui_notify", { chat_jid: chatJid, message, type });
            },
            onTerminalInput: () => () => { },
            setStatus: (key, text) => {
                this.channel.broadcastEvent("extension_ui_status", { chat_jid: chatJid, key, text });
            },
            setWorkingMessage: (message) => {
                this.channel.broadcastEvent("extension_ui_working", { chat_jid: chatJid, message });
            },
            setWidget: (key, content, options) => {
                if (Array.isArray(content)) {
                    this.channel.broadcastEvent("extension_ui_widget", { chat_jid: chatJid, key, content, options });
                }
            },
            setFooter: () => { },
            setHeader: () => { },
            setTitle: (title) => {
                this.channel.broadcastEvent("extension_ui_title", { chat_jid: chatJid, title });
            },
            custom: async (_factory, _options) => {
                const result = await requestUiResponse("custom", { title: "Custom UI" });
                return result;
            },
            pasteToEditor: (text) => {
                const current = this.editorTextByChat.get(chatJid) || "";
                const updated = current + text;
                this.editorTextByChat.set(chatJid, updated);
                this.channel.broadcastEvent("extension_ui_editor_text", { chat_jid: chatJid, text: updated });
            },
            setEditorText: (text) => {
                this.editorTextByChat.set(chatJid, text);
                this.channel.broadcastEvent("extension_ui_editor_text", { chat_jid: chatJid, text });
            },
            getEditorText: () => this.editorTextByChat.get(chatJid) || "",
            editor: async (title, prefill) => {
                const result = await requestUiResponse("editor", { title, prefill });
                return typeof result === "string" ? result : undefined;
            },
            setEditorComponent: () => { },
            get theme() {
                return fallbackTheme;
            },
            getAllThemes: () => WEB_THEME_NAMES.map((name) => ({ name, path: undefined })),
            getTheme: (name) => {
                if (typeof name !== "string")
                    return undefined;
                const normalized = name.trim().toLowerCase();
                if (!WEB_THEME_NAMES.includes(normalized))
                    return undefined;
                return undefined;
            },
            setTheme: (nextTheme) => {
                const payload = normalizeThemePayload(nextTheme);
                if (!payload)
                    return { success: false, error: "Invalid theme payload" };
                this.themeByChat.set(chatJid, payload);
                this.channel.broadcastEvent("ui_theme", { chat_jid: chatJid, ...payload });
                return { success: true };
            },
            getToolsExpanded: () => false,
            setToolsExpanded: () => { },
        };
    }
    handleUiResponse(requestId, outcome) {
        const pending = this.pendingUiRequests.get(requestId);
        if (!pending)
            return { status: "unknown_request" };
        clearTimeout(pending.timeoutId);
        this.pendingUiRequests.delete(requestId);
        pending.resolve(outcome);
        return { status: "ok" };
    }
    stop() {
        for (const pending of this.pendingUiRequests.values()) {
            clearTimeout(pending.timeoutId);
            try {
                pending.reject(new Error("Web channel stopped"));
            }
            catch {
                // ignore
            }
        }
        this.pendingUiRequests.clear();
    }
}
