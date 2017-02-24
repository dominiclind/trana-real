import { Dimensions } from 'react-native';

const { width:vw, height:vh } = Dimensions.get('window');

// regular slide anim
const regularSlide = (sceneProps) => {
	const { position, scene, progress } = sceneProps;
	const { index } = scene;

	// INPUT RANGE
	//
	// first value  = # initial state for view that is animating in
	// second value = # finished state for view animating in
	// third value  = # finished state for view BEHIND current view
	//
	const inputRange = [index - 1, index, index + 1];

	const opacity = position.interpolate({
    inputRange,
    outputRange: [1, 1, 0],
  });

	const translateX = position.interpolate({
	    inputRange,
	    outputRange: [vw, 0, -50],
	});

	return {
		opacity,
	  transform: [
	  	{translateX}
	  ]
	};
}

// Modal slide anim
const modalSlide = (sceneProps) => {
	const { position, scene, progress } = sceneProps;
	const { index } = scene;

	// INPUT RANGE
	//
	// first value  = # initial state for view that is animating in
	// second value = # finished state for view animating in
	// third value  = # finished state for view BEHIND current view
	//
	const inputRange = [index - 1, index, index + 1];

	const opacity = position.interpolate({
    inputRange,
    outputRange: [1, 1, .5],
  });

	const translateY = position.interpolate({
	    inputRange,
	    outputRange: [vh, 0, -30],
	});

	return {
		opacity,
	  transform: [
	  	{translateY}
	  ]
	};
}


export {
	regularSlide,
	modalSlide
}