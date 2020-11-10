import EvilCharacter from './EvilCharacter';

export default class Daemon extends EvilCharacter {
  constructor() {
    super();
    this.attack = 10;
    this.defence = 40;
    this.type = 'daemon';
    this.travelRange = 1;
    this.attackRange = 4;
  }
}
