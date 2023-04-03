import React from 'react';
import useUserQuery from '@api/query/user/useUserQuery';
import { VoucherLog as VoucherLogType } from '@type/voucher';
import { getFormattedTime } from '@util/date';
import CardListItem from '@component/card/basic/CardListItem';
import UserProfile from '@component/profile/UserProfile';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { StyledLog } from './_styles';

interface Props extends VoucherLogType {}

function VoucherLog({ logId, type, voucherId, originUserId, destUserId, loggedTime }: Props) {
  return (
    <StyledLog>
      <CardListItem title="내용">
        <StateLabel state={{ type: 'voucherLog', key: type }} styles={{ width: '5em' }} />
      </CardListItem>
      <CardListItem title="시간">
        {getFormattedTime(new Date(loggedTime))}
      </CardListItem>

      {destUserId ? (
        <BothUser originUserId={originUserId} destUserId={destUserId} />
      ) : (
        <OriginUser originUserId={originUserId} />
      )}
    </StyledLog>
  );
}

export default VoucherLog;

function BothUser({ originUserId, destUserId }: { originUserId: number; destUserId: number }) {
  const originUser = useUserQuery(originUserId);
  const destUser = useUserQuery(destUserId);

  if (destUser.status !== 'success' && originUser.status !== 'success') {
    <>
      <CardListItem title="새 소유자">
        <SkeletonUserProfile />
      </CardListItem>
      <CardListItem title="기존 소유자">
        <SkeletonUserProfile />
      </CardListItem>
    </>;
  }

  return (
    <>
      <CardListItem title="새 소유자">
        <UserProfile {...destUser.data} />
      </CardListItem>
      <CardListItem title="기존 소유자">
        <UserProfile {...originUser.data} />
      </CardListItem>
    </>
  );
}

function OriginUser({ originUserId }: { originUserId: number }) {
  const originUser = useUserQuery(originUserId);

  if (originUser.status === 'success') {
    return (
      <CardListItem title="소유자">
        <UserProfile {...originUser.data} />
      </CardListItem>
    );
  }

  return (
    <CardListItem title="소유자">
      <SkeletonUserProfile />
    </CardListItem>
  );
}
