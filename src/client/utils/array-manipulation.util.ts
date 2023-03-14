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
