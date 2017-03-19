import React, { Component } from 'react';
import ImmutableListView from 'react-native-immutable-list-view';
import Immutable from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

import { getExercises, getBodybuildingExercises } from 'app/utils/api';

import WorkoutStore from 'app/stores/Workout';
import Paragraph from 'app/components/Paragraph';
import Button from 'app/components/Button';
import ExerciseListItem from 'app/components/ExerciseListItem';

import Firebase from 'app/stores/Firebase';


const SEARCH_LENGTH = 2;

class AddExercise extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search : ''
    };
  }

  componentDidMount() {
    getBodybuildingExercises().then(exercises => {
      this.setState({exercises});
    });
  }
  // addNewExercise() {
  //   const { search } = this.state;
    
  //   // have to get key from firebase, then save workout
  //   WorkoutStore.addExercise({name: search.trim().toProperCase()})
  //   Firebase.saveExercise({name: search.trim().toProperCase()});
    
  //   this.setState({search: ''});
  // }
  addExercise(exercise) {
    WorkoutStore.addExercise(exercise);

    this.setState({search: ''});
  }
  _filter(exercises){
    const { search } = this.state;
    const { exercises:chosenExercises } = WorkoutStore;

    const chosen = chosenExercises.toJSON().map(e => e.name.toLowerCase());

    let found = [];
    if (search.length > SEARCH_LENGTH) {
      found = exercises.filter(exercise => {
        // const e = exercise;
        if (exercise.name.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
            chosen.indexOf(exercise.name.toLowerCase()) == -1
          ){
          return exercise;
        }
      });
    }

    const all = {};
    found.forEach(exercise => {
      all[exercise.id] = exercise;
    });

    return Immutable.fromJS({
      'All Exercises': all,
    });
  }

  renderExerciseListItem(rowData) {
    const exercise = rowData.toJS();
    return (
      <ExerciseListItem
        exercise={exercise}
        onAdd={() => this.addExercise(exercise)}
      />
    )
  }

  renderSectionHeader(sectionHeader, data) {
    return (
      <Paragraph
        weight="bold"
        style={styles.sectionHeader}
      >
      {data.toUpperCase()}
      </Paragraph>
    )
  }

  render() {
    const { exercises = false } = this.state;

    return (
      <View style={ styles.component }>
        <View style={styles.searchInput}>
          <Icon name="md-search" style={styles.searchIcon}/>
          <TextInput
            value={this.state.search}
            onChangeText={(text) => this.setState({search: text})}
            autoCapitalize="characters"
            autoCorrect={false}
            placeholderTextColor="rgba(255,255,255,.4)"
            placeholder={`Type at least ${SEARCH_LENGTH+1} characters`}
            style={styles.input}
          />
        </View>
        {exercises ? (
          <ImmutableListView
            immutableData={this._filter(exercises)}
            renderRow={(rowData) => this.renderExerciseListItem(rowData)}
            renderSectionHeader={this.renderSectionHeader}
          />
        ) : <View style={{flex:1, justifyContent: 'center'}}><ActivityIndicator /></View> }
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
        >
        </ScrollView>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'rgba(0,0,0,.0)',
    flex: 1,
  },
  searchInput: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    //paddingLeft: 10
  },
  searchIcon: {
    fontSize: 32,
    backgroundColor: 'transparent',
    color: 'white',
    marginHorizontal: 20
  },
  input: {
    fontSize: 18,
    fontFamily: 'Circular-bold',
    height: 60,
    color: 'white',
    flex: 1,
    paddingHorizontal: 0,
  },
  sectionHeader: {
    marginBottom: 0,
    padding: 15,
    backgroundColor: 'black',
    color:'white'
  }
});


export default AddExercise
