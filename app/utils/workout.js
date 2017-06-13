const onlyUnique = (value, index, self) => self.indexOf(value) === index;
import * as utils from 'app/utils/misc';

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

// export function getExercisesForWorkout(workout = [], all = []) {
// 	const arr = [];
// 	workout.forEach(exercise => {
// 		if (exercise.id) {
// 			all.forEach(e => {
// 				if (exercise.id == e.id) {
// 					arr.push({
// 						sets : exercise.sets,
// 						...e
// 					});
// 				}
// 			});
// 		}
// 	});
// 	return arr;
// };


export function getNormalizedBodyPart(muscle = '') {
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

export function getBodypartsWorked(exercises) {
	const arrOfBodyParts = [];

	exercises.forEach(e => {
		arrOfBodyParts.push(getNormalizedBodyPart(e['Main Muscle Worked'].trim()));
	});

	const uniqueArray = arrOfBodyParts.filter(onlyUnique);

	return uniqueArray.slice() + '';

}

export function getTotalWeight(exercises) {
	let total = 0;
	// each exercise
	Object.keys(exercises).map(key => {
		// each set
		exercises[key].map(set => {
			total = total + (set.reps * Number(set.weight || 0));
		})
	}) ;

	return addCommas(total);
}

export function getExercisesForUser(user) {
	const { workouts } = user;

	const exercises = [];
	utils.returnObjectAsArray(workouts).forEach(({value:workout} = workout) => {
		const {exercises:es, sets, startDate} = workout;
		es.forEach(e => exercises.push({
			id: e.id,
			startDate,
			sets: sets[e.id]
		}));
	});

	// all
	const exercisesById = {};
	exercises.forEach((e) => {
		exercisesById[e.id] = {};
	});

	Object.keys(exercisesById).forEach(id => {
		// for every unique execise
		const current =  [];
		exercises.forEach(e => {
			if(e.id == id) {
				current.push({
					date: e.startDate,
					sets: e.sets
				});
			}
		});

		exercisesById[id] = {
			all : current
		}
	});


	console.log(exercisesById);


}

