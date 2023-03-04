import React, { useReducer } from 'react';
import {
  reducer as filterReducer,
  initialState as filterInitialState
} from '@component/search/content/filter/reducer';
import {
  reducer as keywordReducer,
  initialState as keywordInitialState
} from '@component/search/content/keyword/reducer';

function useSearcher() {
  const [filter, filterDispatch] = useReducer(filterReducer, filterInitialState);
  const [keyword, keywordDispatch] = useReducer(keywordReducer, keywordInitialState);
  
  return { filter, keyword, filterDispatch, keywordDispatch };
}

export default useSearcher;