import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ICell } from '../services/letter/table.interface';
import { adjacentCells } from '../utils/adjacent-cells.util';
import { updateTable } from '../utils/update-table.util';
import { lastSelectedCell } from '../utils/cell-selected.util';

interface TableState {
	table: ICell[];
	currentAdjacentCells: ICell[];
	currentlySelectedCells: ICell[];
}

// Define the initial state using that type
const initialState: TableState = {
	table: [],
	currentAdjacentCells: [],
	currentlySelectedCells: [],
};

const selectedCells = (table: ICell[]): ICell[] => table.filter(({ orderOfSelection }) => orderOfSelection > 0);

function removeSelectedCells(table: ICell[], cellsToRemove: ICell[]): ICell[] {
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

export const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setTable: (state, action: PayloadAction<ICell[]>) => {
			state.table = action.payload;
		},
		setCell: (state, action: PayloadAction<ICell>) => {
			const cell: ICell = { ...action.payload };

			state.table = updateTable(state.table, state.currentAdjacentCells, cell);
			state.currentAdjacentCells = adjacentCells(lastSelectedCell(state.table), state.table);
			state.currentlySelectedCells = selectedCells(state.table);
		},
		removeCells: (state, action: PayloadAction<boolean>) => {
			if (action.payload) {
				state.table = removeSelectedCells(state.table, selectedCells(state.table));
				state.currentAdjacentCells = [];
			}
		},
	},
});

export const { setCell, setTable, removeCells } = tableSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCellState = (state: RootState): TableState => state.table;
export const currentlySelectedCells = (state: RootState): ICell[] => selectedCells(state.table.table);
export const lastSelectedLetter = (state: RootState): ICell | undefined => lastSelectedCell(currentlySelectedCells(state));

export default tableSlice.reducer;
