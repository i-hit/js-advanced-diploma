
import GameRules from './GameRules';
import Team from './Team';
import themes from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

    this.team = new Team();
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    // this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    // this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this));
    // this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this));

    this.gamePlay.drawUi(themes.prairie);

    const rules = new GameRules(8);

    this.team.addNewUnits(rules.getParam(1), this.gamePlay.cells);
    console.log(this.team.team);


    this.gamePlay.redrawPositions(this.team.team);
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const target = this.team.getCharacterByPosition(index);
    if (target) {
      this.gamePlay.showCellTooltip(
        `\u{1F396} ${target.level} \u{2694} ${target.attack} \u{1F6E1} ${target.defence} \u{2764} ${target.health}`, index,
      );
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
