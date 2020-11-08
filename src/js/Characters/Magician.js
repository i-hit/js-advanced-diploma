import GoodCharacter from './GoodCharacter';

export default class Magician extends GoodCharacter {
  constructor() {
    super();
    this.defence = 10;
    this.attack = 40;
    this.type = 'magician';
    this.travelRange = 1;
    this.attackRange = 4;
  }
}
