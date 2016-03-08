import {
  ADD_KEYFRAME,
  REMOVE_ACTOR
} from './actors';
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

    case REMOVE_ACTOR:
      const { id, allActors } = action;

      const otherActorEnds = allActors
        .filterNot(
          actor => actor.get('id') === id
        ).map(
          actor => actor.get('end')
        ).toArray();

      state = otherActorEnds.length ?
        Math.max.apply(Math, otherActorEnds) :
        0;

      break;
  }

  return state;
}
