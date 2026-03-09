/**
 * channels/web/interaction-broadcaster.ts – profile-aware interaction broadcast helpers.
 */

import type { InteractionRow } from "../../db.js";
import {
  broadcastAgentResponse,
  broadcastInteractionUpdated,
  type InteractionBroadcastChannel,
} from "./interaction-service.js";

/** Display profile metadata applied to broadcasted interaction payloads. */
export interface InteractionBroadcasterProfile {
  agentName: string;
  agentAvatar?: string | null;
  userName?: string | null;
  userAvatar?: string | null;
  userAvatarBackground?: string | null;
}

/** Broadcast helper contract consumed by web interaction write flows. */
export interface InteractionBroadcaster {
  broadcastAgentResponse(interaction: InteractionRow): void;
  broadcastInteractionUpdated(interaction: InteractionRow): void;
}

/** Create an interaction broadcaster bound to a channel and profile metadata. */
export function createInteractionBroadcaster(
  channel: InteractionBroadcastChannel,
  profile: InteractionBroadcasterProfile
): InteractionBroadcaster {
  return {
    broadcastAgentResponse: (interaction) => {
      broadcastAgentResponse(
        channel,
        interaction,
        profile.agentName,
        profile.agentAvatar,
        profile.userName,
        profile.userAvatar,
        profile.userAvatarBackground
      );
    },
    broadcastInteractionUpdated: (interaction) => {
      broadcastInteractionUpdated(
        channel,
        interaction,
        profile.agentName,
        profile.agentAvatar,
        profile.userName,
        profile.userAvatar,
        profile.userAvatarBackground
      );
    },
  };
}
