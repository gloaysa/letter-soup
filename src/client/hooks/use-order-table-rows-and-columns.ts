import { ICell, ITable } from "../services/letter/table.interface";

function compareCellsByColumn(a: ICell, b: ICell): number {
  if (a.column < b.column) {
    return -1;
  } else if (a.column > b.column) {
    return 1;
  } else {
    return 0;
  }
}

export const useOrderTableRowsAndColumns = (table: ICell[], numberOfRows: number): ITable => {
    const tableOrderedByRow: { [key: number]: ICell[] } = table.reduce((result, current) => {
        const valor = current.row;
        if (!result[valor]) {
            result[valor] = [];
        }
        result[valor].push(current);
        return result;
    }, {} as { [key: number]: ICell[] });

    // The table comes backwards, so we reverse it so index === row
    const newRows: ITable = Object.values(tableOrderedByRow).reverse();

    if (newRows.length && newRows.length < numberOfRows) {
        // if we have missing rows, we add an empty array
        const missingRows = numberOfRows - newRows.length;
        Array.from(Array(missingRows).keys()).forEach(() => newRows.unshift([]));
    }
    newRows.map((cell) => cell.sort(compareCellsByColumn))
    return newRows;
}
