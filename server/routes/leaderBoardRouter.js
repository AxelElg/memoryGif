const express = require('express');
const router = express.Router();

const {
	getLeaderBoard,
	updateLeaderBoard,
} = require('../service/leaderBoardService');

router.get('/', (req, res) => {
	try {
		getLeaderBoard().then(result => res.send(result));
	} catch (err) {
		res.sendStatus(400);
		res.json({ error: err.message });
	}
});

router.post('/', (req, res) => {
	try {
		console.log(req.query);
		updateLeaderBoard(req.query).then(result => res.send(result));
	} catch (error) {
		res.sendStatus(400);
		res.json({ error: err.message });
	}
});

module.exports.router = router;
