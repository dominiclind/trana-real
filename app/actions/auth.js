import { Actions } from 'react-native-router-flux';


import store from 'react-native-simple-store';

import {warn, log} from 'app/utils/log';
import * as firebase from 'app/utils/firebase';

export const CHECK_LOGIN = 'CHECK_LOGIN';
export const CHECK_LOGIN_SUCCESS = 'CHECK_LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';


export function checkLogin() {
  return (dispatch) => {
    dispatch({ type: CHECK_LOGIN });
   	firebase.checkLogin((evt) => {
		  // evt is the authentication event
		  if (!evt.authenticated) {
		    // There was an error or there is no user
		    // console.error(evt.error);
		    // NavStore.goTo('login');
		    Actions.login();
		  } else {
		    // evt.user contains the user details
		    dispatch({type: CHECK_LOGIN_SUCCESS, user: evt.user});
		    // store.save('user', evt.user);
		    Actions.feed();
		  }
		});	
  }
}

export function login(token) {
	firebase.login(token);
}
export function logout() {
	return (dispatch) => {
		firebase.logout()
		setTimeout(() => {
			dispatch({type: LOGOUT});
		}, 100);
	}
}
