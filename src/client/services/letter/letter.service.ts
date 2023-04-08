import { Chars, IChar } from '../../models/char.model';
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

	private charsUsed: string[] = [];

	createFullTable(numberOfRows: number, numberOfColumns: number): ICell[] {
		this.charsUsed = [];
		const iterableNumberOfRows = Array.from(Array(numberOfRows).keys());
		const iterableNumberOfColumns = Array.from(Array(numberOfColumns).keys());
		const table: ICell[] = [];

		iterableNumberOfRows.forEach((rowNumber) => {
			/*if (rowNumber === 9) {
				const testingRow = [
					new CellModel(3, 1, new LetterModel({ value: 'p', frequency: 1 })),
					new CellModel(3, 2, new LetterModel({ value: 'a', frequency: 1 })),
					new CellModel(3, 3, new LetterModel({ value: 'ñ', frequency: 1 })),
					new CellModel(3, 4, new LetterModel({ value: 'o', frequency: 1 })),
					new CellModel(3, 5, new LetterModel({ value: 's', frequency: 1 })),
					new CellModel(3, 6, new LetterModel(this.getRandomChar())),
					new CellModel(3, 7, new LetterModel(this.getRandomChar())),
					new CellModel(3, 8, new LetterModel(this.getRandomChar())),
					new CellModel(3, 9, new LetterModel(this.getRandomChar())),
				];
				return table.push(...testingRow);
			}*/

			const row = iterableNumberOfColumns.map((columnNumber) => {
				const char = this.generateLetterList(numberOfRows * numberOfColumns);
				const rowNumberInverse = iterableNumberOfRows.length - rowNumber;
				const columnNumberNotZero = columnNumber + 1;
				return new CellModel(rowNumberInverse, columnNumberNotZero, new LetterModel(char));
			});
			table.push(...row);
		});

		return JSON.parse(JSON.stringify(table));
	}

	private getRandomChar(): IChar {
		const randomIndex = Math.floor(Math.random() * Chars.length);

		return Chars[randomIndex];
	}

	private generateLetterList(totalNumberOfLetters: number): IChar {
		const char = this.getRandomChar();

		const currentTimesCharIsUsed: number = this.charsUsed.reduce((counter, current) => {
			if (current === char.value) {
				return counter + 1;
			} else {
				return counter;
			}
		}, 0);

		const charUsedPercentage = (currentTimesCharIsUsed * totalNumberOfLetters) / 100;
		const charPercentage = (char.frequency * totalNumberOfLetters) / 100;
		if (charUsedPercentage > charPercentage) {
			return this.generateLetterList(totalNumberOfLetters);
		}

		this.charsUsed.push(char.value);
		return char;
	}
}
