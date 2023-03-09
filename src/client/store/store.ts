import {configureStore} from '@reduxjs/toolkit';
import letterReducer from './letter.reducer';
import wordsReducer from './words.reducer';

const store = configureStore({
    reducer: {
        letter: letterReducer,
        words: wordsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
