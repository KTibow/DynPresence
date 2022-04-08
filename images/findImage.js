/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { parseSkyblock } from "../details/skyblock";
import { getLocraw } from "../details/updateLocraw";
import { isPlayerMoving } from "../states/moving";
import { isPlayerInQueue } from "../states/queue";
import { findSkillGrinding } from "../states/skills";

const images = JSON.parse(FileLib.read("DynPresence", "images/images.json"));

export const findImage = () => {
  // Props to ConnorLinfoot's DiscordRP for helping me understand /locraw
  const locraw = getLocraw();
  if (!Object.keys(locraw).length) {
    return;
  }
  let largeImage = null;
  let smallImage = null;
  for (let image of images) {
    const locMatcher = image.locMatcher;
    let fullyMatches = true;
    for (let key of Object.keys(locMatcher || {})) {
      if (!new RegExp(`^${locMatcher[key]}$`).test(locraw[key])) {
        fullyMatches = false;
      }
    }
    /*if (image.scriptMatcher && !eval(image.scriptMatcher)) {
      fullyMatches = false;
    }*/
    if (fullyMatches) {
      if (!largeImage && image.largeImage) {
        largeImage = image.largeImage;
      }
      if (!smallImage && image.smallImage) {
        smallImage = image.smallImage;
      }
    }
  }
  return { largeImage: largeImage, smallImage: smallImage };
  /*ChatLib.chat(`&eDynPresence couldn't find any matches for your location.&r`);
  ChatLib.chat(`&ePlease let me know at &9KTibow#3960&e.&r`);
  ChatLib.chat(`&eDebug info to pass on:&r ${JSON.stringify(locraw)}`);
  return [null, locraw];*/
};
