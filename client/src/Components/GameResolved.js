import React from 'react';
import '../Styles/GameResolved.css';

export default function Hud(props) {
	const { lives, setLives, setGameState } = props;

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
			<button onClick={() => restartGame()}>Play Again?</button>
		</div>
	);
}
