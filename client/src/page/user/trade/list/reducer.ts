import produce from 'immer';

export interface State {
  select: {
    groupId: number;
    memberId: number;
  }
}

export const initialState: State = {
  select: {
    groupId: 0,
    memberId: 0
  }
}

export type Action =
  | { type: 'SET_GROUP_ID'; groupId: number; }
  | { type: 'SET_MEMBER_ID'; memberId: number; }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_GROUP_ID':
      return produce(state, draft => {
        draft.select.groupId = action.groupId
      });
    case 'SET_MEMBER_ID':
      return produce(state, draft => {
        draft.select.memberId = action.memberId
      });
    default:
      return state;
  }
}
export default reducer;