import produce from 'immer';
import { VoucherStateKey, ShippingStateKey, PaymentStateKey } from '@component/label/stateLabel/_types';
import { CheckItemType } from '@type/listFilter';

export interface State {
  groups: CheckItemType[];
  members: CheckItemType[];
  voucherState: VoucherStateKey;
  shippingState: ShippingStateKey;
  paymentState: PaymentStateKey;
}

export const initialState: State = {
  groups: [],
  members: [],
  voucherState: 'all',
  shippingState: 'all',
  paymentState: 'all',
};

export type RadioTargetType = 'voucher' | 'shipping' | 'payment';

type RadioType =
  | {
      target: 'voucher';
      value: VoucherStateKey;
    }
  | {
      target: 'shipping';
      value: ShippingStateKey;
    }
  | {
      target: 'payment';
      value: PaymentStateKey;
    };

export type Action =
  | {
      type: 'INIT_GROUPS';
      groups: CheckItemType[];
    }
  | {
      type: 'INIT_MEMBERS';
      members: CheckItemType[];
    }
  | {
      type: 'TOGGLE_GROUP';
      id: number;
    }
  | {
      type: 'TOGGLE_MEMBER';
      id: number;
    }
  | {
      type: 'SET_RADIO_FILTER';
      value: RadioType;
    };

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
        draft.groups = state.groups.map(g => (g.id === action.id ? { ...g, checked: !g.checked } : g));
      });
    case 'TOGGLE_MEMBER':
      return produce(state, draft => {
        draft.members = state.members.map(m => (m.id === action.id ? { ...m, checked: !m.checked } : m));
      });
    case 'SET_RADIO_FILTER':
      return produce(state, draft => {
        switch (action.value.target) {
          case 'voucher':
            draft.voucherState = action.value.value;
            break;
          case 'shipping':
            draft.shippingState = action.value.value;
            break;
          case 'payment':
            draft.paymentState = action.value.value;
            break;
          default:
            break;
        }
      });
    default:
      return state;
  }
};
