import { Photo } from '@type/photo';
import { User } from '@type/user';

export type TradeState = 'trading' | 'traded';

// 교환글 타입
export interface Trade {
  tradeId: number;
  userId: number;
  voucherId: number;
  state: TradeState;
  amount: number;
  writtenTime: string;
  tradedTime: string;
}

// 교환글 상세 타입
export interface TradeDetail extends Omit<Trade, 'voucherId'> {
  voucher: {
    voucherId: number;
  } & Photo;
}

// 교환글 목록 아이템 타입
export interface TradeItem extends Omit<Trade, 'userId' | 'voucherId'> {
  voucher: {
    voucherId: number;
  } & Photo;
  author: User;
  wantcards: Photo[];
}

// 교환 내역 타입
export interface TradeHistory {
  logId: number;
  voucherId: number;
  photo: Photo;
  originUser: User;
  destUser: User;
  loggedTime: string;
}