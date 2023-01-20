export type TradeStateType = 'trading' | 'traded';

export interface TradeType {
  trade_id: number;
  user_id: number;
  voucher_id: number;
  state: TradeStateType;
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