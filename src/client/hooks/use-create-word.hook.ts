import { useCallback, useState } from 'react';
import { WordService } from '../services/word/word.service';
import { IWord } from '../../common/interfaces/word.interface';

interface IUseCreateWordHook {
	createWord: (word: string) => Promise<IWord | undefined>;
	loading: boolean;
}
export const useCreateWordHook = (wordService: WordService): IUseCreateWordHook => {
	const [loading, setIsLoading] = useState<boolean>(false);

	const createWord = useCallback(
		(word: string) => {
			setIsLoading(true);
			return wordService.createNewWord(word).then((newWord) => {
				if (newWord) {
					setIsLoading(false);
					return newWord;
				}
				setIsLoading(false);
			});
		},
		[wordService]
	);

	return { createWord, loading };
};
