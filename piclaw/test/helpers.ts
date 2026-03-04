/**
 * test/helpers.ts – Shared test utilities and fixtures.
 *
 * Provides createTempWorkspace() for isolated temp directories,
 * getTestWorkspace() for a shared workspace across tests, and
 * setEnv() for temporarily overriding environment variables.
 *
 * Imported by nearly every test file as a setup side-effect.
 */

import { mkdtempSync, rmSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

export interface TempWorkspace {
  base: string;
  workspace: string;
  store: string;
  data: string;
  cleanup: () => void;
}

let sharedWorkspace: TempWorkspace | null = null;

export function createTempWorkspace(prefix = "piclaw-test-"): TempWorkspace {
  const base = mkdtempSync(join(tmpdir(), prefix));
  const workspace = base;
  const store = join(base, "store");
  const data = join(base, "data");
  mkdirSync(store, { recursive: true });
  mkdirSync(data, { recursive: true });
  return {
    base,
    workspace,
    store,
    data,
    cleanup: () => {
      rmSync(base, { recursive: true, force: true });
    },
  };
}

export function getTestWorkspace(): TempWorkspace {
  if (!sharedWorkspace) {
    sharedWorkspace = createTempWorkspace("piclaw-shared-test-");
  }
  return sharedWorkspace;
}

const shared = getTestWorkspace();
process.env.PICLAW_WORKSPACE = shared.workspace;
process.env.PICLAW_STORE = shared.store;
process.env.PICLAW_DATA = shared.data;

export function setEnv(vars: Record<string, string | undefined>): () => void {
  const previous: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(vars)) {
    previous[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return () => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

export async function importFresh<T = any>(modulePath: string): Promise<T> {
  const suffix = `?t=${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return import(`${modulePath}${suffix}`) as Promise<T>;
}

export async function waitFor(predicate: () => boolean, timeoutMs = 5000, intervalMs = 50): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (predicate()) return;
    await Bun.sleep(intervalMs);
  }
  throw new Error("Timed out waiting for condition");
}
