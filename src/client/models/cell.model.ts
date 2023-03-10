import { ICell } from "../services/letter/table.interface";
import { ILetter } from "./letter.model";
import { v4 as uuid } from "uuid";

export class CellModel implements ICell {
  column: number;
  id: string;
  letter: ILetter;
  orderOfSelection = 0;
  row: number;

  constructor(row: number, column: number, letter: ILetter) {
    this.id = uuid();
    this.row = row;
    this.column = column;
    this.letter = letter;
  }
}
