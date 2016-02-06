import { fromJS } from 'immutable';

export const initialState = fromJS([]);

export default function (state=initialState, action) {
  const { type, name, value } = action;

  switch (type) {

  }

  return state;
}
