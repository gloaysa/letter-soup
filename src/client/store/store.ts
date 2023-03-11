import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./table.reducer";
import wordsReducer from "./words.reducer";
import configReducer from "./config.reducer";

const store = configureStore({
  reducer: {
    table: tableReducer,
    words: wordsReducer,
    config: configReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
