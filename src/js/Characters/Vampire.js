import EvilCharacter from './EvilCharacter';

/**
 * @class Vampire
 *
 * @extends EvilCharacter
 *
 * Создает персонажа типа 'vampire'
 */
export default class Vampire extends EvilCharacter {
  constructor() {
    super();
    this.attack = 25;
    this.defence = 25;
    this.type = 'vampire';
    this.travelRange = 2;
    this.attackRange = 2;
  }
}
