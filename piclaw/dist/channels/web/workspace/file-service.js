import { existsSync, readFileSync, statSync, writeFileSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";
import { AsyncZipDeflate, Zip, ZipPassThrough } from "fflate";
import { createMedia } from "../../../db.js";
import { MAX_ATTACH_BYTES, MAX_PREVIEW_BYTES, MAX_UPLOAD_BYTES } from "./constants.js";
import { contentTypeForPath, detectBinary, formatMtime, isImageFile, isTextFile } from "./file-utils.js";
import { isHiddenPath, resolveWorkspacePath, shouldIgnorePath, toRelativePath } from "./paths.js";
export class WorkspaceFileService {
    getFile(pathParam, maxParam) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: { error: "Invalid path" } };
        try {
            const stats = statSync(targetPath);
            if (stats.isDirectory()) {
                return { status: 400, body: { error: "Path is a directory" } };
            }
            const relPath = toRelativePath(targetPath);
            const contentType = contentTypeForPath(targetPath);
            const isImage = isImageFile(targetPath);
            if (isImage) {
                const rawUrl = `/workspace/raw?path=${encodeURIComponent(relPath)}`;
                return {
                    status: 200,
                    body: {
                        path: relPath,
                        name: path.basename(targetPath),
                        kind: "image",
                        content_type: contentType,
                        size: stats.size,
                        mtime: formatMtime(stats),
                        url: rawUrl,
                    },
                };
            }
            const maxParsed = parseInt(maxParam || "", 10);
            const maxBytes = Number.isFinite(maxParsed)
                ? Math.min(Math.max(maxParsed, 1024), MAX_PREVIEW_BYTES)
                : 20000;
            const buffer = readFileSync(targetPath, { encoding: null });
            const slice = buffer.subarray(0, maxBytes);
            const truncated = buffer.length > maxBytes;
            if (!isTextFile(targetPath) && detectBinary(slice)) {
                return {
                    status: 200,
                    body: {
                        path: relPath,
                        name: path.basename(targetPath),
                        kind: "binary",
                        content_type: contentType,
                        size: stats.size,
                        mtime: formatMtime(stats),
                        truncated,
                    },
                };
            }
            let text = slice.toString("utf-8");
            if (path.extname(targetPath).toLowerCase() === ".json") {
                try {
                    text = JSON.stringify(JSON.parse(text), null, 2);
                }
                catch {
                    // keep raw
                }
            }
            return {
                status: 200,
                body: {
                    path: relPath,
                    name: path.basename(targetPath),
                    kind: "text",
                    content_type: contentType,
                    size: stats.size,
                    mtime: formatMtime(stats),
                    text,
                    truncated,
                },
            };
        }
        catch {
            return { status: 500, body: { error: "Failed to read file" } };
        }
    }
    getRaw(pathParam) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: "Invalid path" };
        try {
            const stats = statSync(targetPath);
            if (stats.isDirectory())
                return { status: 400, body: "Path is a directory" };
            const contentType = contentTypeForPath(targetPath);
            const file = Bun.file(targetPath);
            return { status: 200, body: file, contentType };
        }
        catch {
            return { status: 404, body: "Not found" };
        }
    }
    attachFile(pathParam) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: { error: "Invalid path" } };
        try {
            const stats = statSync(targetPath);
            if (stats.isDirectory())
                return { status: 400, body: { error: "Path is a directory" } };
            if (stats.size > MAX_ATTACH_BYTES) {
                return { status: 400, body: { error: "File too large to attach" } };
            }
            const dataBuf = readFileSync(targetPath);
            const filename = path.basename(targetPath);
            const contentType = contentTypeForPath(targetPath);
            const mediaId = createMedia(filename, contentType, new Uint8Array(dataBuf), null, {
                size: stats.size,
                kind: "file",
                source_path: targetPath,
            });
            return {
                status: 200,
                body: {
                    media_id: mediaId,
                    filename,
                    size: stats.size,
                },
            };
        }
        catch {
            return { status: 500, body: { error: "Failed to attach file" } };
        }
    }
    async uploadFile(pathParam, file) {
        const targetDir = resolveWorkspacePath(pathParam);
        if (!targetDir)
            return { status: 400, body: { error: "Invalid path" } };
        try {
            const stats = statSync(targetDir);
            if (!stats.isDirectory()) {
                return { status: 400, body: { error: "Path is not a directory" } };
            }
        }
        catch {
            return { status: 404, body: { error: "Directory not found" } };
        }
        const rawName = typeof file?.name === "string" ? file.name : "";
        const filename = path.basename(rawName || `upload-${Date.now()}`);
        if (!filename)
            return { status: 400, body: { error: "Missing filename" } };
        const size = typeof file?.size === "number" ? file.size : 0;
        if (size > MAX_UPLOAD_BYTES) {
            return { status: 400, body: { error: "File too large to upload" } };
        }
        const destPath = path.join(targetDir, filename);
        if (existsSync(destPath)) {
            return { status: 409, body: { error: "File already exists" } };
        }
        try {
            const buffer = Buffer.from(await file.arrayBuffer());
            if (buffer.length > MAX_UPLOAD_BYTES) {
                return { status: 400, body: { error: "File too large to upload" } };
            }
            writeFileSync(destPath, buffer);
            const relPath = toRelativePath(destPath);
            return {
                status: 200,
                body: {
                    path: relPath,
                    name: filename,
                    size: buffer.length,
                },
            };
        }
        catch {
            return { status: 500, body: { error: "Failed to upload file" } };
        }
    }
    async downloadZip(pathParam, includeHidden = false) {
        const targetDir = resolveWorkspacePath(pathParam);
        if (!targetDir)
            return { status: 400, body: { error: "Invalid path" } };
        try {
            const stats = statSync(targetDir);
            if (!stats.isDirectory()) {
                return { status: 400, body: { error: "Path is not a directory" } };
            }
        }
        catch {
            return { status: 404, body: { error: "Directory not found" } };
        }
        const rootName = path.basename(targetDir) || "workspace";
        const zipRoot = rootName.replace(/[\\/]+/g, "").trim() || "workspace";
        const stream = new ReadableStream({
            async start(controller) {
                const zip = new Zip();
                zip.ondata = (err, data, final) => {
                    if (err) {
                        controller.error(err);
                        return;
                    }
                    controller.enqueue(data);
                    if (final)
                        controller.close();
                };
                const addDir = async (absDir, zipBase) => {
                    const entries = await readdir(absDir, { withFileTypes: true });
                    for (const entry of entries) {
                        const absPath = path.join(absDir, entry.name);
                        if (shouldIgnorePath(absPath))
                            continue;
                        if (!includeHidden && isHiddenPath(absPath))
                            continue;
                        const zipPath = `${zipBase}/${entry.name}`;
                        if (entry.isDirectory()) {
                            const dirEntry = new ZipPassThrough(`${zipPath}/`);
                            zip.add(dirEntry);
                            dirEntry.push(new Uint8Array(), true);
                            await addDir(absPath, zipPath);
                        }
                        else if (entry.isFile()) {
                            const deflate = new AsyncZipDeflate(zipPath);
                            zip.add(deflate);
                            const file = Bun.file(absPath);
                            const fileStream = file.stream();
                            for await (const chunk of fileStream) {
                                const data = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk);
                                deflate.push(data, false);
                            }
                            deflate.push(new Uint8Array(), true);
                        }
                    }
                };
                try {
                    const rootEntry = new ZipPassThrough(`${zipRoot}/`);
                    zip.add(rootEntry);
                    rootEntry.push(new Uint8Array(), true);
                    await addDir(targetDir, zipRoot);
                    zip.end();
                }
                catch (error) {
                    controller.error(error);
                }
            },
        });
        return {
            status: 200,
            body: stream,
            filename: `${zipRoot}.zip`,
        };
    }
}
