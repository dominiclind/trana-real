import React, { Component } from 'react';
import codePush from "react-native-code-push";
import OneSignal from 'react-native-onesignal'; // Import package from node modules

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

import {
  View,
  Text
} from 'react-native';
import { observer } from 'mobx-react/native';

import TabBar from 'app/components/TabBar';
import KitchenSink from 'app/screens/KitchenSink';
import WorkoutList from 'app/screens/WorkoutList';
import Routes from 'app/router';

import Firebase from 'app/stores/Firebase';
import NavStore from 'app/stores/Nav';

@codePush(codePushOptions) @observer
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
    	<Routes />
    );
  }
}

export default Root;
