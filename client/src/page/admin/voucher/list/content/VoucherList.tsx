import React, { useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useAppSelector } from '@app/reduxHooks';

interface VoucherListProps {
  children?: React.ReactNode;
}
const VoucherListDefaultProps = {};

function VoucherList({ children }: VoucherListProps & typeof VoucherListDefaultProps) {
  const filter = useAppSelector((state) => state.voucherList.filter);

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(async () => {
    console.log(filter);
  }, [filter]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [filter]);

  return (
    <div>
      여기엔 아이템 목록들 나옴
    </div>
  );
}

VoucherList.defaultProps = VoucherListDefaultProps;
export default VoucherList;