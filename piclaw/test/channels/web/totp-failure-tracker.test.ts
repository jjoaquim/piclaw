import { describe, expect, test } from "bun:test";
import { TotpFailureTracker } from "../../../src/channels/web/totp-failure-tracker.js";

describe("totp failure tracker", () => {
  test("locks after failure limit and clears on success", () => {
    const tracker = new TotpFailureTracker({ failureLimit: 3, lockoutMs: 1000, failureWindowMs: 1000, pruneIntervalMs: 0 });
    const now = 1_000_000;

    expect(tracker.recordFailure("ip", now).locked).toBe(false);
    expect(tracker.recordFailure("ip", now + 1).locked).toBe(false);
    const third = tracker.recordFailure("ip", now + 2);
    expect(third.locked).toBe(true);

    expect(tracker.isLocked("ip", now + 500)).toBe(true);
    expect(tracker.isLocked("ip", now + 2000)).toBe(false);

    tracker.clear("ip");
    expect(tracker.isLocked("ip", now + 2001)).toBe(false);
  });

  test("failure window trims older attempts", () => {
    const tracker = new TotpFailureTracker({ failureLimit: 2, failureWindowMs: 100, lockoutMs: 1000, pruneIntervalMs: 0 });
    const start = 2_000_000;

    expect(tracker.recordFailure("ip", start).locked).toBe(false);
    expect(tracker.recordFailure("ip", start + 150).locked).toBe(false);
  });
});
