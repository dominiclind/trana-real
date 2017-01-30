import React, { Component } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import Paragraph from 'app/components/Paragraph';


class FeedListItem extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  _getTimeOfDay(time) {
    const hours = new Date(time).getHours();

    console.log(hours);
    if (hours > 0 && hours < 10) {
      return 'morning';
    }
    if (hours > 10 && hours <= 15) {
      return 'lunch';
    }
    if (hours > 15 && hours <= 18) {
      return 'dinner';
    }
    if (hours > 18) {
      return 'night';
    }
  }

  _renderExercises(exercises = []) {
    let exerciseString = '';
    exercises.map(e => {
      exerciseString += e.name + ', ';
    });

    return exerciseString;
  }
  render() {
    const { workout } = this.props;
    const {
      mood,
      endDate
    } = workout;

    return (
      <View style={ styles.component }>
        <View style={styles.moodWrap}>
          <Paragraph style={styles.mood}>{mood}</Paragraph>
        </View>
        <View style={styles.content}>
          <Paragraph weight="bold" style={styles.feedHeader}>{this._getTimeOfDay(workout.endDate).toUpperCase()} WORKOUT</Paragraph>
          <Paragraph style={styles.exercises}>{this._renderExercises(workout.exercises)}</Paragraph>
        </View>
        <View style={styles.favWrap}>
        </View>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 15
  },
  moodWrap: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mood: {
    fontSize: 30,
    marginBottom: 0
  },
  content: {
    paddingHorizontal: 15
  },
  feedHeader: {
    fontSize: 16,
    marginBottom: 5,
  },
  exercises: {
    fontSize: 16,
    color: 'rgba(0,0,0,.2)',
    marginBottom: 0
  }
});


export default FeedListItem
