import Character from '../Character';
import Bowman from '../Characters/Bowman';
import Magician from '../Characters/Magician';
import Swordsman from '../Characters/Swordsman';
import Daemon from '../Characters/Daemon';
import Undead from '../Characters/Undead';
import Vampire from '../Characters/Vampire';

const allowedTypesCharacters = [
  Bowman,
  Swordsman,
  Magician,
  Daemon,
  Undead,
  Vampire,
];

describe('correct create new Class()', () => {
  test.each([
    [allowedTypesCharacters],
  ])('%p', (classes) => {
    classes.forEach((E) => {
      expect(new E(1)).toBeTruthy();
    });
  });
});

describe('incorrect create new Class()', () => {
  test('new Character()', () => {
    expect(() => {
      const char = new Character(1);
      char();
    }).toThrow();
  });
});
