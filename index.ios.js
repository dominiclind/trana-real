import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Root from 'app/root';
import codePush from "react-native-code-push";
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

AppRegistry.registerComponent('circuit2', () => codePush(codePushOptions)(Root));
