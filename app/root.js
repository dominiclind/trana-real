import React, { Component } from 'react';
import codePush from "react-native-code-push";
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { Provider } from 'react-redux';

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

import {
  View,
  Text
} from 'react-native';

import configureStore from './store/configureStore';
import Routes from 'app/router';

const store = configureStore();

class Root extends Component {

	componentDidMount() {
		// Calling registerForPushNotifications
		OneSignal.registerForPushNotifications();
	}	
  componentWillMount() {
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('registered', this.onRegistered);
      OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('registered', this.onRegistered);
      OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
      console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
      console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
      console.log('Device info: ', device);
  }

  render () {
    return (
      <Provider store={store}>
    	 <Routes />
      </Provider>
    );
  }
}

export default Root;
