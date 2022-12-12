export interface GroupType {
  groupId: number;
  name: string;
  checked: boolean;
}

export interface MemberType {
  memberId: number;
  name: string;
  checked: boolean;
}

export type VoucherStateType = 'ALL' | 'AVAILABLE' | 'TRADING' | 'SHIPPING' | 'SHIPPED';
export const VoucherStateName: {
  [k in VoucherStateType]: string;
} = {
    'ALL': '전체',
    'AVAILABLE': '교환가능',
    'TRADING': '교환중',
    'SHIPPING': '배송대기중',
    'SHIPPED': '배송완료'
}