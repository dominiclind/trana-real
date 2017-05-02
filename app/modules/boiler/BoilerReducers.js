import {
  GET_THING,
} from './BoilerActions';

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
    default:
      return state;
  }
}
