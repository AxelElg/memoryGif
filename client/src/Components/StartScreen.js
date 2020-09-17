import React from 'react';
import '../Styles/StartScreen.css';

export default function StartScreen(props) {
	return (
		<div className="start-screen">
			<h1>Welcome to MemoryGif</h1>
			<ul>
				<li>Flip the cards by clicking on them to see their Gifs</li>
				<li>
					Pair up all cards to Win! but be aware that mismatched cards will cost
					you one of your lives. if you lose all 10 of your lives without
					collecting all cards you’ll lose.
				</li>
			</ul>
			<button onClick={() => props.setGameState('setup')}>START</button>
		</div>
	);
}
