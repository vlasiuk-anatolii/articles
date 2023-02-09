import { RootState } from '../react-app-env.d';

export const getArticlesSelector = (state: RootState) => state.articles;
export const getStateLoadSelector = (state: RootState) => state.isLoading;
export const getKeyWordsSelector = (state: RootState) => state.keyWords;
export const getCurrentQuerySelector = (state: RootState) => state.currentQuery;
