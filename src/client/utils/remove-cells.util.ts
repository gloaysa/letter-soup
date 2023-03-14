import { ICell } from '../services/letter/table.interface';
import { orderCellsByRowDescending } from './cell-selected.util';

/**
 * Removes the passed Cells from the table and returns a new table without those Cells.
 * It will also reduce in 1 the row of the Cells that where found in the upper rows of the same column
 * of those Cells that were removed.
 * @param table
 * @param cellsToRemove
 */
export function removeCellsAndBringUpperRowsDown(table: ICell[], cellsToRemove: ICell[]): ICell[] {
	const cellsToRemoveSorted = cellsToRemove.sort(orderCellsByRowDescending);
	const newTable = removeCellsContainedInBoth(table, cellsToRemove).sort(orderCellsByRowDescending);

	for (let i = 0; i < newTable.length; i++) {
		for (const cellRemoved of cellsToRemoveSorted) {
			if (newTable[i].row >= cellRemoved.row && newTable[i].column === cellRemoved.column) {
				newTable[i] = {
					...newTable[i],
					row: newTable[i].row - 1,
				};
			}
		}
	}
	return newTable;
}

/**
 * Returns an array containing all the elements inside both passed arrays, without duplicates.
 * @param cells1
 * @param cells2
 */
export function removeCommonCells(cells1: ICell[], cells2: ICell[]): ICell[] {
	const uniqueCells: ICell[] = cells1.filter((cell1) => {
		return !cells2.some((cell2) => {
			return cell1.id === cell2.id;
		});
	});
	return uniqueCells.concat(cells2);
}

/**
 * It returns a new array holding all the elements inside cellsToClean that are not inside cellsToRemove
 * @param cellsToClean
 * @param cellsToRemove
 */
export function removeCellsContainedInBoth(cellsToClean: ICell[], cellsToRemove: ICell[]): ICell[] {
	return cellsToClean.filter((cell) => {
		return !cellsToRemove.some((selectedCell) => {
			return cell.id === selectedCell.id;
		});
	});
}
