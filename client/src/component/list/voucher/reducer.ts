import produce from "immer";
import { VoucherStateKey } from "@type/voucher";
import { FilterItemType } from "@type/listFilter";

let nextId = 0; // names, usernames 추가/삭제에 사용되는 변수
export type SearchKeywordsType = "names" | "usernames";
export const SearchKeywords: {
  [k in SearchKeywordsType]: string;
} = {
  "names": "포토카드 이름",
  "usernames": "사용자 아이디"
}
export interface State {
  names: {
    id: number;
    value: string;
  }[];
  usernames: {
    id: number;
    value: string;
  }[];
  groups: FilterItemType[];
  members: FilterItemType[];
  excludeVoucherId: number[];
  state: VoucherStateKey; // 소유권 상태
}

export const initialState: State = {
  names: [],
  usernames: [],
  groups: [],
  members: [],
  excludeVoucherId: [],
  state: "all"
}

export type Action =
| {
  type: "SET";
  target: "groups" | "members",
  payload: {
    id: number;
    name: string;
    checked: boolean;
  }[]; 
} | {
  type: "TOGGLE";
  target: "groups" | "members"
  id: number;
} | {
  type: "ADD_KEYWORD",
  target: SearchKeywordsType,
  value: string;
} | {
  type: "REMOVE_KEYWORD",
  target: SearchKeywordsType,
  id: number;
} | {
  type: "SET_VOUCHER_STATE";
  value: VoucherStateKey;
} | {
  type: "SET_EXCLUDE_VOUCHER_ID"
  payload: number[];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {

    // 그룹 OR 멤버 설정
    case "SET":
      return produce(state, draft => {
        draft[action.target] = action.payload;
      });

    // 그룹 OR 멤버 선택 토글
    case "TOGGLE":
      return produce(state, draft => {
        draft[action.target] = state[action.target].map(
          (item) => item.id === action.id ?
          { ...item, checked: !item.checked }:
          { ...item }
        )
      });

    // 검색 키워드 추가
    case "ADD_KEYWORD":
      if (!action.value) return state;
      if (state[action.target].find(item => item.value === action.value.trim())) return state;

      return produce(state, draft => {
        draft[action.target] = state[action.target].concat({
          id: nextId++,
          value: action.value
        });
      });

    // 검색 키워드 제거
    case "REMOVE_KEYWORD":
      return produce(state, draft => {
        draft[action.target] = state[action.target].filter(item => item.id !== action.id)
      });

    // 소유권 상태 필터 설정
    case "SET_VOUCHER_STATE":
      return produce(state, draft => {
        draft.state = action.value
      });

    // 조회에서 제외할 소유권 ID 설정
    case "SET_EXCLUDE_VOUCHER_ID":
      return produce(state, draft => {
        draft.excludeVoucherId = action.payload;
      });
    }
}
export default reducer;