import GameRules from './GameRules';
import Team from './Team';

/**
 * @class GameState
 */
export default class GameState {
  /**
   *
   * @param {Number} boardSize - размер игрового поля
   */
  constructor(boardSize) {
    this.gameStage = 1;
    this.playerSide = 'good';
    this.currentSide = 'good';
    this.selectedCharacter = undefined;
    this.team = new Team();
    this.rules = new GameRules(boardSize);
  }

  /**
   * @returns объект текущего состояния игры
   */
  from() {
    return {
      gameStage: this.gameStage,
      playerSide: this.playerSide,
      currentSide: this.currentSide,
      selectedCharacter: this.selectedCharacter,
      team: this.team,
    };
  }

  /**
   *
   * @param {Object} object - объект 'state'
   * сохраненный в localStorage
   */
  load(object) {
    console.log(object);
    if (!object) {
      throw new Error('Ошибка загрузки игры');
    }

    this.gameStage = object.gameStage;
    this.playerSide = object.playerSide;
    this.currentSide = object.currentSide;

    const goodTeam = this.team.recoverTeam(object.team.goodTeam, this.rules.getRecoverTypes());
    const evilTeam = this.team.recoverTeam(object.team.evilTeam, this.rules.getRecoverTypes());

    this.team = new Team(goodTeam, evilTeam);

    this.selectedCharacter = object.selectedCharacter
      ? this.team.getElementByPosition(object.selectedCharacter.position)
      : undefined;
  }
}
