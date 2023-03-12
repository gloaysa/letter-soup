import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ICell } from '../services/letter/table.interface';
import { adjacentCells } from '../utils/adjacent-cells.util';
import { updateTable } from '../utils/update-table.util';
import { lastSelectedCell, selectedCells } from '../utils/cell-selected.util';
import { removeSelectedCells } from '../utils/remove-cells.util';

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

// ACTIONS
export const { setCell, setTable, removeCells } = tableSlice.actions;

// SELECTORS
export const mainTable = (state: RootState): ICell[] => state.table.table;
export const currentlyAdjacentCells = (state: RootState): ICell[] => state.table.currentAdjacentCells;
export const currentlySelectedCells = (state: RootState): ICell[] => selectedCells(state.table.table);
export const lastSelectedLetter = (state: RootState): ICell | undefined => lastSelectedCell(currentlySelectedCells(state));

export default tableSlice.reducer;
