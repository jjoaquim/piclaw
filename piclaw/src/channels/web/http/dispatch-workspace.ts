/**
 * web/http/dispatch-workspace.ts – Workspace route dispatch helpers.
 */

import {
  handleWorkspaceAttach,
  handleWorkspaceCreate,
  handleWorkspaceDelete,
  handleWorkspaceDownload,
  handleWorkspaceFile,
  handleWorkspaceRaw,
  handleWorkspaceMove,
  handleWorkspaceRename,
  handleWorkspaceTree,
  handleWorkspaceUpdate,
  handleWorkspaceUpload,
} from "../handlers/workspace.js";

/** Channel contract required by workspace-route HTTP dispatcher. */
export interface WorkspaceDispatchChannel {
  handleWorkspaceVisibility(req: Request): Promise<Response>;
  handleWorkspaceTree?(req: Request): Response;
  handleWorkspaceFile?(req: Request): Response;
  handleWorkspaceUpdate?(req: Request): Promise<Response>;
  handleWorkspaceDelete?(req: Request): Response;
  handleWorkspaceRaw?(req: Request): Response;
  handleWorkspaceDownload?(req: Request): Promise<Response>;
  handleWorkspaceAttach?(req: Request): Promise<Response>;
  handleWorkspaceUpload?(req: Request): Promise<Response>;
  handleWorkspaceCreate?(req: Request): Promise<Response>;
  handleWorkspaceRename?(req: Request): Promise<Response>;
  handleWorkspaceMove?(req: Request): Promise<Response>;
}

/**
 * Handle /workspace routes when the request matches; otherwise return null.
 */
export async function handleWorkspaceRoutes(
  channel: WorkspaceDispatchChannel,
  req: Request,
  pathname: string
): Promise<Response | null> {
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

  if (req.method === "POST" && pathname === "/workspace/file") {
    return await (channel.handleWorkspaceCreate?.(req) ?? handleWorkspaceCreate(req));
  }

  if (req.method === "POST" && pathname === "/workspace/rename") {
    return await (channel.handleWorkspaceRename?.(req) ?? handleWorkspaceRename(req));
  }

  if (req.method === "POST" && pathname === "/workspace/move") {
    return await (channel.handleWorkspaceMove?.(req) ?? handleWorkspaceMove(req));
  }

  if (req.method === "POST" && pathname === "/workspace/visibility") {
    return channel.handleWorkspaceVisibility(req);
  }

  return null;
}
