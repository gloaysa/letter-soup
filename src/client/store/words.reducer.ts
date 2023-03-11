import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {IWord} from "../../common/interfaces/word.interface";
import {ICell} from '../services/letter/table.interface';
import {sumPointsFromCells} from '../utils/sum-points.util';

// Define a type for the slice state
interface WordsState {
  wordList: IWord[];
  currentWord: string;
  currentWordExist: boolean;
  totalPoints: number;
}

// Define the initial state using that type
const initialState: WordsState = {
  wordList: [],
  currentWord: "",
  currentWordExist: false,
  totalPoints: 0,
};

export const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setWordList: (state, action: PayloadAction<IWord[]>) => {
      state.wordList = action.payload;
    },
    setNewWord: (state, action: PayloadAction<IWord>) => {
      const newWordList = [...state.wordList, action.payload];
      state.wordList = newWordList;
      state.currentWordExist = wordExist(newWordList, action.payload.value);
    },
    setCurrentWord: (state, action: PayloadAction<string>) => {
      state.currentWord = action.payload;
      state.currentWordExist = wordExist(state.wordList, action.payload);
    },
    setTotalPoints: (state, action: PayloadAction<ICell[]>) => {
      const pointsFromCurrentWord = sumPointsFromCells(action.payload);
      state.totalPoints = state.totalPoints + pointsFromCurrentWord;
    }
  },
});

const wordExist = (wordList: IWord[], word: string): boolean => {
  return wordList.some((existingWord) =>
    existingWord.allForms.some((form) => form === word)
  );
};

export const { setWordList, setCurrentWord, setNewWord, setTotalPoints } = wordsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectWordState = (state: RootState): WordsState => state.words;
export const selectTotalPoints = (state: RootState): number => state.words.totalPoints;

export default wordsSlice.reducer;
