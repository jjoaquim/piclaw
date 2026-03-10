/**
 * runtime/bootstrap.ts – Runtime bootstrap orchestration and default dependency wiring.
 */
import { ASSISTANT_NAME, POLL_INTERVAL, TRIGGER_PATTERN, } from "../core/config.js";
import { stopIpcWatcher } from "../ipc.js";
import { stopSchedulerLoop } from "../task-scheduler.js";
import { registerRuntimeShutdownSignals } from "./composition.js";
import { startRuntimeLoop } from "./coordinator.js";
import { registerOptionalProviders } from "./provider-bootstrap.js";
import { createShutdownHandler } from "./shutdown.js";
import { createWhatsAppChannel, initializeRuntimeEnvironment, startOptionalPushoverChannel, startWebChannel, } from "./startup.js";
import { createRuntimeSenders, startRuntimeWorkers, } from "./wiring.js";
/**
 * Build default runtime bootstrap dependencies from production modules.
 */
export function createDefaultRuntimeBootstrapDeps(core) {
    return {
        core,
        assistantName: ASSISTANT_NAME,
        triggerPattern: TRIGGER_PATTERN,
        pollIntervalMs: POLL_INTERVAL,
        signalRegistrar: process,
        initializeRuntimeEnvironment: () => initializeRuntimeEnvironment(core.state),
        registerOptionalProviders: () => registerOptionalProviders(core.agentPool),
        startWebChannel: () => startWebChannel(core.queue, core.agentPool),
        startOptionalPushoverChannel: () => startOptionalPushoverChannel(),
        createWhatsAppChannel: () => createWhatsAppChannel(core.state),
        createShutdownHandler,
        registerRuntimeShutdownSignals,
        createRuntimeSenders,
        startRuntimeWorkers,
        startRuntimeLoop,
        log: (message) => console.log(message),
        stopIpcWatcher,
        stopSchedulerLoop,
    };
}
/**
 * Bootstrap and run all runtime subsystems in production order.
 */
export async function bootstrapRuntime(deps) {
    const { queue, agentPool, state } = deps.core;
    deps.initializeRuntimeEnvironment(state);
    deps.registerOptionalProviders(agentPool);
    deps.log("=== Piclaw - Pi Coding Agent Assistant ===");
    const web = await deps.startWebChannel(queue, agentPool);
    const pushover = await deps.startOptionalPushoverChannel();
    const whatsapp = deps.createWhatsAppChannel(state);
    const shutdown = deps.createShutdownHandler({
        queue,
        agentPool,
        whatsapp,
        web,
        pushover,
        stopIpcWatcher: deps.stopIpcWatcher,
        stopSchedulerLoop: deps.stopSchedulerLoop,
    });
    deps.registerRuntimeShutdownSignals(deps.signalRegistrar, shutdown);
    const senders = deps.createRuntimeSenders(web, whatsapp, pushover);
    deps.startRuntimeWorkers(queue, agentPool, web, senders);
    await whatsapp.connect();
    await deps.startRuntimeLoop({
        queue,
        state,
        agentPool,
        whatsapp,
        assistantName: deps.assistantName,
        triggerPattern: deps.triggerPattern,
        pollIntervalMs: deps.pollIntervalMs,
    });
}
