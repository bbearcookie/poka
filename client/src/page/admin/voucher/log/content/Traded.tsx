import React from 'react';
import useUserQuery from '@api/query/user/useUserQuery';
import { ResType as UserResType } from '@api/query/user/useUserQuery';
import { VoucherLogType } from '@type/voucher';
import { userImage } from '@api/resource';
import UserProfile from '@component/profile/UserProfile';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface Props {
  log: VoucherLogType;
  originUser: UserResType;
}
const DefaultProps = {};

function Traded({ originUser, log }: Props) {
  const { data: destUser } = useUserQuery(log.dest_user_id);

  return (
    <>
      <div className="line">
        <div className="subtitle">새 소유자</div>
        {destUser &&
        <UserProfile
          username={destUser.username}
          nickname={destUser.nickname}
          imageName={userImage(destUser.imageName)}
        />}
        {!destUser && <SkeletonUserProfile />}
      </div>
      <div className="line">
        <div className="subtitle">기존 소유자</div>
        {originUser &&
        <UserProfile
          username={originUser.username}
          nickname={originUser.nickname}
          imageName={userImage(originUser.imageName)}
        />}
        {!originUser && <SkeletonUserProfile />}
      </div>
    </>
  );
}

export default Traded;