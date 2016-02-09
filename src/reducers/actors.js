import { Map, fromJS } from 'immutable';

export const ADD_KEYFRAME = 'ADD_KEYFRAME';

export const initialState = fromJS([]);

export default function (state=initialState, action) {
  const { type, name, value } = action;

  switch (type) {
    case ADD_KEYFRAME:
      var indexOfActor = state.findIndex(function (actor) {
        return actor.id = action.id;
      });

      var newActor = Map({
        id: action.id,
        start: 0,
        end: 0,
        trackNames: Object.keys(action.props),
        propertyTracks: {}
      });

      if (indexOfActor === -1) {
        state = state.push(newActor);
      } else {

      }
    break;
  }

  return state;
}
