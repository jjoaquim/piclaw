import { USER_AVATAR, USER_NAME, setUserAvatar, setUserAvatarBackground, setUserName, } from "../../core/config.js";
import { updateUserConfig } from "../agent-control-helpers.js";
const CLEAR_VALUES = ["clear", "none", "off", "default"];
export async function handleUserName(_session, command) {
    if (!command.name) {
        const current = USER_NAME || "(default)";
        return { status: "success", message: `User name: ${current}` };
    }
    const trimmed = command.name.trim();
    const normalized = trimmed.toLowerCase();
    const nextName = CLEAR_VALUES.includes(normalized) ? null : trimmed;
    const updated = updateUserConfig({ name: nextName });
    const effective = updated.name || USER_NAME || "";
    setUserName(effective);
    return {
        status: "success",
        message: nextName ? `User name set to ${effective}.` : "User name reset to default.",
    };
}
export async function handleUserAvatar(_session, command) {
    if (!command.avatar) {
        const current = USER_AVATAR || "(default)";
        return { status: "success", message: `User avatar: ${current}` };
    }
    const trimmed = command.avatar.trim();
    const normalized = trimmed.toLowerCase();
    const nextAvatar = CLEAR_VALUES.includes(normalized) ? null : trimmed;
    const updated = updateUserConfig({
        avatar: nextAvatar,
        avatarBackground: nextAvatar === null ? null : undefined,
    });
    const effective = updated.avatar || USER_AVATAR || "";
    setUserAvatar(effective);
    if (nextAvatar === null) {
        setUserAvatarBackground("");
    }
    return {
        status: "success",
        message: nextAvatar ? `User avatar set to ${effective || "(default)"}.` : "User avatar reset to default.",
    };
}
function normalizeGithubProfile(input) {
    const raw = (input || "").trim();
    if (!raw)
        return null;
    if (raw.startsWith("@"))
        return raw.slice(1).trim() || null;
    if (!raw.includes("://"))
        return raw;
    try {
        const url = new URL(raw);
        if (!url.hostname.endsWith("github.com"))
            return null;
        const slug = url.pathname.split("/").filter(Boolean)[0];
        return slug || null;
    }
    catch {
        return null;
    }
}
export async function handleUserGithub(_session, command) {
    const login = normalizeGithubProfile(command.profile);
    if (!login) {
        return {
            status: "error",
            message: "Usage: /user-github <github profile URL or username>",
        };
    }
    const apiUrl = `https://api.github.com/users/${encodeURIComponent(login)}`;
    let response;
    try {
        response = await fetch(apiUrl, {
            headers: {
                "Accept": "application/vnd.github+json",
                "User-Agent": "piclaw",
            },
        });
    }
    catch (error) {
        return {
            status: "error",
            message: `Failed to fetch GitHub profile: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
    if (!response.ok) {
        return {
            status: "error",
            message: `Failed to fetch GitHub profile: HTTP ${response.status}`,
        };
    }
    const payload = (await response.json());
    const resolvedName = (payload.name || payload.login || login || "").trim();
    const resolvedAvatar = (payload.avatar_url || "").trim();
    if (!resolvedName || !resolvedAvatar) {
        return {
            status: "error",
            message: "GitHub profile missing name or avatar URL.",
        };
    }
    const updated = updateUserConfig({
        name: resolvedName,
        avatar: resolvedAvatar,
        avatarBackground: "clear",
    });
    setUserName(updated.name || resolvedName);
    setUserAvatar(updated.avatar || resolvedAvatar);
    setUserAvatarBackground(updated.avatarBackground || "clear");
    return {
        status: "success",
        message: `User profile set to ${resolvedName} (GitHub: ${login}).`,
    };
}
