import {ICell} from '../services/letter/table.interface';

/**
 * It calculates all the adjacent cells to the one passed as parameter
 * @param currentCell
 */
export function adjacentCells(currentCell: ICell): ICell[] {
    const adjacentCells: { column: number, row: number }[] = [];
    const adjacentCellsColumn = [currentCell.column - 1, currentCell.column, currentCell.column + 1];
    const adjacentCellsRow = [currentCell.row - 1, currentCell.row, currentCell.row + 1];
    adjacentCellsColumn.forEach((column) => {
        adjacentCellsRow.forEach((row) => {
            if (currentCell.row === row && currentCell.column === column) {
                return;
            }
            adjacentCells.push({column, row})
        })
    });
    return adjacentCells;
}

export function cellIsAdjacent(currentAdjacentCells: ICell[], currentCell: ICell): boolean {
    return currentAdjacentCells.some(({row, column}) => row === currentCell.row && column === currentCell.column);
}

export function cellIsSelected(currentlySelectedCells: ICell[], currentCell: ICell): boolean {
    return currentlySelectedCells.some(({row, column}) => row === currentCell.row && column === currentCell.column);
}

export function cellCanBeSelected(currentAdjacentCells: ICell[], currentlySelectedCells: ICell[], currentCell: ICell): boolean {
    const isAdjacent = cellIsAdjacent(currentAdjacentCells, currentCell);
    const selected = cellIsSelected(currentlySelectedCells, currentCell);

    return isAdjacent && !selected;
}

type ArrowDirection = 'h-right' | 'h-left' | 'v-top' | 'v-bottom' | 'd-up-left' | 'd-up-right' | 'd-down-left' | 'd-down-right';
export function directionFromOneCellToAnother(originCell?: ICell, destinationCell?: ICell): ArrowDirection | undefined {
    if (!destinationCell || !originCell) {
        return;
    }
    if (originCell.row === destinationCell.row && originCell.column !== destinationCell.column) {
        // horizontal direction
        if (originCell.column > destinationCell.column) {
            console.log('⬅')
            return 'h-left'
        }
        console.log('➡')
        return 'h-right';
    }
    if (originCell.row !== destinationCell.row && originCell.column === destinationCell.column) {
        // vertical direction
        if (originCell.row < destinationCell.row) {
            console.log('⬆')
            return 'v-top'
        }
        console.log('⬇')
        return 'v-bottom';
    }
    if ((originCell.row !== destinationCell.row) && (originCell.column !== destinationCell.column)) {
        console.log('originCell', originCell)
        console.log('destinationCell', destinationCell);
        const columnIsMinor: boolean = originCell.column < destinationCell.column;
        const columnIsBigger: boolean = originCell.column > destinationCell.column;
        const rowIsBigger: boolean = originCell.row > destinationCell.row;
        // diagonal direction
        if (columnIsBigger) {
            if (rowIsBigger) {
                console.log('↙')
                return 'd-down-left';
            } else {
                console.log('↖')
                return 'd-up-left';
            }
        }
        if (columnIsMinor) {
            if (rowIsBigger) {
                console.log('↘')
                return 'd-down-right';
            } else {
                console.log('↗')
                return 'd-up-right';
            }

        }
    }
}
