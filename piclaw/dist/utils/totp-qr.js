/**
 * utils/totp-qr.ts – TOTP secret + otpauth URI + QR SVG helpers.
 */
import { randomBytes } from "node:crypto";
import { generateQrSvg } from "./qr/svg.js";
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
/** Base32-encode binary input without padding (RFC 4648 alphabet). */
export const base32Encode = (buffer) => {
    let bits = 0;
    let value = 0;
    let output = "";
    for (const byte of buffer) {
        value = (value << 8) | byte;
        bits += 8;
        while (bits >= 5) {
            output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
            bits -= 5;
        }
    }
    if (bits > 0) {
        output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
    }
    return output;
};
/**
 * Generate a TOTP secret, otpauth URI, and matching QR SVG payload.
 *
 * Also exported for direct QR rendering consumers via `generateQrSvg`.
 */
export function generateTotpQr(options = {}) {
    const secret = options.secret || base32Encode(randomBytes(20));
    const label = options.label || "Piclaw:ISD Claw";
    const issuer = options.issuer || "Piclaw";
    const digits = Number.isFinite(options.digits) ? Number(options.digits) : 6;
    const period = Number.isFinite(options.period) ? Number(options.period) : 30;
    const algorithm = (options.algorithm || "SHA1").toUpperCase();
    const otpauth = `otpauth://totp/${encodeURIComponent(label)}?secret=${secret}`
        + `&issuer=${encodeURIComponent(issuer)}`
        + `&algorithm=${encodeURIComponent(algorithm)}`
        + `&digits=${digits}`
        + `&period=${period}`;
    const { svg } = generateQrSvg(otpauth, {
        level: options.level,
        cellSize: options.cellSize,
        margin: options.margin,
    });
    return { secret, label, issuer, otpauth, svg };
}
export { generateQrSvg };
