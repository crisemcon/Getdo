
function timeConversion(millisec) {
	const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
	const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);
	const weeks = (days / 7).toFixed(0);

	if (hours < -24) {
		return `${days* -1} days late`;
	} else if (hours < 0 && hours >= -24) {
		return `Yesterday`;
	} else if (hours >= 0 && hours < 24) {
		return `Today`;
	} else if (hours >= 24 && hours < 48) {
		return `Tomorrow`;
	} else if (days >= 2 && days < 14) {
		return days + " Days";
	} else {
		return `${weeks} weeks`;
	}
}

//calculate dueDate
export const calcDueDate = (dueDate) => {
	const now = new Date();
	const date = new Date(dueDate);
	const elapsed = date.getTime() - now.getTime();
	return timeConversion(elapsed);
};

//calculate project time required
export const calcProjectTimeRequired = (items) => {
	let sumTime = 0;
	let flag = "";
	items.forEach((item) => {
		item.time ? (sumTime += item.time) : (flag = ">");
	});
	if (sumTime === 0) {
		return `Not set`;
	} else if (sumTime === 60) {
		return `${flag}1 hour`;
	} else if (sumTime > 60) {
		return `${flag}${(sumTime / 60).toFixed(0)} hours`;
	}
	return `${flag}${sumTime} minutes`;
};

//calculate task time required
export const calcTimeRequired = (time) => {
	if (time === 60) {
		return `1 hour`;
	} else if (time > 60) {
		return `${time / 60} hours`;
	}
	return `${time} minutes`;
};
