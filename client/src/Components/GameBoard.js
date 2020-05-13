import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/GameBoard.css';

export default function GameBoard(props) {
	const { lives, setLives, setGameState, setTime, score, setScore } = props;

	const [cards, setCards] = useState([]);
	const [playObj, setPlayObj] = useState([]);
	const [playerTurn, setPlayTurn] = useState(true);
	const [gameOngoing, setGameOngoing] = useState(false);

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
							cardUp: false,
						},
					]);
				});
			})
			.then(() => {
				setGameOngoing(true);
			});
	}, []);

	useEffect(() => {
		setScore(0);
		setTime(0);
		const interval = setInterval(() => {
			setTime(time => time + 1);
		}, 1000);
		return () => clearInterval(interval);
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
				(cardsInPlay[0].id < cardsInPlay[1].id
					? cardsInPlay.reverse()
					: cardsInPlay
				).forEach(obj =>
					cards.splice(
						cards.findIndex(card => card.id === obj.id),
						1
					)
				);
				setScore(score + 555.5);
			} else {
				cardsInPlay
					.map(obj => cards.findIndex(card => card.id === obj.id))
					.forEach(index => (cards[index].cardUp = false));
				setLives(lives - 1);
				setScore(score * 0.9);
			}
			setPlayTurn(true);
		}, 1200);
		setPlayObj([]);
		setPlayTurn(false);
	}

	const GameOnDisplay = (
		<div className="game-board">
			{cards.length > 0 ? (
				<div className="card-container">
					{cards.map(card => (
						<div
							className="card"
							onClick={playerTurn ? () => flipCard(card, playObj) : ''}
						>
							<div
								className={card.cardUp ? 'memory-card-up' : 'memory-card-down'}
								id={card.id}
							>
								<img srcSet={card.gif}></img>
							</div>
						</div>
					))}
				</div>
			) : (
				<h2 className="loading">...Loading</h2>
			)}
		</div>
	);

	if (playObj.length === 2) determinePair(playObj);
	if (gameOngoing && (cards.length === 0 || lives === 0)) {
		setGameOngoing(false);
		setGameState('after');
	}
	return GameOnDisplay;
}
