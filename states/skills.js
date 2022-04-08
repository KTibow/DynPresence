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
    time: Date.now(),
  });
});

export const findSkillGrinding = () => {
  // If the player is in Skyblock,
  // tally up the number of times the player gained XP,
  // and return the skill type with the highest amount.
  // (ignore anything not from the past minute)
  if (!isInSkyblock()) return;
  const skills = {};
  for (const skill of skillsGained) {
    if (Date.now() - skill.time > 60000) continue;
    skills[skill.skillName] = (skills[skill.skillName] || 0) + 1;
  }

  const sortedSkills = Object.entries(skills).sort((a, b) => b[1] - a[1]);
  if (sortedSkills.length < 1) return;
  if (sortedSkills[0][1] < 20) return;
  return `Grinding ${sortedSkills[0][0]}`;
};
