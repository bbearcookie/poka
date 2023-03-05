import React, { useReducer, useEffect } from 'react';
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
  }))
  const [keyword, keywordDispatch] = useReducer(keywordReducer, keywordInitialState);

  // 기본 키워드 추가
  useEffect(() => {
    defaultKeyword?.forEach(k => keywordDispatch({ type: 'ADD_KEYWORD', value: k }));
  }, []);
  
  return { filter, keyword, filterDispatch, keywordDispatch };
}

export default useSearcher;