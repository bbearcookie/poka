import produce from "immer";

let insertId = 0;
export interface State {
  keywords: {
    id: number;
    type: string;
    title: string;
    value: string;
  }[]
}

export const initialState: State = {
  keywords: []
}

export type Action = |
{
  type: "ADD_KEYWORD";
  value: {
    type: string;
    title: string;
    value: string;
  };
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
      if (state.keywords.find(k => k.type === action.value.type && k.value === action.value.value)) return state;

      return produce(state, draft => {
        draft.keywords = state.keywords.concat({
          id: insertId++,
          type: action.value.type,
          title: action.value.title,
          value: trimmed
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