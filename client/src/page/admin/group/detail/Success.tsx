import { ResType } from '@api/query/group/useGroupQuery';
import GroupRemove from './content/GroupRemove';
import GroupProfile from './content/GroupProfile';
import MemberList from './content/member/MemberList';

interface Props {
  groupId: number;
  res: ResType;
}

function Success({ groupId, res }: Props) {
  return (
    <>
      <GroupProfile {...res} />
      <MemberList res={res} />
      <GroupRemove group={res} groupId={groupId} />
    </>
  );
}

export default Success;
