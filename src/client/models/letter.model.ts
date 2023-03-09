import {Char, CharModel, IChar} from './char.model';
import {v4 as uuid} from 'uuid';
import {ICell} from '../services/letter/table.interface';

export interface ILetter {
    id: string;
    char: IChar;
    points: {
        pointsValue: number;
        pointsMultiplier: number;
    }
    cell: ICell;
    orderOfSelection: number;
}

export class LetterModel implements ILetter {
    id: string;
    char: IChar;

    points = {
        pointsValue: 1,
        pointsMultiplier: 1,
    }
    cell: ICell;

    orderOfSelection = 0;

    constructor(char: Char, column: number, row: number) {
        this.id = uuid();
        this.char = new CharModel(char);
        this.cell = {
            column,
            row
        };
    }
}
