import GoodCharacter from './GoodCharacter';

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
