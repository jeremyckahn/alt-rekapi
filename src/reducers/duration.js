import { ADD_KEYFRAME, REMOVE_ACTOR } from './actors';
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
      const { otherActors } = action;
      const otherActorEnds = otherActors.toJS().map(
        otherActor => otherActor.get('end')
      );

      // FIXME: Add test to confirm that remaining actors are accounted for
      // properly (i.e., this operation should return something greater than 0)
      state = otherActorEnds.length ?
        Math.max.apply(Math, otherActorEnds) :
        0;

      break;
  }

  return state;
}
