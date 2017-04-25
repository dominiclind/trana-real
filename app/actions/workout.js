import { Actions } from 'react-native-router-flux';

import store from 'react-native-simple-store';

import {warn, log} from 'app/utils/log';
import {getBodybuildingExercises} from 'app/utils/api';

export const START_WORKOUT = 'START_WORKOUT';
export const ADD_EXERCISE = 'ADD_EXERCISE';
export const GET_EXERCISES = 'GET_EXERCISES';
export const GET_EXERCISES_SUCCESS = 'GET_EXERCISES_SUCCESS';
export const TOGGLE_BODYPART = 'TOGGLE_BODYPART';

export function startWorkout() {
  return (dispatch) => {
  	dispatch({ type: START_WORKOUT });
  	Actions.workout()
  }
}

export function getExercises() {
	return (dispatch) => {
		dispatch({type: GET_EXERCISES })

		getBodybuildingExercises().then(exercises => {
			console.log(exercises);
			dispatch({ type: GET_EXERCISES_SUCCESS, exercises })
		})
	}
}


export function addExercise(exercise) {
	return (dispatch) => {
		dispatch({type: ADD_EXERCISE, exercise });	
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
