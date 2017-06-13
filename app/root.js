import React, { Component } from 'react';

import PerfMonitor from 'react-native/Libraries/Performance/RCTRenderingPerf';

import codePush from "react-native-code-push";

import { Provider } from 'react-redux';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE
};

import {
  View,
  Text
} from 'react-native';

import configureStore from './store/configureStore';
import Routes from 'app/router';

const store = configureStore();

class Root extends Component {
  componentWillMount() {
    codePush.sync(codePushOptions);
  }
  componentDidMount() {
    PerfMonitor.toggle();
    setTimeout(() => {
      PerfMonitor.start();
      setTimeout(() => {
        PerfMonitor.stop();
      }, 10000);
    }, 5000);
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
