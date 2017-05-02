import { combineReducers } from 'redux';

import auth from 'app/modules/auth/AuthReducers';
import workout from 'app/modules/workout/WorkoutReducers';
import feed from 'app/modules/feed/FeedReducers';

export default combineReducers({
  auth,
  feed,
  workout
});
