import Bowman from './Characters/Bowman';
import Magician from './Characters/Magician';
import Swordsman from './Characters/Swordsman';
import Daemon from './Characters/Daemon';
import Undead from './Characters/Undead';
import Vampire from './Characters/Vampire';

const allowedTypesCharacters = [
  Bowman,
  Swordsman,
  Magician,
  Daemon,
  Undead,
  Vampire,
];

function getClass(level) {
  switch (level) {
    case 1:
      return {
        index: 2,
        level: 2,
        cnt: 2,
      };
    case 2:
      return {
        index: 3,
        level: 2,
        cnt: 1,
      };
    case 3:
      return {
        index: 3,
        level: 3,
        cnt: 2,
      };
    case 4:
      return {
        index: 3,
        level: 4,
        cnt: 2,
      };

    default:
      break;
  }
}


/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(maxLevel) {
  // TODO: write logic here
  const result = [];
  const answer = getClass(maxLevel);
  for (let i = 0; i < answer.cnt; i += 1) {
    const index = Math.floor(Math.random() * answer.index);
    const level = Math.floor(Math.random() * (answer.level - 1)) + 1;
    result.push(new allowedTypesCharacters[index](level));
  }
  yield result;
}

export function generateTeam(maxLevel, characterCount) {
  // TODO: write logic here
  const result = characterGenerator(maxLevel);
  return [...result];
}
