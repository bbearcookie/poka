import produce from 'immer';

interface PhotoType {
  idx: number;
  name: string;
  message: string; // 유효성 검사 에러 메시지
  imageFile: File;
  previewURL: string | ArrayBuffer | null;
}

interface MessageType {
  groupId: string;
  memberId: string;
}

export interface State {
  form: {
    photos: PhotoType[],
    groupId: number;
    memberId: number;
  }
  message: MessageType;
}

export const initialState: State = {
  form: {
    photos: [],
    groupId: 0,
    memberId: 0
  },
  message: {
    groupId: '',
    memberId: ''
  }
}

export type Action =
  | { type: 'ADD_PHOTO'; payload: PhotoType; }
  | { type: 'REMOVE_PHOTO'; idx: number; }
  | { type: 'SET_GROUP_ID'; groupId: number; }
  | { type: 'SET_MEMBER_ID'; memberId: number; }
  | { type: 'SET_PHOTO_MESSAGE', idx: number, message: string; }
  | { type: 'SET_PHOTO_NAME', idx: number, name: string; }
  | { 
    type: 'SET_MESSAGE';
    payload: { target: keyof MessageType; value: string; }
  }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PHOTO':
      return produce(state, draft => {
        draft.form.photos = state.form.photos.concat(action.payload);
      })
    case 'REMOVE_PHOTO':
      return produce(state, draft => {
        draft.form.photos = state.form.photos.filter(item => item.idx !== action.idx);
      })
    case 'SET_GROUP_ID':
      return produce(state, draft => {
        draft.form.groupId = action.groupId;
      });
    case 'SET_MEMBER_ID':
      return produce(state, draft => {
        draft.form.memberId = action.memberId;
      });
    case 'SET_PHOTO_NAME':
      return produce(state, draft => {
        draft.form.photos = state.form.photos.map(
          (item) => item.idx === action.idx ?
          { ...item, name: action.name } :
          item
        );
      })
    case 'SET_PHOTO_MESSAGE':
      return produce(state, draft => {
        draft.form.photos = state.form.photos.map(
          (item) => item.idx === action.idx ?
          { ...item, message: action.message } :
          item
        );
      })
    case 'SET_MESSAGE':
      return produce(state, draft => {
        draft.message[action.payload.target] = action.payload.value;
      });
    default:
      return state;
  }
}
export default reducer;