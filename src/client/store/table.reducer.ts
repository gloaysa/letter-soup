import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ICell } from "../services/letter/table.interface";
import {
  adjacentCells,
  cellCanBeSelected,
  cellIsSelected,
} from "../utils/adjacent-cells.util";

interface TableState {
  table: ICell[];
  currentAdjacentCells: ICell[];
}

// Define the initial state using that type
const initialState: TableState = {
  table: [],
  currentAdjacentCells: [],
};

const lastSelectedCell = (selectedCells: ICell[] | undefined): ICell | undefined => {
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
}

const selectedCells = (table: ICell[]): ICell[] => table.filter(({orderOfSelection}) => orderOfSelection > 0);

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
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<ICell[]>) => {
      state.table = action.payload;
    },
    setLetter: (state, action: PayloadAction<ICell>) => {
      const cell: ICell = { ...action.payload };
      const adjacent = [...state.currentAdjacentCells];
      const selectedCells = state.table.filter(({orderOfSelection}) => orderOfSelection > 0);
      const lastSelected = lastSelectedCell(selectedCells);
      if (!lastSelected) {
        cell.orderOfSelection = 1;
        state.currentAdjacentCells = adjacentCells(cell, state.table);
      } else {
        if (cellCanBeSelected(adjacent, selectedCells, cell)) {
          cell.orderOfSelection = lastSelected.orderOfSelection + 1;
        } else if (cellIsSelected(selectedCells, cell)) {
          // If cell was already selected and the user select it again,
          // we remove the ones that were selected after it (if any) and set their orderOfSelection back to 0.
          state.table = state.table.map((currentCell) => {
            if (currentCell.orderOfSelection > cell.orderOfSelection) {
              return {...currentCell, orderOfSelection: 0};
            }
            return currentCell;
          })
        }
      }

      state.currentAdjacentCells = adjacentCells(cell, state.table);
      state.table = state.table.map((currentCell) => {
        if (cell.id !== currentCell.id) {
          return currentCell;
        }
        return cell;
      })
    },
    removeCells: (state) => {
      state.table = removeSelectedCells(state.table, selectedCells(state.table));
      state.currentAdjacentCells = [];
    },
  },
});

export const { setLetter, setTable, removeCells } = tableSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCellState = (state: RootState): TableState => state.table;
export const currentlySelectedCells = (state: RootState): ICell[] => selectedCells(state.table.table);
export const lastSelectedLetter = (state: RootState): ICell | undefined => lastSelectedCell(currentlySelectedCells(state));

export default tableSlice.reducer;
