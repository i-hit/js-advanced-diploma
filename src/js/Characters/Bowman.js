import Character from './Character';

export default class Bowman extends Character {
  constructor() {
    super();
    this.defence = 25;
    this.attack = 25;
    this.type = 'bowman';
  }
}
