import {
  observable,
  autorun,
  action,
  computed
} from 'mobx';

const returnFirebaseAsArray = (snapshot) => {
  const toReturn = [];
  snapshot.forEach((item) => {
    toReturn.push({value: item.value, id: item.key });
  });
  return toReturn
}

import { Actions } from 'react-native-router-flux';

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
  }

  @action debugLog(msg) {
    console.log(msg);
  }
  @action checkLogin() {
    this.firestack.auth.listenForAuth((evt) => {
      // evt is the authentication event
      if (!evt.authenticated) {
        // There was an error or there is no user
        // console.error(evt.error);
        // NavStore.goTo('login');
      } else {
        // evt.user contains the user details
        this.user = evt.user;
        Actions.feed();
      }
    })
    .then(() => console.log('Listening for authentication changes'));
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
  @action toggleFavorite(childKey, currentState) {
    const { uid } = this.user;
    if (!uid) {
      console.error('no user loggedin');
    } else{
     //  this.firestack.database.ref('users').child(uid).child('workouts').push(workout);
      console.log('child key to update: ', childKey);
      
      this.firestack.database.ref('users')
      .child(uid)
      .child('workouts/' + childKey)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val) {
          const updates = {};
          updates[childKey] = {
            ...snapshot.val(),
            favorite: !snapshot.val().favorite
          }
          this.firestack.database.ref('users')
          .child(uid)
          .child('workouts')
          .update(updates);
        }
      })

    }
  }
  @action saveExercise(exercise) {
    // save exercise to all
    // this.firestack.database.ref('exercises').push(exercise);
  
    // save only to user
    const { uid } = this.user;
    if (!uid) {
      console.error('no user loggedin');
    } else{
      this.firestack.database.ref('users')
      .child(uid)
      .child('exercises')
      .push(exercise)
    }
  }
  @action getExercises() {
    return new Promise((resolve, reject) => {
      this.firestack.database.ref('exercises')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val) {
          resolve(returnFirebaseAsArray(snapshot));
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
            resolve(returnFirebaseAsArray(snapshot));
          }
        })
      }).catch(error => console.log(error));
    }
  }
}
export default new Firebase();
