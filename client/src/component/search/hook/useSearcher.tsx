import React, { useReducer, useState } from 'react';
import useInitGroup from './content/useInitGroup';
import useInitMember from './content/useInitMember';
import { VoucherStateKey, ShippingStateKey, PaymentStateKey } from '@component/label/stateLabel/_types';
import produce from 'immer';

import {
  State as FilterState,
  Action as FilterAction,
  reducer as FilterReducer,
  initialState as FilterInitialState,
} from '@component/search/content/filter/reducer';

import {
  KeywordType,
  State as KeywordState,
  Action as KeywordAction,
  reducer as KeywordReducer,
  initialState as KeywordInitialState,
} from '@component/search/content/keyword/reducer';

export interface SearcherHook {
  initialized: boolean;
  filter: FilterState;
  keyword: KeywordState;
  filterDispatch: React.Dispatch<FilterAction>;
  keywordDispatch: React.Dispatch<KeywordAction>;
}

interface Props {
  defaultFilter?: Partial<{
    groupIds: number[];
    memberIds: number[];
    voucherState: VoucherStateKey;
    shippingState: ShippingStateKey;
    paymentState: PaymentStateKey;
  }>;
  defaultKeyword?: KeywordType[];
}

function useSearcher({ defaultFilter, defaultKeyword }: Props = {}): SearcherHook {
  const [filter, filterDispatch] = useReducer(
    FilterReducer,
    produce(FilterInitialState, draft => {
      if (defaultFilter?.voucherState) draft.voucherState = defaultFilter.voucherState;
      if (defaultFilter?.shippingState) draft.shippingState = defaultFilter.shippingState;
      if (defaultFilter?.paymentState) draft.paymentState = defaultFilter.paymentState;
    })
  );

  const [keyword, keywordDispatch] = useReducer(
    KeywordReducer,
    produce(KeywordInitialState, draft => {
      let insertId = 0;

      if (defaultKeyword) {
        draft.keywords = defaultKeyword.map(k => ({
          id: insertId++,
          ...k,
        }));

        draft.insertId = insertId;
      }
    })
  );

  // 그룹, 멤버 초기 정보 설정 완료 여부
  const [initialized, setInitialized] = useState(false);

  // 그룹 초기 필터 설정
  const { status: groupStatus } = useInitGroup({ dispatch: filterDispatch, defaultGroupIds: defaultFilter?.groupIds });

  // 멤버 초기 필터 설정
  useInitMember({
    enabled: groupStatus === 'success',
    state: filter,
    defaultMemberIds: defaultFilter?.memberIds,
    dispatch: filterDispatch,
    handleInitialize: () => setInitialized(true),
  });

  return { filter, keyword, filterDispatch, keywordDispatch, initialized };
}

export default useSearcher;
