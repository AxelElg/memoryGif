const axios = require('axios');

require('dotenv').config();
const apiKey = process.env.apiKey;

const getCards = async () => {
	/* Randomize array in-place using Durstenfeld shuffle algorithm */
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
	return await axios
		.get(
			`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=rick and morty&limit=9&offset=0&rating=G&lang=en`
		)
		.then(res => res.data.data)
		.then(data => data.map(element => element.images.downsized_large.url))
		.then(arr => arr.concat(arr))
		.then(arr => shuffleArray(arr))
		.catch(error => {
			throw Error(error.message);
		});
};

module.exports = {
	getCards,
};
