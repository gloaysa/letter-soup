import {Char, Chars} from '../../models/char.model';
import {ILetter, LetterModel} from '../../models/letter.model';
import {IRow} from './table.interface';

export class LetterService {
    private static instance: LetterService;

    private rowSize = 12;
    private columnSize = 6;

    static getInstance(): LetterService {
        if (!this.instance) {
            this.instance = new LetterService();
            return this.instance;
        }
        return this.instance;
    }

    createFullTable(): IRow[] {
        const numberOfRows = Array.from(Array(this.rowSize).keys());
        return JSON.parse(JSON.stringify(numberOfRows.map((value) => ({
            rowNumber: value,
            letters: this.generateRow(numberOfRows.length - value),
        }))));
    }

    generateRow(row: number): ILetter[] {
        return this.getRandomChars().map((char: Char, column: number) => new LetterModel(char, column + 1, row));
    }

    private getRandomChars(): Char[] {
        const shuffled = [...Chars].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, this.columnSize);
    }
}
