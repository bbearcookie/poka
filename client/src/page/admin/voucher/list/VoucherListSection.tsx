import React, { useEffect } from 'react';
import { useAppDispatch } from '@app/redux/reduxHooks';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from './content/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import VoucherList from './content/VoucherList';
import { initialize } from './voucherListSlice';

interface VoucherListSectionProps {
  children?: React.ReactNode;
}
const VoucherListSectionDefaultProps = {};

function VoucherListSection({ children }: VoucherListSectionProps & typeof VoucherListSectionDefaultProps) {
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
        <VoucherList />
      </CardBody>
    </Card>
  );
}

VoucherListSection.defaultProps = VoucherListSectionDefaultProps;
export default VoucherListSection;