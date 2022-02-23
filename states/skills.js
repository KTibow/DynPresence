/// <reference path="../../CTAutocomplete/index.d.ts" />
/// <reference lib="es2015" />

import { getLocraw } from "../details/updateLocraw";

let skillsGained = [];

const isInSkyblock = () => {
  const location = getLocraw();
  return location?.gametype == "SKYBLOCK";
};

register("actionBar", (event) => {
  const message = ChatLib.getChatMessage(event).replace(/§./g, "");
  const xpMatch = message.match(/\+([0-9]+) ([A-Za-z ]+) \(/);
  if (!xpMatch) return;
  skillsGained.push({
    skillName: xpMatch[2],
    amount: new Number(xpMatch[1]),
    time: Date.now(),
  });
});

const findSkillGrinding = () => {
  // If the player is in Skyblock,
  // tally up the amount of xp gained per skill,
  // and return the one with the highest amount.
  // (ignore anything not from the past minute)
  if (!isInSkyblock()) return;
  const skills = {};
  for (const skill of skillsGained) {
    if (Date.now() - skill.time > 60000) continue;
    skills[skill.skillName] = (skills[skill.skillName] || 0) + skill.amount;
  }

  const sortedSkills = Object.entries(skills).sort((a, b) => b[1] - a[1]);
  if (sortedSkills.length < 1) return;
  if (sortedSkills[0][1] < 250) return;
  return `Grinding ${sortedSkills[0][0]}`;
};

export { findSkillGrinding };
