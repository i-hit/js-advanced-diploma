import GoodCharacter from './GoodCharacter';

export default class Bowman extends GoodCharacter {
  constructor() {
    super();
    this.defence = 25;
    this.attack = 25;
    this.type = 'bowman';
    this.travelRange = 2;
    this.attackRange = 2;
  }
}
