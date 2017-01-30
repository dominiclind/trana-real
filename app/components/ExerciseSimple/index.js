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
import Icon from 'react-native-vector-icons/Ionicons';


import WorkoutStore from 'app/stores/Workout';

class ExerciseSimple extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentSet: 0,
      sets: []
    }
  }

  componentDidMount() {
  }

  _addSet() {
    const { fullscreen, exercise } = this.props;
    const { name, sets = [] } = exercise;
    
    // WorkoutStore.addSet(exercise);
    this.state.sets.push({
      done: false,
      reps: '',
      weight: ''
    });
    this.setState({ sets: this.state.sets });
  }
  deleteExercise() {
    const { exercise } = this.props;
    console.log(exercise);
    WorkoutStore.deleteExercise(exercise);
  }

  render() {
    const { fullscreen, exercise } = this.props;
    const { name } = exercise;

    return (
      <View style={ styles.component }>
        <Header>{name}</Header>

        <Icon
          style={styles.close}
          name="md-remove-circle"
          size={30}
          color="black"
          onPress={() => this.deleteExercise()}
        />

        <View style={styles.tableHeader}>
          <Paragraph weight="bold" style={styles.tableHeaderReps}>SET</Paragraph>
          <Paragraph weight="bold" style={styles.tableHeaderReps}>REPS</Paragraph>
          <Paragraph weight="bold" style={styles.tableHeaderWeight}>WEIGHT</Paragraph>
        </View>

        <ScrollView
          style={styles.scrollView}
           keyboardShouldPersistTaps={true}
          keyboardDismissMode="on-drag"
        >
          {this.state.sets.map((set, index) => {
            return (
              <View 
                key={index}
                style={[
                  styles.setItem,
                  { zIndex: 100-index }
                ]}
              >
                <Paragraph style={styles.setIndicator}>{index+1}</Paragraph>
                <TextInput
                  value={this.state.sets[index].reps || ''}
                  onChangeText={(text) => {
                    this.state.sets[index].reps = text;
                    this.setState({ sets: this.state.sets });
                  }}
                  onEndEditing={() => {
                    WorkoutStore.saveSet(exercise, index, {reps: this.state.sets[index].reps});
                  }}
                  autoCapitalize="characters"
                  maxLength={2} 
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  autoCorrect={false}
                  placeholder="12"
                  placeholderTextColor="rgba(0,0,0,.15)"
                  style={[styles.input, {width: 50}]}
                />
                <Paragraph style={styles.asterix}>*</Paragraph>
                <TextInput
                  value={this.state.sets[index].weight || ''}
                  onChangeText={(text) => {
                    this.state.sets[index].weight = text;
                    this.setState({ weight: this.state.weight });
                  }}
                  onEndEditing={() => {
                    WorkoutStore.saveSet(exercise, index, {weight: this.state.sets[index].weight});
                  }}
                  maxLength={3}
                  autoCapitalize="characters"
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  autoCorrect={false}
                  placeholder="80"
                  placeholderTextColor="rgba(0,0,0,.15)"
                  style={styles.input}
                />
              </View>
            )
          })}
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
  setItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 5,
    borderBottomWidth : 1,
    borderBottomColor: '#4d4d4d',
    paddingLeft: 50,
    // shadowRadius: 5,
    // shadowOpacity: .3,
    // shadowColor: 'black',
    // shadowOffset: {
    //   x: 0,
    //   y: 10
    // }
  },
  setIndicator: {
    position: 'absolute',
    left: 10,
    top: 24,
    fontSize: 22,
    lineHeight: 29,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 15, 
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
  asterix: {
    width: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    lineHeight: 60,
    color: 'rgba(0,0,0,.1)',
    backgroundColor: 'transparent'
  },
  input: {
    height: 40,
    width: 75,
    color: '#4d4d4d',
    marginTop: 4,
    marginRight: 10,
    textAlign:'center',
    fontSize: 30,
    fontFamily: 'Circular',
    backgroundColor: 'transparent'
  },
  addNewSetWrap: {
    //marginTop: 20
  }
});


export default ExerciseSimple
