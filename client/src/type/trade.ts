export interface TradeType {
  trade_id: number;
  user_id: number;
  voucher_id: number;
  state: TradeStateKey;
  amount: number;
  written_time: string;
  traded_time: string;
  photocard_id: number;
  image_name: string;
  member_id: number;
  photo_name: string;
  member_name: string;
  group_name: string;
}

export interface WantcardType {
  photocard_id: number;
  member_id: number;
  group_id: number;
  photo_name: string;
  member_name: string;
  group_name: string;
  image_name: string;
}

export interface TradeListItemType extends TradeType {
  wantMembers: {
    member_id: number;
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