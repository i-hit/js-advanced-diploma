import EvilCharacter from './EvilCharacter';

export default class Undead extends EvilCharacter {
  constructor() {
    super();
    this.attack = 40;
    this.defence = 10;
    this.type = 'undead';
    this.travelRange = 4;
    this.attackRange = 1;
  }
}
