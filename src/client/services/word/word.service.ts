import {IWord} from '../../../common/interfaces/word.interface';

export class WordService {
  private static instance: WordService;

  private api = 'http://localhost:8050/api/'
  static getInstance(): WordService {
    if (!this.instance) {
      this.instance = new WordService();
      return this.instance;
    }
    return this.instance;
  }
  public search(word: string): Promise<IWord> {
    const url = `${this.api}search/`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({search: word})
    }).then((res) => res.json());
  }
}
