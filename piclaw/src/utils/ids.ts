export function randomIdSuffix(length = 8): string {
  const raw = Math.random().toString(36).slice(2);
  return raw.length >= length ? raw.slice(0, length) : raw.padEnd(length, "0");
}

export function createId(prefix: string, length = 8): string {
  return `${prefix}-${Date.now()}-${randomIdSuffix(length)}`;
}

export function createUuid(prefix: string): string {
  const uuid = crypto.randomUUID();
  return `${prefix}-${uuid}`;
}
