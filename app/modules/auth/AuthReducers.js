import {
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  LOGOUT
} from './AuthActions';

import {warn, log} from 'app/utils/log';


const initialState = {
  loading: true,
  user: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CHECK_LOGIN:
      return {
        ...state,
        loading: true
      }
    case CHECK_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user
      }
    case LOGOUT:
      return {
        ...state,
        user: false
      }
    default:
      return state;
  }
}
