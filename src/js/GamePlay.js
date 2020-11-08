/* eslint-disable no-restricted-syntax */
import { calcHealthLevel, calcTileType } from './utils';
import themes from './themes';

export default class GamePlay {
  constructor() {
    this.boardSize = 8;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.cellEnterListeners = [];
    this.cellLeaveListeners = [];
    this.newGameListeners = [];
    this.saveGameListeners = [];
    this.loadGameListeners = [];

    this.selectedCell = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  /**
   * Draws boardEl with specific theme
   *
   * @param theme
   */
  drawUi(theme) {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="controls">
        <button data-id="action-restart" class="btn">New Game</button>
        <button data-id="action-save" class="btn">Save Game</button>
        <button data-id="action-load" class="btn">Load Game</button>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.newGameEl = this.container.querySelector('[data-id=action-restart]');
    this.saveGameEl = this.container.querySelector('[data-id=action-save]');
    this.loadGameEl = this.container.querySelector('[data-id=action-load]');

    this.newGameEl.addEventListener('click', (event) => this.onNewGameClick(event));
    this.saveGameEl.addEventListener('click', (event) => this.onSaveGameClick(event));
    this.loadGameEl.addEventListener('click', (event) => this.onLoadGameClick(event));

    this.boardEl = this.container.querySelector('[data-id=board]');

    this.boardEl.classList.add(theme);
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell', 'map-tile', `map-tile-${calcTileType(i, this.boardSize)}`);
      cellEl.addEventListener('mouseenter', (event) => this.onCellEnter(event));
      cellEl.addEventListener('mouseleave', (event) => this.onCellLeave(event));
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  /**
   * Draws positions (with chars) on boardEl
   *
   * @param positions array of PositionedCharacter objects
   */
  redrawPositions(positions) {
    for (const cell of this.cells) {
      cell.innerHTML = '';
    }

    for (const position of positions) {
      const cellEl = this.boardEl.children[position.position];
      const charEl = document.createElement('div');
      charEl.classList.add('character', position.character.type);

      const healthEl = document.createElement('div');
      healthEl.classList.add('health-level');

      const healthIndicatorEl = document.createElement('div');
      healthIndicatorEl.classList.add('health-level-indicator', `health-level-indicator-${calcHealthLevel(position.character.health)}`);
      healthIndicatorEl.style.width = `${position.character.health}%`;
      healthEl.appendChild(healthIndicatorEl);

      charEl.appendChild(healthEl);
      cellEl.appendChild(charEl);
    }
  }

  /**
   * Add listener to mouse enter for cell
   *
   * @param callback
   */
  addCellEnterListener(callback) {
    this.cellEnterListeners.push(callback);
  }

  /**
   * Add listener to mouse leave for cell
   *
   * @param callback
   */
  addCellLeaveListener(callback) {
    this.cellLeaveListeners.push(callback);
  }

  /**
   * Add listener to mouse click for cell
   *
   * @param callback
   */
  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  /**
   * Add listener to "New Game" button click
   *
   * @param callback
   */
  addNewGameListener(callback) {
    this.newGameListeners.push(callback);
  }

  /**
   * Add listener to "Save Game" button click
   *
   * @param callback
   */
  addSaveGameListener(callback) {
    this.saveGameListeners.push(callback);
  }

  /**
   * Add listener to "Load Game" button click
   *
   * @param callback
   */
  addLoadGameListener(callback) {
    this.loadGameListeners.push(callback);
  }

  onCellEnter(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    this.cellEnterListeners.forEach((o) => o.call(null, index));
  }

  onCellLeave(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    this.cellLeaveListeners.forEach((o) => o.call(null, index));
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }

  onNewGameClick(event) {
    event.preventDefault();
    this.newGameListeners.forEach((o) => o.call(null));
  }

  onSaveGameClick(event) {
    event.preventDefault();
    this.saveGameListeners.forEach((o) => o.call(null));
  }

  onLoadGameClick(event) {
    event.preventDefault();
    this.loadGameListeners.forEach((o) => o.call(null));
  }

  showError(message) {
    alert(message);
  }

  static showMessage(message) {
    alert(message);
  }

  selectCell(index, color = 'yellow') {
    this.deselectCell(index);
    this.cells[index].classList.add('selected', `selected-${color}`);
    this.selectedCell = index;
  }

  deselectCell(index) {
    const cell = this.cells[index];
    cell.classList.remove(...Array.from(cell.classList)
      .filter((o) => o.startsWith('selected')));
  }

  deselectAllCell() {
    const cell = this.cells;
    cell.forEach((e) => {
      e.classList.remove(...Array.from(e.classList)
        .filter((o) => o.startsWith('selected')));
    });
  }

  hasSelectedCharacter() {
    return this.selectedCell;
  }

  showCellTooltip(message, index) {
    this.cells[index].title = message;
  }

  hideCellTooltip(index) {
    this.cells[index].title = '';
  }

  showDamage(index, damage) {
    return new Promise((resolve) => {
      const cell = this.cells[index];
      const damageEl = document.createElement('span');
      damageEl.textContent = damage;
      damageEl.classList.add('damage');
      cell.appendChild(damageEl);

      damageEl.addEventListener('animationend', () => {
        cell.removeChild(damageEl);
        resolve();
      });
    });
  }

  setCursor(cursor) {
    this.boardEl.style.cursor = cursor;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  canMoved(index, selectedCell) {
    let result = false;

    for (let i = 1; i <= selectedCell.character.travelRange; i += 1) {
      const left = selectedCell.position - i;
      const right = selectedCell.position + i;
      const up = selectedCell.position + i * this.boardSize;
      const down = selectedCell.position - i * this.boardSize;
      const leftUp = selectedCell.position - i - i * this.boardSize;
      const rightUp = selectedCell.position + i - i * this.boardSize;
      const leftDown = selectedCell.position - i + i * this.boardSize;
      const rightDown = selectedCell.position + i + i * this.boardSize;


      switch (true) {
        case (up === index):
        case (down === index):
        case (left === index && index >= this.getEdgePointLeft(selectedCell.position)):
        case (right === index && index <= this.getEdgePointRight(selectedCell.position)):
        case (leftUp === index && index >= this.getEdgePointLeftUp(selectedCell.position)):
        case (rightUp === index && index >= this.getEdgePointRightUp(selectedCell.position)):
        case (leftDown === index && index <= this.getEdgePointLeftDown(selectedCell.position)):
        case (rightDown === index && index <= this.getEdgePointRightDown(selectedCell.position)):
          result = true;
          break;

        default:
          break;
      }
    }
    return result;
  }

  getEdgePointLeft(index) {
    let cnt = 0;
    while ((index - cnt) % this.boardSize !== 0) {
      cnt += 1;
    }
    return index - cnt;
  }

  getEdgePointRight(index) {
    let cnt = 0;
    while ((index + cnt + 1) % this.boardSize !== 0) {
      cnt += 1;
    }
    return index + cnt;
  }

  getEdgePointLeftDown(index) {
    let cnt = 0;
    while ((index + cnt) % this.boardSize !== 0) {
      cnt += this.boardSize - 1;
    }
    return index + cnt;
  }

  getEdgePointLeftUp(index) {
    let cnt = 0;
    while ((index - cnt) % this.boardSize !== 0) {
      cnt += this.boardSize + 1;
    }
    return index - cnt;
  }

  getEdgePointRightDown(index) {
    let cnt = 0;
    while ((index + cnt + 1) % this.boardSize !== 0) {
      cnt += this.boardSize + 1;
    }
    return index + cnt;
  }

  getEdgePointRightUp(index) {
    let cnt = 0;
    while ((index - cnt + 1) % this.boardSize !== 0) {
      cnt += this.boardSize - 1;
    }
    return index - cnt;
  }

  canAttack(index, selectedCell) {
    let result = false;

    for (let i = 0; i <= selectedCell.character.attackRange; i += 1) {
      for (let j = 1; j <= selectedCell.character.attackRange; j += 1) {
        const left = selectedCell.position - i;
        const right = selectedCell.position + i;
        const up = selectedCell.position + i * this.boardSize;
        const down = selectedCell.position - i * this.boardSize;

        switch (true) {
          case (left >= this.getEdgePointLeft(selectedCell.position) && ((up || down) === index)):
          case (right <= this.getEdgePointRight(selectedCell.position) && ((up || down) === index)):
            result = true;
            break;
          default:
            break;
        }
      }
    }
    return result;
  }
}
