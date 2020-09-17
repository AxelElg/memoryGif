import React, { useState } from 'react';
import StartScreen from './Components/StartScreen';
import Setup from './Components/Setup';
import GameBoard from './Components/GameBoard';
import Hud from './Components/Hud.js';
import GameResolved from './Components/GameResolved';
import './Styles/App.css';

export default function App() {
	const [gameState, setGameState] = useState('before');
	const [apiKey, setApiKey] = useState('');
	const [query, setQuery] = useState('');
	const [lives, setLives] = useState(10);
	const [time, setTime] = useState(0);
	const [score, setScore] = useState(0);

	switch (gameState) {
		case 'before':
			return <StartScreen setGameState={setGameState} />;
		case 'setup':
			return (
				<Setup
					setGameState={setGameState}
					setApiKey={setApiKey}
					setQuery={setQuery}
				/>
			);
		case 'ongoing':
			return (
				<>
					<Hud lives={lives} score={score} time={time} />
					<GameBoard
						apiKey={apiKey}
						query={query}
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
