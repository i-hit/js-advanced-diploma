/**
 * @class GameStateService
 */
export default class GameStateService {
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * Сохраняет текущее состояние игры
   *
   * @param {Object} state - объект текущего состояния игры
   */
  save(state) {
    this.storage.setItem('state', JSON.stringify(state));
  }

  /**
   * Загружает текущее состояние игры
   */
  load() {
    try {
      if (this.storage.getItem('state') === null) {
        throw new Error('Invalid state');
      }
      return JSON.parse(this.storage.getItem('state'));
    } catch (e) {
      throw new Error('Invalid state');
    }
  }
}
