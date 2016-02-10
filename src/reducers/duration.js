import { ADD_KEYFRAME } from './actors';
export const initialState = 0;

export default function (state=initialState, action) {
  const { type, name, value } = action;

  switch (type) {
    case ADD_KEYFRAME:
      if (action.ms > state) {
        state = action.ms;
      }

    break;
  }

  return state;
}
