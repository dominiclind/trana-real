import { combineReducers } from 'redux';

import thing from './thing';
import auth from './auth';
import workout from './workout';
import feed from './feed';

export default combineReducers({
  thing,
  auth,
  feed,
  workout
});
