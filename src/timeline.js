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

  /**
   * @param {string} actor The ID of an actor
   * @param {number} [ms] The millisecond in the timeline at which to remove
   * keyframe properties
   * @param {...string} [props] If provided, only remove the keyframe
   * properties specified.  If omitted, all keyframe properties matched by
   * `actor` and `ms` will be removed.  If `props` are provided but `ms` is
   * not, a `TypeError` is thrown.
   */
  remove (actor, ms = null, ...props) {
    if (ms === null && props) {
      throw new TypeError;
    }
  }
}
