export function randomIdSuffix(length = 8) {
    const raw = Math.random().toString(36).slice(2);
    return raw.length >= length ? raw.slice(0, length) : raw.padEnd(length, "0");
}
export function createId(prefix, length = 8) {
    return `${prefix}-${Date.now()}-${randomIdSuffix(length)}`;
}
export function createUuid(prefix) {
    const uuid = crypto.randomUUID();
    return `${prefix}-${uuid}`;
}
