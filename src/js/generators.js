
/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(types, maxLevel) {
  // TODO: write logic here
  const index = Math.floor(Math.random() * types.length);
  const level = Math.floor(Math.random() * maxLevel) + 1;
  const character = new types[index](level);

  if (level > 1) {
    for (let i = level; i > 1; i -= 1) {
      character.levelUp();
    }
  }

  yield character;
}

export function generateTeam(param) {
  // TODO: write logic here
  let result = [];
  for (let i = param.cntUnits; i > 0; i -= 1) {
    result = [...result, ...characterGenerator(param.allowedTypesCharacters, param.maxLevel)];
  }
  return result;
}
