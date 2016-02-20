import { Map, fromJS } from 'immutable';

export const ADD_KEYFRAME = 'ADD_KEYFRAME';
export const DEFAULT_EASING = 'linear';

export const initialState = fromJS([]);

export default function (state=initialState, action) {
  const { type, name, value } = action;

  switch (type) {
    case ADD_KEYFRAME:
      const indexOfActor = state.findIndex(function (actor) {
        return actor.id = action.id;
      });

      var newActor = Map({
        id: action.id,
        start: 0,
        end: 0,
        propertyTracks: {}
      });

      if (indexOfActor === -1) {
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

        state = state.push(newActor);
      } else {

      }
    break;
  }

  return state;
}
