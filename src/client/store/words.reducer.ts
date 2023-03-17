import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IWord } from '../../common/interfaces/word.interface';
import { ICell } from '../services/letter/table.interface';
import { multiplyPointsFromCells, sumPointsFromCells } from '../utils/sum-points.util';
import { normalizeString } from '../utils/normalize-string.util';

// Define a type for the slice state
interface WordsState {
	wordList: IWord[];
	currentWord: string;
	totalPoints: number;
	currentWordExists: boolean;
}

// Define the initial state using that type
const initialState: WordsState = {
	wordList: [],
	currentWord: '',
	totalPoints: 0,
	currentWordExists: false,
};

export const wordsSlice = createSlice({
	name: 'words',
	initialState,
	reducers: {
		setWordList: (state, action: PayloadAction<IWord[]>) => {
			state.wordList = action.payload;
		},
		setNewWord: (state, action: PayloadAction<IWord>) => {
			const newWordList = [...state.wordList, action.payload];
			state.wordList = newWordList;
			state.currentWordExists = action.payload.allForms.some((form) => wordExist(state.wordList, form));
		},
		setCurrentWord: (state, action: PayloadAction<string>) => {
			state.currentWord = action.payload;
			state.currentWordExists = wordExist(state.wordList, action.payload);
		},
		setTotalPoints: (state, action: PayloadAction<{ selectedCells: ICell[]; bonusCells: ICell[]; currentWordExist: boolean }>) => {
			if (action.payload.currentWordExist) {
				const multipliedPoints = multiplyPointsFromCells(action.payload.selectedCells);
				const bonusPoints = sumPointsFromCells(action.payload.bonusCells);
				const totalPoints = multipliedPoints + bonusPoints;
				state.totalPoints = state.totalPoints + totalPoints;
			}
		},
		restartGame: (state) => {
			state.currentWord = '';
			state.totalPoints = 0;
			state.currentWordExists = false;
		},
	},
});

const wordExist = (wordList: IWord[], word: string): boolean => {
	return wordList.some((existingWord) => existingWord.allForms.some((form) => normalizeString(form) === normalizeString(word)));
};

export const { setWordList, setCurrentWord, setNewWord, setTotalPoints, restartGame } = wordsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectWordState = (state: RootState): WordsState => state.words;
export const selectTotalPoints = (state: RootState): number => state.words.totalPoints;
export const selectCurrentWordExist = (state: RootState): boolean => state.words.currentWordExists;

export default wordsSlice.reducer;
