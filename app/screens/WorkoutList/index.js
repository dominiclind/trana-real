import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


import WorkoutStore from 'app/stores/Workout';

import CardSlider from 'app/components/CardSlider';

@observer
class WorkoutList extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { workouts } = WorkoutStore;

    return (
      <View style={styles.screen}>
        <CardSlider
          fullscreen={fullscreen}
          content={workouts}
        />
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  screen : {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  screenHeader: {
    fontSize: 50,
    fontWeight: '500',
    position: 'absolute',
    top: 50,
    left: 30
  }
});


export default WorkoutList
