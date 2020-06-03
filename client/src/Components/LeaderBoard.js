import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/LeaderBoard.css';

export default function Hud(props) {
	const { leaderBoard, setLeaderBoard } = props;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get('api/leader-board')
			.then(res => res.data)
			.then(data => setLeaderBoard(data))
			.then(() => setLoading(false));
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	const leaderBoardBuilder = input => {
		return (
			<table className="leader-board">
				<tr className="leader-board-row">
					<td className="leader-board-item">Place:</td>
					<td className="leader-board-item">Name:</td>
					<td className="leader-board-item">Score:</td>
					<td className="leader-board-item">Time:</td>
				</tr>
				{input.map((el, i) => (
					<tr className="leader-board-row">
						<td className="leader-board-item">{i + 1}.</td>
						<td className="leader-board-item">{el.name}</td>
						<td className="leader-board-item">{el.score} p</td>
						<td className="leader-board-item">{el.time} s</td>
					</tr>
				))}
			</table>
		);
	};

	return leaderBoardBuilder(leaderBoard);
}
