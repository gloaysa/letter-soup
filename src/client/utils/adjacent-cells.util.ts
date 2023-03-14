import { ICell } from '../services/letter/table.interface';
import { flatArrayAndRemoveDuplicatesById } from './array-manipulation.util';
import { removeCellsContainedInBoth } from './remove-cells.util';

export const TOTAL_ROWS = 12;
export const TOTAL_COLUMNS = 9;

/**
 * Returns an array containing all the adjacent cells to the one passed as parameter.
 * If currentCell is undefined it will return an empty array
 * @param currentCell
 * @param table
 */
export function adjacentCells(table: ICell[], currentCell: ICell | undefined): ICell[] {
	return perpendicularAdjacentCells(table, currentCell).concat(sideAdjacentCell(table, currentCell));
}

/**
 * Returns an array containing the top/bottom - left/right adjacent cells to all the ones inside currentSelectedCells.
 * @param table
 * @param currentSelectedCells
 */
export function cellsSideAdjacentToSelectedCells(table: ICell[], currentSelectedCells: ICell[]): ICell[] {
	const adjacentCellsList = currentSelectedCells.map((cell) => sideAdjacentCell(table, cell));
	const allAdjacentCells = flatArrayAndRemoveDuplicatesById(adjacentCellsList);
	return removeCellsContainedInBoth(allAdjacentCells, currentSelectedCells);
}

/**
 * Returns an array containing perpendicular adjacent cells to the one passed as parameter
 * If currentCell is undefined it will return an empty array
 * @param currentCell
 * @param table
 */
export function perpendicularAdjacentCells(table: ICell[], currentCell: ICell | undefined): ICell[] {
	return filterAdjacentCells(table, currentCell, (row, column, currentCell) => {
		return (
			(row === currentCell.row - 1 && column === currentCell.column + 1) ||
			(row === currentCell.row - 1 && column === currentCell.column - 1) ||
			(row === currentCell.row + 1 && column === currentCell.column - 1) ||
			(row === currentCell.row + 1 && column === currentCell.column + 1)
		);
	});
}

/**
 * It returns a new array containing the Cells adjacent to the passed Cell and that pass the filter in the callback.
 * It will always filter Cells outside the table scope.
 * It will always filter Cells that are the same as the passed 'currentCell'.
 * If currentCell is undefined, will return an empty array.
 * @param table
 * @param currentCell
 * @param callback
 */
function filterAdjacentCells(
	table: ICell[],
	currentCell: ICell | undefined,
	callback: (row: number, column: number, currentCell: ICell) => boolean
): ICell[] {
	if (!currentCell) {
		return [];
	}
	const adjacentCells: ICell[] = [];
	const rows = [currentCell.row - 1, currentCell.row, currentCell.row + 1];
	const columns = [currentCell.column - 1, currentCell.column, currentCell.column + 1];

	rows.forEach((row) => {
		columns.forEach((column) => {
			// Ignore currentCell and Cells outside the table
			if (row === currentCell.row && column === currentCell.column) {
				return;
			}
			if (row < 0 || row > TOTAL_ROWS || column < 0 || column > TOTAL_COLUMNS) {
				return;
			}
			// Ignore the cells that meet the callback
			if (!callback(row, column, currentCell)) {
				return;
			}

			const foundCell = table.find((cell) => cell.row === row && cell.column === column);

			if (foundCell) {
				adjacentCells.push({
					id: foundCell.id,
					row,
					column,
					letter: foundCell.letter,
					orderOfSelection: foundCell.orderOfSelection,
				});
			}
		});
	});

	return adjacentCells;
}

/**
 * Returns an array containing cells on top/bottom - left/right adjacent cells to the one passed as parameter
 * If currentCell is undefined it will return an empty array
 * @param currentCell
 * @param table
 */
function sideAdjacentCell(table: ICell[], currentCell: ICell | undefined): ICell[] {
	return filterAdjacentCells(table, currentCell, (row, column, currentCell) => {
		return row === currentCell.row || column === currentCell.column;
	});
}

/**
 * Returns true if 'currentCell' is inside 'currentAdjacentCells'
 * @param currentAdjacentCells
 * @param currentCell
 */
export function cellIsAdjacent(currentAdjacentCells: ICell[], currentCell: ICell): boolean {
	return currentAdjacentCells.some(({ id }) => id === currentCell.id);
}

type ArrowDirection = 'h-right' | 'h-left' | 'v-top' | 'v-bottom' | 'd-up-left' | 'd-up-right' | 'd-down-left' | 'd-down-right';

export function directionFromOneCellToAnother(originCell?: ICell, destinationCell?: ICell): ArrowDirection | undefined {
	if (!destinationCell || !originCell) {
		return;
	}
	if (originCell.row === destinationCell.row && originCell.column !== destinationCell.column) {
		// horizontal direction
		if (originCell.column > destinationCell.column) {
			console.log('⬅');
			return 'h-left';
		}
		console.log('➡');
		return 'h-right';
	}
	if (originCell.row !== destinationCell.row && originCell.column === destinationCell.column) {
		// vertical direction
		if (originCell.row < destinationCell.row) {
			console.log('⬆');
			return 'v-top';
		}
		console.log('⬇');
		return 'v-bottom';
	}
	if (originCell.row !== destinationCell.row && originCell.column !== destinationCell.column) {
		const columnIsMinor: boolean = originCell.column < destinationCell.column;
		const columnIsBigger: boolean = originCell.column > destinationCell.column;
		const rowIsBigger: boolean = originCell.row > destinationCell.row;
		// diagonal direction
		if (columnIsBigger) {
			if (rowIsBigger) {
				console.log('↙');
				return 'd-down-left';
			} else {
				console.log('↖');
				return 'd-up-left';
			}
		}
		if (columnIsMinor) {
			if (rowIsBigger) {
				console.log('↘');
				return 'd-down-right';
			} else {
				console.log('↗');
				return 'd-up-right';
			}
		}
	}
}
