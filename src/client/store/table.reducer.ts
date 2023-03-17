import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ICell } from '../services/letter/table.interface';
import { adjacentCells } from '../utils/adjacent-cells.util';
import { updateTable } from '../utils/update-table.util';
import { calculateBonusCells, lastSelectedCell, selectedCells } from '../utils/cell-selected.util';
import { removeCellsAndBringUpperRowsDown } from '../utils/remove-cells.util';

interface TableState {
	table: ICell[];
	currentAdjacentCells: ICell[];
	currentlySelectedCells: ICell[];
	bonusCells: ICell[];
}

export const MIN_LENGTH_FOR_BONUS = 5;

// Define the initial state using that type
const initialState: TableState = {
	table: [],
	currentAdjacentCells: [],
	currentlySelectedCells: [],
	bonusCells: [],
};

export const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setTable: (state, action: PayloadAction<ICell[]>) => {
			state.table = action.payload;
			state.currentAdjacentCells = [];
			state.currentlySelectedCells = [];
			state.bonusCells = [];
		},
		setCell: (state, action: PayloadAction<ICell | undefined>) => {
			const cell: ICell | undefined = action.payload ? { ...action.payload } : undefined;

			state.table = updateTable(state.table, state.currentAdjacentCells, cell);
			state.currentAdjacentCells = adjacentCells(state.table, lastSelectedCell(state.table));
			state.currentlySelectedCells = selectedCells(state.table);
			state.bonusCells = calculateBonusCells(state.table);
		},
		removeCells: (state, action: PayloadAction<boolean>) => {
			if (action.payload) {
				const allCellsToRemove = selectedCells(state.table).concat(state.bonusCells);
				const tableWithoutSelectedCells = removeCellsAndBringUpperRowsDown(state.table, allCellsToRemove);
				state.table = tableWithoutSelectedCells;
				state.currentAdjacentCells = [];
			}
		},
	},
});

// ACTIONS
export const { setCell, setTable, removeCells } = tableSlice.actions;

// SELECTORS
export const selectMainTable = (state: RootState): ICell[] => state.table.table;
export const selectAdjacentToLastSelectedCell = (state: RootState): ICell[] => state.table.currentAdjacentCells;
export const selectSelectedCells = (state: RootState): ICell[] => state.table.currentlySelectedCells;
export const selectBonusCells = (state: RootState): ICell[] => state.table.bonusCells;
export const selectedLastSelectedCell = (state: RootState): ICell | undefined => lastSelectedCell(selectSelectedCells(state));

export default tableSlice.reducer;
