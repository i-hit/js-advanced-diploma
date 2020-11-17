import Bowman from './Characters/Bowman';
import Magician from './Characters/Magician';
import Swordsman from './Characters/Swordsman';
import Daemon from './Characters/Daemon';
import Undead from './Characters/Undead';
import Vampire from './Characters/Vampire';

import themes from './themes';
import cursors from './cursors';

/**
 * @class GameRules
 */
export default class GameRules {
  /**
   *
   * @param {Number} boardSize - размер игрового поля
   */
  constructor(boardSize) {
    this.types = {
      bowman: Bowman,
      swordsman: Swordsman,
      magician: Magician,
      daemon: Daemon,
      undead: Undead,
      vampire: Vampire,
    };

    this.goodAllowedTypesCharacters = [
      Bowman,
      Swordsman,
      Magician,
    ];

    this.evilAllowedTypesCharacters = [
      Daemon,
      Undead,
      Vampire,
    ];

    this.goodStartpositions = [];

    this.evilStartpositions = [];

    this.boardSize = boardSize;

    this.getStartPosition();

    this.themes = themes;
    this.cursors = cursors;
  }

  /**
   * Создает разрешенные позиции появления новых персонажей
   */
  getStartPosition() {
    for (let a = this.boardSize; a < this.boardSize ** 2; a += this.boardSize) {
      this.goodStartpositions.push(a - this.boardSize);
      this.goodStartpositions.push(a - this.boardSize + 1);
      this.evilStartpositions.push(a - 1);
      this.evilStartpositions.push(a - 2);
    }
  }

  /**
   * Создает объект правил для генерации персонажей
   *
   * @param {Number} stage - текущая стадия игрового процесса
   *
   * @returns Object - объект правил для генерации персонажей
   */
  getParam(stage) {
    const goodParam = {
      allowedTypesCharacters: this.goodAllowedTypesCharacters,
      startpositions: this.goodStartpositions,
      maxLevel: stage - 1,
      cntUnits: 2,
    };

    const evilParam = {
      allowedTypesCharacters: this.evilAllowedTypesCharacters,
      startpositions: this.evilStartpositions,
      maxLevel: stage,
    };

    switch (stage) {
      case 1:
        goodParam.allowedTypesCharacters = [
          Bowman,
          Swordsman,
        ];
        goodParam.maxLevel = 1;
        break;
      case 2:
        goodParam.cntUnits = 1;
        break;

      default:
        break;
    }

    return {
      goodParam,
      evilParam,
    };
  }

  /**
   *
   * @param {Numbber} stage - текущая стадия игрового процесса
   *
   * @returns тему для текущей стадии игры
   */
  getThemes(stage) {
    const keys = Object.keys(this.themes);
    const index = stage <= 4 ? stage - 1 : 4;
    return this.themes[keys[index]];
  }

  /**
   * @returns Object - объект с классами персонажей
   */
  getRecoverTypes() {
    return this.types;
  }
}
