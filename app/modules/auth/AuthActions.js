import { Actions } from 'react-native-router-flux';
import {AsyncStorage } from 'react-native';
import {purgeStoredState, autoRehydrate} from 'redux-persist'
import OneSignal from 'react-native-onesignal';


import store from 'react-native-simple-store';

import {warn, log} from 'app/utils/log';
import * as firebase from 'app/utils/firebase';


export const BOOT = 'BOOT/BOOTUP';

export const CHECK_LOGIN = 'AUTH/CHECK_LOGIN';
export const GET_ME = 'AUTH/GET_ME';
export const GET_ME_SUCCESS = 'AUTH/GET_ME_SUCCESS';
export const CHECK_LOGIN_SUCCESS = 'AUTH/CHECK_LOGIN_SUCCESS';
export const LOGOUT = 'AUTH/LOGOUT';

export function boot() {
  return (dispatch) => {
    dispatch({ type: BOOT });


    dispatch({ type: CHECK_LOGIN });
   	firebase.checkLogin((user) => {
		  // evt is the authentication event
		  if (!user) {
		    // There was an error or there is no user
		    Actions.login();
		  } else {

		  	// register push notifications on success
				OneSignal.registerForPushNotifications();


				// callbacks
	      OneSignal.addEventListener('received', (notification) => {
	      	console.log(notification);
	      });
	      OneSignal.addEventListener('opened', (openResult) => {
			    console.log('Message: ', openResult.notification.payload.body);
			    console.log('Data: ', openResult.notification.payload.additionalData);
			    console.log('isActive: ', openResult.notification.isAppInFocus);
			    console.log('openResult: ', openResult);
			  });
	      OneSignal.addEventListener('registered', (notifData) => {
		      console.log("Device had been registered for push notifications!", notifData);
			  });
	      OneSignal.addEventListener('ids', (device) => {
		      console.log('Device info: ', device);
		      if(device.pushToken){
		      	firebase.setPushCredentials(user, device);
		      }
			  });


		    // evt.user contains the user details
		    dispatch({type: CHECK_LOGIN_SUCCESS, user: {
		    	displayName: user.displayName,
		    	uid: user.uid,
		    	photoURL: user.photoURL
		    }});
		    Actions.feed();
		  }
		});	
  }
}

export function login(token) {
	firebase.login(token);
}

export function getMe() {
	return (dispatch, getState) => {
		dispatch({ type: GET_ME });
		const { auth } = getState();

		firebase.getUser(auth.user).then(me => {
			console.log('got me', me);
			dispatch({type: GET_ME_SUCCESS, me});
		});
	}
}

export function logout() {

	purgeStoredState({storage: AsyncStorage}, ['workout']);

	return (dispatch) => {
		firebase.logout()
		setTimeout(() => {
			dispatch({type: LOGOUT});
		}, 100);
	}
}
