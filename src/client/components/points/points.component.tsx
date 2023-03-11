import './points.component.scss';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { currentlySelectedCells } from '../../store/table.reducer';
import { sumPointsFromCells } from '../../utils/sum-points.util';
import { selectTotalPoints, selectWordState } from '../../store/words.reducer';

const PointsComponent: FunctionComponent = () => {
	const selectedCells = useSelector(currentlySelectedCells);
	const currentWordExists = useSelector(selectWordState).currentWordExist;
	const totalPoints = useSelector(selectTotalPoints);

	const currentWordPoints = currentWordExists ? sumPointsFromCells(selectedCells) : 0;

	return (
		<div className="points">
			<div className="points__total">{totalPoints}</div>
			<div className="points__plus">/</div>
			<div className="points__current">{currentWordPoints}</div>
		</div>
	);
};

export default PointsComponent;
