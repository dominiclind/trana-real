// import {
//   observable,
//   autorun,
//   action,
//   computed
// } from 'mobx';


// import store from 'react-native-simple-store';


// const returnFirebaseAsArray = (snapshot) => {
//   const toReturn = [];
//   snapshot.forEach((item) => {
//     toReturn.push({value: item.value, id: item.key });
//   });
//   return toReturn
// }

// import { Actions } from 'react-native-router-flux';

// // import Firestack from 'react-native-firestack';
// import NavStore from 'app/stores/Nav';

// const configurationOptions = {
//   debug: true
// };


// //
// // mobx store for Firebase
// //
// class Firebase {
//   @observable user = {};
//   constructor() {
//     // place reactions and autoruns here.
//     // this.firestack = new Firestack(configurationOptions);
//     // this.firestack.on('debug', msg => this.debugLog(msg));
//   }

//   @action debugLog(msg) {
//     console.log(msg);
//   }
//   @action checkLogin() {
//     console.log('listen for auth');
//     this.firestack.auth.listenForAuth((evt) => {
//       // evt is the authentication event
//       if (!evt.authenticated) {
//         // There was an error or there is no user
//         // console.error(evt.error);
//         // NavStore.goTo('login');
//         Actions.login();
//       } else {
//         // evt.user contains the user details
//         this.user = evt.user;
//         // store.save('user', evt.user);
//         Actions.feed();
//       }
//     })
//     .then(() => console.log('Listening for authentication changes'));
//   }
//   @action login(token) {
//     this.firestack.auth.signInWithProvider('facebook', token, '')
//     .then((user)=>{
//       console.log(user);
//     })
//   }
//   @action logout() {
//     this.firestack.auth.signOut()
//   }
//   @action saveWorkout(workout) {
//     const { uid } = this.user;
//     if (!uid) {
//       console.error('no user loggedin');
//     } else{
//       this.firestack.database.ref('users').child(uid).child('workouts').push(workout)
//     }
//   }
//   @action toggleFavorite(childKey, currentState) {
//     const { uid } = this.user;
//     if (!uid) {
//       console.error('no user loggedin');
//     } else{
//      //  this.firestack.database.ref('users').child(uid).child('workouts').push(workout);
//       console.log('key of favorite workout: ', childKey);
//       this.firestack.database.ref('users')
//       .child(uid)
//       .child('favoriteWorkouts')
//       .once('value')
//       .then(snapshot => {
//         if (snapshot.val) {
//           const favs = snapshot.val() == null ? [] : snapshot.val();

//           if (favs.indexOf(childKey) == -1) {
//             favs.push(childKey);
//           } else {
//             favs.splice(favs.indexOf(childKey), 1);
//           }

//           this.firestack.database.ref('users')
//           .child(uid)
//           .child('favoriteWorkouts')
//           .set(favs)
//         }
//       })

//     }
//   }
//   @action saveExercise(exercise) {
//     // save exercise to all
//     // this.firestack.database.ref('exercises').push(exercise);
  
//     // save only to user
//     const { uid } = this.user;
//     if (!uid) {
//       console.error('no user loggedin');
//     } else{
//       this.firestack.database.ref('users')
//       .child(uid)
//       .child('exercises')
//       .push(exercise)
//     }
//   }

//   @action getFavoriteWorkouts() {
//     const { uid } = this.user;
//     if (!uid) {
//       console.error('no user loggedin');
//     } else{
//       return new Promise((resolve, reject) => {
//         this.firestack.database.ref('users')
//         .child(uid)
//         .child('favoriteWorkouts')
//         .once('value')
//         .then((snapshot) => {
//           if (snapshot.val) {
//             resolve(snapshot.val() || []);
//           }
//         })
//       }).catch(error => console.log(error));
//     }
//   }
  
//   @action getExercises() {
//     return new Promise((resolve, reject) => {
//       this.firestack.database.ref('exercises')
//       .once('value')
//       .then((snapshot) => {
//         if (snapshot.val) {
//           resolve(returnFirebaseAsArray(snapshot));
//         }
//       })
//     }).catch(error => console.log(error));
//   }

//   @action getMyFeed() {
//     const { uid } = this.user;
//     if (!uid) {
//       console.error('no user loggedin');
//     } else{
//       return new Promise((resolve, reject) => {
//         this.firestack.database.ref('users')
//         .child(uid)
//         .child('workouts')
//         .once('value')
//         .then((snapshot) => {
//           if (snapshot.val) {
//             resolve(returnFirebaseAsArray(snapshot));
//           }
//         })
//       }).catch(error => console.log(error));
//     }
//   }

// }
// export default new Firebase();
