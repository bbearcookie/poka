import produce from 'immer';
import { VoucherStateKey, ShippingStateKey, PaymentStateKey } from '@component/label/stateLabel/_types';
import { CheckItemType } from '@type/listFilter';

export interface State {
  groups: CheckItemType[];
  members: CheckItemType[];
  voucherState: VoucherStateKey;
  shippingState: ShippingStateKey;
  paymentState: PaymentStateKey;
  initialized: boolean; // 그룹과 멤버 정보를 가져와서 기본 필터 데이터를 추가하는데
                        // 해당 필터가 변화할 때마다 데이터를 리패칭하는 경우 무의미하게 여러번 패칭하는 현상을 막기 위해서 초기화 플래그 변수를 두었다.
}

export const initialState: State = {
  groups: [],
  members: [],
  voucherState: 'all',
  shippingState: 'all',
  paymentState: 'all',
  initialized: false
}

export type RadioTargetType = 'voucher' | 'shipping' | 'payment';

type RadioType = 
{
  target: 'voucher';
  value: VoucherStateKey;
} | {
  target: 'shipping';
  value: ShippingStateKey;
} | {
  target: 'payment';
  value: PaymentStateKey;
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
  type: 'SET_RADIO_FILTER';
  value: RadioType;
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
        draft.initialized = true; // 그룹과 멤버 정보를 기본 필터에 잘 설정한 뒤에 초기화 완료 체크한다
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
}