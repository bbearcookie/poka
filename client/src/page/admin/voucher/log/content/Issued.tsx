import React from 'react';
import { ResType as UserResType } from '@api/query/user/useUserQuery';
import UserProfile from '@component/profile/UserProfile';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface Props {
  originUser: UserResType;
}

function Issued({ originUser }: Props) {
  return (
    <div className="line">
      <div className="subtitle">소유자</div>
      {originUser &&
      <UserProfile
        username={originUser.username}
        nickname={originUser.nickname}
        imageName={originUser.imageName}
      />}
      {!originUser && <SkeletonUserProfile />}
    </div>
  );
}

export default Issued;