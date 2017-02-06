import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import Paragraph from 'app/components/Paragraph';
import FavoriteStar from 'app/components/FavoriteStar';

class FeedListItem extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  _getTimeOfDay(time) {
    const hours = new Date(time).getHours();5
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
    exercises.reverse().slice(0,2).map(e => {
      exerciseString += e.name + ', ';
    });

    return exerciseString + '..';
  }
  render() {
    const { workout } = this.props;
    const {
      mood,
      endDate
    } = workout;

    return (
      <View style={ styles.component }>
        <Paragraph style={styles.mood}>{mood}</Paragraph>
        
        <View style={styles.content}>
          <Paragraph weight="bold" style={styles.feedHeader}>{this._getTimeOfDay(workout.endDate).toUpperCase()} WORKOUT</Paragraph>
          <Paragraph style={styles.exercises}>{this._renderExercises(workout.exercises)}</Paragraph>
        </View>

        <FavoriteStar favorite={true}/>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 30,
    paddingHorizontal: 15
  },
  moodWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60
  },
  mood: {
    backgroundColor:'transparent',
    width:40,
    marginRight: 10,
    fontSize: 30,
    marginBottom: 0
  },
  content: {
    // paddingHorizontal: 15
    flex: 1,
    backgroundColor: 'transparent'
  },
  feedHeader: {
    fontSize: 15,
    marginBottom: 5,
  },
  exercises: {
    fontSize: 14,
    color: 'rgba(0,0,0,.2)',
    marginBottom: 0
  }
});


export default FeedListItem
