import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.js';
import '../Styles/GameBoard.css';

export default function GameBoard(props) {
	const { lives, setLives, setGameState, setTime, score, setScore } = props;

	const [cards, setCards] = useState([]);
	const [playObj, setPlayObj] = useState([]);
	const [playerTurn, setPlayTurn] = useState(true);
	const [gameOngoing, setGameOngoing] = useState(false);

	useEffect(() => {
		axios
			.get('/api/cards')
			.then(res => res.data)
			.then(data => {
				data.forEach((url, i) => {
					setCards(cards => [
						...cards,
						{
							id: i,
							gif: url,
							cardUp: false,
							collected: false,
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

	function determinePair() {
		setTimeout(() => {
			if (playObj[0].gif === playObj[1].gif) {
				playObj.forEach(obj => (obj.collected = true));
				setScore(score + 5555);
			} else {
				playObj.forEach(card => (card.cardUp = false));
				setScore(parseInt(score * 0.9));
				setLives(lives - 1);
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
						<Card
							playerTurn={playerTurn}
							playObj={playObj}
							card={card}
							flipCard={flipCard}
						/>
					))}
				</div>
			) : (
				<h2 className="loading">...Loading</h2>
			)}
		</div>
	);

	if (
		gameOngoing &&
		(cards.filter(card => card.collected === false).length === 0 || lives === 0)
	) {
		setGameOngoing(false);
		setGameState('after');
	}

	if (playObj.length === 2) {
		determinePair();
	}
	return GameOnDisplay;
}
