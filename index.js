/// <reference path="../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { findLocationName } from "./details/findLocation";
import { getLocraw } from "./details/updateLocraw";
import { findState } from "./states/findState";
//import RichPresence from "RichPresence";

/*let rpc = new RichPresence("945448106462441492", {
  state: "Using KDiscordIPC",
  details: "Playing ChatTriggers",
  startTimestamp: Date.now(),
  largeImageKey: "search",
  largeImageText: "text",
});*/

register("renderOverlay", () => {
  Renderer.drawString(findState(), 10, 10);
  Renderer.drawString(findLocationName(), 10, 20);
  Renderer.drawString(JSON.stringify(getLocraw()), 10, 30);
});
