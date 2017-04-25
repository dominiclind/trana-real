import {
  GET_THING,
  GET_THING_SUCCESS,
} from '../actions/thing';

import {warn, log} from 'app/utils/log';


const initialState = {
  loading: true,
};

export default function thing(state = initialState, action) {
  switch (action.type) {
    case GET_THING:
      return {
        ...state,
        loading: true
      }
    case GET_THING_SUCCESS:
      return {
        ...state,
        loading:false,
      }
    default:
      return state;
  }
}
