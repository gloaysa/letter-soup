import { ILetter } from "../../models/letter.model";

export type ITable = ICell[][];

export interface ICell {
    id: string;
    row: number;
    column: number;
    letter: ILetter;
    orderOfSelection: number;
}

export interface IRow {
    rowNumber: number,
    letters: ILetter[]
}
