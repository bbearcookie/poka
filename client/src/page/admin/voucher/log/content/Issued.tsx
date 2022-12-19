import React from 'react';
import { userImage } from '@api/resource';
import { ResType as UserResType } from '@api/query/user/useUserQuery';
import UserProfile from '@component/profile/UserProfile';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface Props {
  originUser: UserResType;
}
const DefaultProps = {};

function Issued({ originUser }: Props) {
  return (
    <div className="line">
      <div className="subtitle">소유자</div>
      {originUser &&
      <UserProfile
        username={originUser.username}
        nickname={originUser.nickname}
        imageName={userImage(originUser.image_name)}
      />}
      {!originUser && <SkeletonUserProfile />}
    </div>
  );
}

export default Issued;