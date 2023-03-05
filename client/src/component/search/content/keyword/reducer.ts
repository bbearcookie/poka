import produce from 'immer';

let insertId = 0;

// 키워드로 지정할 수 있는 타입과 보여줄 텍스트를 지정한다.
export interface CategoryType {
  undefined?: string;
  photoName?: string;
  userName?: string;
  voucherState?: string;
}

export interface KeywordType {
  category: keyof CategoryType;
  title: string;
  value: string;
  show: boolean; // 해당 키워드를 사용자에게 보여줄지를 나타냄. 
                 // 예를 들어, 사용자 자신의 소유권만 보여줘야 하는 경우 기본 키워드로 자신의 아이디가 들어가는데
                 // 그 내용은 사용자에게 보여주지 않아야 함.
}

export interface State {
  keywords: (KeywordType & { id: number; })[];
}

export const initialState: State = {
  keywords: []
}

export type Action = |
{
  type: "ADD_KEYWORD";
  value: KeywordType;
} | {
  type: "REMOVE_KEYWORD";
  id: number;
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_KEYWORD":
      const trimmed = action.value.value.trim();

      // 비어 있는 문자열이면 추가하지 않음.
      if (trimmed.length === 0) return state;

      // 이미 추가 되어있는 키워드이면 추가하지 않음.
      if (state.keywords.find(k => k.category === action.value.category && k.value === action.value.value)) return state;

      return produce(state, draft => {
        draft.keywords = state.keywords.concat({
          id: insertId++,
          category: action.value.category,
          title: action.value.title,
          value: trimmed,
          show: action.value.show
        });
      });
    case "REMOVE_KEYWORD":
      return produce(state, draft => {
        draft.keywords = state.keywords.filter(k => k.id !== action.id);
      });
    default:
      return state;
  }
}