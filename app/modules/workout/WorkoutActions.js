import { Actions } from 'react-native-router-flux';

import store from 'react-native-simple-store';


import * as firebase from 'app/utils/firebase';

import {warn, log} from 'app/utils/log';
import {getBodybuildingExercises, pushOnWorkoutEnd} from 'app/utils/api';

export const START_WORKOUT = 'WORKOUT/START_WORKOUT';
export const ADD_EXERCISE = 'WORKOUT/ADD_EXERCISE';
export const DELETE_EXERCISE = 'WORKOUT/DELETE_EXERCISE';
export const GET_EXERCISES = 'WORKOUT/GET_EXERCISES';
export const GET_EXERCISES_SUCCESS = 'WORKOUT/GET_EXERCISES_SUCCESS';
export const TOGGLE_BODYPART = 'WORKOUT/TOGGLE_BODYPART';
export const ADD_SET = 'WORKOUT/ADD_SET';
export const PERFORM_SET = 'WORKOUT/PERFORM_SET';
export const SAVE_TO_FEED = 'WORKOUT/SAVE_TO_FEED';
export const CANCEL_WORKOUT = 'WORKOUT/CANCEL_WORKOUT';

export function startWorkout() {
  return (dispatch) => {
  	dispatch({ type: START_WORKOUT });
  	Actions.workout();
  }
}

export function getExercises() {
	return (dispatch) => {
		dispatch({type: GET_EXERCISES })

		getBodybuildingExercises().then(exercises => {
			dispatch({ type: GET_EXERCISES_SUCCESS, exercises })
		});
	}
}


export function addExercise(exercise) {
	return (dispatch) => {
		dispatch({type: ADD_EXERCISE, exercise });	
	}
}
export function deleteExercise(exercise) {
	return (dispatch) => {
		dispatch({type: DELETE_EXERCISE, exercise });	
	}
}

export function addSet(exercise) {
	return (dispatch, getState) => {
		const { sets } = getState().workout;

		dispatch({
			type: ADD_SET,
			id: exercise.id,
			set: {
				done: false,
				reps: '',
				weight: ''
			}
		});
	}
}
export function performSet(exercise, index, set) {
	return (dispatch) => {
		dispatch({
			type: PERFORM_SET,
			id: exercise.id,
			index,
			set
		});
	}
}

export function saveToFeed(mood) {
	return (dispatch,getState) => {
		const { workout,auth } = getState();
		const saveWorkout = {
			startDate: workout.startDate,
			endDate: new Date().getTime(),
			exercises: workout.exercises,
			sets: workout.sets,
			mood,
			user: auth.user
		};
		
		pushOnWorkoutEnd(auth.user, saveWorkout);
		firebase.saveToFeed(auth.user, saveWorkout);
		Actions.feed();
		dispatch({type: SAVE_TO_FEED });
	}
}


export function cancelWorkout() {
	return (dispatch) => {
		Actions.feed();
		dispatch({type: CANCEL_WORKOUT});
	}
}


export function toggleBodypart(bodypart) {
	return (dispatch, getState) => {
		const { filters } = getState().workout;

		const bodyparts = filters.bodyparts.slice();
		if(bodyparts.indexOf(bodypart) == -1){
			bodyparts.push(bodypart);
		} else {
			bodyparts.splice(bodyparts.indexOf(bodypart), 1);
		}

		dispatch({type: TOGGLE_BODYPART, bodyparts });

	}
}
