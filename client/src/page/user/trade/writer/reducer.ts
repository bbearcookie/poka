import produce from 'immer';

export interface FormType {
  haveVoucherId: number;
  wantPhotocardIds: number[];
  amount: number;
}

export interface State {
  data: FormType;
  message: {
    [k in keyof FormType]: string;
  };
}

export const initialState: State = {
  data: {
    haveVoucherId: 0,
    wantPhotocardIds: [],
    amount: 0
  },
  message: {
    haveVoucherId: '',
    wantPhotocardIds: '',
    amount: ''
  }
}

export type Action = 
  | { type: 'SET_VOUCHER_ID'; payload: number; }
  | { type: 'SET_AMOUNT'; payload: number; }
  | { type: 'ADD_WANT_PHOTOCARD_ID', payload: number; }
  | { type: 'REMOVE_WANT_PHOTOCARD_ID', payload: number; }
  | { 
    type: 'SET_MESSAGE';
    target: keyof FormType;
    value: string;
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {

    // 사용할 소유권 선택
    case 'SET_VOUCHER_ID':
      return produce(state, draft => {
        draft.data.haveVoucherId = action.payload;
      });

    // 받으려는 포토카드 수량 설정
    case 'SET_AMOUNT':
      return produce(state, draft => {
        draft.data.amount = action.payload;
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

    // 에러 메세지 설정
    case 'SET_MESSAGE':
      return produce(state, draft => {
        draft.message[action.target] = action.value;
      });
    default:
      return { ...state };
  }
}