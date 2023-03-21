import { Group } from '@type/group';
import { Member } from '@type/member';

// 포토카드 타입
export interface Photo {
  photocardId: number;
  name: string;
  imageName: string;
  groupData: Pick<Group, 'groupId' | 'name'>;
  memberData: Pick<Member, 'memberId' | 'name'>;
}