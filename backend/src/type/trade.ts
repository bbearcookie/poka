export type TradeStateType = 'trading' | 'traded';

// TODO: 아래 타입들은 새로 작성중인 타입들임.
// // 교환글 타입
// export interface Trade {
//   tradeId: number;
//   state: TradeStateType;
//   amount: number;
//   writtenTime: string;
//   tradedTime: string;
// }

// // 교환글 상세 타입
// export interface TradeDetail {
//   trade: Trade;
//   userId: number;
//   photo: Pick<PhotoType, 'photocardId' | 'name' | 'memberId'>
// }

export interface TradeType {
  tradeId: number;
  userId: number;
  voucherId: number;
  state: TradeStateType;
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