import React from 'react';
import '../Styles/Hud.css';

export default function Hud(props) {
	const hpArr = [];

	for (let index = 0; index < props.lives; index++) {
		hpArr.push('_');
	}

	return (
		<div className="hud">
			{hpArr.map(() => (
				<div className="hp"></div>
			))}
		</div>
	);
}
