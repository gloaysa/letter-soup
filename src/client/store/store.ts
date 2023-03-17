import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tableReducer from './table.reducer';
import wordsReducer from './words.reducer';
import configReducer from './config.reducer';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig: PersistConfig<any> = {
	key: 'root',
	storage: storageSession,
	stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
	table: tableReducer,
	words: wordsReducer,
	config: configReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistedStore = persistStore(store);

export default store;
