
import { generateTeam, characterGenerator } from './generators';
import PositionedCharacter from './PositionedCharacter';
import Bowman from './Characters/Bowman';

/**
 * Entry point of app: don't change this
 */
import GamePlay from './GamePlay';
import GameController from './GameController';
import GameStateService from './GameStateService';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

// don't write your code here

const team = generateTeam(1);
console.log(team);


// const bowman = new Bowman(1);
const pos = [];
pos.push(new PositionedCharacter(team[0], 2));
pos.push(new PositionedCharacter(team[1], 3));
gamePlay.redrawPositions(pos);
