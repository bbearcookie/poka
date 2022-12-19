import produce from 'immer';
import { Image } from '@component/form/uploader/ImageUploader';

export interface FormType {
  nickname: string;
  image: Image;
}

export interface State {
  form: FormType;
  message: {[k in keyof FormType]: string};
}

export const initialState: State = {
  form: {
    nickname: '',
    image: {
      file: null,
      initialURL: '',
      previewURL: ''
    }
  },
  message: {
    nickname: '',
    image: ''
  }
}

export type Action =
| { type: 'SET_NICKNAME'; nickname: string; }
| { type: 'SET_IMAGE'; image: Image; }
| { 
  type: 'SET_MESSAGE';
  target: keyof FormType;
  value: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_NICKNAME':
      return produce(state, draft => {
        draft.form.nickname = action.nickname;
      });
    case 'SET_IMAGE':
      return produce(state, draft => {
        draft.form.image = action.image;
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