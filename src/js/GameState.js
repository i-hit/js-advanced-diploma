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
    this.score = 0;
    this.scoreBest = 0;
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
      score: this.score,
      scoreBest: this.scoreBest,
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
    this.gameStage = object.gameStage;
    this.score = object.score;
    this.scoreBest = object.scoreBest;
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
