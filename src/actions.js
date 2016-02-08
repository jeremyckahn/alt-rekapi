import { ADD_KEYFRAME } from './reducers/actors';

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
