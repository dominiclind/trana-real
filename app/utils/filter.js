import {getNormalizedBodyPart} from 'app/utils/workout';

export const byNonChosen = (exercises, chosen) => {
	return exercises.filter(exercise => { // check matches
    if(chosen.indexOf(exercise.name.toLowerCase()) == -1){
      return exercise;
    }
  });
}

export const byName = (exercises, search) => {
	return exercises.filter(exercise => {
    // search matches 
    const nameMatch = exercise.name.toLowerCase().indexOf(search.toLowerCase()) > -1;

    // check matches
    if (nameMatch){
      return exercise;
    }
  });
}

export const byBodypart = (exercises, filters) => {
	return exercises.filter(exercise => {

    // const e = exercise;
    const mainBodyPart = getNormalizedBodyPart(exercise['Main Muscle Worked'].trim());

    // search matches 
  	let filterMatch = false;
    
   	for(var i = 0; i < filters.length; i++){
   		if(mainBodyPart.toLowerCase() == filters[i].toLowerCase()){
   			filterMatch = true;
   		}
   	}
    // check matches
    if (filterMatch
      ){
      return exercise;
    }
  });
}
