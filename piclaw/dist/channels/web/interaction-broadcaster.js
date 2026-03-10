/**
 * channels/web/interaction-broadcaster.ts – profile-aware interaction broadcast helpers.
 */
import { broadcastAgentResponse, broadcastInteractionUpdated, } from "./interaction-service.js";
/** Create an interaction broadcaster bound to a channel and profile metadata. */
export function createInteractionBroadcaster(channel, profile) {
    return {
        broadcastAgentResponse: (interaction) => {
            broadcastAgentResponse(channel, interaction, profile.agentName, profile.agentAvatar, profile.userName, profile.userAvatar, profile.userAvatarBackground);
        },
        broadcastInteractionUpdated: (interaction) => {
            broadcastInteractionUpdated(channel, interaction, profile.agentName, profile.agentAvatar, profile.userName, profile.userAvatar, profile.userAvatarBackground);
        },
    };
}
