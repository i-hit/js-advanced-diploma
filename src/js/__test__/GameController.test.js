import GamePlay from '../GamePlay';
import GameState from '../GameState';
import GameController from '../GameController';
import GameStateService from '../GameStateService';

const gamePlay = new GamePlay();
gamePlay.container = document.createElement('div');
gamePlay.bindToDOM(gamePlay.container);

const gameState = new GameState(gamePlay.boardSize);

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService, gameState);
gameCtrl.init();

const goodFirst = {
  character: {
    attack: 25,
    attackRange: 2,
    defence: 25,
    health: 50,
    level: 1,
    side: 'good',
    travelRange: 2,
    type: 'bowman',
  },
  position: 0,
};

const goodSecond = {
  character: {
    attack: 25,
    attackRange: 2,
    defence: 25,
    health: 50,
    level: 1,
    side: 'good',
    travelRange: 2,
    type: 'bowman',
  },
  position: 16,
};

const evilFirst = {
  character: {
    attack: 25,
    attackRange: 2,
    defence: 25,
    health: 50,
    level: 1,
    side: 'evil',
    travelRange: 2,
    type: 'vampire',
  },
  position: 1,
};

const evilSecond = {
  character: {
    attack: 25,
    attackRange: 2,
    defence: 25,
    health: 50,
    level: 1,
    side: 'evil',
    travelRange: 2,
    type: 'vampire',
  },
  position: 17,
};

gameCtrl.gameState.team.goodTeam = [goodFirst, goodSecond];
gameCtrl.gameState.team.evilTeam = [evilFirst, evilSecond];
gameCtrl.gamePlay.redrawPositions(gameCtrl.gameState.team.team);
gameCtrl.gameState.selectedCharacter = gameCtrl.gameState.team.getElementByPosition(0);
gameCtrl.gamePlay.redrawPositions(gameCtrl.gameState.team.team);

test('цель свой игрок, курсор pointer', () => {
  gameCtrl.onCellEnter(16);

  expect(gamePlay.boardEl.style.cursor).toBe('pointer');
});

test('цель может переместиться, курсор pointer, фон зеленый', () => {
  gameCtrl.onCellEnter(8);

  expect(gamePlay.boardEl.style.cursor).toBe('pointer');
  expect(gamePlay.cells[8].classList.contains('selected-green')).toBeTruthy();
});

test('цель может атаковать, курсор crosshair, фон красный', () => {
  gameCtrl.onCellEnter(1);

  expect(gamePlay.boardEl.style.cursor).toBe('crosshair');
  expect(gamePlay.cells[1].classList.contains('selected-red')).toBeTruthy();
});

test('действие невозможно, курсор notallowed ', () => {
  gameCtrl.onCellEnter(63);

  expect(gamePlay.boardEl.style.cursor).toBe('not-allowed');
});
