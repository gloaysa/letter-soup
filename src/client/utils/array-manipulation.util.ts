import { ICell } from '../services/letter/table.interface';

export function removeDuplicates<T>(list: T[]): T[] {
	return list.filter((elem, index) => list.indexOf(elem) === index);
}

export function flatArrayAndRemoveDuplicatesById(list: ICell[][]): ICell[] {
	const uniqueCells: { [key: string]: ICell } = list.reduce((acc, curr) => {
		curr.forEach((cell) => {
			if (!acc[cell.id]) {
				acc[cell.id] = cell;
			}
		});
		return acc;
	}, {} as { [key: string]: ICell });
	return Object.values(uniqueCells);
}

/**
 * Returns an array containing all the elements inside of both passed arrays, without duplicates.
 * @param cells1
 * @param cells2
 */
export function removeCommonCells(cells1: ICell[], cells2: ICell[]): ICell[] {
	const uniqueCells: ICell[] = cells1.filter((cell1) => {
		return !cells2.some((cell2) => {
			return cell1.id === cell2.id;
		});
	});
	return uniqueCells.concat(cells2);
}

/**
 * It returns a new array holding all the elements inside cellsToClean that are not inside cellsToRemove
 * @param cellsToClean
 * @param cellsToRemove
 */
export function removeCellsContainedInBoth(cellsToClean: ICell[], cellsToRemove: ICell[]): ICell[] {
	return cellsToClean.filter((cell) => {
		return !cellsToRemove.some((selectedCell) => {
			return cell.id === selectedCell.id;
		});
	});
}
