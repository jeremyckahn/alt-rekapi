import { ADD_KEYFRAME } from './actors';
export const initialState = 0;

export default function (state=initialState, action) {
  const { type } = action;

  switch (type) {
    case ADD_KEYFRAME:
      const { ms } = action;

      if (ms > state) {
        state = ms;
      }

      break;
  }

  return state;
}
