/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { isPlayerChatting } from "./chat";
import { isPlayerMoving } from "./moving";
import { isPlayerInQueue } from "./queue";

const priorities = [
  [isPlayerInQueue, "Queueing"],
  [isPlayerMoving, "Moving around"],
  // TODO: Implement Mining
  // TODO: Implement Fishing
  // TODO: Implement Foraging
  // (for skills, use the Hypixel API)
  // TODO: Make it Skyblock only
];

const findState = () => {
  const chattingAddon = isPlayerChatting() ? " & Chatting" : "";
  for (possibleState of priorities) {
    // Is the player doing this?
    if (possibleState[0]()) {
      return possibleState[1] + chattingAddon; // Return the state
    }
  }
  return "AFK" + chattingAddon;
};

export { findState };
