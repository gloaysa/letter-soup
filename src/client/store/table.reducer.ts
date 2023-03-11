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
  currentlySelectedCells: ICell[];
}

// Define the initial state using that type
const initialState: TableState = {
  table: [],
  currentAdjacentCells: [],
  currentlySelectedCells: [],
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

const updateCellAndTable = (table: ICell[], cell: ICell): ICell[] => {
  return table.map((currentCell) => {
    if (cell.id !== currentCell.id) {
      return currentCell;
    }
    return cell;
  })
}

/**
 * Removes orderOfSelection from the passed cell and returns the table updated
 * @param table
 * @param cell
 */
const removeOrderOfSelectionAndUpdateTable = (table: ICell[], cell: ICell): ICell[] => {
  return table.map((currentCell) => {
    if (currentCell.id === cell.id) {
      return {...currentCell, orderOfSelection: 0};
    }
    return currentCell;
  });
}

/**
 * Removes orderOfSelection from the cells that were selected after the passed Cell and returns the table updated.
 * @param table
 * @param cell
 */
const removeOrderOfSelectionFromPreviouslySelectedCellsAndUpdateTable = (table: ICell[], cell: ICell): ICell[] => {
  return table.map((currentCell) => {
    if (currentCell.orderOfSelection > cell.orderOfSelection) {
      return {...currentCell, orderOfSelection: 0};
    }
    return currentCell;
  })
}

/**
 * Removes orderOfSelection from all the passed Cells and updates the table
 * @param table
 * @param cells
 */
const removeOrderOfSelectionFromCellsAndUpdateTable = (table: ICell[], cells: ICell[]): ICell[] => {
  return table.map((cellFromTable) => {
    const currentCell = cells.find(({id}) => cellFromTable.id === id);
    if (currentCell) {
      return {...currentCell, orderOfSelection: 0};
    }
    return cellFromTable;
  })
}

const updateTable = (table: ICell[], adjacentCells: ICell[], cell: ICell): ICell[] => {
  const currentlySelectedCells = table.filter(({orderOfSelection}) => orderOfSelection > 0);
  const lastSelected = lastSelectedCell(currentlySelectedCells);
  if (!lastSelected) {
    cell.orderOfSelection = 1;
    console.log('guille !lastSelected')
    return updateCellAndTable(table, cell);
  } else {
    console.log('guille currentlySelectedCells', currentlySelectedCells[0].letter.char.value)
    if (cellCanBeSelected(adjacentCells, currentlySelectedCells, cell)) {
      console.log('guille cellCanBeSelected')
      cell.orderOfSelection = lastSelected.orderOfSelection + 1;
      return updateCellAndTable(table, cell);
    } else if (cellIsSelected(currentlySelectedCells, cell)) {
      console.log('guille cellIsSelected')
      if (cell.orderOfSelection === 1 && selectedCells(table).length === 1) {
        console.log('guille orderOfSelection === 1')
        return removeOrderOfSelectionAndUpdateTable(table, cell);
      } else {
        // If cell was already selected and the user select it again,
        console.log('guille was already selected and user select it again')
        return removeOrderOfSelectionFromPreviouslySelectedCellsAndUpdateTable(table, cell);
      }
    }
    console.log('guille else')
  }
  const tableWithNoSelections = removeOrderOfSelectionFromCellsAndUpdateTable(table, currentlySelectedCells);
  cell.orderOfSelection = 1;
  return updateCellAndTable(tableWithNoSelections, cell);
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

      state.table = updateTable(state.table, state.currentAdjacentCells, cell);
      state.currentAdjacentCells = adjacentCells(lastSelectedCell(state.table), state.table);
      state.currentlySelectedCells = selectedCells(state.table);
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
