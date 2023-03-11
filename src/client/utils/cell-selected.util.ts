import { ICell } from '../services/letter/table.interface';
import { cellIsAdjacent } from './adjacent-cells.util';

export const lastSelectedCell = (selectedCells: ICell[] | undefined): ICell | undefined => {
	if (!selectedCells?.length) {
		return undefined;
	}

	let lastSelected = selectedCells[0];

	for (let i = 1; i < selectedCells.length; i++) {
		if (selectedCells[i].orderOfSelection > lastSelected.orderOfSelection) {
			lastSelected = selectedCells[i];
		}
	}
	return lastSelected;
};

/**
 * Returns true if the passed Cell is currently selected.
 * @param selectedCells
 * @param cell
 */
export function cellIsSelected(selectedCells: ICell[], cell: ICell): boolean {
	return selectedCells.some(({ id }) => id === cell.id);
}

/**
 * Returns true if the Cell passed is selected and there are no more selected cells.
 * @param selectedCells
 * @param cell
 */
export function cellIsTheOnlyOneSelected(selectedCells: ICell[], cell: ICell): boolean {
	return cellIsSelected(selectedCells, cell) && selectedCells.length === 1;
}

/**
 * Returns true if the cell passed is adjacent to a currently selected cell.
 * If the cell passed is already selected, will return false.
 * @param currentAdjacentCells
 * @param currentlySelectedCells
 * @param currentCell
 */
export function cellIsNotSelectedAndCanBeSelected(currentAdjacentCells: ICell[], currentlySelectedCells: ICell[], currentCell: ICell): boolean {
	const isAdjacent = cellIsAdjacent(currentAdjacentCells, currentCell);
	const selected = cellIsSelected(currentlySelectedCells, currentCell);

	return isAdjacent && !selected;
}
