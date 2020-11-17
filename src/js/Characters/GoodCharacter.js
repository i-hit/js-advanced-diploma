import Character from './Character';

/**
 * @class GoodCharacter
 *
 * @extends Character
 *
 * Базовый класс персонажей команды good
 */
export default class GoodCharacter extends Character {
  constructor() {
    super();
    this.side = 'good';
  }
}
