import {
  observable,
  autorun,
  action,
  computed
} from 'mobx';

// const EXERCISES = [
//   {
//     name : 'Deadlift'
//   },
//   {
//     name : 'Thrusters'
//   },
//   {
//     name : 'Lunges'
//   },
//   {
//     name : 'Squat'
//   },
//   {
//     name : 'Burpees'
//   },
//   {
//     name : 'Chins'
//   },
//   {
//     name : 'Bench Press'
//   },
//   {
//     name : 'Dips'
//   },
//   {
//     name : 'Bent over row'
//   },
//   {
//     name : 'Squat Cleans'
//   },
//   {
//     name : 'Kettlebell Swings'
//   },
//   {
//     name : 'Military Press'
//   },
//   {
//     name : 'Russian Twist'
//   },
//   {
//     name : 'Crunches'
//   }
// ];

import Firestack from 'react-native-firestack';
import NavStore from 'app/stores/Nav';

const configurationOptions = {
  debug: true
};


//
// mobx store for Firebase
//
class Firebase {
  @observable user = {};
  constructor() {
    // place reactions and autoruns here.
    this.firestack = new Firestack(configurationOptions);
    this.firestack.on('debug', msg => this.debugLog(msg));
    this.firestack.auth.listenForAuth((evt) => {
      // evt is the authentication event
      if (!evt.authenticated) {
        // There was an error or there is no user
        // console.error(evt.error);
        // NavStore.goTo('login');
      } else {
        // evt.user contains the user details
        console.log('User details', evt.user);
        this.user = evt.user;
        // NavStore.goTo('workout');
        // NavStore.goTo('feed');
      }
    })
    .then(() => console.log('Listening for authentication changes'))
  }

  @action debugLog(msg) {
    console.log(msg);
  }
  @action login(token) {
    this.firestack.auth.signInWithProvider('facebook', token, '')
    .then((user)=>{
      console.log(user)
    })
  }
  @action saveWorkout(workout) {
    const { uid } = this.user;
    if (!uid) {
      console.error('no user loggedin');
    } else{
      this.firestack.database.ref('users').child(uid).child('workouts').push(workout)
    }
  }
  @action saveExercise(exercise) {
    this.firestack.database.ref('exercises').push(exercise);
  }
  @action getExercises() {
    return new Promise((resolve, reject) => {
      this.firestack.database.ref('exercises')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val) {
          const returnExercises = [];
          snapshot.forEach((exercise) => {
            returnExercises.push({name : exercise.value.name });
          });
          resolve(returnExercises);
        }
      })
    }).catch(error => console.log(error));
  }
  @action getMyFeed() {
    const { uid } = this.user;
    if (!uid) {
      console.error('no user loggedin');
    } else{
      return new Promise((resolve, reject) => {
        this.firestack.database.ref('users')
        .child(uid)
        .child('workouts')
        .once('value')
        .then((snapshot) => {
          if (snapshot.val) {
            resolve(snapshot.val() || {});
          }
        })
      }).catch(error => console.log(error));
    }
  }
}
export default new Firebase();
