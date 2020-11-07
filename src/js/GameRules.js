import Bowman from './Characters/Bowman';
import Magician from './Characters/Magician';
import Swordsman from './Characters/Swordsman';
import Daemon from './Characters/Daemon';
import Undead from './Characters/Undead';
import Vampire from './Characters/Vampire';


export default class GameRules {
  constructor(boardSize) {
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
  }

  getStartPosition() {
    for (let a = 0, b = this.boardSize - 1; a < this.boardSize ** 2; a += this.boardSize, b += this.boardSize) {
      this.goodStartpositions.push(a);
      this.goodStartpositions.push(a + 1);
      this.evilStartpositions.push(b);
      this.evilStartpositions.push(b - 1);
    }
  }

  getParam(level) {
    const goodParam = {
      allowedTypesCharacters: this.goodAllowedTypesCharacters,
      startpositions: this.goodStartpositions,
      maxLevel: level - 1,
      cntUnits: 2,
    };

    const evilParam = {
      allowedTypesCharacters: this.evilAllowedTypesCharacters,
      startpositions: this.evilStartpositions,
      maxLevel: level,
    };

    switch (level) {
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
}
