import React, { useState } from 'react';

export default function Setup(props) {
	const { setGameState, setQuery } = props;

	const [queryExist, setQueryExist] = useState(false);
	const [input, setInput] = useState('');

	function checkQuery() {
		if (input.length > 0) {
			setQuery(input);
			setQueryExist(true);
		}
	}

	if (queryExist) {
		setGameState('ongoing');
	}

	return (
		<>
			<div className="api-submission-box">
				<input type="text" onChange={e => setInput(e.target.value)}></input>
				<button onClick={() => checkQuery()}></button>
			</div>
		</>
	);
}
