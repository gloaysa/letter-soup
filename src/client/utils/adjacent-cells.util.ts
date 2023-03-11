import {ICell} from "../services/letter/table.interface";

/**
 * It calculates all the adjacent cells to the one passed as parameter, if currentCell is undefined it will return an empty array
 * @param currentCell
 * @param table
 */
export function adjacentCells(currentCell: ICell | undefined, table: ICell[]): ICell[] {
  if (!currentCell) {
    return [];
  }
  const adjacentCells: ICell[] = [];
  const rows = [currentCell.row - 1, currentCell.row, currentCell.row + 1];
  const columns = [
    currentCell.column - 1,
    currentCell.column,
    currentCell.column + 1,
  ];

  rows.forEach((row) => {
    columns.forEach((column) => {
      // Ignorar la celda actual y las celdas fuera de la tabla
      if (row === currentCell.row && column === currentCell.column) {
        return;
      }
      if (row < 0 || row >= 13 || column < 0 || column >= 7) {
        return;
      }

      const foundCell = table.find(
        (cell) => cell.row === row && cell.column === column
      );

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

export function cellIsAdjacent(
  currentAdjacentCells: ICell[],
  currentCell: ICell
): boolean {
  return currentAdjacentCells.some(({ id }) => id === currentCell.id);
}

export function cellIsSelected(
  currentlySelectedCells: ICell[],
  currentCell: ICell
): boolean {
  return currentlySelectedCells.some(({ id }) => id === currentCell.id);
}

export function cellCanBeSelected(
  currentAdjacentCells: ICell[],
  currentlySelectedCells: ICell[],
  currentCell: ICell
): boolean {
  const isAdjacent = cellIsAdjacent(currentAdjacentCells, currentCell);
  const selected = cellIsSelected(currentlySelectedCells, currentCell);

  return isAdjacent && !selected;
}

type ArrowDirection =
  | "h-right"
  | "h-left"
  | "v-top"
  | "v-bottom"
  | "d-up-left"
  | "d-up-right"
  | "d-down-left"
  | "d-down-right";

export function directionFromOneCellToAnother(
  originCell?: ICell,
  destinationCell?: ICell
): ArrowDirection | undefined {
  if (!destinationCell || !originCell) {
    return;
  }
  if (
    originCell.row === destinationCell.row &&
    originCell.column !== destinationCell.column
  ) {
    // horizontal direction
    if (originCell.column > destinationCell.column) {
      console.log("⬅");
      return "h-left";
    }
    console.log("➡");
    return "h-right";
  }
  if (
    originCell.row !== destinationCell.row &&
    originCell.column === destinationCell.column
  ) {
    // vertical direction
    if (originCell.row < destinationCell.row) {
      console.log("⬆");
      return "v-top";
    }
    console.log("⬇");
    return "v-bottom";
  }
  if (
    originCell.row !== destinationCell.row &&
    originCell.column !== destinationCell.column
  ) {
    const columnIsMinor: boolean = originCell.column < destinationCell.column;
    const columnIsBigger: boolean = originCell.column > destinationCell.column;
    const rowIsBigger: boolean = originCell.row > destinationCell.row;
    // diagonal direction
    if (columnIsBigger) {
      if (rowIsBigger) {
        console.log("↙");
        return "d-down-left";
      } else {
        console.log("↖");
        return "d-up-left";
      }
    }
    if (columnIsMinor) {
      if (rowIsBigger) {
        console.log("↘");
        return "d-down-right";
      } else {
        console.log("↗");
        return "d-up-right";
      }
    }
  }
}
