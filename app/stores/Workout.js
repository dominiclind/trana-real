import {
  observable,
  autorun,
  computed,
  action
} from 'mobx';
import remotedev from 'mobx-remotedev';
import { AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import NavStore from 'app/stores/Nav';
import Firebase from 'app/stores/Firebase';

class Workout {
  @observable startDate = false;
  @observable exercises = [];
  @observable totalSets = 0;
  @observable rehydrated = false;

  @computed get amountOfExercises () {
    return this.exercises.length;
  }

  constructor() {
    // place reactions and autoruns here.
    this.rehydrate();
  }

  @action rehydrate() {
    Promise.all([
      store.get('exercises'),
      store.get('startDate')
    ]).then(results => {
      console.log('--rehydrated--');
      this.rehydrated = true;
      const exercises = results[0];
      const startDate = results[1];
      if (exercises != null) {
        this.exercises = exercises;
      }
      if (startDate != null) {
        this.startDate = startDate;
      }
    });
  }

  @action addExercise(exercise){
    this.exercises.push({...exercise, sets: []});
    store.save('exercises', this.exercises.toJSON());
  }
  @action deleteExercise(exercise){
    let foundIndex = false;
    this.exercises.map((e, index) => {
      if (e.id == exercise.id) {
        foundIndex = index;
      }
    });
    this.exercises.splice(foundIndex, 1);

    store.save('exercises', this.exercises.toJSON());
  }
  @action addSet(exercise){
    const sets = exercise.sets || [];

    sets.push({
      done: false,
      reps: '0',
      weight: '0'
    });

    this.exercises.map(e => {
      if (e.name == exercise.name) {
        e.sets = sets;
      }
    });

    store.save('exercises', this.exercises.toJSON());
  }
  @action saveSet(exercise, currentSet, newSet){
    const sets = exercise.sets || [];
    // add set to total sets Done
    //this.totalSets++;

    this.exercises.map(e => {
      if (e.id == exercise.id) {
        // add weight & reps and 
        // mark as done
        const saveSet = {
          ...sets[currentSet],
          ...newSet
        };
        sets[currentSet] = saveSet;
      }
    });

    store.save('exercises', this.exercises.toJSON());
  }
  @action startWorkout() {
    if (!this.startDate) {
      console.log('start new workout');
      this.startDate = new Date().getTime();
      store.save('startDate', this.startDate);
    } else{
      console.log('resume workout!');
    }
    // NavStore.goTo('workout');
    Actions.workout();
  }
  @action cancelWorkout() {
    this.startDate = false;
    this.exercises = [];
    // NavStore.goTo('feed');
    Actions.feed();

    store.delete('exercises');
    store.delete('startDate');
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

    store.delete('exercises');
    store.delete('startDate');
    Actions.feed()
  }  
}

const workout = remotedev(new Workout, {
  name: 'WorkoutStore',
  // remote: true,
  // onlyActions: true
});

export default workout;
// export default new Workout();
