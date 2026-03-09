/**
 * Shared attachment registry – tracks pending file attachments per chat.
 *
 * The attach_file extension tool registers attachments here; AgentPool
 * reads them via take() after a prompt completes.
 */

/** Supported attachment categories stored for agent runs. */
export type AttachmentKind = "image" | "file";

/** Metadata for a file attachment: id, filename, content type, size. */
export interface AttachmentInfo {
  id: number;
  name: string;
  contentType: string;
  size: number;
  kind: AttachmentKind;
  sourcePath: string;
}

/** Per-session registry of file attachments created during agent runs. */
export class AttachmentRegistry {
  private pending = new Map<string, AttachmentInfo[]>();

  register(chatJid: string, info: AttachmentInfo): void {
    const list = this.pending.get(chatJid) ?? [];
    list.push(info);
    this.pending.set(chatJid, list);
  }

  take(chatJid: string): AttachmentInfo[] {
    const list = this.pending.get(chatJid) ?? [];
    this.pending.delete(chatJid);
    return list;
  }

  clear(chatJid: string): void {
    this.pending.delete(chatJid);
  }
}

// ── Module-level singleton ────────────────────────────────
// Shared between AgentPool and the file-attachments extension.

let _instance: AttachmentRegistry | null = null;

/** Get or create the AttachmentRegistry for the current chat context. */
export function getAttachmentRegistry(): AttachmentRegistry {
  if (!_instance) _instance = new AttachmentRegistry();
  return _instance;
}
