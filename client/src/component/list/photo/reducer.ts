import produce from "immer";
import { GroupFilterType, MemberFilterType } from "@type/listFilter";

let nextId = 0; // names 추가/삭제에 사용되는 변수

export interface State {
  names: {
    id: number;
    value: string;
  }[];
  groups: GroupFilterType[];
  members: MemberFilterType[];
}

export const initialState: State = {
  names: [],
  groups: [],
  members: []
}

export type Action =
| {
  type: "SET_GROUPS";
  payload: {
    groupId: number;
    name: string;
    checked: boolean;
  }[]; 
} | {
  type: "SET_MEMBERS";
  payload: {
    memberId: number;
    name: string;
    checked: boolean;
  }[];
} | {
  type: "TOGGLE_GROUP";
  groupId: number;
} | {
  type: "TOGGLE_MEMBER";
  memberId: number;
} | {
  type: "ADD_NAME",
  payload: string;
} | {
  type: "REMOVE_NAME",
  id: number;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_GROUPS":
      return produce(state, draft => {
        draft.groups = action.payload;
      });
    case "SET_MEMBERS":
      return produce(state, draft => {
        draft.members = action.payload;
      });
    case "TOGGLE_GROUP":
      return produce(state, draft => {
        draft.groups = state.groups.map(
          (item) => item.groupId === action.groupId ?
          { ...item, checked: !item.checked }:
          { ...item }
        )
      });
    case "TOGGLE_MEMBER":
      return produce(state, draft => {
        draft.members = state.members.map(
          (item) => item.memberId === action.memberId ?
          { ...item, checked: !item.checked }:
          { ...item }
        )
      });
    case "ADD_NAME":
      if (!action.payload) return state;
      if (state.names.find((item) => item.value === action.payload)) return state;

      return produce(state, draft => {
        draft.names = state.names.concat({
          id: nextId++,
          value: action.payload.trim()
        })
      });
    case "REMOVE_NAME":
      return produce(state, draft => {
        draft.names = state.names.filter((item) => item.id !== action.id)
      });
    default:
      return state;
  }
}
export default reducer;