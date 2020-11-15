const item = require('../models/item');

function sorter(a, b) {
	if (parseInt(a.score) > parseInt(b.score)) return -1;
	if (parseInt(a.score) < parseInt(b.score)) return 1;
	if (parseInt(a.time) < parseInt(b.time)) return -1;
	if (parseInt(a.time) > parseInt(b.time)) return 1;
}

const getLeaderBoard = async () => {
	return item
		.find()
		.then(data => data.sort(sorter))
		.catch(err => {
			throw Error(err.message);
		});
};

const updateLeaderBoard = async entry => {
	const { time, score, name } = entry;

	const newItem = new item({
		time: time,
		score: score,
		name: name,
	});

	return newItem
		.save()
		.then(() => item.find())
		.then(data => data.sort(sorter))
		.catch(err => {
			throw Error(err.message);
		});
};

module.exports = {
	getLeaderBoard,
	updateLeaderBoard,
};
