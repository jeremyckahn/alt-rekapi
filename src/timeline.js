import { createStore } from 'redux';
import { Map } from 'immutable';
import reducer from './reducers/main';

export class Timeline {
  constructor () {
    this.store = createStore(reducer);
  }

  /**
   * @return {Immutable.Map}
   */
  getState () {
    return this.store.getState();
  }

  /**
   * @return {Immutable.Map}
   */
  toJSON () {
    return Map(this.getState()).toJSON();
  }
}
