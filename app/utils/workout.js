const getExercisesForWorkout = (workout = [], all = []) => {
	const arr = [];
	workout.forEach(exercise => {
		if (exercise.id) {
			all.forEach(e => {
				if (exercise.id == e.id) {
					arr.push({
						sets : exercise.sets,
						...e.value
					});
				}
			});
		}
	});
	return arr;
};

export {
	getExercisesForWorkout
};
