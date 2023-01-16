import { PhotoType } from '@type/photo';

export interface VoucherType extends PhotoType {
  voucher_id: number;
  state: 'available' | 'trading' | 'shipping' | 'shipped';
  username: string;
  nickname: string;
}

export interface VoucherLogType {
  log_id: number;
  voucher_id: number;
  origin_user_id: number;
  dest_user_id: number;
  type: 'issued' | 'traded' | 'shipped';
  logged_time: string;
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