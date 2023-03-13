import { ICell } from '../services/letter/table.interface';
import { cellIsAdjacent, cellsSideAdjacentToSelectedCells } from './adjacent-cells.util';
import { MIN_LENGTH_FOR_BONUS } from '../store/table.reducer';

function orderCellsByOrderOfSelection(a: ICell, b: ICell): number {
	if (a.orderOfSelection < b.orderOfSelection) {
		return -1;
	} else if (a.orderOfSelection > b.orderOfSelection) {
		return 1;
	} else {
		return 0;
	}
}

/**
 * Returns an array ordered by orderOfSelection containing only the Cells that has orderOfSelection > 0
 * (meaning they are currently selected)
 * @param table
 */
export function selectedCells(table: ICell[]): ICell[] {
	return table.filter(({ orderOfSelection }) => orderOfSelection > 0).sort(orderCellsByOrderOfSelection);
}

export function calculateBonusCells(table: ICell[]): ICell[] {
	return selectedCells(table).length >= MIN_LENGTH_FOR_BONUS ? cellsSideAdjacentToSelectedCells(table, selectedCells(table)) : [];
}

/**
 * It returns the last Cell that was selected on the passed array of Cells.
 * If the passed array does not contain Cells, returns undefined.
 * If no Cell is selected inside the passed array, will return undefined.
 * @param selectedCells
 */
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
	if (lastSelected.orderOfSelection === 0) {
		return undefined;
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
