import { ICell } from '../services/letter/table.interface';

export const sumPointsFromCells = (cells: ICell[]): number => {
	return cells.reduce((acc, curr) => acc + curr.letter.points.pointValue, 0);
};

export const sumMultiplyPointsFromCells = (cells: ICell[]): number => {
	return cells.reduce((acc, curr) => acc + curr.letter.points.pointsMultiplier, 0);
};

export const multiplyPointsFromCells = (cells: ICell[]): number => {
	const totalSum = sumPointsFromCells(cells);
	const totalMultiplier = sumMultiplyPointsFromCells(cells);
	return totalSum * totalMultiplier;
};
