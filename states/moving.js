/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

let lastInteraction = 0;
Client.getKeyBindFromDescription("key.forward").registerKeyPress(() => {
  lastInteraction = Date.now();
});
Client.getKeyBindFromDescription("key.left").registerKeyPress(() => {
  lastInteraction = Date.now();
});
Client.getKeyBindFromDescription("key.right").registerKeyPress(() => {
  lastInteraction = Date.now();
});
Client.getKeyBindFromDescription("key.back").registerKeyPress(() => {
  lastInteraction = Date.now();
});
Client.getKeyBindFromDescription("key.jump").registerKeyPress(() => {
  lastInteraction = Date.now();
});
export const isPlayerMoving = () => {
  const fiveMinutes = 1000 * 60 * 5;
  if (Date.now() - lastInteraction <= fiveMinutes) {
    return "Active";
  }
};
