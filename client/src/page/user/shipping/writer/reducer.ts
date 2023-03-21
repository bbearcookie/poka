import produce from 'immer';

export interface FormType {
  voucherIds: number[];
}

export interface State {
  data: FormType;
  message: {
    [k in keyof FormType]: string;
  };
}

export const initialState: State = {
  data: {
    voucherIds: []
  },
  message: {
    voucherIds: ''
  }
}

export type Action = 
  | { type: 'SET_VOUCHER_ID'; voucherIds: number[]; }
  | { 
    type: 'SET_MESSAGE';
    target: keyof FormType;
    value: string;
  }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_VOUCHER_ID':
      return produce(state, draft => {
        draft.data.voucherIds = action.voucherIds;
      });
    case 'SET_MESSAGE':
      return produce(state, draft => {
        draft.message[action.target] = action.value;
      });
    default:
      return { ...state }
  }
}
export default reducer;