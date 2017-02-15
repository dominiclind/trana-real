import React, { Component } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

import { getExercises, addNewExercise } from 'app/utils/api';

import WorkoutStore from 'app/stores/Workout';
import Paragraph from 'app/components/Paragraph';
import Button from 'app/components/Button';

import Firebase from 'app/stores/Firebase';

class AddExercise extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search : ''
    };
  }

  componentDidMount() {
    Firebase.getExercises().then(exercises => {
      this.setState({exercises});
    });
  }

  addNewExercise() {
    const { search } = this.state;
    
    // have to get key from firebase, then save workout
    WorkoutStore.addExercise({name: search.trim().toProperCase()})
    Firebase.saveExercise({name: search.trim().toProperCase()});
    
    this.setState({search: ''});
  }
  addExercise(exercise) {
    WorkoutStore.addExercise(exercise);

    this.setState({search: ''});
  }
  _filter(exercises){
    const { search } = this.state;
    const { exercises:chosenExercises } = WorkoutStore;
    const chosen = chosenExercises.toJSON().map(e => e.value.name.toLowerCase());

    // if (search.length) {
    return exercises.filter(exercise => {
      const e = exercise.value;
      if (e.name.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
          chosen.indexOf(e.name.toLowerCase()) == -1
        ){
        return e;
      }
    });
    // } else {
    //   return []
    // }
  }

  render() {
    const { exercises = [] } = this.state;

    return (
      <View style={ styles.component }>
        <TextInput
          value={this.state.search}
          onChangeText={(text) => this.setState({search: text})}
          autoCapitalize="characters"
          autoCorrect={false}
          placeholder="SEARCH FOR EXERCISE"
          style={styles.input}
        />
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
        >
          {this._filter(exercises).map((exercise, i) => {
            return (
              <TouchableOpacity key={exercise.value.name} style={styles.listItem} onPress={() => this.addExercise(exercise)}>
                <Paragraph weight="bold">{exercise.value.name.toUpperCase()}</Paragraph>
              </TouchableOpacity>
            )
          })}
          {this._filter(exercises).length == 0 && this.state.search.length > 0 ? (
            <View style={{}}>
              <Button onPress={() => this.addNewExercise()}>Add New Exercise</Button>
            </View>
          ) : null}
        </ScrollView>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'rgba(0,0,0,.0)',
    flex: 1
  },
  input: {
    fontSize: 18,
    fontFamily: 'Circular-bold',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  listItem: {
    justifyContent: 'center',
    paddingTop:22,
    paddingBottom: 5,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  }
});


export default AddExercise
