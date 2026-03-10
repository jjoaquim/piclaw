/**
 * web/handlers/workspace.ts – HTTP handlers for the workspace explorer API.
 *
 * Handles GET /workspace/tree, GET /workspace/file, PUT/DELETE /workspace/file,
 * and upload/download/attach workspace endpoints for the web UI sidebar.
 *
 * Consumers: web/http/dispatch-workspace.ts routes workspace paths here.
 */
import { WorkspaceService } from "../workspace/service.js";
const workspaceService = new WorkspaceService();
function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}
/** Handle GET /workspace/tree: return the directory tree. */
export function handleWorkspaceTree(req) {
    const url = new URL(req.url);
    const showHidden = url.searchParams.get("show_hidden") === "1" || url.searchParams.get("show_hidden") === "true";
    const result = workspaceService.getTree(url.searchParams.get("path"), url.searchParams.get("depth"), showHidden);
    return jsonResponse(result.body, result.status);
}
/** Handle GET /workspace/file: return file content. */
export function handleWorkspaceFile(req) {
    const url = new URL(req.url);
    const result = workspaceService.getFile(url.searchParams.get("path"), url.searchParams.get("max"), url.searchParams.get("mode"));
    return jsonResponse(result.body, result.status);
}
/** Handle PUT /workspace/file: update file contents. */
export async function handleWorkspaceUpdate(req) {
    let data;
    try {
        data = await req.json();
    }
    catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
    }
    if (!data?.path) {
        return jsonResponse({ error: "Missing path" }, 400);
    }
    const result = workspaceService.updateFile(data.path, data.content ?? "");
    return jsonResponse(result.body, result.status);
}
/** Handle DELETE /workspace/file: delete a workspace file. */
export function handleWorkspaceDelete(req) {
    const url = new URL(req.url);
    const result = workspaceService.deleteFile(url.searchParams.get("path"));
    return jsonResponse(result.body, result.status);
}
/** Handle GET /workspace/raw: serve raw file content for download. */
export function handleWorkspaceRaw(req) {
    const url = new URL(req.url);
    const result = workspaceService.getRaw(url.searchParams.get("path"));
    if (result.status !== 200) {
        return new Response(result.body, { status: result.status });
    }
    return new Response(result.body, {
        headers: { "Content-Type": result.contentType || "application/octet-stream" },
    });
}
/** Handle POST /workspace/attach: attach a workspace file to agent context. */
export async function handleWorkspaceAttach(req) {
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
/** Handle POST /workspace/upload: upload a file. */
export async function handleWorkspaceUpload(req) {
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
    const overwrite = url.searchParams.get("overwrite") === "1" || url.searchParams.get("overwrite") === "true";
    const result = await workspaceService.uploadFile(url.searchParams.get("path"), file, overwrite);
    return jsonResponse(result.body, result.status);
}
/** Handle POST /workspace/file: create a new workspace file. */
export async function handleWorkspaceCreate(req) {
    let data;
    try {
        data = await req.json();
    }
    catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
    }
    if (!data?.name) {
        return jsonResponse({ error: "Missing filename" }, 400);
    }
    const result = workspaceService.createFile(data.path ?? null, data.name ?? null, data.content ?? "");
    return jsonResponse(result.body, result.status);
}
/** Handle POST /workspace/rename: rename a file or folder. */
export async function handleWorkspaceRename(req) {
    let data;
    try {
        data = await req.json();
    }
    catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
    }
    if (!data?.path) {
        return jsonResponse({ error: "Missing path" }, 400);
    }
    if (!data?.name) {
        return jsonResponse({ error: "Missing filename" }, 400);
    }
    const result = workspaceService.renameFile(data.path ?? null, data.name ?? null);
    return jsonResponse(result.body, result.status);
}
/** Handle POST /workspace/move: move a file or folder to a new directory. */
export async function handleWorkspaceMove(req) {
    let data;
    try {
        data = await req.json();
    }
    catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
    }
    if (!data?.path) {
        return jsonResponse({ error: "Missing path" }, 400);
    }
    if (!data?.target) {
        return jsonResponse({ error: "Missing target" }, 400);
    }
    const result = workspaceService.moveEntry(data.path ?? null, data.target ?? null);
    return jsonResponse(result.body, result.status);
}
/** Handle GET /workspace/download: serve a file as a download attachment. */
export async function handleWorkspaceDownload(req) {
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
/** Start the workspace filesystem watcher and wire SSE broadcasts. */
export function startWorkspaceWatcher(channel) {
    return workspaceService.startWatcher((updates) => {
        if (!channel.workspaceVisible)
            return;
        channel.broadcastEvent("workspace_update", { updates });
    }, () => channel.workspaceShowHidden);
}
