import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILetter} from '../models/letter.model';
import {RootState} from './store';
import {ICell} from '../services/letter/table.interface';
import {adjacentCells, cellCanBeSelected, cellIsSelected} from '../utils/adjacent-cells.util';

// Define a type for the slice state
interface LetterState {
    lastSelected: ILetter | undefined;
    selectedLetters: ILetter[];
    currentAdjacentCells: ICell[];
    currentWord: string;
}

// Define the initial state using that type
const initialState: LetterState = {
    lastSelected: undefined,
    selectedLetters: [],
    currentAdjacentCells: [],
    currentWord: '',
}

export const letterSlice = createSlice({
    name: 'letters',
    initialState,
    reducers: {
        setLetter: (state, action: PayloadAction<ILetter>) => {
            const letter = {...action.payload};
            const adjacent = [...state.currentAdjacentCells];
            const selectedCells = state.selectedLetters.map(({cell}) => cell);
            if (!state.lastSelected) {
                letter.orderOfSelection = 1;
                state.selectedLetters = [letter];
                state.lastSelected = letter;
                state.currentAdjacentCells = adjacentCells(letter.cell);
                state.currentWord = letter.char.value;
                return;
            }

            if (cellCanBeSelected(adjacent, selectedCells, letter.cell)) {
                letter.orderOfSelection = state.lastSelected.orderOfSelection + 1;
                state.selectedLetters = [...state.selectedLetters, letter];
            } else if (cellIsSelected(selectedCells, letter.cell)) {
                const selectedLetter = state.selectedLetters.find(({id}) => letter.id === id);
                if (selectedLetter) {
                    letter.orderOfSelection = selectedLetter.orderOfSelection;
                    const filteredSelectedLetters = state.selectedLetters.filter(({orderOfSelection}) => orderOfSelection <= selectedLetter.orderOfSelection);
                    state.selectedLetters = [...filteredSelectedLetters];
                }
            } else {
                state.selectedLetters = [letter];
            }
            state.lastSelected = letter;
            state.currentAdjacentCells = adjacentCells(letter.cell);
            state.currentWord = state.selectedLetters.map(({char}) => char.value).join('')
        },
    },
})

export const { setLetter } = letterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLetterState = (state: RootState): LetterState => state.letter;

export default letterSlice.reducer
