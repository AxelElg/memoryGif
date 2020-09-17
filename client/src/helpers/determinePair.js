export default function determinePair(
	playObj,
	setPlayObj,
	score,
	setScore,
	lives,
	setLives,
	setPlayTurn
) {
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
