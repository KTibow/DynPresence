/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

let lastLocraw = {};
let lastLocrawUpdate = 0;

register("chat", (event) => {
  try {
    const message = ChatLib.getChatMessage(event).replace(/§./g, "");
    // If the message is a JSON object, parse it
    lastLocraw = JSON.parse(message);
    lastLocrawUpdate = Date.now();
  } catch (e) {
    return;
  }
}).setPriority(Priority.HIGH);

const isOnHypixel = () => {
  return Server.getIP()?.includes("hypixel");
};

register("step", () => {
  const timeSinceLastUpdate = Date.now() - lastLocrawUpdate;
  if (timeSinceLastUpdate > 1000 * 60 && isOnHypixel()) {
    ChatLib.say("/locraw");
  }
  // Ask for the current location every minute
}).setFps(1);

register("worldLoad", () => {
  lastLocrawUpdate = Date.now() - 1000 * (60 - 5);
  // Wait 5 seconds before asking for the current location
});

const getLocraw = () => {
  return lastLocraw;
};

export { getLocraw, isOnHypixel };
