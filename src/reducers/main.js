import { combineReducers } from 'redux';

import actors from './actors';
import customCurves from './custom-curves';

export default combineReducers({
  actors,
  customCurves
});
