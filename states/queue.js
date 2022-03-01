/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { getLocraw } from "../details/updateLocraw";

const isPlayerInQueue = () => {
  const location = getLocraw();
  if (location.server?.includes("lobby")) return false;
  const isPlayerQueueing = Scoreboard.getLines().some((line) => {
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
    isPlayerQueueing
  ) {
    return "Queueing";
  }
  if (isPlayerQueueing) {
    ChatLib.chat(
      `&eThis game has a queue-related message in the scoreboard, but it's not marked as a queable game.&r`
    );
    ChatLib.chat(
      `&eFor now, it won't show you as Queueing, just Moving Around.&r`
    );
    ChatLib.chat(
      `&eIf this game is indeed queueable, or not, tell me at &9KTibow#3960&e.&r`
    );
    ChatLib.chat(`&eDebug info to pass on:&r ${JSON.stringify(location)}`);
  }
};

export { isPlayerInQueue };
