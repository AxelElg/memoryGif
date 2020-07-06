import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/PlayerScore.css';

export default function Hud(props) {
	const { time, score, setLeaderBoard } = props;
	const [name, setName] = useState('');
	const [sent, setSent] = useState(false);

	const addScore = () => {
		axios
			.post(`/api/leader-board?time=${time}&&score=${score}&&name=${name}`)
			.then(res => res.data)
			.then(data => {
				setLeaderBoard(data);
				setSent(true);
			})
			.catch(err => {
				console.log('Error: ', err);
			});
	};

	return (
		<div>
			<h2>Your score:</h2>
			<table className="player-score">
				<tr>
					<td className="player-score-item">Your Score</td>
					<td className="player-score-item">
						<input
							type="text"
							maxLength="4"
							className="ip"
							onChange={e => setName(e.target.value)}
						></input>
					</td>
					<td className="player-score-item">{score} p</td>
					<td className="player-score-item">{time} s</td>
				</tr>
			</table>
			{!sent ? <button onClick={() => addScore()}>Submit Score</button> : ''}
		</div>
	);
}
