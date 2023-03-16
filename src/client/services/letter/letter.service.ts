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
			if (index === 9) {
				const firstRow = [
					new CellModel(3, 1, new LetterModel('c')),
					new CellModel(3, 2, new LetterModel('a')),
					new CellModel(3, 3, new LetterModel('f')),
					new CellModel(3, 4, new LetterModel('e')),
					new CellModel(3, 5, new LetterModel('s')),
					new CellModel(3, 6, new LetterModel(this.getRandomChar())),
					new CellModel(3, 7, new LetterModel(this.getRandomChar())),
					new CellModel(3, 8, new LetterModel(this.getRandomChar())),
					new CellModel(3, 9, new LetterModel(this.getRandomChar())),
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
