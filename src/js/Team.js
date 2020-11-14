/* eslint-disable class-methods-use-this */
import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';

export default class Team {
  constructor() {
    this._goodTeam = [];
    this._evilTeam = [];
  }

  addNewUnits(rules) {
    this._goodTeam = [...this._goodTeam, ...this.getUnits(rules.goodParam)];

    const { evilParam } = rules;
    evilParam.cntUnits = this._goodTeam.length;

    this._evilTeam = [...this._evilTeam, ...this.getUnits(evilParam)];
  }

  getUnits(rules) {
    const result = [];
    let index = 0;
    const busyPositions = this.getPositions();

    const units = generateTeam(rules);
    units.forEach((e) => {
      do {
        index = Math.floor(Math.random() * rules.startpositions.length);
      } while (busyPositions.includes(rules.startpositions[index]));

      result.push(new PositionedCharacter(e, rules.startpositions[index]));
      busyPositions.push(rules.startpositions[index]);
      console.log(busyPositions);
    });

    return result;
  }

  getPositions() {
    if (this.team.length !== 0) {
      return this.team.reduce((a, b) => [...a, b.position], []);
    }
    return [];
  }

  get team() {
    return [...this._goodTeam, ...this._evilTeam];
  }

  reset() {
    this._goodTeam = [];
    this._evilTeam = [];
  }

  deleteDeadCharacter(index) {
    const target = this.getCharacterByPosition(index);
    if (target.side === 'good') {
      this._goodTeam = this._goodTeam.filter((e) => e.position !== index);
    }

    if (target.side === 'evil') {
      this._evilTeam = this._evilTeam.filter((e) => e.position !== index);
    }
  }

  // eslint-disable-next-line consistent-return
  getCharacterByPosition(index) {
    const result = this.team.find((e) => e.position === index);
    if (result) {
      return result.character;
    }
  }

  // eslint-disable-next-line consistent-return
  getElementByPosition(index) {
    const result = this.team.find((e) => e.position === index);
    if (result) {
      return result;
    }
  }
}
