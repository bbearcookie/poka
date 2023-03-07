import produce from 'immer';
import { VoucherStateKey } from '@component/label/stateLabel/_types';
import { CheckItemType } from '@type/listFilter';

export interface State {
  groups: CheckItemType[];
  members: CheckItemType[];
  voucherState: VoucherStateKey;
}

export const initialState: State = {
  groups: [],
  members: [],
  voucherState: 'all'
}

export type Action = |
{
  type: 'INIT_GROUPS';
  groups: CheckItemType[];
} | {
  type: 'INIT_MEMBERS';
  members: CheckItemType[];
} | {
  type: 'TOGGLE_GROUP';
  id: number;
} | {
  type: 'TOGGLE_MEMBER';
  id: number;
} | {
  type: 'SET_VOUCHER_STATE';
  value: VoucherStateKey;
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INIT_GROUPS':
      return produce(state, draft => {
        draft.groups = action.groups;
      });
    case 'INIT_MEMBERS':
      return produce(state, draft => {
        draft.members = action.members;
      });
    case 'TOGGLE_GROUP':
      return produce(state, draft => {
        draft.groups = state.groups.map(g =>
          g.id === action.id ?
          { ...g, checked: !g.checked } :
          g
        );
      });
    case 'TOGGLE_MEMBER':
      return produce(state, draft => {
        draft.members = state.members.map(m =>
          m.id === action.id ?
          { ...m, checked: !m.checked } :
          m
        );
      });
    case 'SET_VOUCHER_STATE':
      return produce(state, draft => {
        draft.voucherState = action.value;
      });
    default:
      return state;
  }
}