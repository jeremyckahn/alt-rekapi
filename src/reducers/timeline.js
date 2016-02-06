import { Map } from 'immutable';

export const initialState = new Map();

export default function (state=initialState, action) {
  const { type, name, value } = action;

  switch (type) {

  }

  return state;
}
