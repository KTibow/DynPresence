/// <reference path="../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { findLocationName } from "./details/findLocation";
import { getLocraw } from "./details/updateLocraw";
import {
  DiscordRichPresence,
  exitRichPresence,
  initRichPresence,
  setRichPresence,
} from "./presence";
import { findState } from "./states/findState";

/*let rpc = new RichPresence("945448106462441492", {
  state: "Using KDiscordIPC",
  details: "Playing ChatTriggers",
  startTimestamp: Date.now(),
  largeImageKey: "search",
  largeImageText: "text",
});*/
initRichPresence("945448106462441492");

const isOnHypixel = () => {
  return Server.getIP()?.includes("hypixel");
};

let timeStarted = 0;
register("tick", () => {
  if (timeStarted === 0 && isOnHypixel()) {
    timeStarted = Date.now();
  } else if (timeStarted !== 0 && !isOnHypixel()) {
    timeStarted = 0;
  }
  if (isOnHypixel()) {
    const state = findState();
    const location = findLocationName();
    let presence = new DiscordRichPresence();
    presence.state = state;
    presence.details = location;
    presence.startTimestamp = timeStarted;
    setRichPresence(presence);
  }
});

register("renderOverlay", () => {
  Renderer.drawString(findState(), 10, 10);
  Renderer.drawString(findLocationName(), 10, 20);
  Renderer.drawString(JSON.stringify(getLocraw()), 10, 30);
});

register("gameUnload", () => {
  exitRichPresence();
});
