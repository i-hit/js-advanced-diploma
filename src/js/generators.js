
/**
 * Generates random characters
 *
 * @param {Array} types - allowedTypes iterable of classes
 * @param {Number} maxLevel - max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(types, maxLevel) {
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

/**
 *
 * @param {Object} param - объект с параметрами для создания персонажей
 *
 * @returns team - команду созданных персонажей
 */
export function generateTeam(param) {
  let result = [];
  for (let i = param.cntUnits; i > 0; i -= 1) {
    result = [...result, ...characterGenerator(param.allowedTypesCharacters, param.maxLevel)];
  }
  return result;
}
