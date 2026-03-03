import { WorkspaceService } from "../workspace/service.js";
const workspaceService = new WorkspaceService();
function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}
export function handleWorkspaceTree(_channel, req) {
    const url = new URL(req.url);
    const showHidden = url.searchParams.get("show_hidden") === "1" || url.searchParams.get("show_hidden") === "true";
    const result = workspaceService.getTree(url.searchParams.get("path"), url.searchParams.get("depth"), showHidden);
    return jsonResponse(result.body, result.status);
}
export function handleWorkspaceFile(_channel, req) {
    const url = new URL(req.url);
    const result = workspaceService.getFile(url.searchParams.get("path"), url.searchParams.get("max"));
    return jsonResponse(result.body, result.status);
}
export function handleWorkspaceRaw(_channel, req) {
    const url = new URL(req.url);
    const result = workspaceService.getRaw(url.searchParams.get("path"));
    if (result.status !== 200) {
        return new Response(result.body, { status: result.status });
    }
    return new Response(result.body, {
        headers: { "Content-Type": result.contentType || "application/octet-stream" },
    });
}
export async function handleWorkspaceAttach(_channel, req) {
    let data;
    try {
        data = await req.json();
    }
    catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
    }
    const result = workspaceService.attachFile(data.path || null);
    return jsonResponse(result.body, result.status);
}
export async function handleWorkspaceUpload(_channel, req) {
    const url = new URL(req.url);
    let formData;
    try {
        formData = await req.formData();
    }
    catch {
        return jsonResponse({ error: "Invalid form data" }, 400);
    }
    const file = formData.get("file");
    if (!(file instanceof File)) {
        return jsonResponse({ error: "Missing file" }, 400);
    }
    const result = await workspaceService.uploadFile(url.searchParams.get("path"), file);
    return jsonResponse(result.body, result.status);
}
export async function handleWorkspaceDownload(_channel, req) {
    const url = new URL(req.url);
    const showHidden = url.searchParams.get("show_hidden") === "1" || url.searchParams.get("show_hidden") === "true";
    const result = await workspaceService.downloadZip(url.searchParams.get("path"), showHidden);
    if (result.status !== 200) {
        return jsonResponse(result.body, result.status);
    }
    return new Response(result.body, {
        headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename=\"${result.filename || "workspace.zip"}\"`,
            "Cache-Control": "no-store",
        },
    });
}
export function startWorkspaceWatcher(channel) {
    return workspaceService.startWatcher((updates) => {
        if (!channel.workspaceVisible)
            return;
        channel.broadcastEvent("workspace_update", { updates });
    }, () => channel.workspaceShowHidden);
}
