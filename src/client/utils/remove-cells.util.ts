import { ICell } from '../services/letter/table.interface';

/**
 * Removes the passed Cells from the table and returns a new table without those Cells.
 * It will also reduce in 1 the row of the Cells that where found in the upper rows of the same column
 * of those Cells that were removed.
 * @param table
 * @param cellsToRemove
 */
export function removeSelectedCells(table: ICell[], cellsToRemove: ICell[]): ICell[] {
	const newTable = [...table];
	for (const cell of cellsToRemove) {
		// Search the index in the table of the cell to remove
		let posicion;
		for (let i = 0; i < newTable.length; i++) {
			if (newTable[i].row === cell.row && newTable[i].column === cell.column) {
				posicion = i;
				break;
			}
		}

		// If a position was found, use .splice to remove the cell
		// and reduce in one the upper rows positioned in the same column to "bring them down"
		if (posicion !== undefined) {
			newTable.splice(posicion, 1);
			for (let i = 0; i < newTable.length; i++) {
				if (newTable[i].row > cell.row && newTable[i].column === cell.column) {
					newTable[i] = {
						...newTable[i],
						row: newTable[i].row - 1,
					};
				}
			}
		}
	}
	return newTable;
}
