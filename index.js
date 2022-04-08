/// <reference path="../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { findLocationName } from "./details/findLocation";
import { getLocraw, isOnHypixel } from "./details/updateLocraw";
import { findImage } from "./images/findImage";
import {
  DiscordRichPresence,
  exitRichPresence,
  initRichPresence,
  setRichPresence,
} from "./presence";
import { findState } from "./states/findState";

let timeStarted = 0;
let discordConnected = false;
let lastFetch = {};
register("step", () => {
  if (timeStarted === 0 && isOnHypixel()) {
    timeStarted = Date.now();
  } else if (timeStarted !== 0 && !isOnHypixel()) {
    timeStarted = 0;
  }
  if (isOnHypixel()) {
    let start = Date.now();
    lastFetch.state = findState();
    lastFetch.location = findLocationName();
    lastFetch.image = findImage();
    lastFetch.locraw = getLocraw();
    let presence = new DiscordRichPresence();
    presence.state = lastFetch.state;
    presence.details = lastFetch.location;
    presence.startTimestamp = timeStarted;
    const images = lastFetch.image;
    if (images && images.largeImage) {
      presence.largeImageKey = images.largeImage;
    }
    if (images && images.smallImage) {
      presence.smallImageKey = images.smallImage;
    }
    setRichPresence(presence);
  }
}).setFps(2);

register("renderOverlay", () => {
  Renderer.drawString(lastFetch.state, 10, 10);
  Renderer.drawString(lastFetch.location, 10, 20);
  Renderer.drawString(JSON.stringify(lastFetch.image), 10, 30);
  Renderer.drawString(JSON.stringify(lastFetch.locraw), 10, 40);
});

register("worldLoad", () => {
  if (!discordConnected) {
    initRichPresence("945448106462441492");
    discordConnected = true;
  }
});

register("gameUnload", () => {
  exitRichPresence();
});
