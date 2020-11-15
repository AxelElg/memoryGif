import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.js';
import '../Styles/GameBoard.css';
import determinePair from '../helpers/determinePair';

export default function GameBoard(props) {
	const {
		query,
		lives,
		setLives,
		setGameState,
		setTime,
		score,
		setScore,
	} = props;

	const [cards, setCards] = useState([]);
	const [playObj, setPlayObj] = useState([]);
	const [playerTurn, setPlayTurn] = useState(true);
	const [gameOngoing, setGameOngoing] = useState(false);

	useEffect(() => {
		setScore(0);
		setTime(0);
		axios
			.get('/api/cards', {
				params: {
					query: query,
				},
			})
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
		if (gameOngoing) {
			const interval = setInterval(() => {
				setTime(time => time + 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [gameOngoing]);

	const GameOnDisplay = (
		<div className="game-board">
			{cards.length > 0 ? (
				<div className="card-container">
					{cards.map(card => (
						<Card
							playerTurn={playerTurn}
							card={card}
							cards={cards}
							playObj={playObj}
							setPlayObj={setPlayObj}
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
		determinePair(
			playObj,
			setPlayObj,
			score,
			setScore,
			lives,
			setLives,
			setPlayTurn
		);
	}
	return GameOnDisplay;
}
