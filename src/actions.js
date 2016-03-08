import {
  ADD_KEYFRAME,
  REMOVE_ACTOR,
  REMOVE_ACTOR_KEYFRAMES
} from './reducers/actors';

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

/**
 * @param {string} actor
 * @param {number} ms
 * @param {Array.<string>} props
 */
export function removeActorKeyframes (actor, ms, props) {
  return {
    type: REMOVE_ACTOR_KEYFRAMES,
    id: actor,
    ms,
    props
  };
}
