import Character from './Character';

/**
 * @class EvilCharacter
 *
 * @extends Character
 *
 * Базовый класс персонажей команды evil
 */
export default class EvilCharacter extends Character {
  constructor() {
    super();
    this.side = 'evil';
  }
}
