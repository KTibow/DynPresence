const DiscordRPC = Java.type("net.arikia.dev.drpc.DiscordRPC");
const DiscordEventHandlers = Java.type("net.arikia.dev.drpc.DiscordEventHandlers");
const DiscordRichPresence = Java.type("net.arikia.dev.drpc.DiscordRichPresence");

const initRichPresence = (clientID) => {
  handlers = new DiscordEventHandlers.Builder().build();
  DiscordRPC.discordInitialize(clientID, handlers, true);
};

const exitRichPresence = () => {
  DiscordRPC.discordShutdown();
};

const setRichPresence = (presence) => {
  DiscordRPC.discordUpdatePresence(presence);
};

export { initRichPresence, exitRichPresence, setRichPresence, DiscordRichPresence };
