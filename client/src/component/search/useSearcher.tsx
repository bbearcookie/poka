import React, { useReducer } from 'react';
import produce from 'immer';
import {
  State as filterState,
  reducer as filterReducer,
  initialState as filterInitialState
} from '@component/search/content/filter/reducer';
import {
  KeywordType,
  reducer as keywordReducer,
  initialState as keywordInitialState
} from '@component/search/content/keyword/reducer';

function useSearcher(
  defaultFilter?: Partial<filterState>,
  defaultKeyword?: KeywordType[],
) {

  const [filter, filterDispatch] = useReducer(filterReducer, produce(filterInitialState, draft => {
    if (defaultFilter?.groups) draft.groups = defaultFilter?.groups;
    if (defaultFilter?.members) draft.members = defaultFilter?.members;
    if (defaultFilter?.voucherState) draft.voucherState = defaultFilter?.voucherState;
  }));

  const [keyword, keywordDispatch] = useReducer(keywordReducer, produce(keywordInitialState, draft => {
    let insertId = 0;

    if (defaultKeyword) {
      draft.keywords = defaultKeyword.map(k => ({
        id: insertId++,
        ...k
      }));
      draft.insertId = insertId;
    }
  }));
  
  return { filter, keyword, filterDispatch, keywordDispatch };
}

export default useSearcher;