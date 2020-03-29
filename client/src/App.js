import React, { useState } from 'react';
import './Styles/App.css';
import GameBoard from './Components/GameBoard.js';
import Hud from './Components/Hud.js';

export default function App() {
	const [gameOn, setGameOn] = useState(false);
	const [lives, setLives] = useState(10);

	return (
		<div className="App">
			{gameOn ? (
				<>
					<Hud lives={lives} />
					<GameBoard setLives={setLives} lives={lives} />
				</>
			) : (
				<header className="App-header">
					<h1>Welcome to MemoryGif</h1>
					<h3>the rules are simple and as follows</h3>
					<ul>
						<li>Click on a card to flip it</li>
						<li>Try to find the same card twise to pair them up</li>
						<li>Profit!!!!!</li>
					</ul>
					<button onClick={() => setGameOn(true)}>click me to start the game</button>
				</header>
			)}
		</div>
	);
}
