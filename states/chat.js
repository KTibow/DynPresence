/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

const isChat = (chat) => {
  return (
    !chat.message.startsWith("/") ||
    chat.message.startsWith("/ac") ||
    chat.message.startsWith("/achat") ||
    chat.message.startsWith("/pc") ||
    chat.message.startsWith("/pchat") ||
    chat.message.startsWith("/party chat") ||
    chat.message.startsWith("/gc") ||
    chat.message.startsWith("/gchat") ||
    chat.message.startsWith("/guild chat") ||
    chat.message.startsWith("/cc") ||
    chat.message.startsWith("/cchat") ||
    chat.message.startsWith("/coopchat")
  );
};
register("messageSent", (message) => {
  lastChats.push({
    message: message,
    timestamp: Date.now(),
  });
});
let lastChats = [];
const isPlayerChatting = () => {
  let recentChatCount = 0;
  for (chat of lastChats) {
    const isRecent = Date.now() - chat.timestamp < 1000 * 60;
    if (isChat(chat) && isRecent) {
      recentChatCount++;
    }
  }
  return recentChatCount >= 5;
};
export { isPlayerChatting };
