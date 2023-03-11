import { ICell } from '../services/letter/table.interface';

export const sumPointsFromCells = (cells: ICell[]): number => {
	return cells.reduce((acc, curr) => acc + curr.letter.points.pointValue, 0);
};
