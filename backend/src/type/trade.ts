export interface TradeListItemType {
  trade_id: number;
  user_id: number;
  voucher_id: number;
  state: number;
  amount: number;
  written_time: string;
  traded_time: string;
  photocard_id: number;
  image_name: string;
  member_id: number;
  photo_name: string;
  member_name: string;
  group_name: string;
  wantMembers: {
    member_id: number;
    name: string;
  }[];
}