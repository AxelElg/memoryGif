export default function flipCard(card, cards, playObj, setPlayObj) {
	if (playObj.length !== 2 && card !== playObj[0]) {
		setPlayObj([...playObj, card]);
		cards.find(deckCard => deckCard.id === card.id).cardUp = true;
	}
}
