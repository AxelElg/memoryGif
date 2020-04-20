import React, { useState } from 'react';
import StartScreen from './Components/StartScreen';
import GameBoard from './Components/GameBoard';
import Hud from './Components/Hud.js';
import GameResolved from './Components/GameResolved';
import './Styles/App.css';

export default function App() {
	const [gameState, setGameState] = useState('before');
	const [lives, setLives] = useState(10);

	switch (gameState) {
		case 'before':
			return <StartScreen setGameState={setGameState} />;
		case 'ongoing':
			return (
				<>
					<Hud lives={lives} />
					<GameBoard
						setGameState={setGameState}
						setLives={setLives}
						lives={lives}
					/>
				</>
			);
		case 'after':
			return (
				<GameResolved
					lives={lives}
					setLives={setLives}
					setGameState={setGameState}
				/>
			);
	}
}
