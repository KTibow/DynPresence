/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { getLocraw, lastLocrawUpdate } from "../details/updateLocraw";

export const isPlayerInQueue = () => {
  const location = getLocraw();
  if (location.server?.includes("lobby")) return false;
  const isPlayerQueuing = Scoreboard.getLines().some((line) => {
    const lineText = ChatLib.removeFormatting(line.getName());
    return lineText.includes("Waiting...") || lineText.includes("Starting in");
  });
  if (
    [
      "BEDWARS",
      "SKYWARS",
      "MURDER_MYSTERY",
      "ARCADE",
      "BUILD_BATTLE",
      "DUELS",
      "PROTOTYPE",
      "UHC",
      "SPEED_UHC",
      "TNT_GAMES",
    ].includes(location.gametype) &&
    isPlayerQueuing
  ) {
    return "Queuing";
  }
  const timeSinceLastUpdate = Date.now() - lastLocrawUpdate;
  if (isPlayerQueuing && timeSinceLastUpdate > 1000 * 6) {
    ChatLib.chat(
      `&eThis game has a queue-related message in the scoreboard, but it's not marked as a queable game.&r
&eFor now, it won't show you as Queuing, just Moving Around.&r
&eIf this game is indeed queueable, or not, tell me at &9KTibow#3960&e.&r
&eDebug info to pass on:&r ${JSON.stringify(location)}`
    );
  }
};
