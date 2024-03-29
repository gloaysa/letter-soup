import { Document } from 'mongoose';
import WordModel, { WordDocument } from '../../db/models/word.model';
import { IWord } from '../../../common/interfaces/word.interface';
import { getWordFromDictionary } from '../rae/rae.service';

export class WordsService {
	wordExistById(id: string): Promise<boolean> {
		return WordDocument.exists({ _id: id });
	}
	getWordById(id: string): Promise<Document<IWord>> {
		return WordDocument.findOne({ _id: id });
	}

	async getWordByValue(word: string): Promise<Document<IWord> | undefined> {
		try {
			return WordDocument.findOne({
				$text: {
					$search: word,
					$caseSensitive: false,
					$diacriticSensitive: false,
				},
			});
		} catch (e) {
			console.error(`There was an error when looking for the word ${word}: ${e}`);
			return undefined;
		}
	}

	async getAllWords(): Promise<IWord[] | undefined> {
		try {
			return WordDocument.find({});
		} catch (e) {
			console.error(`It was not possible to get all words: ${e}`);
			return undefined;
		}
	}

	async createNewWord(word: IWord): Promise<Document<IWord> | undefined> {
		const newWord = WordModel(word);
		try {
			await newWord.save();
			return newWord;
		} catch (e) {
			console.error(`Error when creating word ${word.value}: ${e}`);
			return undefined;
		}
	}

	async getWordByValueOrCreate(word: string): Promise<Document<IWord> | undefined> {
		const wordFound = await this.getWordByValue(word);
		if (wordFound) {
			console.log('wordFound', wordFound);
			return wordFound;
		}

		console.log('wordFound', wordFound);

		const wordFromRAE = await this.searchWordInRAE(word);

		if (wordFromRAE) {
			try {
				const wordFound = WordModel(wordFromRAE);
				await wordFound.save();
				console.info(`Created new word ${word}`);
				return wordFound;
			} catch (e) {
				console.error(`Word ${word} could not be created: ${e}`);
			}
		}
	}

	async searchWordInRAE(word: string): Promise<IWord | undefined> {
		try {
			const wordFromRAE = await getWordFromDictionary(word);
			if (!wordFromRAE) {
				console.info(`Word ${word} does not exist in the dictionary`);
				return undefined;
			}
			return wordFromRAE;
		} catch (e) {
			console.error(`Tt was not possible to create new word ${word}: ${e}`);
			return undefined;
		}
	}
}
