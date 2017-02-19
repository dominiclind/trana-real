import React, { Component } from 'react';


import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Header from 'app/components/Header';
import Paragraph from 'app/components/Paragraph';


class WorkoutInfoModalContent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { workout:workoutObject, exercises } = this.props;
    const { id, value:workout } = workoutObject;

    console.log(exercises);

    return (
      <View style={ styles.component }>
        <Header style={{fontSize: 22, marginBottom: 30}}>Workout Summary</Header>
        {exercises.reverse().map((exercise, i) => {
          const sets = exercise.sets.map((set, i) => {
            return <Paragraph style={{fontSize: 14}}>{set.reps}x{set.weight}kg{i == exercise.sets.length-1 ? '' : ', '}</Paragraph>;
          });

          return (
            <View>
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
