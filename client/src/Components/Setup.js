import React, { useState, useEffect } from 'react';

export default function Setup(props) {
	const { setGameState, setApiKey, setQuery } = props;

	const [legitApi, setLegitApi] = useState(false);
	const [input, setInput] = useState('');

	function checkApi() {
		if (input.length > 0) {
			setApiKey(input);
			setLegitApi(true);
		}
	}

	if (legitApi) {
		setGameState('ongoing');
	}

	return (
		<>
			<div className="api-submission-box">
				<input type="text" onChange={e => setInput(e.target.value)}></input>
				<input type="text" onChange={e => setQuery(e.target.value)}></input>
				<button onClick={() => checkApi()}></button>
			</div>
		</>
	);
}
