import produce from 'immer';

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
  insertId: number; // 내부적으로 키워드를 추가할때 id를 부여하기 위해 사용
  keywords: (KeywordType & { id: number })[];
}

export const initialState: State = {
  insertId: 0,
  keywords: [],
};

export type Action =
  | {
      type: 'ADD_KEYWORD';
      value: KeywordType;
    }
  | {
      type: 'REMOVE_KEYWORD';
      id: number;
    };

export const reducer = (state: State, action: Action): State => {
  // 추가하려는 키워드의 유효성을 검사하는 함수
  const isValidKeyword = function (newKeyword: KeywordType) {
    // 비어 있는 문자열이면 추가하지 않음.
    if (newKeyword.value.length === 0) return false;
    // 이미 추가 되어있는 키워드이면 추가하지 않음.
    if (state.keywords.find(k => k.category === newKeyword.category && k.value === newKeyword.value)) return false;

    return true;
  };

  switch (action.type) {
    // 키워드 추가
    case 'ADD_KEYWORD':
      const trimmed = { ...action.value, value: action.value.value.trim() };
      if (!isValidKeyword(trimmed)) return state;

      return produce(state, draft => {
        draft.keywords = state.keywords.concat({
          id: state.insertId,
          category: action.value.category,
          title: action.value.title,
          value: trimmed.value,
          show: action.value.show,
        });
        draft.insertId++;
      });

    // 키워드 제거
    case 'REMOVE_KEYWORD':
      return produce(state, draft => {
        draft.keywords = state.keywords.filter(k => k.id !== action.id);
      });
    default:
      return state;
  }
};
