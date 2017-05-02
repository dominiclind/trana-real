import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';


import Header from 'app/components/Header';
import Button from 'app/components/Button';
import Paragraph from 'app/components/Paragraph';
import Set from 'app/components/Set';

import Icon from 'react-native-vector-icons/Ionicons';


import WorkoutStore from 'app/stores/Workout';

class ExerciseSimple extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentSet: 0,
      sets: props.exercise.sets || []
    }
  }

  componentDidMount() {
  }

  _addSet() {
    const { exercise } = this.props;
    this.props.addSet(exercise);
  }
  _performSet() {
    const { exercise } = this.props;
    this.props.performSet({index, set: current });
  }
  _deleteExercise() {
    const { exercise } = this.props;
    this.props.deleteExercise(exercise);
  }

  render() {
    const { fullscreen, exercise, sets = [] } = this.props;
    return (
      <View style={ styles.component }>
        <Header style={styles.header}>{exercise.name}</Header>

        <Icon
          style={styles.close}
          name="md-remove-circle"
          size={30}
          color="black"
          onPress={() => this._deleteExercise()}
        />

        <View style={styles.tableHeader}>
          <Paragraph weight="bold" style={styles.tableHeaderReps}>SET</Paragraph>
          <Paragraph weight="bold" style={styles.tableHeaderReps}>REPS</Paragraph>
          <Paragraph weight="bold" style={styles.tableHeaderWeight}>WEIGHT</Paragraph>
        </View>

        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          {sets.map((set, index) => (
            <Set
              key={index}
              index={index}
              set={set}
              onRepsChange={(reps) => this.props.onSetChange(index, {reps})}
              onWeightChange={(weight) => this.props.onSetChange(index, {weight})}
            />
          ))}
          <View style={styles.addNewSetWrap}>
            <Button onPress={() => this._addSet()}>Add Set</Button>
          </View>
        </ScrollView>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'white',
    flex: 1,
    paddingTop: 40
  },
  scrollView: {
    flex: 1,
  },
  close: {
    position: 'absolute',
    top: 46,
    right: 20
  },
  text: { 
    marginTop: 18,
    padding: 0,
    backgroundColor: 'red'
  },
  header: {
    fontSize: 18,
    marginTop: 7,
    marginBottom: 20,
    marginHorizontal: 50
  },
  tableHeader: {
    backgroundColor: 'rgba(0,0,0,.2)',
    flexDirection: 'row',
    paddingLeft: 12,
    height: 25
  },
  tableHeaderReps: {
    height: 25,
    fontSize: 15,
    width: 46,
    color: 'white',
    backgroundColor: 'transparent'
  },
  tableHeaderWeight: {
    fontSize: 15,
    marginLeft: 35,
    height: 25,
    width: 75,
    color: 'white',
    backgroundColor: 'transparent'
  },
});


export default ExerciseSimple
