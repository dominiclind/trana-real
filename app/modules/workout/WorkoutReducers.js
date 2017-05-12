import {
  START_WORKOUT,
  GET_EXERCISES,
  GET_EXERCISES_SUCCESS,
  TOGGLE_BODYPART,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  ADD_SET,
  PERFORM_SET,
  SAVE_TO_FEED,
  CANCEL_WORKOUT
} from './WorkoutActions';


function updateSetInArray(array, action) {
  return array.map( (item, index) => {
    if(index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item;
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.set
    };    
  });
}

import {warn, log} from 'app/utils/log';


const initialState = {
  loading: true,
  allExercises: {featured: [], all: []},
  exercises: [],
  sets: {},
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
        startDate: new Date().getTime(),
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

    case DELETE_EXERCISE:
      const SETS_COPY = {
        ...state.sets
      };

      delete SETS_COPY[action.exercise.id]

      return {
        ...state,
        exercises: state.exercises.filter((e, i) => e.id !== action.exercise.id),
        sets: SETS_COPY
      }
    case ADD_SET:
      const newSets = {
        ...state.sets
      };

      if(!newSets[action.id]){
        newSets[action.id] = [];
      };

      newSets[action.id].push(action.set);

      return {
        ...state,
        sets: newSets
      }
    case PERFORM_SET:
        
      const NEW_SETS = {
        ...state.sets
      }

      NEW_SETS[action.id] = updateSetInArray(state.sets[action.id],action);
      
      return {
        ...state,
        sets: NEW_SETS
      }
    case GET_EXERCISES:
      return {
        ...state,
        loading: true
      }
    case SAVE_TO_FEED:
      return {
        ...initialState
      }
    case CANCEL_WORKOUT:
      return {
        ...initialState
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
