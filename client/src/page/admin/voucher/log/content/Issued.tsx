import React from 'react';
import * as userAPI from '@api/userAPI';
import { userImage } from '@api/resource';
import UserProfile from '@component/profile/UserProfile';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface IssuedProps {
  originUser: typeof userAPI.getUserDetail.resType
  children?: React.ReactNode;
}
const IssuedDefaultProps = {};

function Issued({ originUser, children }: IssuedProps & typeof IssuedDefaultProps) {
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

Issued.defaultProps = IssuedDefaultProps;
export default Issued;