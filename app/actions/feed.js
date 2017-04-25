import { Actions } from 'react-native-router-flux';


import {warn, log} from 'app/utils/log';
import * as firebase from 'app/utils/firebase';


export const GET_FEED = 'GET_FEED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';



export function getFeed() {
  return (dispatch, getState) => {
  	dispatch({ type: GET_FEED });
  	const { user } = getState().auth;
  	Promise.all([
      firebase.getFeed(user.uid),
    ]).then(response => {
      dispatch({
      	type: GET_FEED_SUCCESS,
        feed: response[0].reverse(),
      })
    });
  }
}
