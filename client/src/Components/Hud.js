import React from 'react';
import '../Styles/Hud.css';

export default function Hud(props) {
	const hpArr = [];

	for (let index = 0; index < props.lives; index++) {
		hpArr.push('_');
	}

	return (
		<div className="hud">
			<div className="health-bar">
				{hpArr.map(() => (
					<p className="hp">&hearts;</p>
				))}
			</div>
		</div>
	);
}
