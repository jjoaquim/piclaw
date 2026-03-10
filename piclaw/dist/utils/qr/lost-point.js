/**
 * utils/qr/lost-point.ts – Penalty score evaluation for QR mask selection.
 */
/** Compute the QR mask penalty score (lower is better). */
export function getLostPoint(qrCode) {
    const moduleCount = qrCode.getModuleCount();
    let lostPoint = 0;
    for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount; col += 1) {
            let sameCount = 0;
            const dark = qrCode.isDark(row, col);
            for (let r = -1; r <= 1; r += 1) {
                if (row + r < 0 || moduleCount <= row + r)
                    continue;
                for (let c = -1; c <= 1; c += 1) {
                    if (col + c < 0 || moduleCount <= col + c)
                        continue;
                    if (r === 0 && c === 0)
                        continue;
                    if (dark === qrCode.isDark(row + r, col + c))
                        sameCount += 1;
                }
            }
            if (sameCount > 5) {
                lostPoint += 3 + sameCount - 5;
            }
        }
    }
    for (let row = 0; row < moduleCount - 1; row += 1) {
        for (let col = 0; col < moduleCount - 1; col += 1) {
            let count = 0;
            if (qrCode.isDark(row, col))
                count += 1;
            if (qrCode.isDark(row + 1, col))
                count += 1;
            if (qrCode.isDark(row, col + 1))
                count += 1;
            if (qrCode.isDark(row + 1, col + 1))
                count += 1;
            if (count === 0 || count === 4) {
                lostPoint += 3;
            }
        }
    }
    for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount - 6; col += 1) {
            if (qrCode.isDark(row, col) &&
                !qrCode.isDark(row, col + 1) &&
                qrCode.isDark(row, col + 2) &&
                qrCode.isDark(row, col + 3) &&
                qrCode.isDark(row, col + 4) &&
                !qrCode.isDark(row, col + 5) &&
                qrCode.isDark(row, col + 6)) {
                lostPoint += 40;
            }
        }
    }
    for (let col = 0; col < moduleCount; col += 1) {
        for (let row = 0; row < moduleCount - 6; row += 1) {
            if (qrCode.isDark(row, col) &&
                !qrCode.isDark(row + 1, col) &&
                qrCode.isDark(row + 2, col) &&
                qrCode.isDark(row + 3, col) &&
                qrCode.isDark(row + 4, col) &&
                !qrCode.isDark(row + 5, col) &&
                qrCode.isDark(row + 6, col)) {
                lostPoint += 40;
            }
        }
    }
    let darkCount = 0;
    for (let col = 0; col < moduleCount; col += 1) {
        for (let row = 0; row < moduleCount; row += 1) {
            if (qrCode.isDark(row, col))
                darkCount += 1;
        }
    }
    const ratio = Math.abs((100 * darkCount) / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
}
