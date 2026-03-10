/**
 * web/workspace/service.ts – High-level workspace explorer service.
 *
 * Composes the file service, tree cache, and filesystem watcher into a
 * single service that the workspace HTTP handlers interact with.
 *
 * Consumers: web/handlers/workspace.ts creates and uses a WorkspaceService.
 */

import { WorkspaceFileService } from "./file-service.js";
import { WorkspaceTreeCache } from "./tree-cache.js";
import { startWorkspaceWatcher } from "./watcher.js";

export { createWorkspaceUpdateThrottle } from "./watcher.js";
export type { WorkspaceUpdate } from "./watcher.js";

/** High-level workspace explorer service combining files, tree, and watcher. */
export class WorkspaceService {
  private treeCache = new WorkspaceTreeCache();
  private fileService = new WorkspaceFileService();

  getTree(pathParam: string | null, depthParam?: string | null, includeHidden = false) {
    return this.treeCache.getTree(pathParam, depthParam, includeHidden);
  }

  getFile(pathParam: string | null, maxParam?: string | null, mode?: string | null) {
    return this.fileService.getFile(pathParam, maxParam, mode);
  }

  getRaw(pathParam: string | null) {
    return this.fileService.getRaw(pathParam);
  }

  attachFile(pathParam: string | null) {
    return this.fileService.attachFile(pathParam);
  }

  uploadFile(pathParam: string | null, file: File, overwrite = false) {
    return this.fileService.uploadFile(pathParam, file, overwrite);
  }

  createFile(pathParam: string | null, nameParam: string | null, content: string) {
    return this.fileService.createFile(pathParam, nameParam, content);
  }

  renameFile(pathParam: string | null, nameParam: string | null) {
    return this.fileService.renameFile(pathParam, nameParam);
  }

  moveEntry(pathParam: string | null, targetParam: string | null) {
    return this.fileService.moveEntry(pathParam, targetParam);
  }

  updateFile(pathParam: string | null, content: string) {
    return this.fileService.updateFile(pathParam, content);
  }

  deleteFile(pathParam: string | null) {
    return this.fileService.deleteFile(pathParam);
  }

  downloadZip(pathParam: string | null, includeHidden = false) {
    return this.fileService.downloadZip(pathParam, includeHidden);
  }

  startWatcher(
    onUpdate: (updates: Array<{ path: string; root: unknown; truncated: boolean }>) => void,
    includeHidden: () => boolean
  ) {
    return startWorkspaceWatcher(onUpdate, includeHidden);
  }
}
