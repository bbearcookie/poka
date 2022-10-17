import React, { useEffect } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useAppDispatch } from '@app/redux/reduxHooks';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from './content/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import VoucherList from './content/VoucherList';
import { initialize } from './voucherListSlice';
import '../photo/PhotoListCard.scss';

interface VoucherListCardProps {
  icon?: IconDefinition;
  handleClickIcon?: (voucherId: number) => void;
  children?: React.ReactNode;
}
const VoucherListCardDefaultProps = {};

function VoucherListCard({ icon, handleClickIcon, children }: VoucherListCardProps & typeof VoucherListCardDefaultProps) {
  const dispatch = useAppDispatch();

  // 언마운트시 리덕스 상태 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize())
    }
  }, []);

  return (
    <Card>
      <CardHeader padding="0" borderBottom="0">
        <SearchInput />
        <SearchLabelList />
      </CardHeader>
      <CardBody>
        <FilterCheck />
        <VoucherList icon={icon} handleClickIcon={handleClickIcon} />
      </CardBody>
    </Card>
  );
}

VoucherListCard.defaultProps = VoucherListCardDefaultProps;
export default VoucherListCard;