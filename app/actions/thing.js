// thing
import {warn, log} from 'app/utils/log';

export const GET_THING = 'GET_THING';
export const GET_THING_SUCCESS = 'GET_THING_SUCCESS';

export function getThing() {
  return (dispatch) => {
  	console.log('get thing');
    dispatch({ type: GET_THING });
   		
   	setTimeout(() => {
   		dispatch({ type: GET_THING_SUCCESS });
   	}, 1000);
  }
}
