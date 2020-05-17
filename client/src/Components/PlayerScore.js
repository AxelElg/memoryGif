import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/PlayerScore.css';

export default function Hud(props) {
	const { time, score } = props;
	const [name, setName] = useState('');
	const [sent, setSent] = useState(false);
	console.log(time, score);

	const addScore = () => {
		axios
			.post(`/api/leader-board?time=${time}&&score=${score}&&name=${name}`)
			.then(res => {
				console.log(res);
			})
			.then(() => {
				setSent(true);
			})
			.catch(err => {
				console.log('Error: ', err);
			});
	};

	return (
		<>
			<h2>Your score:</h2>
			<table className="player-score">
				<tr>
					<th className="player-score-item">Score:</th>
					<td className="player-score-item">{score}</td>
				</tr>
				<tr>
					<th className="player-score-item">Time:</th>
					<td className="player-score-item">{time}</td>
				</tr>
				<tr>
					<th className="player-score-item">Your name</th>
					<td className="player-score-item">
						{!sent ? (
							<input
								type="text"
								onChange={e => setName(e.target.value)}
							></input>
						) : (
							<>{name}</>
						)}
					</td>
				</tr>
			</table>
			{!sent ? <button onClick={() => addScore()}>Submit Score</button> : ''}
		</>
	);
}
