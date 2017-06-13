import firebase from 'firebase';
import * as utils from 'app/utils/misc';

var config = {
  apiKey: "AIzaSyCm_QCK3cp_T4LCGWv0JHZQrlrSFXLsB1I",
  authDomain: "doli-circuit.firebaseapp.com",
  databaseURL: "https://doli-circuit.firebaseio.com",
  projectId: "doli-circuit",
  storageBucket: "doli-circuit.appspot.com",
  messagingSenderId: "691845579867"
};
firebase.initializeApp(config);

// check login
export const checkLogin = (cb) =>{
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

// get user
export const getUser = (user) => {
  return new Promise((resolve, reject) => {
	  firebase.database()
	  .ref('users')
  	.child(user.uid)
	  .once('value')
	  .then((snapshot) => {
	    if (snapshot.val) {
	      resolve(snapshot.val());
	    }
	  })
	}).catch(error => console.log(error));
}

// get feed
export const getFeed = () => {
  return new Promise((resolve, reject) => {
	  firebase.database().ref('feed')
	  .once('value')
	  .then((snapshot) => {
	    if (snapshot.val) {
	      resolve(utils.returnObjectAsArray(snapshot.val()));
	    }
	  })
	}).catch(error => console.log(error));
}

// save to feed
export const saveToFeed = (user, workout) => {
	console.log(workout);
  firebase.database()
  	.ref('feed')
  	.push(workout);
  firebase.database()
  	.ref('users')
  	.child(user.uid)
  	.child('workouts')
  	.push(workout);
}

// set push token on user
export const setPushCredentials = (user, credentials) => {
  firebase.database()
  	.ref('users')
	  .child(user.uid)
	  .set('pushCredentials', credentials);
}