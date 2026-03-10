/**
 * agent-control/handlers/qr.ts – Generate a QR code for arbitrary text.
 *
 * Commands:
 *   /qr <text or URL>
 */
import { getChatChannel } from "../../core/chat-context.js";
import { generateQrSvg } from "../../utils/totp-qr.js";
const base64Encode = (value) => Buffer.from(value, "utf8").toString("base64");
/** Handle `/qr` control commands for rendering QR helpers/messages. */
export async function handleQr(_session, command) {
    const text = (command.text || "").trim();
    if (!text) {
        return { status: "error", message: "Usage: /qr <text or URL>" };
    }
    const channel = getChatChannel();
    if (channel !== "web") {
        return { status: "error", message: "QR codes are only available in the web UI." };
    }
    const result = generateQrSvg(text);
    const dataUrl = `data:image/svg+xml;base64,${base64Encode(result.svg)}`;
    const lines = [
        "QR code:",
        `![qr](${dataUrl})`,
        "",
        `Content: ${text}`,
    ];
    return { status: "success", message: lines.join("\n") };
}
