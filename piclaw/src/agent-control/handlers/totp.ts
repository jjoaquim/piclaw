/**
 * agent-control/handlers/totp.ts – Generate a TOTP enrolment QR code.
 *
 * Commands:
 *   /totp enrol   – generate an SVG QR code for the configured TOTP secret
 */

import type { AgentSession } from "@mariozechner/pi-coding-agent";
import type { AgentControlCommand, AgentControlResult } from "../agent-control-types.js";
import { ASSISTANT_NAME, USER_NAME, WEB_TOTP_SECRET } from "../../core/config.js";
import { getChatChannel } from "../../core/chat-context.js";
import { generateTotpQr } from "../../utils/totp-qr.js";

type TotpCommand = Extract<AgentControlCommand, { type: "totp" }>;

const base64Encode = (value: string): string => Buffer.from(value, "utf8").toString("base64");

export async function handleTotp(_session: AgentSession, command: TotpCommand): Promise<AgentControlResult> {
  const action = (command.action || "").toLowerCase();
  if (action && action !== "enrol" && action !== "enroll") {
    return { status: "error", message: "Usage: /totp enrol" };
  }

  if (!WEB_TOTP_SECRET || !WEB_TOTP_SECRET.trim()) {
    return { status: "error", message: "TOTP is not configured (PICLAW_WEB_TOTP_SECRET is empty)." };
  }

  const channel = getChatChannel();
  if (channel !== "web") {
    return { status: "error", message: "TOTP enrolment QR codes are only available in the web UI." };
  }

  const issuer = ASSISTANT_NAME || "Piclaw";
  const label = USER_NAME ? `${issuer}:${USER_NAME}` : issuer;

  const result = generateTotpQr({
    secret: WEB_TOTP_SECRET.trim(),
    issuer,
    label,
  });

  const dataUrl = `data:image/svg+xml;base64,${base64Encode(result.svg)}`;
  const lines = [
    "Scan this QR code with your authenticator app:",
    `![totp-qr](${dataUrl})`,
    "",
    `Issuer: ${result.issuer}`,
    `Label: ${result.label}`,
    `Secret: ${result.secret}`,
  ];

  return { status: "success", message: lines.join("\n") };
}
