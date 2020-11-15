//testing
const express = require('express');
const mongoose = require('mongoose');

const cardRouter = require('./routes/cardRouter').router;
const leaderBoardRouter = require('./routes/leaderBoardRouter').router;

const pass = process.env.mongodbPass;
const uri = `mongodb+srv://AxelElg:${pass}@cluster0.jfxhn.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose
	.connect(uri)
	.then(() => console.log('mongodb connected...'))
	.catch(err => console.log('Error:', err));

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cards', cardRouter);

app.use('/api/Leader-board', leaderBoardRouter);

app.listen(PORT, () => {
	console.log('App is listening on port ' + PORT);
});
