const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const lbDbDir = path.join(__dirname, '../db/leaderBoard.json');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const getLeaderBoard = async () => {
	return await readFileAsync(lbDbDir, err => {
		if (err) {
			throw Error(err.message);
		}
	});
};

const writeLeaderBoard = async leaderBoard => {
	return await writeFileAsync(lbDbDir, leaderBoard, err => {
		if (err) {
			throw Error(err.message);
		}
	});
};

const updateLeaderBoard = async userScore => {
	function sorter(a, b) {
		if (parseInt(a.score) > parseInt(b.score)) return -1;
		if (parseInt(a.score) < parseInt(b.score)) return 1;
		if (parseInt(a.time) < parseInt(b.time)) return -1;
		if (parseInt(a.time) > parseInt(b.time)) return 1;
	}

	const leaderBoard = await getLeaderBoard()
		.then(data => data.toString())
		.then(data => JSON.parse(data));
	leaderBoard.push(userScore);
	leaderBoard.sort(sorter);
	const newLeaderBoard = leaderBoard.slice(0, 10);
	await writeLeaderBoard(JSON.stringify(newLeaderBoard, null, 2));
	return await newLeaderBoard;
};

module.exports = {
	getLeaderBoard,
	updateLeaderBoard,
};
