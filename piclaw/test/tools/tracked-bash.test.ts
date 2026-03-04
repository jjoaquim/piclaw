import { expect, test } from "bun:test";
import { getTestWorkspace, setEnv } from "../helpers.js";
import { initDatabase } from "../../src/db.js";
import { deleteKeychainEntry, setKeychainEntry } from "../../src/secure/keychain.js";
import { createTrackedBashOperations } from "../../src/tools/tracked-bash.js";

test("tracked bash executes commands and captures output", async () => {
  const ws = getTestWorkspace();
  const ops = createTrackedBashOperations();
  let output = "";

  const result = await ops.exec("echo hello", ws.workspace, {
    onData: (data) => {
      output += data.toString("utf8");
    },
    timeout: 5,
  });

  expect(result.exitCode).toBe(0);
  expect(output).toContain("hello");
});

test("tracked bash rejects missing working directory", async () => {
  const ops = createTrackedBashOperations();
  let error: Error | null = null;
  try {
    await ops.exec("echo hi", "/no/such/dir", { onData: () => {} });
  } catch (err) {
    error = err as Error;
  }

  expect(error).not.toBeNull();
  expect(error?.message).toContain("Working directory does not exist");
});

test("tracked bash resolves keychain env", async () => {
  const ws = getTestWorkspace();
  const restore = setEnv({ PICLAW_KEYCHAIN_KEY: "test-key" });
  initDatabase();

  await setKeychainEntry({
    name: "bash-env",
    type: "token",
    secret: "bash-secret",
    username: "bash-user",
  });

  const ops = createTrackedBashOperations();
  let output = "";

  try {
    const result = await ops.exec("echo \"$TOKEN|$USER\"", ws.workspace, {
      onData: (data) => {
        output += data.toString("utf8");
      },
      env: {
        TOKEN: "keychain:bash-env",
        USER: "keychain:bash-env:username",
        PATH: process.env.PATH || "",
      },
      timeout: 5,
    });

    expect(result.exitCode).toBe(0);
    expect(output.trim()).toContain("bash-secret|bash-user");
  } finally {
    deleteKeychainEntry("bash-env");
    restore();
  }
});

test("tracked bash resolves keychain placeholders in commands", async () => {
  const ws = getTestWorkspace();
  const restore = setEnv({ PICLAW_KEYCHAIN_KEY: "test-key" });
  initDatabase();

  await setKeychainEntry({
    name: "bash-cmd",
    type: "token",
    secret: "cmd-secret",
    username: "cmd-user",
  });

  const ops = createTrackedBashOperations();
  let output = "";

  try {
    const result = await ops.exec("echo keychain:bash-cmd keychain:bash-cmd:username", ws.workspace, {
      onData: (data) => {
        output += data.toString("utf8");
      },
      timeout: 5,
    });

    expect(result.exitCode).toBe(0);
    expect(output.trim()).toBe("cmd-secret cmd-user");
  } finally {
    deleteKeychainEntry("bash-cmd");
    restore();
  }
});
