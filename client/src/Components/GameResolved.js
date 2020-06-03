import React, { useState } from 'react';
import '../Styles/GameResolved.css';
import LeaderBoard from './LeaderBoard.js';
import PlayerScore from './PlayerScore.js';

export default function Hud(props) {
	const { lives, setLives, setGameState, time, score } = props;
	const [leaderBoard, setLeaderBoard] = useState([]);

	const restartGame = () => {
		setLives(10);
		setGameState('ongoing');
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
			<LeaderBoard leaderBoard={leaderBoard} setLeaderBoard={setLeaderBoard} />
			<PlayerScore time={time} score={score} setLeaderBoard={setLeaderBoard} />
			<button onClick={() => restartGame()}>Play Again?</button>
		</div>
	);
}
