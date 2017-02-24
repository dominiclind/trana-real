import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {distanceInWords} from 'date-fns'

import Paragraph from 'app/components/Paragraph';
import FavoriteStar from 'app/components/FavoriteStar';

import {getBodypartsWorked} from 'app/utils/workout';

class FeedListItem extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  _getTimeOfDay(time) {
    const hours = new Date(time).getHours();
    return distanceInWords(new Date(time), new Date());
  }

  _renderExercises(exercises = []) {
    let exerciseString = '';
    exercises.reverse().slice(0,2).map(e => {
      exerciseString += e.name + ', ';
    });

    return exerciseString + '..';
  }
  render() {
    const { workout, id, exercises, favorite } = this.props;
    const {
      mood,
      endDate
    } = workout;

    return (
      <TouchableOpacity onPress={this.props.onPress}>
      <View style={ styles.component }>
        <Paragraph style={styles.mood}>{mood}</Paragraph>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Paragraph weight="bold" style={styles.feedHeading}>
              {getBodypartsWorked(exercises).toUpperCase() + ' WORKOUT'}
            </Paragraph>
            <Paragraph weight="bold" style={styles.feedDate}>
              {this._getTimeOfDay(workout.endDate).toUpperCase()} AGO
            </Paragraph>
          </View>
          <Paragraph style={styles.exercises}>{this._renderExercises(exercises)}</Paragraph>
        </View>
        <FavoriteStar id={id} favorite={favorite}/>
      </View>
      </TouchableOpacity>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    flexDirection: 'row',
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
    backgroundColor:'transparent',
    flex: 1,
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin:0
  },
  feedHeading: {
    fontSize: 15,
    lineHeight: 15,
    marginBottom: 2,
    backgroundColor: 'transparent'
  },
  feedDate: {
    fontSize: 11,
    lineHeight: 14,
    marginBottom: 8,
    backgroundColor: 'transparent',
    color: 'rgba(0,0,0,.3)'
  },
  exercises: {
    fontSize: 14,
    backgroundColor: 'transparent',
    marginBottom: 0
  }
});


export default FeedListItem
