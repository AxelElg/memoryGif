import React from 'react';
import '../Styles/StartScreen.css';

export default function StartScreen(props) {
	return (
		<div className="start-screen">
			<h1>Welcome to MemoryGif</h1>
			<h2>the rules are simple and as follows</h2>
			<ul>
				<li>Click on a card to flip it</li>
				<li>Try to pair up all cards</li>
				<li>pair up all cards before you run out of hearts</li>
			</ul>
			<button onClick={() => props.setGameState('ongoing')}>
				click me to start the game
			</button>
		</div>
	);
}
