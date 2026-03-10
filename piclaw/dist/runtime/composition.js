/**
 * runtime/composition.ts – runtime core composition and signal binding helpers.
 */
import { AgentPool } from "../agent-pool.js";
import { DATA_DIR } from "../core/config.js";
import { AgentQueue } from "../queue.js";
import { RuntimeState } from "./state.js";
/** Build fresh runtime core services for a single process run. */
export function createRuntimeCoreServices(deps = {}) {
    const dataDir = deps.dataDir ?? DATA_DIR;
    const createQueue = deps.createQueue ?? (() => new AgentQueue());
    const createAgentPool = deps.createAgentPool ?? (() => new AgentPool());
    const createState = deps.createState ?? ((dir) => new RuntimeState(dir));
    return {
        queue: createQueue(),
        agentPool: createAgentPool(),
        state: createState(dataDir),
    };
}
/** Register SIGTERM/SIGINT handlers for graceful runtime shutdown. */
export function registerRuntimeShutdownSignals(registrar, shutdown) {
    registrar.on("SIGTERM", () => {
        void shutdown("SIGTERM");
    });
    registrar.on("SIGINT", () => {
        void shutdown("SIGINT");
    });
}
