/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { isPlayerChatting } from "./chat";
import { isPlayerMoving } from "./moving";
import { isPlayerInQueue } from "./queue";
import { findSkillGrinding } from "./skills";

const priorities = [
  findSkillGrinding,
  isPlayerInQueue,
  isPlayerMoving,
  // TODO: Implement Mining
  // TODO: Implement Fishing
  // TODO: Implement Foraging
  // (for skills, use the Hypixel API)
  // TODO: Make it Skyblock only
];

const findState = () => {
  const chattingAddon = isPlayerChatting() ? " & Chatting" : "";
  for (activityTester of priorities) {
    // Is the player doing this?
    let playerActivity = activityTester();
    if (playerActivity) {
      return playerActivity + chattingAddon; // Return the state
    }
  }
  return "AFK" + chattingAddon;
};

export { findState };
