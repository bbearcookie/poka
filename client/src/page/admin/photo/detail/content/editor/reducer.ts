import produce from 'immer';
import { Image } from '@component/form/uploader/ImageUploader';

export interface FormType {
  name: string;
  groupId: number;
  memberId: number;
  image: Image;
}

export interface State {
  form: FormType;
  message: {[k in keyof FormType]: string};
}

export const initialState: State = {
  form: {
    name: '',
    groupId: 0,
    memberId: 0,
    image: {
      file: null,
      previewURL: '',
      initialURL: ''
    }
  },
  message: {
    name: '',
    groupId: '',
    memberId: '',
    image: ''
  }
}

export type Action =
| { type: 'SET_GROUP_ID'; groupId: number; }
| { type: 'SET_MEMBER_ID'; memberId: number; }
| { type: 'SET_IMAGE'; image: Image; }
| { type: 'SET_NAME'; name: string; }
| { 
  type: 'SET_MESSAGE';
  payload: { target: keyof FormType; value: string; }
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_GROUP_ID':
      return produce(state, draft => {
        draft.form.groupId = action.groupId;
      });
    case 'SET_MEMBER_ID':
      return produce(state, draft => {
        draft.form.memberId = action.memberId;
      });
    case 'SET_IMAGE':
      return produce(state, draft => {
        draft.form.image = action.image;
      });
    case 'SET_NAME':
      return produce(state, draft => {
        draft.form.name = action.name;
      });
    case 'SET_MESSAGE':
      return produce(state, draft => {
        draft.message[action.payload.target] = action.payload.value;
      });
    default:
      return state;
  }
}
export default reducer;