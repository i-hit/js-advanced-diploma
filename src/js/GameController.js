
import GameRules from './GameRules';
import Team from './Team';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

    this.gameStep = 1;
    this.playerSide = 'good';
    this.team = new Team();
    this.rules = new GameRules(this.gamePlay.boardSize);
    this.selectedCharacter = undefined;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    // this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this));
    // this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this));
    this.gamePlay.drawUi(this.rules.getThemes(this.gameStep));
  }

  onCellClick(index) {
    // TODO: react to click
    const target = this.team.getCharacterByPosition(index);
    if (!this.selectedCharacter && target) {
      if (target.side === this.playerSide) {
        this.selectedCharacter = this.team.getElementByPosition(index);
      }

      if (target.side !== this.playerSide) {
        this.gamePlay.showError('это персонаж противника');
      }
    }

    if (this.selectedCharacter && target) {
      if (target.side === this.playerSide) {
        this.gamePlay.deselectAllCell();
        this.gamePlay.selectCell(index);
        this.selectedCharacter = this.team.getElementByPosition(index);
      }

      if (target.side !== this.playerSide) {
        if (this.gamePlay.canAttack(index, this.selectedCharacter)) {
          const damage = Math.max(
            this.selectedCharacter.character.attack - target.defence,
            this.selectedCharacter.character.attack * 0.1,
          );
          this.gamePlay.showDamage(index, damage);
          target.health -= damage;
          if (target.health <= 0) {
            this.team.deleteDeadCharacter(index);
          }
          this.gamePlay.redrawPositions(this.team.team);
        }
      }
    }

    if (this.selectedCharacter && !target) {
      if (this.gamePlay.canMoved(index, this.selectedCharacter)) {
        this.selectedCharacter.position = index;
        this.selectedCharacter = undefined;
        this.gamePlay.deselectAllCell(index);
        this.gamePlay.redrawPositions(this.team.team);
      }
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const target = this.team.getCharacterByPosition(index);

    if (target) {
      this.gamePlay.showCellTooltip(
        `\u{1F396} ${target.level
        } \u{2694} ${target.attack
        } \u{1F6E1} ${target.defence
        } \u{2764} ${target.health
        } \u{27B9} ${target.attackRange
        } \u{1F463} ${target.travelRange}`, index,
      );
    }

    if (!this.selectedCharacter && target) {
      if (target.side !== this.playerSide) {
        this.gamePlay.setCursor(this.rules.cursors.notallowed);
      }

      if (target.side === this.playerSide) {
        this.gamePlay.setCursor(this.rules.cursors.pointer);
      }
    }

    if (this.selectedCharacter && !target) {
      if (this.gamePlay.canMoved(index, this.selectedCharacter)) {
        this.gamePlay.selectCell(index, 'green');
        this.gamePlay.setCursor(this.rules.cursors.pointer);
      }
    }

    if (this.selectedCharacter && target) {
      if (target.side !== this.playerSide) {
        if (this.gamePlay.canAttack(index, this.selectedCharacter)) {
          this.gamePlay.selectCell(index, 'red');
          this.gamePlay.setCursor(this.rules.cursors.crosshair);
        }

        if (!this.gamePlay.canAttack(index, this.selectedCharacter)) {
          this.gamePlay.setCursor(this.rules.cursors.notallowed);
        }
      }

      if (target.side === this.playerSide) {
        this.gamePlay.setCursor(this.rules.cursors.pointer);
      }
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.setCursor(this.rules.cursors.auto);

    const target = this.gamePlay.cells[index];
    if (target.title) {
      this.gamePlay.hideCellTooltip(index);
    }

    if (this.selectedCharacter && index !== this.selectedCharacter.position) {
      this.gamePlay.deselectCell(index);
    }
  }

  onNewGameClick() {
    this.team.reset();

    this.gamePlay.drawUi(this.rules.getThemes(this.gameStep));
    this.team.addNewUnits(this.rules.getParam(this.gameStep), this.gamePlay.cells);


    this.gamePlay.redrawPositions(this.team.team);
  }
}
