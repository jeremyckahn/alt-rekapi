import { createStore } from 'redux';
import { Map } from 'immutable';
import reducer from './reducers/main';
import { addKeyframe } from './actions';

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

  /**
   * @param {string} actor The ID of an actor
   * @param {number} ms
   * @param {Object} props The properties of the keyframe
   * @param {Object} [easing] Optional easing curves to apply to props of the
   * corresponding key
   */
  keyframe (actor, ms, props, easing = {}) {
    this.store.dispatch(addKeyframe(actor, ms, props, easing));
    return this;
  }
}
