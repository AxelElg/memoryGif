import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/GameResolved.css';
import LeaderBoard from './LeaderBoard.js';

export default function Hud(props) {
	const { lives, setLives, setGameState, time, score } = props;
	const [name, setName] = useState('');
	const [sent, setSent] = useState(false);

	const restartGame = () => {
		setLives(10);
		setGameState('ongoing');
	};

	const addScore = () => {
		axios
			.post(`/api/leader-board?time=${1}&&score=${score}&&name=${name}`)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log('Error: ', err);
			});
	};

	return (
		<div className="game-over-screen">
			{lives > 0 ? (
				<>
					<h2>Congratulations!</h2>
					<h3>Your Memory is Amazing!</h3>
				</>
			) : (
				<>
					<h2>To Bad</h2>
					<h3>Better luck next time!</h3>
				</>
			)}
			<LeaderBoard />
			<h2>Your score:</h2>
			<table>
				<tr>
					<th>Score:</th>
					<td>{score}</td>
				</tr>
				<tr>
					<th>Time:</th>
					<td>{time}</td>
				</tr>
				<tr>
					<th>Your name</th>
					<td>
						<input type="text" onChange={e => setName(e.target.value)}></input>
					</td>
				</tr>
			</table>

			<button onClick={() => addScore()}>Submit Score</button>
			<button onClick={() => restartGame()}>Play Again?</button>
		</div>
	);
}
