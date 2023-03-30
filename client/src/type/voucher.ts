import { Photo } from '@type/photo';
import { User } from '@type/user';

export type VoucherState = 'available' | 'trading' | 'shipping' | 'shipped';

// 소유권 타입
export interface Voucher {
  voucherId: number;
  state: VoucherState;
  createdTime: string;
}

// 소유권 목록 타입
export interface VoucherItem extends Voucher {
  photo: Photo;
  owner: User;
}

// 소유권 기록 타입
export interface VoucherLog {
  logId: number;
  type: 'issued' | 'traded' | 'shipped';
  voucherId: number;
  originUserId: number;
  destUserId: number;
  loggedTime: string;
}