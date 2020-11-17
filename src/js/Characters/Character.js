/**
 * @class Character - базовый класс персонажей
 */
export default class Character {
  /**
   *
   * @param {Number} level - уровень персонажа
   * @param {String} type - тип персонажа
   */
  constructor(level = 1, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
    this.travelRange = 0;
    this.attackRange = 0;

    if (new.target === Character) {
      throw new Error('don\'t use new Character()');
    }
  }

  /**
   * @method levelUp
   *
   * Повышает уровень на 1
   *
   * уровень здоровья +80, но не больше 100
   *
   * Прибавка атаки\защиты по формуле
   */
  levelUp() {
    this.level += 1;
    this.health = Math.min(100, this.health + 80);
    this.attack = Math.max(this.attack, Math.round(this.attack * ((80 + this.health) / 100)));
    this.defence = Math.max(this.defence, Math.round(this.defence * ((80 + this.health) / 100)));
  }
}
