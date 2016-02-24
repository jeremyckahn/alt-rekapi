import { Map, fromJS } from 'immutable';

export const ADD_KEYFRAME = 'ADD_KEYFRAME';
export const DEFAULT_EASING = 'linear';

export const initialState = fromJS([]);

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function addKeyframe (state, action) {
  const { id, ms } = action;

  const indexOfActor = state.findIndex(function (actor) {
    return actor.get('id') === id;
  });

  const propertyTracks = Map(action.props).map((value, name) => {
    const actionEasing = action.easing;
    var easing;

    if (typeof actionEasing === 'undefined') {
      easing = DEFAULT_EASING;
    } else if (typeof actionEasing === 'string') {
      easing = actionEasing;
    } else if (typeof actionEasing === 'object') {
      easing = actionEasing[name] || DEFAULT_EASING;
    }

    return [{
      ms,
      easing,
      name,
      value
    }];
  });

  if (indexOfActor === -1) {
    const newActor = Map({
      // FIXME: Implement and test start > 0 scenarios
      start: 0,
      end: Math.max(0, ms),
      id,
      propertyTracks
    });

    state = state.push(newActor);
  } else {
    var existingActor = state.get(indexOfActor);
    const existingPropertyTracks = existingActor.get('propertyTracks');

    const mergedPropertyTracks = propertyTracks.map((value, name) => {
      var combinedTrack = existingPropertyTracks.get(name) || [];
      combinedTrack = combinedTrack.concat(value);
      return combinedTrack.sort(prop => prop.ms);
    });

    existingActor = existingActor.merge({
      propertyTracks: mergedPropertyTracks,
      end: Math.max(existingActor.get('end'), ms)
    });

    state = state.set(indexOfActor, existingActor);
  }

  return state;
}

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default function (state=initialState, action) {
  const { type } = action;

  switch (type) {
    case ADD_KEYFRAME:
      state = addKeyframe(state, action);
      break;
  }

  return state;
}
