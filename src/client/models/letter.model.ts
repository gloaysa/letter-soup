import { IChar } from './char.model';
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
		pointValue: 5,
		pointsMultiplier: 0,
	};

	constructor(char: IChar) {
		this.id = uuid();
		this.char = char;
		this.assignPointValues();
	}

	private assignPointValues() {
		if (this.char.value.match(/[wkxjyqvpz]/i)) {
			this.points.pointsMultiplier = 3;
		}
		if (this.char.value.match(/[hñfgulrm]/i)) {
			this.points.pointsMultiplier = 2;
		}
		if (this.char.value.match(/[cdtsnb]/i)) {
			this.points.pointValue = 7;
		}
	}
}
