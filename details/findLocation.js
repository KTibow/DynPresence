/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { parseHouse } from "./housing";
import { parseLobby } from "./lobby";
import { parseSkyblock } from "./skyblock";
import { getLocraw } from "./updateLocraw";

const locations = JSON.parse(FileLib.read("DynPresence", "details/locations.json"));

const findLocation = () => {
  // Props to ConnorLinfoot's DiscordRP for helping me understand /locraw
  const locraw = getLocraw();
  if (!Object.keys(locraw).length) {
    return [{ name: "Checking..." }, locraw];
  }
  for (let location of locations) {
    let matcher = location.matcher;
    let fullyMatches = true;
    for (let key of Object.keys(matcher)) {
      if (!new RegExp(`^${matcher[key]}$`).test(locraw[key])) {
        fullyMatches = false;
      }
    }
    if (fullyMatches) {
      return [location, locraw];
    }
  }
  ChatLib.chat(`&eDynPresence couldn't find any matches for your location.&r
&ePlease let me know at &9KTibow#3960&e.&r
&eDebug info to pass on:&r ${JSON.stringify(locraw)}`);
  return [null, locraw];
};

export const findLocationName = () => {
  const [location, locraw] = findLocation();
  if (location) {
    if (location.warn) {
      ChatLib.chat(`&eDynPresence couldn't find an exact match for your location.&r
&eFor now, it'll assume that it's the general game, or the experimental version of it.&r
&ePlease let me know about this at &9KTibow#3960&e.&r
&eDebug info to pass on:&r ${JSON.stringify(locraw)}`);
    }
    if (location.customName) {
      return eval(location.customName);
    }
    return location.name;
  }
  return "Unknown";
};
