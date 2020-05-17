//testing
const express = require('express');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const app = express();
const dbGitDir = './db/gifs.json';
const dbLbDir = './db/leaderBoard.json';
const apiKey = require('dotenv').config();

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

fetch(
	`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=rick and morty&limit=9&offset=0&rating=G&lang=en`
)
	.then(res => {
		if (res.status >= 400) {
			throw new Error('Bad response from server');
		}
		return res.json();
	})
	.then(res => res.data)
	.then(data => {
		const dataArr = [];
		data.forEach(element => {
			dataArr.push(element.images.downsized_large.url);
		});
		return dataArr;
	})
	.then(data => {
		fs.writeFileSync(dbGitDir, JSON.stringify(data, null, 2));
	})
	.catch(err => console.log('Error', err.message));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// An api endpoint that returns a short list of items
app.get('/api/get-cards', (req, res) => {
	let urls = JSON.parse(fs.readFileSync(dbGitDir, err => console.log(err)));
	urls = urls.concat(urls);
	const sendData = shuffleArray(urls);
	res.send(sendData);
	console.log('Data Sent');
});

app.post('/api/leader-board', (req, res) => {
	function sorter(a, b) {
		if (parseInt(a.score) > parseInt(b.score)) return -1;
		if (parseInt(a.score) < parseInt(b.score)) return 1;
		if (parseInt(a.time) < parseInt(b.time)) return -1;
		if (parseInt(a.time) > parseInt(b.time)) return 1;
	}
	let leaderBoard = JSON.parse(
		fs.readFileSync(dbLbDir, err => console.log(err))
	);
	leaderBoard.push(req.query);
	leaderBoard.sort(sorter);
	fs.writeFileSync(dbLbDir, JSON.stringify(leaderBoard.slice(0, 10), null, 2));
	res.sendStatus(200);
});
app.get('/api/leader-board', (req, res) => {
	let leaderBoard = JSON.parse(
		fs.readFileSync(dbLbDir, err => console.log(err))
	);
	res.send(leaderBoard);
	console.log('LeaderBoard Sent');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
