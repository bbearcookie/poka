import { Photo } from '@type/photo';
import { Member } from '@type/member';
import { User } from '@type/user';

export type TradeState = 'trading' | 'traded';

// 교환글 타입
export interface Trade {
  tradeId: number;
  state: TradeState;
  amount: number;
  writtenTime: string;
  tradedTime: string;
}

// 교환글 상세 타입
export interface TradeDetail extends Trade {
  userId: number;
  voucherId: number;
  photo: Photo;
}

// 교환글이 원하는 멤버 타입
export type WantMember = Pick<Member, 'memberId' | 'name'>;

// 교환글 목록 아이템 타입
export interface TradeItem extends TradeDetail {
  wantMembers: WantMember[];
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