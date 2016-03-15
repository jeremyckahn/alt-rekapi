import { createStore } from 'redux';
import { Map } from 'immutable';
import reducer from './reducers/main';
import {
  addKeyframe,
  removeActor,
  removeActorKeyframes,
  modifyActor
} from './actions';

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
   * Add a keyframe to the timeline.
   * @param {string} actor The ID of an actor
   * @param {number} ms
   * @param {Object} props The properties of the keyframe
   * @param {Object} [easing] Optional easing curves to apply to props of the
   * corresponding key
   * @chainable
   */
  keyframe (actor, ms, props, easing = {}) {
    this.store.dispatch(addKeyframe(actor, ms, props, easing));
    return this;
  }

  /**
   * Remove an actor, or set of keyframe properties thereof from the timeline.
   * @param {string} actor The ID of an actor
   * @param {number} [ms] The millisecond in the timeline at which to remove
   * keyframe properties
   * @param {...string} [props] If provided, only remove the keyframe
   * properties specified.  If omitted, all keyframe properties matched by
   * `actor` and `ms` will be removed.  If `props` are provided but `ms` is
   * not, a `TypeError` is thrown.
   * @chainable
   */
  remove (actor, ms = null, ...props) {
    const allActors = this.getState().actors;
    const actorWasFound =
      allActors.findEntry(actorObj => actorObj.get('id') === actor);

    if (!actorWasFound) {
      return this;
    }

    if (ms === null) {
      if (props.length > 0) {
        throw new TypeError;
      }

      this.store.dispatch(removeActor(actor, allActors));
    } else {
      this.store.dispatch(removeActorKeyframes(actor, ms, props));
    }

    return this;
  }

  /**
   * Change the values of a keyframe property.
   * @param {string} actor The ID of an actor
   * @param {number} ms The millisecond in the timeline at which to modify a
   * keyframe property
   * @param {string} prop The name of the keyframe property to modify
   * @param {{ value: string|number?, easing: string?, ms: number?}}
   * modification The new values that the keyframe property should have.
   * Omitted values are unchanged.
   * @chainable
   */
  modify (actor, ms, prop, modification) {
    this.store.dispatch(modifyActor(actor, ms, prop, modification));
    return this;
  }
}
