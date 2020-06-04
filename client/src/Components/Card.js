import React from 'react';
import '../Styles/card.css';

export default function Card(props) {
	const { playerTurn, playObj, card, flipCard } = props;

	return (
		<div
			className={`card ${card.cardUp && 'card-flipped'} ${
				card.collected && 'card-collected'
			}`}
			onClick={playerTurn ? () => flipCard(card, playObj) : ''}
		>
			<div className="memory-card memory-card-front"></div>
			<img className="memory-card memory-card-back" srcSet={card.gif}></img>
		</div>
	);
}
