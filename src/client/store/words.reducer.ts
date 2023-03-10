import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {IWord} from "../../common/interfaces/word.interface";

// Define a type for the slice state
interface WordsState {
  wordList: IWord[];
  currentWord: string;
  currentWordExist: boolean;
}

// Define the initial state using that type
const initialState: WordsState = {
  wordList: [],
  currentWord: "",
  currentWordExist: false,
};

export const wordsSlice = createSlice({
  name: "letters",
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
  },
});

const wordExist = (wordList: IWord[], word: string): boolean => {
  return wordList.some((existingWord) =>
    existingWord.allForms.some((form) => form === word)
  );
};

export const { setWordList, setCurrentWord, setNewWord } = wordsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectWordState = (state: RootState): WordsState => state.words;

export default wordsSlice.reducer;
