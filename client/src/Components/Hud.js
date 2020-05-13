import React from 'react';
import '../Styles/Hud.css';

export default function Hud(props) {
	const { lives, score, time } = props;
	const hpArr = [];

	for (let index = 0; index < lives; index++) {
		hpArr.push('_');
	}

	return (
		<div className="hud">
			<div className="hud-content">
				<div className="game-stats">
					<h2>Time: {time}s</h2>
					<h2>Score: {score}p</h2>
				</div>
				<div className="health-bar">
					{hpArr.map(() => (
						<p className="hp">&hearts;</p>
					))}
				</div>
			</div>
		</div>
	);
}
