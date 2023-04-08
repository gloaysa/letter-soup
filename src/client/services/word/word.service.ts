import { IWord } from '../../../common/interfaces/word.interface';

export class WordService {
	private static instance: WordService;

	private api = 'http://localhost:5050/api/words/';
	static getInstance(): WordService {
		if (!this.instance) {
			this.instance = new WordService();
			return this.instance;
		}
		return this.instance;
	}

	public getAllWords(): Promise<IWord[]> {
		const url = `${this.api}all/`;
		return fetch(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());
	}
	public search(word: string): Promise<IWord | undefined> {
		const url = `${this.api}search/`;
		return fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ search: word.toLowerCase() }),
		}).then((res) => res.json());
	}

	createNewWord(word: string): Promise<IWord | undefined> {
		const url = `${this.api}search/`;
		return fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ search: word.toLowerCase(), create: true }),
		}).then((res) => {
			if (res.status === 404) {
				console.error('Word not found');
				return undefined;
			}
			return res.json();
		});
	}
}
