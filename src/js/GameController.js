/* eslint-disable no-alert */

/**
 * @class GameController
 */
export default class GameController {
  constructor(gamePlay, stateService, gameState) {
    this.gamePlay = gamePlay;
    this.gameState = gameState;
    this.stateService = stateService;
  }

  /**
   * Инициирует события
   *
   * Вызывает метод отрисовки UI
   */
  init() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this));

    this.gamePlay.drawUi(this.gameState.rules.getThemes(this.gameState.gameStage));
  }

  /**
   * События при клике мышкой:
   * * выделение
   * * перемещение
   * * атака
   *
   * @param {Number} index - номер ячейки
   */
  onCellClick(index) {
    const target = this.gameState.team.getCharacterByPosition(index);
    if (!this.gameState.selectedCharacter && target) {
      if (target.side === this.gameState.playerSide) {
        this.gameState.selectedCharacter = this.gameState.team.getElementByPosition(index);
      }

      if (target.side !== this.gameState.playerSide) {
        this.gamePlay.showError('это персонаж противника');
      }
    }

    if (this.gameState.selectedCharacter && !target) {
      if (this.gamePlay.canMoved(index, this.gameState.selectedCharacter)) {
        this.gameState.selectedCharacter.position = index;
        this.gameState.selectedCharacter = undefined;
        this.gamePlay.deselectAllCell();
        this.gamePlay.redrawPositions(this.gameState.team.team);
        this.nextMove();
      } else {
        this.gamePlay.showMessage('слишком далеко шагать');
      }
    }

    if (this.gameState.selectedCharacter && target) {
      if (target.side === this.gameState.playerSide) {
        this.gamePlay.deselectAllCell();
        this.gamePlay.selectCell(index);
        this.gameState.selectedCharacter = this.gameState.team.getElementByPosition(index);
      }

      if (target.side !== this.gameState.playerSide) {
        if (this.gamePlay.canAttack(index, this.gameState.selectedCharacter)) {
          const damage = Math.max(
            this.gameState.selectedCharacter.character.attack - target.defence,
            this.gameState.selectedCharacter.character.attack * 0.1,
          );
          this.gamePlay.showDamage(index, damage)
            .then(() => {
              target.health -= damage;
              if (target.health <= 0) {
                this.gameState.team.deleteDeadCharacter(index);
              }

              this.gamePlay.deselectAllCell();
              this.gameState.selectedCharacter = undefined;
              this.gamePlay.redrawPositions(this.gameState.team.team);

              this.checkWin();
              this.nextMove();
            });
        } else {
          this.gamePlay.showMessage('цель слишком далеко');
        }
      }
    }
  }

  /**
   * События при наведении мышкой:
   * * тултип
   * * курсор выделения
   * * курсор недопустимого действия
   * * фон перемещения
   * * фон и курсор атаки
   *
   * @param {Number} index - номер ячейки
   */
  onCellEnter(index) {
    const target = this.gameState.team.getCharacterByPosition(index);

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

    if (!this.gameState.selectedCharacter && target) {
      if (target.side !== this.gameState.playerSide) {
        this.gamePlay.setCursor(this.gameState.rules.cursors.notallowed);
      }

      if (target.side === this.gameState.playerSide) {
        this.gamePlay.setCursor(this.gameState.rules.cursors.pointer);
      }
    }

    if (this.gameState.selectedCharacter && !target) {
      if (this.gamePlay.canMoved(index, this.gameState.selectedCharacter)) {
        this.gamePlay.selectCell(index, 'green');
        this.gamePlay.setCursor(this.gameState.rules.cursors.pointer);
      } else {
        this.gamePlay.setCursor(this.gameState.rules.cursors.notallowed);
      }
    }

    if (this.gameState.selectedCharacter && target) {
      if (target.side !== this.gameState.playerSide) {
        if (this.gamePlay.canAttack(index, this.gameState.selectedCharacter)) {
          this.gamePlay.selectCell(index, 'red');
          this.gamePlay.setCursor(this.gameState.rules.cursors.crosshair);
        } else {
          this.gamePlay.setCursor(this.gameState.rules.cursors.notallowed);
        }
      }

      if (target.side === this.gameState.playerSide) {
        this.gamePlay.setCursor(this.gameState.rules.cursors.pointer);
      }
    }
  }

  /**
   * События при выходе мышки из ячейки:
   * * прячет тултип
   * * снимает выделение фона
   *
   * @param {Number} index - номер ячейки
   */
  onCellLeave(index) {
    this.gamePlay.setCursor(this.gameState.rules.cursors.auto);

    const target = this.gamePlay.cells[index];
    if (target.title) {
      this.gamePlay.hideCellTooltip(index);
    }

    if (this.gameState.selectedCharacter && index !== this.gameState.selectedCharacter.position) {
      this.gamePlay.deselectCell(index);
    }
  }

  /**
   * Проверяет есть ли победа\поражение на текущей стадии игры
   */
  checkWin() {
    if (this.gameState.team.team.every((e) => e.character.side === this.gameState.playerSide)) {
      switch (this.gameState.playerSide) {
        case ('good'):
          this.nextStage();
          break;
        default:
          alert('You Lose');
          break;
      }
    }
  }

  /**
   * Переключает стадию игры на +1
   *
   * Если стадия игры = 4 объявляет победу
   */
  nextStage() {
    this.gameState.gameStage += 1;
    if (this.gameState.gameStage > 4) {
      alert('WIN');
      this.onNewGameClick();
    } else {
      this.gameState.team.team.forEach((e) => e.character.levelUp());
      this.gameState.team.addNewUnits(this.gameState.rules.getParam(this.gameState.gameStage));

      this.prepareStage();
    }
  }

  /**
   * Отрисовка UI
   *
   * Обновление позиций персонажей
   */
  prepareStage() {
    this.gamePlay.drawUi(this.gameState.rules.getThemes(this.gameState.gameStage));

    this.gamePlay.redrawPositions(this.gameState.team.team);
  }

  /**
   * Сброс команд и настроек к начальному значению
   */
  reset() {
    this.gameState.team.reset();
    this.gameState.gameStage = 1;
    this.gameState.playerSide = 'good';
    this.gameState.currentSide = 'good';
    this.gameState.selectedCharacter = undefined;
  }

  /**
   * Переключает активного игрока
   */
  nextMove() {
    this.gameState.currentSide = this.gameState.currentSide === 'good' ? 'evil' : 'good';
    this.gameState.playerSide = this.gameState.currentSide;
    // if (this.gameState.currentSide !== this.gameState.playerSide) {
    //   this.skyNet();
    // }
  }

  /**
   * Логика AI
   */
  // skyNet() {
  //   let enemies = this.gameState.team.goodTeam;
  //   let ally = this.gameState.team.evilTeam;
  //   if (this.gameState.currentSide === 'good') {
  // let enemies = this.gameState.team.evilTeam;
  // let ally = this.gameState.team.goodTeam;
  // }
  //   const enemyPosition = enemies.reduce((a, b) => [...a, b.position], []);

  // }

  /**
   * События при клике по кнопке "NewGame"
   * * сброс значений
   * * добавление новых персонажей
   * * обновление интерфейса и позиций
   */
  onNewGameClick() {
    this.reset();
    this.gameState.team.addNewUnits(this.gameState.rules.getParam(this.gameState.gameStage));

    this.prepareStage();
  }

  /**
   * События при клике по кнопке "SaveGame"
   * * сохраняет текущее состояние игры в локальном хранилище ( "state" )
   */
  onSaveGameClick() {
    this.stateService.save(this.gameState.from());
  }

  /**
   * События при клике по кнопке "LoadGame"
   * * загружает состояние игры из локального хранилища ( "state" )
   */
  onLoadGameClick() {
    const result = this.stateService.load();
    this.gameState.load(result);

    this.prepareStage();
    if (this.gameState.selectedCharacter) {
      this.gamePlay.selectCell(this.gameState.selectedCharacter.position);
    }
  }
}
