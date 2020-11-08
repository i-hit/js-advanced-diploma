import EvilCharacter from './EvilCharacter';

export default class Vampire extends EvilCharacter {
  constructor() {
    super();
    this.defence = 25;
    this.attack = 25;
    this.type = 'vampire';
    this.travelRange = 2;
    this.attackRange = 2;
  }
}
