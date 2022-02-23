/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const parseLobby = (locraw) => {
  return toTitleCase(locraw.gametype.replace("_", " ")) + " Lobby";
};

export { parseLobby };
