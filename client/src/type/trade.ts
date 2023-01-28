export interface TradeType {
  tradeId: number;
  userId: number;
  voucherId: number;
  state: TradeStateKey;
  amount: number;
  writtenTime: string;
  tradedTime: string;
  photocardId: number;
  memberId: number;
  photoName: string;
  memberName: string;
  groupName: string;
  imageName: string;
}

export interface WantcardType {
  photocardId: number;
  memberId: number;
  groupId: number;
  photoName: string;
  memberName: string;
  groupName: string;
  imageName: string;
}

export interface TradeListItemType extends TradeType {
  wantMembers: {
    memberId: number;
    name: string;
  }[];
}

export type TradeStateKey = 'trading' | 'traded';
export const TradeStateValue: {
  [k in TradeStateKey]: string;
} = {
  trading: '대기중',
  traded: '완료'
}

export interface TradeHistoryType {
  logId: number;
  voucherId: number;
  photocardId: number;
  photoImageName: string;
  photoName: string;
  memberName: string;
  groupName: string;
  originUserId: number;
  originUserName: string;
  originUserNickname: string;
  originUserImageName: string;
  destUserId: number;
  destUserName: string;
  destUserNickname: string;
  destUserImageName: string;
  loggedTime: Date;
}