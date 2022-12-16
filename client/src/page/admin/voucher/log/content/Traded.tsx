import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ErrorType } from '@util/request';
import { AxiosError } from 'axios';
import * as userAPI from '@api/userAPI';
import * as queryKey from '@api/queryKey';
import { LogType } from '@api/voucherAPI';
import { userImage } from '@api/resource';
import UserProfile from '@component/profile/UserProfile';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface Props {
  log: LogType;
  originUser: typeof userAPI.getUserDetail.resType;
}
const DefaultProps = {};

function Traded({ originUser, log }: Props) {
  const { data: destUser } =
  useQuery<typeof userAPI.getUserDetail.resType, AxiosError<ErrorType>>
  (queryKey.userKeys.profile(log.dest_user_id), () => userAPI.getUserDetail.axios(log.dest_user_id));

  return (
    <>
      <div className="line">
        <div className="subtitle">새 소유자</div>
        {destUser &&
        <UserProfile
          username={destUser.username}
          nickname={destUser.nickname}
          imageName={userImage(destUser.image_name)}
        />}
        {!destUser && <SkeletonUserProfile />}
      </div>
      <div className="line">
        <div className="subtitle">기존 소유자</div>
        {originUser &&
        <UserProfile
          username={originUser.username}
          nickname={originUser.nickname}
          imageName={userImage(originUser.image_name)}
        />}
        {!originUser && <SkeletonUserProfile />}
      </div>
    </>
  );
}

export default Traded;