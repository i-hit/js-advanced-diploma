import GoodCharacter from './GoodCharacter';

/**
 * @class Magician
 *
 * @extends GoodCharacter
 *
 * Создает персонажа типа 'magician'
 */
export default class Magician extends GoodCharacter {
  constructor() {
    super();
    this.attack = 10;
    this.defence = 40;
    this.type = 'magician';
    this.travelRange = 1;
    this.attackRange = 4;
  }
}
