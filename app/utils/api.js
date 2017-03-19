import Immutable from 'immutable';
import axios from 'axios';
import Config from 'react-native-config'


const exercises = require('../../data/exercises.json');

const getBodybuildingExercises = () => new Promise((resolve,reject) => {
  axios.get(`${Config.API_URL}/exercises`).then(response => {
    if (response.status == 200) {
      const { data } = response;
      const exercises = data.workouts;
      resolve(exercises);
    } else {
      reject([]);
    }
  });
});

const getAllExercises = () => new Promise((resolve, reject) => {
  const allToReturn = {};
  Promise.all([getBodybuildingExercises()]).then((combined) => {
    const all = {};

    combined[0].forEach(exercise => {
      all[exercise.id] = exercise;
    });

    allToReturn['All Execises'] = all;
    resolve(Immutable.fromJS({
      'Recent': {},
      'All Exercises': all,
    }));
  });
});

const pushOnWorkoutEnd = (user,workout) => new Promise((resolve, reject) => {
  console.log('pushOnWorkoutEnd');
  console.log(user, workout);

  axios.post(`${Config.API_URL}/push/endworkout`, { user,workout })
  .then(response => {
    console.log(response);
  });

});



export {
  getAllExercises,
  getBodybuildingExercises,
  pushOnWorkoutEnd
};
