import produce from 'immer';

interface VoucherInputType {
  id: number;
  photocardId: number;
  amount: number;
  message: string;
}

interface MessageType {
  vouchers: string;
  username: string;
}

export interface State {
  form: {
    vouchers: VoucherInputType[];
    username: string;
  }
  message: MessageType;
}

export const initialState: State = {
  form: {
    vouchers: [],
    username: ''
  },
  message: {
    vouchers: '',
    username: ''
  }
}

export type Action =
| { type: 'SET_USERNAME'; username: string; }
| { type: 'ADD_VOUCHER'; voucher: VoucherInputType; }
| { type: 'SET_VOUCHER_AMOUNT'; id: number; amount: number; }
| { type: 'SET_VOUCHER_MESSAGE'; id: number; value: string; }
| { type: 'REMOVE_VOUCHER'; id: number; }
| { type: 'CLEAR_MESSAGE'; }
| { 
  type: 'SET_MESSAGE';
  target: keyof MessageType;
  value: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USERNAME': {
      return produce(state, draft => {
        draft.form.username = action.username;
      });
    }
    case 'ADD_VOUCHER': {
      if (state.form.vouchers.find(item => item.photocardId === action.voucher.photocardId)) return state;

      return produce(state, draft => {
        draft.form.vouchers = state.form.vouchers.concat(action.voucher);
      });
    }
    case 'SET_VOUCHER_AMOUNT': {
      return produce(state, draft => {
        draft.form.vouchers = state.form.vouchers.map((item) =>
          item.id === action.id ?
          { ...item, amount: action.amount } :
          item
        );
      })
    }
    case 'SET_VOUCHER_MESSAGE': {
      return produce(state, draft => {
        draft.form.vouchers = state.form.vouchers.map((item) =>
          item.id === action.id ?
          { ...item, message: action.value } :
          item
        );
      })
    }
    case 'REMOVE_VOUCHER': {
      return produce(state, draft => {
        draft.form.vouchers = state.form.vouchers.filter(item => item.id !== action.id);
      });
    }
    case 'CLEAR_MESSAGE': {
      return produce(state, draft => {
        draft.message.username = '';
        draft.message.vouchers = '';
        draft.form.vouchers = state.form.vouchers.map(item => ({ ...item, message: '' }));
      });
    }
    case 'SET_MESSAGE':
      return produce(state, draft => {
        draft.message[action.target] = action.value;
      });
    default:
      return state;
  }
}
export default reducer;