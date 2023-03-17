import React, { FunctionComponent, useEffect, useState } from 'react';
import './row.component.scss';
import CellComponent from '../cell/cell.component';
import { ICell } from '../../services/letter/table.interface';
import { useDispatch, useSelector } from 'react-redux';
import { selectTableConfig } from '../../store/config.reducer';
import { useMakeCellsFallDownHook } from '../../hooks/use-make-cells-fall-down.hook';
import {
	removeCells,
	selectAdjacentToLastSelectedCell,
	selectBonusCells,
	selectedLastSelectedCell,
	selectSelectedCells,
	setCell,
} from '../../store/table.reducer';
import { selectCurrentWordExist, setTotalPoints } from '../../store/words.reducer';
import { cellIsNotSelectedAndCanBeSelected } from '../../utils/cell-selected.util';

interface RowComponent {
	row: ICell[];
}

const RowComponent: FunctionComponent<RowComponent> = ({ row }) => {
	const [numberOfColumns, setNumberOfColumns] = useState<(ICell | undefined)[]>([]);

	const tableConfig = useSelector(selectTableConfig);
	const currentWordExist = useSelector(selectCurrentWordExist);
	const selectedCells = useSelector(selectSelectedCells);
	const lastSelected = useSelector(selectedLastSelectedCell);
	const currentAdjacentCells = useSelector(selectAdjacentToLastSelectedCell);
	const currentBonusCells = useSelector(selectBonusCells);
	const dispatch = useDispatch();

	useEffect(() => {
		const rowWithPossibleMissingCells = useMakeCellsFallDownHook(tableConfig.columns, row);
		setNumberOfColumns(rowWithPossibleMissingCells);
	}, [tableConfig.rows, row]);

	const cellIsLastSelected = (cell: ICell) => lastSelected?.id === cell.id;
	const cellIsSelected = (cell: ICell) => selectedCells.some(({ id }) => id === cell.id);
	const cellIsAdjacent = (cell: ICell) => cellIsNotSelectedAndCanBeSelected(currentAdjacentCells, selectedCells, cell);
	const cellIsBonusCell = (cell: ICell) => currentBonusCells.some(({ id }) => id === cell.id);

	const selectLetter = (event: React.MouseEvent, cell: ICell) => {
		dispatch(setCell(cell));
	};

	const playWord = () => {
		console.log('guille', currentWordExist);
		if (currentWordExist) {
			dispatch(removeCells(currentWordExist));
			dispatch(setTotalPoints({ selectedCells, currentWordExist, bonusCells: currentBonusCells }));
		}
	};

	return (
		<div className="row">
			{numberOfColumns.map((cell, index) => {
				if (!cell) {
					return <div className={`row__cell row__cell--empty ${index}`} key={index}></div>;
				}
				return (
					<div
						onClick={(event) => selectLetter(event, cell)}
						className={
							`row__cell ${cell.row} ${cell.column} ` +
							(cellIsLastSelected(cell) && currentWordExist ? 'row__cell--lastSelected ' : '') +
							(cellIsSelected(cell) ? 'row__cell--selected ' : '') +
							(cellIsSelected(cell) && currentWordExist ? 'row__cell--valid-word ' : '') +
							(cellIsAdjacent(cell) ? 'row__cell--adjacent ' : '') +
							(cellIsBonusCell(cell) && currentWordExist ? 'row__cell--bonus ' : '')
						}
						key={cell.id}
					>
						<CellComponent cell={cell} onSecondClick={playWord} />
					</div>
				);
			})}
		</div>
	);
};

export default RowComponent;
