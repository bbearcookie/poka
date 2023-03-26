import useUserQuery from '@api/query/user/useUserQuery';
import { ResType as UserResType } from '@api/query/user/useUserQuery';
import { VoucherLog } from '@type/voucher';
import UserProfile from '@component/profile/UserProfile';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface Props {
  log: VoucherLog;
  originUser: UserResType;
}

function Traded({ originUser, log }: Props) {
  const { data: destUser } = useUserQuery(log.destUserId);

  return (
    <>
      <div className="line">
        <div className="subtitle">새 소유자</div>
        {destUser &&
        <UserProfile
          username={destUser.username}
          nickname={destUser.nickname}
          imageName={destUser.imageName}
        />}
        {!destUser && <SkeletonUserProfile />}
      </div>
      <div className="line">
        <div className="subtitle">기존 소유자</div>
        {originUser &&
        <UserProfile
          username={originUser.username}
          nickname={originUser.nickname}
          imageName={originUser.imageName}
        />}
        {!originUser && <SkeletonUserProfile />}
      </div>
    </>
  );
}

export default Traded;