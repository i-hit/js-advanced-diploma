import GoodCharacter from './GoodCharacter';

/**
 * @class Swordsman
 *
 * @extends GoodCharacter
 *
 * Создает персонажа типа 'swordsman'
 */
export default class Swordsman extends GoodCharacter {
  constructor() {
    super();
    this.attack = 40;
    this.defence = 10;
    this.type = 'swordsman';
    this.travelRange = 4;
    this.attackRange = 1;
  }
}
