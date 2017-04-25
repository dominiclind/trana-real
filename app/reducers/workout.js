import {
  START_WORKOUT,
  GET_EXERCISES,
  GET_EXERCISES_SUCCESS,
  TOGGLE_BODYPART,
  ADD_EXERCISE
} from '../actions/workout';

import {warn, log} from 'app/utils/log';


const initialState = {
  loading: true,
  allExercises: [],
  exercises: [],
  sets: [],
  perform: false,
  filters: {
    bodyparts: [],
    equipment: []
  }
};

export default function workout(state = initialState, action) {
  switch (action.type) {
    case START_WORKOUT:
      return {
        ...state,
        loading: false
      }
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [
          ...state.exercises,
          action.exercise
        ]
      }
    case GET_EXERCISES:
      return {
        ...state,
        loading: true
      }
    case GET_EXERCISES_SUCCESS:
      return {
        ...state,
        loading: false,
        allExercises: action.exercises 
      }
    case TOGGLE_BODYPART:
      return {
        ...state,
        filters: {
          ...state.filters,
          bodyparts: action.bodyparts
        } 
      }
    default:
      return state;
  }
}
