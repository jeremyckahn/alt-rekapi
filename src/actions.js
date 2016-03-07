import { ADD_KEYFRAME, REMOVE_ACTOR } from './reducers/actors';

/**
 * @param {string} actor
 * @param {number} ms
 * @param {Object} props
 * @param {Object} easing
 */
export function addKeyframe (actor, ms, props, easing) {
  return {
    type: ADD_KEYFRAME,
    id: actor,
    ms,
    props,
    easing
  };
}

/**
 * @param {string} actor
 * @param {List.<Map>} allActors
 */
export function removeActor (actor, allActors) {
  return {
    type: REMOVE_ACTOR,
    id: actor,
    allActors
  };
}
