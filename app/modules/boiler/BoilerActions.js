import { Actions } from 'react-native-router-flux';

import {warn, log} from 'app/utils/log';
import * as firebase from 'app/utils/firebase';

export const GET_THING = 'GET_THING';

export function getThing() {
  return (dispatch) => {
    dispatch({ type: GET_THING });
  }
}
