import { Map, fromJS } from 'immutable';

export const ADD_KEYFRAME = 'ADD_KEYFRAME';
export const REMOVE_ACTOR = 'REMOVE_ACTOR';
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
    let easing;

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
      value
    }];
  });

  if (indexOfActor === -1) {
    const newActor = Map({
      start: ms,
      end: ms,
      id,
      propertyTracks
    });

    state = state.push(newActor);
  } else {
    const existingActor = state.get(indexOfActor);
    const existingPropertyTracks = existingActor.get('propertyTracks');

    const concatenatedPropertyTracks = propertyTracks.map((track, name) => {
      const existingTrack = existingPropertyTracks.get(name) || [];
      const dedupedExistingTrack =
        existingTrack.filter(property => property.ms !== ms);
      const combinedTrack = dedupedExistingTrack.concat(track);

      return combinedTrack.sort(prop => prop.ms);
    });

    const mergedPropertyTracks = concatenatedPropertyTracks.merge(
      existingPropertyTracks
        .filter((_, name) => !concatenatedPropertyTracks.get(name))
    );

    const mergedActor = existingActor.merge({
      propertyTracks: mergedPropertyTracks,
      start: Math.min(existingActor.get('start'), ms),
      end: Math.max(existingActor.get('end'), ms)
    });

    state = state.set(indexOfActor, mergedActor);
  }

  return state;
}

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function removeActor (state, action) {
  const { id } = action;
  const [indexOfActor] = state.findEntry(actor => actor.get('id') === id);

  state = state.delete(indexOfActor);

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
    case REMOVE_ACTOR:
      state = removeActor(state, action);
      break;
  }

  return state;
}
