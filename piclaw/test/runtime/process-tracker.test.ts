/**
 * test/runtime/process-tracker.test.ts – Tests for child process tracking.
 *
 * Verifies registerProcess(), unregisterProcess(), listTrackedProcesses(),
 * and killTrackedProcesses() lifecycle management.
 */

import { expect, test } from "bun:test";

import { killTrackedProcesses, listTrackedProcesses, registerProcess, unregisterProcess } from "../../src/utils/process-tracker.js";

test("process tracker registers and clears processes", () => {
  registerProcess(12345);
  expect(listTrackedProcesses()).toContain(12345);

  unregisterProcess(12345);
  expect(listTrackedProcesses()).not.toContain(12345);

  registerProcess(54321);
  const killed = killTrackedProcesses();
  expect(killed).toBe(1);
  expect(listTrackedProcesses().length).toBe(0);
});
