import React, { Component } from 'react';


import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Header from 'app/components/Header';
import Paragraph from 'app/components/Paragraph';
import {getBodypartsWorked} from 'app/utils/workout';


class WorkoutInfoModalContent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { workout:workoutObject, exercises } = this.props;
    const { id, value:workout } = workoutObject;

    return (
      <View style={ styles.component }>
        <Header style={{fontSize: 22, marginBottom: 30}}>{getBodypartsWorked(exercises) + ' WORKOUT'}</Header>
        {exercises.reverse().map((exercise, i) => {
          let sets = [];
          if (exercise.sets) {
            sets = exercise.sets.map((set, i) => {
              return <Paragraph key={i} style={{fontSize: 14}}>{set.reps ? set.reps : 0}x{set.weight ? set.weight : 0}kg{i == exercise.sets.length-1 ? '' : ', '}</Paragraph>;
            });
          }

          return (
            <View key={i}>
              <Paragraph weight="bold" style={{marginBottom:5}} key={i}>{exercise.name}</Paragraph>
              <View style={{flexDirection:'row'}}>{sets}</View>
            </View>
          )
        })}
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
    flex: 1,
    paddingTop: 30
  }
});


export default WorkoutInfoModalContent
