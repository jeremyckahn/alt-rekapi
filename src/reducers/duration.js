export const initialState = 0;

export default function (state=initialState, action) {
  const { type, name, value } = action;

  return state;
}
