/**
 * runtime/coordinator.ts – Runtime message-loop orchestration helpers.
 */
import { processMessages, runMessageLoop, } from "./message-loop.js";
/**
 * Start the runtime polling loop with message-processing dependencies bound.
 */
export async function startRuntimeLoop(deps) {
    const runMessageLoopImpl = deps.runMessageLoopFn ?? runMessageLoop;
    const processMessagesImpl = deps.processMessagesFn ?? processMessages;
    await runMessageLoopImpl({
        queue: deps.queue,
        state: deps.state,
        assistantName: deps.assistantName,
        pollIntervalMs: deps.pollIntervalMs,
        processMessages: (chatJid) => processMessagesImpl(chatJid, {
            agentPool: deps.agentPool,
            whatsapp: deps.whatsapp,
            state: deps.state,
            assistantName: deps.assistantName,
            triggerPattern: deps.triggerPattern,
        }),
    });
}
