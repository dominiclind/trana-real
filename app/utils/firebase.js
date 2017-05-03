// import Firestack from 'react-native-firestack';
import NavStore from 'app/stores/Nav';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCm_QCK3cp_T4LCGWv0JHZQrlrSFXLsB1I",
  authDomain: "doli-circuit.firebaseapp.com",
  databaseURL: "https://doli-circuit.firebaseio.com",
  projectId: "doli-circuit",
  storageBucket: "doli-circuit.appspot.com",
  messagingSenderId: "691845579867"
};
firebase.initializeApp(config);

const returnFirebaseAsArray = (snapshot) => {
  const toReturn = [];

  Object.keys(snapshot).map((key, index) => {
  	toReturn.push({value: snapshot[key], id: key });
  })
  return toReturn
}


// const firestack = new Firestack({
//   debug: true
// });

// firestack.on('debug', msg => log(msg));


// check login
export const checkLogin = (cb) =>{
	// firestack.auth
	// .listenForAuth((response) => {
	// 	console.log(response);
	// })
	// .then(() => {
	// 	console.log('Listening for authentication changes')
	// });
	firebase.auth().onAuthStateChanged(function(user) {
		cb(user);
	  if (user) {
	    // User is signed in.
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...
	  } else {
	    // User is signed out.
	    // ...
	  }
	});
}

// login
export const login = (token) => {
	var provider = new firebase.auth.FacebookAuthProvider();
	var credential = firebase.auth.FacebookAuthProvider.credential(token);

// 	firestack.auth.signInWithProvider('facebook', token, '');
	firebase.auth().signInWithCredential(credential).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	});
}

// logout
export const logout = () => firebase.auth().signOut();

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
	  firebase.database().ref('feed')
	  .once('value')
	  .then((snapshot) => {
	    if (snapshot.val) {
	      resolve(returnFirebaseAsArray(snapshot.val()));
	    }
	  })
	}).catch(error => console.log(error));
}

// save to feed
export const saveToFeed = (workout) => {
	console.log(workout);
  firebase.database().ref('feed').push(workout)
}
