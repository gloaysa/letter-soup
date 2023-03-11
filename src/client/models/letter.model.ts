import { Char, CharModel, IChar } from './char.model';
import { v4 as uuid } from 'uuid';

export interface ILetter {
	id: string;
	char: IChar;
	points: {
		pointValue: number;
		pointsMultiplier: number;
	};
}

export class LetterModel implements ILetter {
	id: string;
	char: IChar;

	points = {
		pointValue: 1,
		pointsMultiplier: 1,
	};

	constructor(char: Char) {
		this.id = uuid();
		this.char = new CharModel(char);
		this.assignPointValues();
	}

	private assignPointValues() {
		if (this.char.value.match(/[wkxjyqvpz]/i)) {
			this.points.pointValue = 10;
		}
		if (this.char.value.match(/[hñfgulrm]/i)) {
			this.points.pointValue = 5;
		}
		if (this.char.value.match(/[cdtsnb]/i)) {
			this.points.pointValue = 2;
		}
		this.points.pointValue = 1;
	}
}
