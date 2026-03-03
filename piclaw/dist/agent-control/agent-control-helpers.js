import { existsSync } from "fs";
import { PICLAW_CONFIG_PATH } from "../core/config.js";
import { readJsonConfig, writeJsonConfig } from "../core/config-store.js";
export const THINKING_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh"];
export function resolveShellCwd() {
    const preferred = "/workspace";
    if (existsSync(preferred))
        return preferred;
    return process.cwd();
}
export function formatShellBlock(command, output, meta = []) {
    const lines = [`$ ${command}`];
    const trimmed = output.trimEnd();
    if (trimmed) {
        lines.push(trimmed);
    }
    else {
        lines.push("(no output)");
    }
    if (meta.length > 0) {
        lines.push(...meta);
    }
    return ["```", ...lines, "```"].join("\n");
}
export function formatCompactNumber(value) {
    if (!Number.isFinite(value))
        return String(value);
    const abs = Math.abs(value);
    const format = (divisor, suffix) => {
        const raw = (value / divisor).toFixed(1);
        const trimmed = raw.endsWith(".0") ? raw.slice(0, -2) : raw;
        return `${trimmed}${suffix}`;
    };
    if (abs >= 1_000_000_000)
        return format(1_000_000_000, "B");
    if (abs >= 1_000_000)
        return format(1_000_000, "M");
    if (abs >= 1_000)
        return format(1_000, "K");
    return String(value);
}
export function formatCurrency(value) {
    if (!Number.isFinite(value))
        return String(value);
    if (value === 0)
        return "$0";
    if (Math.abs(value) < 0.01)
        return `$${value.toFixed(4)}`;
    return `$${value.toFixed(2)}`;
}
export function truncateText(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return `${text.slice(0, Math.max(0, maxLength - 1))}…`;
}
export function extractTextFromContent(content) {
    if (!content)
        return "";
    if (typeof content === "string")
        return content;
    if (Array.isArray(content)) {
        return content
            .filter((b) => b && b.type === "text")
            .map((b) => b.text)
            .join("");
    }
    return "";
}
export function updateAssistantConfig(patch) {
    const config = readJsonConfig(PICLAW_CONFIG_PATH);
    const assistant = config.assistant && typeof config.assistant === "object"
        ? { ...config.assistant }
        : {};
    const nameKeys = ["assistantName", "assistant_name", "agentName", "agent_name", "name", "ASSISTANT_NAME"];
    const avatarKeys = [
        "assistantAvatar",
        "assistant_avatar",
        "agentAvatar",
        "agent_avatar",
        "avatar",
        "ASSISTANT_AVATAR",
    ];
    const clearKeys = (keys) => {
        for (const key of keys) {
            if (key in assistant)
                delete assistant[key];
        }
    };
    if (patch.name !== undefined) {
        clearKeys(nameKeys);
        if (patch.name !== null) {
            assistant.assistantName = patch.name;
        }
    }
    if (patch.avatar !== undefined) {
        clearKeys(avatarKeys);
        if (patch.avatar !== null) {
            assistant.assistantAvatar = patch.avatar;
        }
    }
    if (Object.keys(assistant).length > 0) {
        config.assistant = assistant;
    }
    else {
        delete config.assistant;
    }
    writeJsonConfig(PICLAW_CONFIG_PATH, config);
    return {
        name: typeof assistant.assistantName === "string" ? assistant.assistantName : undefined,
        avatar: typeof assistant.assistantAvatar === "string" ? assistant.assistantAvatar : undefined,
    };
}
export function updateUserConfig(patch) {
    const config = readJsonConfig(PICLAW_CONFIG_PATH);
    const user = config.user && typeof config.user === "object"
        ? { ...config.user }
        : {};
    const nameKeys = ["userName", "user_name", "name", "PICLAW_USER_NAME"];
    const avatarKeys = ["userAvatar", "user_avatar", "avatar", "PICLAW_USER_AVATAR"];
    const backgroundKeys = [
        "userAvatarBackground",
        "user_avatar_background",
        "userAvatarBg",
        "user_avatar_bg",
        "avatarBackground",
        "avatar_background",
        "PICLAW_USER_AVATAR_BACKGROUND",
    ];
    const clearKeys = (keys) => {
        for (const key of keys) {
            if (key in user)
                delete user[key];
        }
    };
    if (patch.name !== undefined) {
        clearKeys(nameKeys);
        if (patch.name !== null) {
            user.userName = patch.name;
        }
    }
    if (patch.avatar !== undefined) {
        clearKeys(avatarKeys);
        if (patch.avatar !== null) {
            user.userAvatar = patch.avatar;
        }
    }
    if (patch.avatarBackground !== undefined) {
        clearKeys(backgroundKeys);
        if (patch.avatarBackground !== null) {
            user.userAvatarBackground = patch.avatarBackground;
        }
    }
    if (Object.keys(user).length > 0) {
        config.user = user;
    }
    else {
        delete config.user;
    }
    writeJsonConfig(PICLAW_CONFIG_PATH, config);
    return {
        name: typeof user.userName === "string" ? user.userName : undefined,
        avatar: typeof user.userAvatar === "string" ? user.userAvatar : undefined,
        avatarBackground: typeof user.userAvatarBackground === "string" ? user.userAvatarBackground : undefined,
    };
}
export async function runPromptAndCapture(session, text) {
    let assistantBuffer = "";
    const customBuffers = [];
    const onEvent = (event) => {
        if (event.type === "message_update") {
            const me = event.assistantMessageEvent;
            if (me && me.type === "text_delta") {
                assistantBuffer += me.delta || "";
            }
        }
        if (event.type === "message_end") {
            const msg = event.message;
            const text = extractTextFromContent(msg.content);
            if (msg.role === "assistant") {
                assistantBuffer = text || assistantBuffer;
            }
            else if (text) {
                customBuffers.push(text);
            }
        }
    };
    const unsub = session.subscribe(onEvent);
    try {
        await session.prompt(text);
    }
    finally {
        unsub();
    }
    const finalText = (assistantBuffer && assistantBuffer.trim())
        ? assistantBuffer.trim()
        : customBuffers.join("\n\n").trim();
    return finalText || "(no output)";
}
export function normalizeModelMatch(models, provider, modelId) {
    const providerLower = provider.toLowerCase();
    const modelLower = modelId.toLowerCase();
    return models.find((model) => model.provider.toLowerCase() === providerLower && model.id.toLowerCase() === modelLower);
}
