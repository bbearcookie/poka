import produce from "immer";
import { FilterItemType } from "@type/listFilter";

let nextId = 0; // names 추가/삭제에 사용되는 변수
export interface State {
  names: {
    id: number;
    value: string;
  }[];
  groups: FilterItemType[];
  members: FilterItemType[];
}

export const initialState: State = {
  names: [],
  groups: [],
  members: []
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
  type: "ADD_NAME",
  payload: string;
} | {
  type: "REMOVE_NAME",
  id: number;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET":
      return produce(state, draft => {
        draft[action.target] = action.payload;
      });
    case "TOGGLE":
      return produce(state, draft => {
        draft[action.target] = state[action.target].map(
          (item) => item.id === action.id ?
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