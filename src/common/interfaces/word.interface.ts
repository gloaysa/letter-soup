export interface IWord {
	value: string;
	spellings: {
		_id: string;
		value: string;
	}[];
	_id: string;
	definitions: string[];
	genres: string[];
	plural: string[];
	allForms: string[];
	language: string;
}
