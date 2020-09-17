const express = require('express');
const router = express.Router();

const { getCards } = require('../service/cardService');

router.get('/', (req, res) => {
	const apiKey = req.query.key;
	const query = req.query.query;
	try {
		getCards(apiKey, query).then(cards => res.send(cards));
	} catch (err) {
		res.sendStatus(404);
		res.json({ error: err.message });
	}
});

module.exports.router = router;
