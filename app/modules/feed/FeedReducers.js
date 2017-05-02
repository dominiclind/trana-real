import {
  GET_FEED,
  GET_FEED_SUCCESS,
} from './FeedActions';

import {warn, log} from 'app/utils/log';


const initialState = {
  loading: true,
  feed: [],
};

export default function feed(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return {
        ...state,
        loading: true
      }
    case GET_FEED_SUCCESS:
      return {
        ...state,
        feed: action.feed,
        loading: false,
      }
    default:
      return state;
  }
}
