import React, { useState } from 'react';
import StartScreen from './Components/StartScreen';
import GameBoard from './Components/GameBoard';
import Hud from './Components/Hud.js';
import GameResolved from './Components/GameResolved';
import './Styles/App.css';

export default function App() {
	const [gameState, setGameState] = useState('before');
	const [lives, setLives] = useState(1);
	const [time, setTime] = useState(0);
	const [score, setScore] = useState(0);

	switch (gameState) {
		case 'before':
			return <StartScreen setGameState={setGameState} />;
		case 'ongoing':
			return (
				<>
					<Hud lives={lives} score={score} time={time} />
					<GameBoard
						setGameState={setGameState}
						setLives={setLives}
						lives={lives}
						time={time}
						setTime={setTime}
						score={score}
						setScore={setScore}
					/>
				</>
			);
		case 'after':
			return (
				<GameResolved
					lives={lives}
					setLives={setLives}
					setGameState={setGameState}
					time={time}
					score={score}
				/>
			);
	}
}
