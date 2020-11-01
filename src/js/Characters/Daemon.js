import Character from '../Character';

export default class Daemon extends Character {
  constructor(level, type) {
    super(level, type);
    this.defence = 10;
    this.attack = 40;
    this.type = 'daemon';
  }
}
