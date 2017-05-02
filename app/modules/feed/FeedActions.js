import { Actions } from 'react-native-router-flux';


import {warn, log} from 'app/utils/log';
import * as firebase from 'app/utils/firebase';


export const GET_FEED = 'FEED/GET_FEED';
export const GET_FEED_SUCCESS = 'FEED/GET_FEED_SUCCESS';



export function getFeed() {
  return (dispatch) => {
  	dispatch({ type: GET_FEED });
  	Promise.all([
      firebase.getFeed(),
    ]).then(response => {
      dispatch({
      	type: GET_FEED_SUCCESS,
        feed: response[0].reverse(),
      })
    });
  }
}
