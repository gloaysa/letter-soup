import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store';
import {wordList} from '../../common/word-list';

// Define a type for the slice state
interface WordsState {
    wordList: string[];
    currentWord: string;
    currentWordExist: boolean;
}

// Define the initial state using that type
const initialState: WordsState = {
    wordList: wordList.map((word) => word.toLowerCase()),
    currentWord: '',
    currentWordExist: false,
}

export const wordsSlice = createSlice({
    name: 'letters',
    initialState,
    reducers: {
        setWordList: (state, action: PayloadAction<string[]>) => {
            state.wordList = action.payload;
        },
        setCurrentWord: (state, action: PayloadAction<string>) => {
            state.currentWord = action.payload;
            state.currentWordExist = !!state.wordList.some((word) => word === action.payload);
        }
    },
})

export const { setWordList, setCurrentWord } = wordsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectWordState = (state: RootState): WordsState => state.words;

export default wordsSlice.reducer
