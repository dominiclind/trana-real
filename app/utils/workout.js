const onlyUnique = (value, index, self) => self.indexOf(value) === index;


const getExercisesForWorkout = (workout = [], all = []) => {
	const arr = [];
	workout.forEach(exercise => {
		if (exercise.id) {
			all.forEach(e => {
				if (exercise.id == e.id) {
					arr.push({
						sets : exercise.sets,
						...e
					});
				}
			});
		}
	});
	return arr;
};


const getNormalizedBodyPart = (muscle = '') => {
	const legs = ['quadriceps', 'calves', 'glutes', 'hamstrings'];
	const arms = ['biceps', 'forearms', 'triceps'];
	const chest = ['chest'];
	const back = ['lats','middle back','lower back'];
	const shoulders = ['shoulders'];
	const abs = ['abdominals'];

	if (legs.indexOf(muscle.toLowerCase()) > -1) {
		return 'Legs'
	} else if(arms.indexOf(muscle.toLowerCase()) > -1){
		return 'Arms'
	} else if(chest.indexOf(muscle.toLowerCase()) > -1){
		return 'Chest'
	}	else if(back.indexOf(muscle.toLowerCase()) > -1){
		return 'Back'
	} else if(shoulders.indexOf(muscle.toLowerCase()) > -1){
		return 'Shoulders'
	} else if(abs.indexOf(muscle.toLowerCase()) > -1){
		return 'Abs'
	};

	return muscle;
}

const getBodypartsWorked = (exercises) => {
	const arrOfBodyParts = [];

	exercises.forEach(e => {
		arrOfBodyParts.push(getNormalizedBodyPart(e['Main Muscle Worked'].trim()));
	});

	const uniqueArray = arrOfBodyParts.filter(onlyUnique);

	return uniqueArray.slice() + '';

}

export {
	getBodypartsWorked,
	getNormalizedBodyPart,
	getExercisesForWorkout
};
