import { PhotoType } from '@type/photo';

export interface VoucherSimpleType {
  voucherId: number;
  photocardId: number;
  userId: number;
  state: 'available' | 'trading' | 'shipping' | 'shipped';
}

export interface VoucherType extends PhotoType, VoucherSimpleType {
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