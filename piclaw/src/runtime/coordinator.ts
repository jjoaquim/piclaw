/**
 * runtime/coordinator.ts – Runtime message-loop orchestration helpers.
 */

import {
  processMessages,
  runMessageLoop,
  type MessageLoopDeps,
  type MessageProcessingDeps,
} from "./message-loop.js";

/** Dependencies required to start the runtime message-processing loop. */
export type StartRuntimeLoopDeps = {
  queue: MessageLoopDeps["queue"];
  state: MessageLoopDeps["state"];
  agentPool: MessageProcessingDeps["agentPool"];
  whatsapp: MessageProcessingDeps["whatsapp"];
  assistantName: MessageLoopDeps["assistantName"];
  triggerPattern: MessageProcessingDeps["triggerPattern"];
  pollIntervalMs: MessageLoopDeps["pollIntervalMs"];
  runMessageLoopFn?: (deps: MessageLoopDeps) => Promise<void>;
  processMessagesFn?: (chatJid: string, deps: MessageProcessingDeps) => Promise<boolean>;
};

/**
 * Start the runtime polling loop with message-processing dependencies bound.
 */
export async function startRuntimeLoop(deps: StartRuntimeLoopDeps): Promise<void> {
  const runMessageLoopImpl = deps.runMessageLoopFn ?? runMessageLoop;
  const processMessagesImpl = deps.processMessagesFn ?? processMessages;

  await runMessageLoopImpl({
    queue: deps.queue,
    state: deps.state,
    assistantName: deps.assistantName,
    pollIntervalMs: deps.pollIntervalMs,
    processMessages: (chatJid) =>
      processMessagesImpl(chatJid, {
        agentPool: deps.agentPool,
        whatsapp: deps.whatsapp,
        state: deps.state,
        assistantName: deps.assistantName,
        triggerPattern: deps.triggerPattern,
      }),
  });
}
