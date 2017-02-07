import {Scene, Router} from 'react-native-router-flux';
import React, { Component } from 'react';

// screens
import WorkoutScreen from 'app/screens/WorkoutScreen';
import LoginScreen from 'app/screens/LoginScreen';
import InitialScreen from 'app/screens/InitialScreen';
import FeedScreen from 'app/screens/FeedScreen';


export default class Routes extends Component {
  render() {
    return <Router hideNavBar={true}>
      <Scene key="root">
      	<Scene
      		key="initial"
      		component={InitialScreen}
      		title="Initial"
      		type="replace"
      	/>
      	<Scene
      		key="login"
      		component={LoginScreen}
      		title="Login"
      		type="replace"
      	/>
      	<Scene
      		key="feed"
      		component={FeedScreen}
      		title="Feed"
      		type="replace"
      	/>
      	<Scene
      		key="workout"
      		component={WorkoutScreen}
      		title="Workout"
      		type="replace"
      	/>
      </Scene>
    </Router>
  }
}