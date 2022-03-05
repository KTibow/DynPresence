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
register("tick", () => {
  if (timeStarted === 0 && isOnHypixel()) {
    timeStarted = Date.now();
  } else if (timeStarted !== 0 && !isOnHypixel()) {
    timeStarted = 0;
  }
  if (isOnHypixel()) {
    const state = findState();
    const location = findLocationName();
    const image = findImage();
    let presence = new DiscordRichPresence();
    presence.state = state;
    presence.details = location;
    presence.startTimestamp = timeStarted;
    if (image && image.largeImage) {
      presence.largeImageKey = image.largeImage;
    }
    if (image && image.smallImage) {
      presence.smallImageKey = image.smallImage;
    }
    setRichPresence(presence);
  }
});

register("renderOverlay", () => {
  Renderer.drawString(findState(), 10, 10);
  Renderer.drawString(findLocationName(), 10, 20);
  Renderer.drawString(JSON.stringify(findImage()), 10, 30);
  Renderer.drawString(JSON.stringify(getLocraw()), 10, 40);
});

register("gameLoad", () => {
  initRichPresence("945448106462441492");
});

register("gameUnload", () => {
  exitRichPresence();
});
