import produce from 'immer';

export interface FormType {
  name: string;
  recipient: string;
  contact: string;
  postcode: string;
  address: string;
  addressDetail: string;
  requirement: string;
}

export interface State {
  form: FormType;
  message: { [k in keyof FormType]: string; };
}

export const initialState: State = {
  form: {
    name: '',
    recipient: '',
    contact: '',
    postcode: '',
    address: '',
    addressDetail: '',
    requirement: ''
  },
  message: {
    name: '',
    recipient: '',
    contact: '',
    postcode: '',
    address: '',
    addressDetail: '',
    requirement: ''
  }
}

export type Action =
| { type: 'SET_FORM'; form: FormType; }
| { type: 'SET_FORM_DATA'; target: keyof FormType; value: string; }
| { 
  type: 'SET_MESSAGE';
  target: keyof FormType;
  value: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FORM':
      return produce(state, draft => {
        draft.form = action.form;
      });
    case 'SET_FORM_DATA':
      return produce(state, draft => {
        draft.form[action.target] = action.value
      });
    case 'SET_MESSAGE':
      return produce(state, draft => {
        draft.message[action.target] = action.value
      });
    default:
      return state;
  }
}
export default reducer;