import Character from './Characters/Character';

/**
 * @class PositionedCharacter
 */
export default class PositionedCharacter {
  /**
   * Позиционирует персонажа в выбранной ячейке
   *
   * @param {Character} character - персонаж
   * @param {Number} position - номер ячейки
   */
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error('character must be instance of Character or its children');
    }

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }
}
