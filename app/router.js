import {Scene, Router} from 'react-native-router-flux';
import React, { Component } from 'react';
import {regularSlide, modalSlide} from 'app/animations/nav';

// screens
import WorkoutScreen from 'app/screens/WorkoutScreen';
import LoginScreen from 'app/screens/LoginScreen';
import InitialScreen from 'app/screens/InitialScreen';
import FeedScreen from 'app/screens/FeedScreen';
import ExerciseScreen from 'app/screens/ExerciseScreen';


export default class Routes extends Component {
  render() {
    return (
      <Router
        hideNavBar={true}
      >
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
                animationStyle={regularSlide}
        	/>
            <Scene
                key="exercise"
                component={ExerciseScreen}
                title="Exercise"
                animationStyle={regularSlide}
            />
        </Scene>
      </Router>
    )
  }
}