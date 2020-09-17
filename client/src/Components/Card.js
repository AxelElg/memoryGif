import React from 'react';
import flipCard from '../helpers/flipCard';
import '../Styles/card.css';

export default function Card(props) {
	const { playerTurn, playObj, card, cards, setPlayObj } = props;

	return (
		<div
			className={`card ${card.cardUp && 'card-flipped'} ${
				card.collected && 'card-collected'
			}`}
			onClick={
				playerTurn ? () => flipCard(card, cards, playObj, setPlayObj) : ''
			}
		>
			<div className="memory-card memory-card-front"></div>
			<img className="memory-card memory-card-back" srcSet={card.gif}></img>
		</div>
	);
}
