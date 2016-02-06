import { createStore } from 'redux';
import reducer from './reducers/main';

export class Timeline {
  constructor () {
    this.store = createStore(reducer);
  }
}
