import { WordService } from '../services/word/word.service';
import { setWordList } from '../store/words.reducer';
import { IWord } from '../../common/interfaces/word.interface';
import { ICell } from '../services/letter/table.interface';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

export const useGetAllWordsHook = (wordService: WordService, dispatch: Dispatch, words: IWord[], table: ICell[]) => {
	const [loading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		if (!words.length) {
			setIsLoading(true);
			wordService
				.getAllWords()
				.then((words) => {
					dispatch(setWordList(words));
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [wordService, dispatch, words]);

	return { loading };
};
