import Character from './Character';

export default class Swordsman extends Character {
  constructor() {
    super();
    this.defence = 40;
    this.attack = 10;
    this.type = 'swordsman';
  }
}
