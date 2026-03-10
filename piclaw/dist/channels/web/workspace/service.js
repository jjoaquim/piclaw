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
/** High-level workspace explorer service combining files, tree, and watcher. */
export class WorkspaceService {
    treeCache = new WorkspaceTreeCache();
    fileService = new WorkspaceFileService();
    getTree(pathParam, depthParam, includeHidden = false) {
        return this.treeCache.getTree(pathParam, depthParam, includeHidden);
    }
    getFile(pathParam, maxParam, mode) {
        return this.fileService.getFile(pathParam, maxParam, mode);
    }
    getRaw(pathParam) {
        return this.fileService.getRaw(pathParam);
    }
    attachFile(pathParam) {
        return this.fileService.attachFile(pathParam);
    }
    uploadFile(pathParam, file, overwrite = false) {
        return this.fileService.uploadFile(pathParam, file, overwrite);
    }
    updateFile(pathParam, content) {
        return this.fileService.updateFile(pathParam, content);
    }
    deleteFile(pathParam) {
        return this.fileService.deleteFile(pathParam);
    }
    downloadZip(pathParam, includeHidden = false) {
        return this.fileService.downloadZip(pathParam, includeHidden);
    }
    startWatcher(onUpdate, includeHidden) {
        return startWorkspaceWatcher(onUpdate, includeHidden);
    }
}
