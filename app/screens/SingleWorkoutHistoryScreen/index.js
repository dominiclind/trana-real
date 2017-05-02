import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import {warn, log} from 'app/utils/log';
import { distanceInWordsToNow, differenceInMinutes, format } from 'date-fns';

import {getBodypartsWorked} from 'app/utils/workout';

import Paragraph from 'app/components/Paragraph';
import ParallaxHeader from 'app/components/ParallaxHeader';
import WorkoutMeta from 'app/components/WorkoutMeta';
import FeedListItem from 'app/components/FeedListItem';
import ExerciseHistoryItem from 'app/components/ExerciseHistoryItem';

class SingleWorkoutHistoryScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, workout } = this.props;

    console.log(workout);
  }

  render() {
    const { workout } = this.props;
    const {
      exercises,
      sets,
      startDate,
      endDate
    } = workout;
    return (
      <ParallaxHeader
        onBack={() => Actions.pop()}
        title={`${getBodypartsWorked(exercises)} Workout`}
        subtitle={`${format(endDate, 'dddd D/M YYYY')}`}
      >
        <View style={styles.head}>
          <WorkoutMeta minutes={differenceInMinutes(endDate, startDate)} />
        </View>
        <View style={{backgroundColor: 'white'}}>
          {exercises.map((exercise, index) => (
            <ExerciseHistoryItem
              key={index}
              {...exercise}
              sets={workout.sets[exercise.id]}
            />
          ))}
        </View>
      </ParallaxHeader>
    );
  }
}


// styles
const styles = StyleSheet.create({
  page : {
    flex: 1,
  },
  head: {
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center'
  }
});


// get relevant props from state
function mapStateToProps(state) {
  const { navigation } = state;

  return {
    navigation
  };
}

export default connect(mapStateToProps)(SingleWorkoutHistoryScreen);
