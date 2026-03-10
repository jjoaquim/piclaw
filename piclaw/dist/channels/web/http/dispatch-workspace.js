/**
 * web/http/dispatch-workspace.ts – Workspace route dispatch helpers.
 */
import { handleWorkspaceAttach, handleWorkspaceDelete, handleWorkspaceDownload, handleWorkspaceFile, handleWorkspaceRaw, handleWorkspaceTree, handleWorkspaceUpdate, handleWorkspaceUpload, } from "../handlers/workspace.js";
/**
 * Handle /workspace routes when the request matches; otherwise return null.
 */
export async function handleWorkspaceRoutes(channel, req, pathname) {
    if (req.method === "GET" && pathname === "/workspace/tree") {
        return channel.handleWorkspaceTree?.(req) ?? handleWorkspaceTree(req);
    }
    if (req.method === "GET" && pathname === "/workspace/file") {
        return channel.handleWorkspaceFile?.(req) ?? handleWorkspaceFile(req);
    }
    if (req.method === "PUT" && pathname === "/workspace/file") {
        return await (channel.handleWorkspaceUpdate?.(req) ?? handleWorkspaceUpdate(req));
    }
    if (req.method === "DELETE" && pathname === "/workspace/file") {
        return channel.handleWorkspaceDelete?.(req) ?? handleWorkspaceDelete(req);
    }
    if (req.method === "GET" && pathname === "/workspace/raw") {
        return channel.handleWorkspaceRaw?.(req) ?? handleWorkspaceRaw(req);
    }
    if (req.method === "GET" && pathname === "/workspace/download") {
        return await (channel.handleWorkspaceDownload?.(req) ?? handleWorkspaceDownload(req));
    }
    if (req.method === "POST" && pathname === "/workspace/attach") {
        return await (channel.handleWorkspaceAttach?.(req) ?? handleWorkspaceAttach(req));
    }
    if (req.method === "POST" && pathname === "/workspace/upload") {
        return await (channel.handleWorkspaceUpload?.(req) ?? handleWorkspaceUpload(req));
    }
    if (req.method === "POST" && pathname === "/workspace/visibility") {
        return channel.handleWorkspaceVisibility(req);
    }
    return null;
}
