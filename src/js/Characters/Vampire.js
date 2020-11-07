import Character from './Character';

export default class Vampire extends Character {
  constructor() {
    super();
    this.defence = 25;
    this.attack = 25;
    this.type = 'vampire';
  }
}
