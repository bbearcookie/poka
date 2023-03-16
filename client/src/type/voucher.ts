import { Photo } from '@type/photo';

export interface VoucherType extends Photo {
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