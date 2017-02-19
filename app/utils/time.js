const timeLeft = (date_now, date_future) => {
	// get total seconds between the times
	let delta = Math.abs(date_future - date_now) / 1000;

	// calculate (and subtract) whole days
	const days = Math.floor(delta / 86400);
	delta -= days * 86400;

	// calculate (and subtract) whole hours
	const hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;

	// calculate (and subtract) whole minutes
	const minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;

	// what's left is seconds
	const seconds = delta % 60;

	return {
		hours,
		minutes,
		seconds
	}
}

const getDay = (day) => {

	const weekday = [];
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	return weekday[day];
}

export {
	getDay,
	timeLeft
};
