/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

const parseHouse = (_locraw) => {
  const cleanFooter = ChatLib.removeFormatting(TabList.getFooter());
  const houseAuthor = cleanFooter.match(/, by (.+)\n/)?.[1];
  return `Housing by ${houseAuthor}`;
};

export { parseHouse };
