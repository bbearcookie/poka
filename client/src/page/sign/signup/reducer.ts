import produce from 'immer';

export interface FormType {
  username: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

export interface State {
  form: FormType;
  message: {[k in keyof FormType]: string};
}

export const initialState: State = {
  form: {
    username: '',
    nickname: '',
    password: '',
    passwordCheck: ''
  },
  message: {
    username: '',
    nickname: '',
    password: '',
    passwordCheck: ''
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