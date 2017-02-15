const Sort = (feed) => {
	// const eventsArray = [ {id: 1, date: 1387271989749 }, {id:2, date: 1387271989760} ];
	// const array = Object.keys(feed).map((key) => {
	// 	const returnObj = {
	// 		...feed[key],
	// 		id: key
	// 	}
	// 	return returnObj;
	// });

	const byday={};
	const byweek={};
	const bymonth={};
	function groupday(value, index, array)
	{
	    d = new Date(value['endDate']);
	    d = Math.floor(d.getTime()/(1000*60*60*24));
	    byday[d]=byday[d]||[];
	    byday[d].push(value);
	}
	function groupweek(value, index, array)
	{
	    d = new Date(value['endDate']);
	    d = Math.floor(d.getTime()/(1000*60*60*24*7));
	    byweek[d]=byweek[d]||[];
	    byweek[d].push(value);
	}
	function groupmonth(value, index, array)
	{
	    d = new Date(value['endDate']);
	    d = (d.getFullYear()-1970)*12 + d.getMonth();
	    bymonth[d]=bymonth[d]||[];
	    bymonth[d].push(value);
	}
	array.map(groupday);
	array.map(groupweek);
	array.map(groupmonth);
	return {
		byday,
		byweek,
		bymonth,
		original: array.sort(function(a, b) {
		    a = new Date(a.endDate);
		    b = new Date(b.endDate);
		    return a>b ? -1 : a<b ? 1 : 0;
		})
	};
};

export default Sort;
