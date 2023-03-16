// 멤버 타입
export interface Member {
  memberId: number;
  groupId: number;
  name: string;
}

// 멤버 목록 타입
export interface MemberItem extends Member {
  photoCount: number;
}