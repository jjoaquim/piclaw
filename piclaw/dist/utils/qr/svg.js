/**
 * utils/qr/svg.ts – SVG rendering helpers for encoded QR matrices.
 */
import { buildQrMatrix } from "./engine.js";
/** Render QR code SVG for arbitrary input text (e.g., otpauth URI). */
export function generateQrSvg(data, options = {}) {
    const level = (options.level || "M").toUpperCase();
    const cellSize = Number.isFinite(options.cellSize) ? Number(options.cellSize) : 6;
    const margin = Number.isFinite(options.margin) ? Number(options.margin) : 2;
    const matrix = buildQrMatrix(data, level);
    const moduleCount = matrix.length;
    const size = (moduleCount + margin * 2) * cellSize;
    let path = "";
    for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount; col += 1) {
            if (!matrix[row][col])
                continue;
            const x = (col + margin) * cellSize;
            const y = (row + margin) * cellSize;
            path += `M${x} ${y}h${cellSize}v${cellSize}h-${cellSize}z`;
        }
    }
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n`
        + `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">\n`
        + `<rect width="100%" height="100%" fill="#ffffff"/>\n`
        + `<path d="${path}" fill="#000000"/>\n`
        + `</svg>\n`;
    return { svg };
}
