import { Char, Chars } from '../../models/char.model';
import { LetterModel } from '../../models/letter.model';
import { ICell } from './table.interface';
import { CellModel } from '../../models/cell.model';

export class LetterService {
	private static instance: LetterService;

	static getInstance(): LetterService {
		if (!this.instance) {
			this.instance = new LetterService();
			return this.instance;
		}
		return this.instance;
	}

	createFullTable(numberOfRows: number, numberOfColumns: number): ICell[] {
		const rows = Array.from(Array(numberOfRows).keys());
		const columns = Array.from(Array(numberOfColumns).keys());
		const table: ICell[] = [];

		rows.forEach((row, index) => {
			if (index === 0) {
				const firstRow = [
					new CellModel(12, 1, new LetterModel('f')),
					new CellModel(12, 2, new LetterModel('e')),
					new CellModel(12, 3, new LetterModel('a')),
					new CellModel(12, 4, new LetterModel('f')),
					new CellModel(12, 5, new LetterModel('e')),
					new CellModel(12, 6, new LetterModel('o')),
				];
				return table.push(...firstRow);
			}
			if (index === 6) {
				const firstRow = [
					new CellModel(6, 1, new LetterModel('f')),
					new CellModel(6, 2, new LetterModel('e')),
					new CellModel(6, 3, new LetterModel('a')),
					new CellModel(6, 4, new LetterModel('f')),
					new CellModel(6, 5, new LetterModel('e')),
					new CellModel(6, 6, new LetterModel('o')),
				];
				return table.push(...firstRow);
			}

			if (index === 11) {
				const firstRow = [
					new CellModel(1, 1, new LetterModel('f')),
					new CellModel(1, 2, new LetterModel('e')),
					new CellModel(1, 3, new LetterModel('a')),
					new CellModel(1, 4, new LetterModel('f')),
					new CellModel(1, 5, new LetterModel('e')),
					new CellModel(1, 6, new LetterModel('o')),
				];
				return table.push(...firstRow);
			}
			const cellsInRow = columns.map((column) => new CellModel(rows.length - index, column + 1, new LetterModel(this.getRandomChar())));
			table.push(...cellsInRow);
		});

		return JSON.parse(JSON.stringify(table));
	}

	private getRandomChars(sizeOfColumn: number): Char[] {
		const shuffled = [...Chars].sort(() => 0.5 - Math.random());

		return shuffled.slice(0, sizeOfColumn);
	}

	private getRandomChar(): Char {
		const randomIndex = Math.floor(Math.random() * Chars.length);

		return Chars[randomIndex];
	}
}
