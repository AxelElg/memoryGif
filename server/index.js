//testing
const express = require('express');

const cardRouter = require('./routes/cardRouter').router;
const leaderBoardRouter = require('./routes/leaderBoardRouter').router;

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cards', cardRouter);

app.use('/api/Leader-board', leaderBoardRouter);

app.listen(PORT, () => {
	console.log('App is listening on port ' + PORT);
});
