import { Map, List, fromJS } from 'immutable';

export const ADD_KEYFRAME = 'ADD_KEYFRAME';
export const REMOVE_ACTOR = 'REMOVE_ACTOR';
export const REMOVE_ACTOR_KEYFRAMES = 'REMOVE_ACTOR_KEYFRAMES';
export const MODIFY_ACTOR = 'MODIFY_ACTOR';
export const MOVE_KEYFRAME = 'MOVE_KEYFRAME';
export const DEFAULT_EASING = 'linear';

export const initialState = fromJS([]);

/**
 * @param {Map} actor
 * @param {number} actorIndex
 * @param {Map} propertyTracks
 */
function setActorPropertyTracks (actor, actorIndex, propertyTracks) {
  const keyframeTimes = [];
  propertyTracks.forEach((propertyTrack) => {
    propertyTrack.forEach(property => keyframeTimes.push(property.ms));
  });

  actor = actor.merge({
    propertyTracks,
    start: Math.min.apply(Math, keyframeTimes),
    end: Math.max.apply(Math, keyframeTimes)
  });

  return actor;
}

/**
 * @param {Object} state
 * @param {string} id
 * @param {number} ms
 * @param {string} prop
 * @param {Function(Object)} modifier
 * @return {Object}
 */
function modifyKeyframeObject (state, id, ms, prop, modifier) {
  let [actorIndex, actor] =
    (state.findEntry(actor => actor.get('id') === id) || []);

  if (!actor) {
    return state;
  }

  let propertyTracks = actor.get('propertyTracks');
  let track = List(propertyTracks.get(prop));
  let [keyframePropertyIndex, keyframeProperty] =
    (track.findEntry(prop => prop.ms === ms) || []);

  if (!keyframeProperty) {
    return state;
  }

  keyframeProperty = modifier(keyframeProperty);
  track = track.set(keyframePropertyIndex, keyframeProperty);
  propertyTracks = propertyTracks.set(prop, track);

  actor = setActorPropertyTracks(actor, actorIndex, propertyTracks);
  state = state.set(actorIndex, actor);

  return state;
}

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function addKeyframe (state, action) {
  const { id, ms } = action;

  const actorIndex = state.findIndex(function (actor) {
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

  if (actorIndex === -1) {
    const newActor = Map({
      start: ms,
      end: ms,
      id,
      propertyTracks
    });

    state = state.push(newActor);
  } else {
    const existingActor = state.get(actorIndex);
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

    state = state.set(actorIndex, mergedActor);
  }

  return state;
}

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function removeActor (state, action) {
  return state.filterNot(actor => actor.get('id') === action.id);
}

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function removeActorKeyframes (state, action) {
  const { id, ms, props } = action;

  let [actorIndex, actor] =
    state.findEntry(actor => actor.get('id') === id);
  let propertyTracks = actor.get('propertyTracks');
  const propsToRemove = props.length ? props : propertyTracks.keySeq();

  propsToRemove.forEach(prop => {
    const propertyTrack = propertyTracks.get(prop);

    if (!propertyTrack) {
      return;
    }

    const foundProperty = propertyTrack.find(property => property.ms === ms);

    if (!foundProperty) {
      return;
    }

    const propertyIndex = propertyTrack.indexOf(foundProperty);
    propertyTrack.splice(propertyIndex, 1);
    propertyTracks.set(prop, propertyTrack);
  });

  // Remove any empty tracks
  propertyTracks =
    propertyTracks.filter(propertyTrack => propertyTrack.length);

  actor = setActorPropertyTracks(actor, actorIndex, propertyTracks);
  state = state.set(actorIndex, actor);

  return state;
}

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function modifyActor (state, action) {
  const { id, ms, prop, modification } = action;

  state = modifyKeyframeObject(state, id, ms, prop, keyframeProperty => {
    [
      'value',
      'easing',
      'ms'
    ].forEach(propToModify => {
      const newProp = modification[propToModify];
      if (typeof newProp !== 'undefined') {
        keyframeProperty[propToModify] = newProp;
      }
    });

    return keyframeProperty;
  });

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
    case REMOVE_ACTOR_KEYFRAMES:
      state = removeActorKeyframes(state, action);
      break;
    case MODIFY_ACTOR:
      state = modifyActor(state, action);
      break;
  }

  return state;
}
