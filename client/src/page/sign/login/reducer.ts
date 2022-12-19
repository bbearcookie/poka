import produce from 'immer';

export interface FormType {
  username: string;
  password: string;
}

export interface State {
  form: FormType;
  message: {[k in keyof FormType]: string};
}

export const initialState: State = {
  form: {
    username: '',
    password: '',
  },
  message: {
    username: '',
    password: '',
  }
}

export type Action =
| { type: 'SET_FORM_DATA'; target: keyof FormType; value: string; }
| { 
  type: 'SET_MESSAGE';
  target: keyof FormType;
  value: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return produce(state, draft => {
        draft.form[action.target] = action.value;
      })
    case 'SET_MESSAGE':
      return produce(state, draft => {
        draft.message[action.target] = action.value;
      });
    default:
      return state;
  }
}
export default reducer;