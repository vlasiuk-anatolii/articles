import {
  configureStore,
  createReducer,
  createAsyncThunk,
  createAction
} from '@reduxjs/toolkit';

import { getArticles } from '../api/api';
import { RootState } from '../react-app-env.d';

export enum ActionType {
  SET_ARTICLES = 'SET_ARTICLES',
  SET_KEYWORDS = 'SET_KEYWORDS',
  SET_CURRENT_QUERY = 'SET_CURRENT_QUERY'
}

const initialState: RootState = {
  articles: [],
  isLoading: false,
  keyWords: [],
  currentQuery: '',
};

export const loadArticles = createAsyncThunk(ActionType.SET_ARTICLES, async (query:string) => {
  if (query.length === 0) {
    return [];
  } else {
    const articlesFromServer = await getArticles(query);
    return articlesFromServer;
  }
});

export const setKeyWords = createAction<string[]>(ActionType.SET_KEYWORDS);
export const setCurrentQuery = createAction<string>(ActionType.SET_CURRENT_QUERY);

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadArticles.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(loadArticles.fulfilled, (state, action) => {
    state.articles = action.payload;
    state.isLoading = false;
  });

  builder.addCase(setKeyWords, (state, action) => {
    state.keyWords = action.payload;
  });

  builder.addCase(setCurrentQuery, (state, action) => {
    state.currentQuery = action.payload;
  });
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
