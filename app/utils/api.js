const EXERCISES = [
  {
    name : 'Deadlift'
  },
  {
    name : 'Thrusters'
  },
  {
    name : 'Lunges'
  },
  {
    name : 'Squat'
  },
  {
    name : 'Burpees'
  },
  {
    name : 'Chins'
  },
  {
    name : 'Bench Press'
  },
  {
    name : 'Dips'
  },
  {
    name : 'Bent over row'
  },
  {
    name : 'Squat Cleans'
  },
  {
    name : 'Kettlebell Swings'
  },
  {
    name : 'Military Press'
  },
  {
    name : 'Russian Twist'
  },
  {
    name : 'Crunches'
  }
];

import Immutable from 'immutable';
import axios from 'axios';

const exercises = require('../../data/exercises.json');

const getExercises = () => {
	return EXERCISES
}

const getBodybuildingExercises = () => new Promise((resolve,reject) => {
  axios.get('http://workout.doli.cloud/api/exercises').then(response => {
    if (response.status == 200) {
      const { data } = response;
      const exercises = data.workouts;
      resolve(exercises);
    } else {
      reject([]);
    }
  })
  // const fixedList = Object.keys(exercises).map(i => {
  //   const name = Object.keys(exercises[i])[0];
  //   const e = exercises[i][name];

  //   return {
  //     ...e,
  //     Name: name,
  //     id : Number(i)
  //   };
  // })

  // return fixedList;
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

const addNewExercise = (exercise) => {
  console.log('add ', exercise);
}

export {
  getAllExercises,
  getBodybuildingExercises,
	getExercises,
  addNewExercise
};
