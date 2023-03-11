import { ICell } from '../services/letter/table.interface';
import { cellIsNotSelectedAndCanBeSelected, cellIsSelected, cellIsTheOnlyOneSelected, lastSelectedCell } from './cell-selected.util';

/**
 * This function holds the business logic on how to main Table should be updated based on the Cell selected by the user.
 * Most probably only to be used in table.reducer.ts setCell action.
 * @param table main table
 * @param adjacentCells a list of the Cells that are adjacent to the last selected one before updating the currently selected Cell
 * @param cell the currently selected Cell
 */
export const updateTable = (table: ICell[], adjacentCells: ICell[], cell: ICell): ICell[] => {
	const currentlySelectedCells = table.filter(({ orderOfSelection }) => orderOfSelection > 0);
	const currentOrderOfSelection = lastSelectedCell(currentlySelectedCells)?.orderOfSelection ?? 0;

	if (cellIsNotSelectedAndCanBeSelected(adjacentCells, currentlySelectedCells, cell)) {
		cell.orderOfSelection = currentOrderOfSelection + 1;
		return updateCellAndTable(table, cell);
	}

	if (cellIsSelected(currentlySelectedCells, cell)) {
		if (cellIsTheOnlyOneSelected(currentlySelectedCells, cell)) {
			return removeOrderOfSelectionAndUpdateTable(table, cell);
		}

		// By default, if Cell was already selected and is selected again,
		// we set it as the last selected letter and deselect the ones selected after it.
		return removeOrderOfSelectionFromPreviouslySelectedCellsAndUpdateTable(table, cell);
	}

	// By default, if a letter is selected and another non-adjacent letter is selected (or is the first time selecting a letter),
	// the selected letter is set as the only one selected and deselect all the other ones.
	const tableWithNoSelections = removeOrderOfSelectionFromCellsAndUpdateTable(table, currentlySelectedCells);
	cell.orderOfSelection = 1;
	return updateCellAndTable(tableWithNoSelections, cell);
};

/**
 * Returns the table updated with the passed Cell.
 * @example `
 * const cellToUpdate = {...existingCell, aProperty: newValue};
 * const updatedTable = updateCellAndTable(table, cellToUpdate);
 * `
 * @param table
 * @param cell
 */
const updateCellAndTable = (table: ICell[], cell: ICell): ICell[] => {
	return table.map((currentCell) => {
		if (cell.id !== currentCell.id) {
			return currentCell;
		}
		return cell;
	});
};

/**
 * Removes orderOfSelection from the passed cell and returns the table updated
 * @param table
 * @param cell
 */
const removeOrderOfSelectionAndUpdateTable = (table: ICell[], cell: ICell): ICell[] => {
	return table.map((currentCell) => {
		if (currentCell.id === cell.id) {
			return { ...currentCell, orderOfSelection: 0 };
		}
		return currentCell;
	});
};

/**
 * Removes orderOfSelection from the cells that were selected after the passed Cell and returns the table updated.
 * @param table
 * @param cell
 */
const removeOrderOfSelectionFromPreviouslySelectedCellsAndUpdateTable = (table: ICell[], cell: ICell): ICell[] => {
	return table.map((currentCell) => {
		if (currentCell.orderOfSelection > cell.orderOfSelection) {
			return { ...currentCell, orderOfSelection: 0 };
		}
		return currentCell;
	});
};

/**
 * Removes orderOfSelection from all the passed Cells and updates the table
 * @param table
 * @param cells
 */
const removeOrderOfSelectionFromCellsAndUpdateTable = (table: ICell[], cells: ICell[]): ICell[] => {
	return table.map((cellFromTable) => {
		const currentCell = cells.find(({ id }) => cellFromTable.id === id);
		if (currentCell) {
			return { ...currentCell, orderOfSelection: 0 };
		}
		return cellFromTable;
	});
};
