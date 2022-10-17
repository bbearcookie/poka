import React, { useCallback } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const handleClickDetailicon = useCallback((voucherId: number) => {
    console.log(`TODO: ${voucherId} 소유권 상세 페이지로 이동`);
  }, []);

  return (
    <div className="VoucherListPage">
      <h1 className="title-label">소유권 목록</h1>
      <VoucherListCard icon={faArrowRight} handleClickIcon={handleClickDetailicon} />
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;