import {ILetter} from '../../models/letter.model';

export interface ICell {
    row: number;
    column: number;
}

export interface IRow {
    rowNumber: number,
    letters: ILetter[]
}
