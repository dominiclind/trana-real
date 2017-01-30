import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { observer } from 'mobx-react/native';

import TabBar from 'app/components/TabBar';


import KitchenSink from 'app/screens/KitchenSink';
import WorkoutScreen from 'app/screens/WorkoutScreen';
import LoginScreen from 'app/screens/LoginScreen';
import InitialScreen from 'app/screens/InitialScreen';
import FeedScreen from 'app/screens/FeedScreen';

import WorkoutList from 'app/screens/WorkoutList';

import Firebase from 'app/stores/Firebase';
import CardSliderStore from 'app/stores/CardSlider';
import NavStore from 'app/stores/Nav';

@observer
class Root extends Component {

	renderView() {
		const { current } = NavStore;
		const { user = {} } = Firebase;

		
		// return <KitchenSink/>
		if (!user.uid) {
			return <LoginScreen />
		} else {
			switch(current){
				case 'login':
					return <LoginScreen />
				break;
				case 'workout':
					return <WorkoutScreen />
				break;
				case 'workoutlist':
					return <WorkoutList />
				case 'feed':
					return <FeedScreen />
				break;
				default: 
					return <FeedScreen/>
				break;
			}
		}
	}

  render () {
  	const { fullscreen } = CardSliderStore;

    return (
    	<View style={{flex: 1}}>
    		{this.renderView()}
        { /*<TabBar fullscreen={fullscreen} />*/}
    	</View>
    );
  }
}

export default Root;
