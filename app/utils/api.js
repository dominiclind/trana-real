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
const getExercises = () => {
	return EXERCISES
}
const addNewExercise = (exercise) => {
  console.log('add ', exercise);
}
export {
	getExercises,
  addNewExercise
};
