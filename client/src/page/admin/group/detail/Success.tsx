import { useContext } from 'react';
import GroupRemove from './content/GroupRemove';
import GroupProfile from './content/GroupProfile';
import MemberList from './content/member/MemberList';
import GroupContext from './GroupContext';

function Success() {
  const group = useContext(GroupContext);

  return (
    <>
      <GroupProfile {...group} />
      <MemberList res={group} />
      <GroupRemove {...group} />
    </>
  );
}

export default Success;
