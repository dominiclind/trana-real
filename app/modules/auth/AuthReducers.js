import {
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  GET_ME,
  GET_ME_SUCCESS,
  LOGOUT
} from './AuthActions';

import {
  GET_FEED_SUCCESS,
  GET_FEED,
} from 'app/modules/feed/FeedActions';

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
    case GET_ME:
      return {
        ...state,
        loading: true,
      }
    case GET_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        me: action.me
      }
    case GET_FEED:
      return {
        ...state,
        loading: true,
      }
    case GET_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        me: action.user
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
