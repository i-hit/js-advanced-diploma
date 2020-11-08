import EvilCharacter from './EvilCharacter';

export default class Undead extends EvilCharacter {
  constructor() {
    super();
    this.defence = 40;
    this.attack = 10;
    this.type = 'undead';
    this.travelRange = 4;
    this.attackRange = 1;
  }
}
