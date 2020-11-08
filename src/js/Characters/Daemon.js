import EvilCharacter from './EvilCharacter';

export default class Daemon extends EvilCharacter {
  constructor() {
    super();
    this.defence = 10;
    this.attack = 40;
    this.type = 'daemon';
    this.travelRange = 1;
    this.attackRange = 4;
  }
}
