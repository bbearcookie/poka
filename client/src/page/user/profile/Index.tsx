import React from 'react';
import Profile from './profile/Index';
import Shipping from './shipping/Index';
import './Index.scss';
import useVoucherQuery from '@api/query/voucher/useVoucherQuery';
import useGroupsQuery from '@api/query/group/useGroupsQuery';
import useGroupQuery from '@api/query/group/useGroupQuery';

interface Props {}
const DefaultProps = {};

function Index({  }: Props) {

  const { status, data } = useVoucherQuery(71);
  // const { status, data } = useGroupQuery(14);
  console.log(status);
  console.log(data);

  return (
    <div className="ProfilePage">
      <h1 className="title-label">마이페이지</h1>
      <Profile />
      <Shipping />
    </div>
  );
}

export default Index;