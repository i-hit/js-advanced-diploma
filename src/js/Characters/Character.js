export default class Character {
  constructor(level = 1, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;

    // TODO: throw error if user use "new Character()"
    if (new.target === Character) {
      throw new Error('don\'t use new Character()');
    }
  }

  levelUp() {
    this.level += 1;
    this.health = Math.min(100, this.health + 80);
    this.attack = Math.max(this.attack, Math.round(this.attack * ((80 + this.health) / 100)));
    this.defence = Math.max(this.defence, Math.round(this.defence * ((80 + this.health) / 100)));
  }
}
