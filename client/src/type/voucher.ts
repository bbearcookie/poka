import { PhotoType } from '@type/photo';

export interface VoucherType extends PhotoType {
  voucher_id: number;
  state: string;
  username: string;
  nickname: string;
}

export type VoucherStateKey = 'ALL' | 'AVAILABLE' | 'TRADING' | 'SHIPPING' | 'SHIPPED';
export const VoucherStateValue: {
  [k in VoucherStateKey]: string;
} = {
    'ALL': '전체',
    'AVAILABLE': '교환가능',
    'TRADING': '교환중',
    'SHIPPING': '배송대기중',
    'SHIPPED': '배송완료'
}