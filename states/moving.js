/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

let lastInteraction = 0;
Client.getKeyBindFromKey(Keyboard.KEY_W).registerKeyPress(() => {
  lastInteraction = Date.now();
});
Client.getKeyBindFromKey(Keyboard.KEY_A).registerKeyPress(() => {
  lastInteraction = Date.now();
});
Client.getKeyBindFromKey(Keyboard.KEY_S).registerKeyPress(() => {
  lastInteraction = Date.now();
});
Client.getKeyBindFromKey(Keyboard.KEY_D).registerKeyPress(() => {
  lastInteraction = Date.now();
});
Client.getKeyBindFromKey(Keyboard.KEY_SPACE).registerKeyPress(() => {
  lastInteraction = Date.now();
});
const isPlayerMoving = () => {
  const fiveMinutes = 1000 * 60 * 5;
  if (Date.now() - lastInteraction <= fiveMinutes) {
    return "Moving";
  }
};
export { isPlayerMoving };
