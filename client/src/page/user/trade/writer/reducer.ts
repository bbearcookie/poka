import produce from 'immer';

export interface State {
  data: {
    haveVoucherId: number;
    wantPhotocardIds: number[];
  };
  message: {

  };
}

export const initialState: State = {
  data: {
    haveVoucherId: 0,
    wantPhotocardIds: []
  },
  message: {

  }
}

export type Action = 
  | { type: 'SET_VOUCHER_ID'; payload: number; }
  | { type: 'ADD_WANT_PHOTOCARD_ID', payload: number; }
  | { type: 'REMOVE_WANT_PHOTOCARD_ID', payload: number; }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {

    // 사용할 소유권 선택
    case 'SET_VOUCHER_ID':
      return produce(state, draft => {
        draft.data.haveVoucherId = action.payload
      });

    // 받으려는 포토카드 추가
    case 'ADD_WANT_PHOTOCARD_ID':
      return produce(state, draft => {
        if (state.data.wantPhotocardIds.includes(action.payload))
          draft.data.wantPhotocardIds = state.data.wantPhotocardIds;
        else 
          draft.data.wantPhotocardIds = state.data.wantPhotocardIds.concat(action.payload);
      });
    
    // 받으려는 포토카드에서 특정 포토카드 제거
    case 'REMOVE_WANT_PHOTOCARD_ID':
      return produce(state, draft => {
        draft.data.wantPhotocardIds = state.data.wantPhotocardIds.filter(item => item !== action.payload);
      });
    default:
      return { ...state };
  }
}