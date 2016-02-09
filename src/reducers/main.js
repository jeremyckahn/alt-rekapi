import { combineReducers } from 'redux';

import duration from './duration';
import actors from './actors';
import customCurves from './custom-curves';

export default combineReducers({
  duration,
  actors,
  customCurves
});
