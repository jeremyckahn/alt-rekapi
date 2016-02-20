import { Map, fromJS } from 'immutable';

export const ADD_KEYFRAME = 'ADD_KEYFRAME';
export const DEFAULT_EASING = 'linear';

export const initialState = fromJS([]);

export default function (state=initialState, action) {
  const { type, ms } = action;

  switch (type) {
    case ADD_KEYFRAME:
      const indexOfActor = state.findIndex(function (actor) {
        return actor.id = action.id;
      });

      var newActor = Map({
        id: action.id,
        // FIXME: Implement and test start > 0 scenarios
        start: 0,
        end: 0,
        propertyTracks: {}
      });

      const newPropertyTracks = Map(action.props).map((value, name) => {
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
          ms: action.ms,
          easing,
          name,
          value
        }];
      });

      newActor = newActor.set('propertyTracks', newPropertyTracks);

      if (indexOfActor === -1) {
        state = state.push(newActor);
      } else {
        var existingActor = state.get(indexOfActor);
        const existingPropertyTracks = existingActor.get('propertyTracks');
        const newActorPropertyTracks = newActor.get('propertyTracks');

        const mergedPropertyTracks = newActorPropertyTracks.map((value, name) => {
          var combinedTrack = existingPropertyTracks.get(name) || [];
          combinedTrack = combinedTrack.concat(value);
          return combinedTrack.sort(prop => prop.ms);
        });

        existingActor = existingActor.set('propertyTracks', mergedPropertyTracks);

        // TODO: Try to use a less explicit way to do this
        existingActor = existingActor.set('end', Math.max(newActor.get('end'), ms));

        state = state.set(indexOfActor, existingActor);
      }

      break;
  }

  return state;
}
