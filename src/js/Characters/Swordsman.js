import GoodCharacter from './GoodCharacter';

export default class Swordsman extends GoodCharacter {
  constructor() {
    super();
    this.defence = 40;
    this.attack = 10;
    this.type = 'swordsman';
    this.travelRange = 4;
    this.attackRange = 1;
  }
}
