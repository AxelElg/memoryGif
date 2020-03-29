import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/GameBoard.css';

export default function GameBoard(props) {
	const [cards, setCards] = useState([]);
	const [playObj, setPlayObj] = useState([]);
	const [playerTurn, setPlayTurn] = useState(true);
	// const [gameResolved, setGameResolved] = useState(false);

	useEffect(() => {
		axios
			.get('/api/get-cards')
			.then(res => res.data)
			.then(data => {
				data.forEach((url, i) => {
					setCards(cards => [
						...cards,
						{
							id: i,
							gif: url,
							cardUp: false
						}
					]);
				});
			});
		setPlayObj([]);
	}, []);

	function flipCard(card, playObj) {
		if (playObj.length !== 2 && card !== playObj[0]) {
			setPlayObj([...playObj, card]);
			cards.find(deckCard => deckCard.id === card.id).cardUp = true;
		}
	}

	function determinePair(playCards) {
		const cardsInPlay = JSON.parse(JSON.stringify(playCards));
		setTimeout(() => {
			if (cardsInPlay[0].gif === cardsInPlay[1].gif) {
				//reverses the order of cards depending on index
				(cardsInPlay[0].id < cardsInPlay[1].id ? cardsInPlay.reverse() : cardsInPlay).forEach(obj =>
					cards.splice(
						cards.findIndex(card => card.id === obj.id),
						1
					)
				);
			} else {
				cardsInPlay
					.map(obj => cards.findIndex(card => card.id === obj.id))
					.forEach(index => (cards[index].cardUp = false));
				props.setLives(props.lives - 1);
			}
			setPlayTurn(true);
		}, 1200);
		setPlayObj([]);
		setPlayTurn(false);
	}

	const GameOnDisplay = (
		<div className="game-container">
			{playObj.length === 2 ? determinePair(playObj) : ''}
			{cards.length > 0
				? cards.map(card => (
						<div className="card" onClick={playerTurn ? () => flipCard(card, playObj) : ''}>
							<div className={card.cardUp ? 'memory-card-up' : 'memory-card-down'} id={card.id}>
								<img srcSet={card.gif}></img>
							</div>
						</div>
				  ))
				: '...Loading'}
		</div>
	);

	// const GameOverDisplay = (
	// 	<div className="game-over-screen">
	// 		{cards.length === 0 ? (
	// 			<>
	// 				<h1>Congratulation</h1>
	// 				<h2>You successfully found all pairs!</h2>
	// 			</>
	// 		) : (
	// 			<>
	// 				<h1>Game Over</h1>
	// 				<h2>you ran out of lives</h2>
	// 			</>
	// 		)}
	// 		<button>play again?</button>
	// 	</div>
	// );

	return GameOnDisplay;
}
