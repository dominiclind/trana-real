import Firestack from 'react-native-firestack';
import NavStore from 'app/stores/Nav';


const returnFirebaseAsArray = (snapshot) => {
  const toReturn = [];
  snapshot.forEach((item) => {
    toReturn.push({value: item.value, id: item.key });
  });
  return toReturn
}


const firestack = new Firestack({
  debug: true
});

firestack.on('debug', msg => log(msg));


// check login
export const checkLogin = (cb) =>{
	firestack.auth.listenForAuth(cb)
	.then(() => console.log('Listening for authentication changes'));
}

// login
export const login = (token) => {
	firestack.auth.signInWithProvider('facebook', token, '');
}

// logout
export const logout = () => firestack.auth.signOut();

// get feed
// export const getFeed = (uid) => {
//   return new Promise((resolve, reject) => {
// 	  firestack.database.ref('users')
// 	  .child(uid)
// 	  .child('workouts')
// 	  .once('value')
// 	  .then((snapshot) => {
// 	    if (snapshot.val) {
// 	      resolve(returnFirebaseAsArray(snapshot));
// 	    }
// 	  })
// 	}).catch(error => console.log(error));
// }

// get feed
export const getFeed = () => {
  return new Promise((resolve, reject) => {
	  firestack.database.ref('feed')
	  .once('value')
	  .then((snapshot) => {
	    if (snapshot.val) {
	      resolve(returnFirebaseAsArray(snapshot));
	    }
	  })
	}).catch(error => console.log(error));
}

// save to feed
export const saveToFeed = (workout) => {
  firestack.database.ref('feed').push(workout)
}
