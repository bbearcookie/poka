import { PhotoType } from '@type/photo';

export interface VoucherType extends PhotoType {
  voucherId: number;
  userId: number;
  state: 'available' | 'trading' | 'shipping' | 'shipped';
  username: string;
  nickname: string;
}

export interface VoucherLogType {
  logId: number;
  voucherId: number;
  originUserId: number;
  destUserId: number;
  type: 'issued' | 'traded' | 'shipped';
  loggedTime: string;
}

export type VoucherStateKey = 'all' | 'available' | 'trading' | 'shipping' | 'shipped';
export const VoucherStateValue: {
  [k in VoucherStateKey]: string;
} = {
    'all': '전체',
    'available': '교환가능',
    'trading': '교환중',
    'shipping': '배송대기중',
    'shipped': '배송완료'
}