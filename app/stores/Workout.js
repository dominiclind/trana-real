import {
  observable,
  autorun,
  computed,
  action
} from 'mobx';

import { Actions } from 'react-native-router-flux';

import NavStore from 'app/stores/Nav';
import CardSliderStore from 'app/stores/CardSlider';
import Firebase from 'app/stores/Firebase';

class Workout {
  @observable startDate = false;
  @observable exercises = [];
  @observable totalSets = 0;

  @computed get amountOfExercises () {
    return this.exercises.length;
  }

  constructor() {
    // place reactions and autoruns here.
  }
  @action addExercise(exercise){
    console.log('-- added exercise--' , exercise);
    this.exercises.push({...exercise, sets: []});
  }
  @action deleteExercise(exercise){
    let foundIndex = false;
    this.exercises.map((e, index) => {
      if (e.value.name == exercise.value.name) {
        foundIndex = index;
      }
    });
    this.exercises.splice(foundIndex, 1);
  }
  @action addSet(exercise){
    const sets = exercise.sets || [];
    this.totalSets++;
    sets.push({
      done: false,
      reps: '0',
      weight: '0'
    });

    this.exercises.map(e => {
      if (e.value.name == exercise.value.name) {
        e.sets = sets;
      }
    });
  }
  @action saveSet(exercise, currentSet, newSet){
    const sets = exercise.sets || [];
    // add set to total sets Done
    //this.totalSets++;

    this.exercises.map(e => {
      if (e.value.name == exercise.value.name) {
        // add weight & reps and 
        // mark as done
        const saveSet = {
          ...sets[currentSet],
          ...newSet
        };
        sets[currentSet] = saveSet;
      }
    });
  }
  @action startWorkout() {
    console.log('start workout');
    this.startDate = new Date().getTime();

    // NavStore.goTo('workout');
    Actions.workout();
  }
  @action cancelWorkout() {
    this.startDate = false;
    this.exercises = [];
    // NavStore.goTo('feed');
    Actions.feed()
  }
  @action endWorkout(mood) {
    const workoutToSend = {
      mood,
      exercises: [],
      startDate: this.startDate,
      endDate: new Date().getTime()
    };

    // clean mobx array
    for (var i = this.exercises.length - 1; i >= 0; i--) {
      const e = this.exercises[i];

      const cleanSets = e.sets.map((set) => {
        const returnSet = {};
        if (set.reps) {
          returnSet.reps = set.reps;
        }
        if (set.weight) {
          returnSet.weight = set.weight;
        }
        return returnSet
      });

      if (cleanSets.length) {
        workoutToSend.exercises.push({
          id: e.id,
          sets : cleanSets
        });
      }
    }
    this.exercises = [];
    this.startDate = false;
    Firebase.saveWorkout(workoutToSend);
    // NavStore.goTo('feed');
    Actions.feed()
  }  

}

export default new Workout();
