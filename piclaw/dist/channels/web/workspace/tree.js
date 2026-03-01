import { readdirSync, statSync } from "fs";
import path from "path";
import { MAX_TREE_ENTRIES } from "./constants.js";
import { formatMtime } from "./file-utils.js";
import { shouldExcludeDir, toRelativePath } from "./paths.js";
export function buildTree(absPath, depth, state) {
    const stats = statSync(absPath);
    const node = {
        name: path.basename(absPath) || "workspace",
        path: toRelativePath(absPath),
        type: stats.isDirectory() ? "dir" : "file",
        size: stats.isDirectory() ? null : stats.size,
        mtime: formatMtime(stats),
        children: [],
    };
    state.count += 1;
    if (state.count > MAX_TREE_ENTRIES) {
        state.truncated = true;
        node.children = undefined;
        return node;
    }
    if (!stats.isDirectory() || depth <= 0) {
        node.children = undefined;
        return node;
    }
    const entries = readdirSync(absPath, { withFileTypes: true })
        .filter((entry) => !entry.isDirectory() || !shouldExcludeDir(entry.name))
        .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory())
            return -1;
        if (!a.isDirectory() && b.isDirectory())
            return 1;
        return a.name.localeCompare(b.name);
    });
    node.children = [];
    for (const entry of entries) {
        if (state.count >= MAX_TREE_ENTRIES) {
            state.truncated = true;
            break;
        }
        const childPath = path.join(absPath, entry.name);
        try {
            node.children.push(buildTree(childPath, depth - 1, state));
        }
        catch {
            // ignore unreadable paths
        }
    }
    return node;
}
export function compressPaths(paths) {
    const normalized = Array.from(new Set(paths.map((p) => (p || ".").replace(/\\/g, "/"))));
    if (normalized.includes("."))
        return ["."];
    normalized.sort((a, b) => a.length - b.length);
    return normalized.filter((candidate) => {
        let current = candidate;
        while (current.includes("/")) {
            current = current.slice(0, current.lastIndexOf("/"));
            if (normalized.includes(current))
                return false;
        }
        return true;
    });
}
