import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

// Define a type for the slice state
interface ConfigState {
    tableConfig: {
        rows: number;
        columns: number;
    };
}

// Define the initial state using that type
const initialState: ConfigState = {
    tableConfig: {
        rows: 12,
        columns: 6,
    },
};

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setTableConfig: (state, action: PayloadAction<{rows: number; columns: number}>) => {
            state.tableConfig = action.payload;
        },
    },
});

export const { setTableConfig } = configSlice.actions;

export const selectTableConfig = (state: RootState): {rows: number; columns: number} => state.config.tableConfig;

export default configSlice.reducer;
