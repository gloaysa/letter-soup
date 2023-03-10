import { Char, CharModel, IChar } from "./char.model";
import { v4 as uuid } from "uuid";

export interface ILetter {
  id: string;
  char: IChar;
  points: {
    pointsValue: number;
    pointsMultiplier: number;
  };
}

export class LetterModel implements ILetter {
    id: string;
    char: IChar;

    points = {
        pointsValue: 1,
        pointsMultiplier: 1,
    }

    constructor(char: Char) {
        this.id = uuid();
        this.char = new CharModel(char);
    }
}
