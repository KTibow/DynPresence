/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

const parseSkyblock = (locraw) => {
  if (locraw.mode == "dynamic") {
    // Private island
    for (let text of TabList.getNames()) {
      let rawText = ChatLib.removeFormatting(text);
      if (rawText.includes("Owner")) {
        const islandOwner = rawText.split(":")[1].trim();
        return `${islandOwner}'s Skyblock Island`;
      }
    }
    return "Private Island";
  }
  if (locraw.map) {
    let islandSection = "";
    for (let text of Scoreboard.getLines()) {
      let rawText = ChatLib.removeFormatting(text.getName());
      if (rawText.includes("⏣")) {
        islandSection = rawText.split("⏣")[1].trim();
      }
    }
    islandSection = islandSection.replace(/[^a-zA-Z0-9 ]/g, "");
    if (islandSection && islandSection != locraw.map) {
      return `${islandSection} in the Skyblock ${locraw.map}`;
    } else {
      return `Skyblock ${locraw.map}`;
    }
  }
  ChatLib.chat(
    `&eDynPresence couldn't find any Skyblock matches for your location.&r`
  );
  ChatLib.chat(`&ePlease let me know at &9KTibow#3960&e.&r`);
  ChatLib.chat(`&eDebug info to pass on:&r ${JSON.stringify(locraw)}`);
  return "Skyblock";
};

export { parseSkyblock };
