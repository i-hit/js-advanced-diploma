/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';

/**
 * @class Team
 */
export default class Team {
  /**
   *
   * @param {Array} goodTeam - команда персонажей side = 'good'
   * @param {Array} evilTeam - команда персонажей side = 'evil'
   */
  constructor(goodTeam = [], evilTeam = []) {
    this.goodTeam = goodTeam;
    this.evilTeam = evilTeam;
  }

  /**
   * Создает и добавляет новых персонажей в команды
   *
   * @param {Object} rules - параетры для создания персонажей
   */
  addNewUnits(rules) {
    this.goodTeam = [...this.goodTeam, ...this.getUnits(rules.goodParam)];

    const { evilParam } = rules;
    evilParam.cntUnits = this.goodTeam.length;

    this.evilTeam = [...this.evilTeam, ...this.getUnits(evilParam)];
  }

  /**
   * Вспомогательная функция для addNewUnits()
   *
   * Создает и добавляет новых персонажей в команды
   *
   * @param {Object} rules - параетры для создания персонажей
   *
   * @returns team - команда созданных персонажей
   */
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
    });

    return result;
  }

  /**
   * Вспомогательная функция для getUnits()
   *
   * @returns Array - занятые персонажами позиции игрового поля
   */
  getPositions() {
    if (this.team.length !== 0) {
      return this.team.reduce((a, b) => [...a, b.position], []);
    }
    return [];
  }

  /**
   * @returns team - массив слияния goodTeam и evilTeam
   */
  get team() {
    return [...this.goodTeam, ...this.evilTeam];
  }

  /**
   * Обнуляет команды
   */
  reset() {
    this.goodTeam = [];
    this.evilTeam = [];
  }

  /**
   * Удаляет персонажа со здоровьем <= 0
   *
   * @param {Number} index - позиция персонажа на игровом поле
   */
  deleteDeadCharacter(index) {
    const target = this.getCharacterByPosition(index);
    if (target.side === 'good') {
      this.goodTeam = this.goodTeam.filter((e) => e.position !== index);
    }

    if (target.side === 'evil') {
      this.evilTeam = this.evilTeam.filter((e) => e.position !== index);
    }
  }

  /**
   *
   * @param {Number} index - номер ячейки игрового поля
   *
   * @returns character - персонаж занимающий переданную ячейку
   */
  getCharacterByPosition(index) {
    const result = this.team.find((e) => e.position === index);
    if (result) {
      return result.character;
    }
  }

  /**
   *
   * @param {Number} index - номер ячейки игрового поля
   *
   * @returns Array - [персонаж занимающий переданную ячейку, позиция]
   */
  getElementByPosition(index) {
    const result = this.team.find((e) => e.position === index);
    if (result) {
      return result;
    }
  }

  /**
   * Восстанавливает наследование персонажей в переданной команде
   *
   * @param {team} team - команда персонажей
   * @param {Object} types - объект с классами персонажей
   *
   * @returns team - команда с персонажами ( наследование восстановлено )
   */
  recoverTeam(team, types) {
    team.forEach((e) => {
      const { character } = e;
      const CharacterClass = this.getParentClass(character.type, types);
      e.character = new CharacterClass();
      e.character.level = character.level;
      e.character.defence = character.defence;
      e.character.attack = character.attack;
      e.character.health = character.health;
    });
    return team;
  }

  /**
   * Вспомогательная функция для recoverTeam()
   *
   * @param {character.type} type - тип персонажа
   * @param {Object} types - объект с классами персонажей
   *
   * @returns class - класс персонажа
   */
  getParentClass(type, types) {
    switch (type) {
      case ('bowman'):
        return types.bowman;
      case ('swordsman'):
        return types.swordsman;
      case ('daemon'):
        return types.daemon;
      case ('magician'):
        return types.magician;
      case ('undead'):
        return types.undead;
      case ('vampire'):
        return types.vampire;
      default:
        break;
    }
    return null;
  }

  getScores() {
    // const goodTeamHealth = this.goodTeam.reduce((a, b) => [+(a) + b.character.health], 0);
  }
}
