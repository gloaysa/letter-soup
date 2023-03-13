import './points.component.scss';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { currentlySelectedCells } from '../../store/table.reducer';
import { sumMultiplyPointsFromCells, sumPointsFromCells } from '../../utils/sum-points.util';
import { selectTotalPoints, selectWordState } from '../../store/words.reducer';

const PointsComponent: FunctionComponent = () => {
	const [currentPoints, setCurrentPoints] = useState<number>(0);
	const [currentMultiplier, setCurrentMultiplier] = useState<number>(0);
	const selectedCells = useSelector(currentlySelectedCells);
	const currentWordExists = useSelector(selectWordState).currentWordExist;
	const totalPoints = useSelector(selectTotalPoints);

	useEffect(() => {
		if (currentWordExists) {
			setCurrentPoints(sumPointsFromCells(selectedCells));
			setCurrentMultiplier(sumMultiplyPointsFromCells(selectedCells));
		} else {
			setCurrentPoints(0);
			setCurrentMultiplier(0);
		}
	}, [currentWordExists, selectedCells]);

	return (
		<div className="points">
			<div className="points__total">{totalPoints}</div>
			<div className="points__plus">/</div>
			<div className="points__current">
				<span className="current__base-points">{currentPoints}</span>
				{currentMultiplier ? <span className="current__multiplier">(X {currentMultiplier})</span> : null}
			</div>
		</div>
	);
};

export default PointsComponent;
