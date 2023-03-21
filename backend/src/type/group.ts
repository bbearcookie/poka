// 그룹 타입
export interface Group {
  groupId: number;
  name: string;
  imageName: string;
}

// 그룹 목록 타입
export interface GroupItem extends Group {
  memberCount: number;
}