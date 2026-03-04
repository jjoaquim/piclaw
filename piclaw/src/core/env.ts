/**
 * core/env.ts – Reads key=value pairs from a `.env` file in the working directory.
 *
 * Used by core/config.ts during startup to fill in configuration values that
 * are not already present in the environment. Only the keys explicitly
 * requested are returned so the caller controls what is loaded.
 */

import { readFileSync } from "fs";
import { join } from "path";

/**
 * Parse a `.env` file from `process.cwd()` and return a map of the requested keys.
 *
 * Handles `#` comments, trims whitespace, and strips surrounding quotes from
 * values. Returns an empty object if the file does not exist or is unreadable.
 *
 * Called by `loadConfig()` in core/config.ts to merge .env values with
 * process.env before building the runtime configuration object.
 *
 * @param keys - The exact environment variable names to extract.
 * @returns A record mapping each found key to its unquoted string value.
 */
export function readEnvFile(keys: string[]): Record<string, string> {
  const envFile = join(process.cwd(), ".env");
  let content: string;
  try {
    content = readFileSync(envFile, "utf-8");
  } catch {
    return {};
  }
  const result: Record<string, string> = {};
  const wanted = new Set(keys);
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    if (!wanted.has(key)) continue;
    let value = trimmed.slice(eqIdx + 1).trim();
    // Strip surrounding single or double quotes from the value.
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value) result[key] = value;
  }
  return result;
}
