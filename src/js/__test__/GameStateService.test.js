import GameStateService from '../GameStateService';

const gameStateService = new GameStateService(localStorage);
const data = 'test';
gameStateService.save(data);

describe('success save()', () => {
  test('save data', () => {
    expect(localStorage.getItem('state')).toEqual(JSON.stringify(data));
  });
});

describe('success load()', () => {
  test('load data', () => {
    expect(gameStateService.load()).toBeTruthy();
  });
});

describe('fail load()', () => {
  test('load data', () => {
    localStorage.removeItem('state');
    const result = new Error('Invalid state');
    expect(() => {
      gameStateService.load();
    }).toThrow(result);
  });
});
