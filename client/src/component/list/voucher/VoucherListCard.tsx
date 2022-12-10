import React, { useEffect } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useAppDispatch, useAppSelector } from '@app/redux/reduxHooks';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from './content/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import VoucherList from './content/VoucherList';
import { initialize, addUsername } from './voucherListSlice';
import '../photo/PhotoListCard.scss';

interface VoucherListCardProps {
  owner: 'all' | 'mine'; // all: 모든 소유권 출력. mine: 자신의 소유권만 출력.
  icon?: IconDefinition;
  handleClickIcon?: (voucherId: number) => void;
  children?: React.ReactNode;
}
const VoucherListCardDefaultProps = {};

function VoucherListCard({ owner, icon, handleClickIcon, children }: VoucherListCardProps & typeof VoucherListCardDefaultProps) {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.username);

  // 언마운트시 리덕스 상태 초기화
  useEffect(() => {
    // 자신의 소유권만 보여줘야 할 경우 렌더시 자신의 아이디를 검색 필터에 추가
    if (owner === 'mine') dispatch(addUsername(username));

    return () => {
      dispatch(initialize());
    }
  }, [username]);

  return (
    <Card>
      <CardHeader styles={{ padding: "0", borderBottom: "0" }}>
        {owner === 'all' && <SearchInput />}
        <SearchLabelList owner={owner} />
      </CardHeader>
      <CardBody>
        <FilterCheck />
        <VoucherList owner={owner} icon={icon} handleClickIcon={handleClickIcon} />
      </CardBody>
    </Card>
  );
}

VoucherListCard.defaultProps = VoucherListCardDefaultProps;
export default VoucherListCard;