import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import './Index.scss';

interface Props {}
const IndexDefaultProps = {};

function Index({  }: Props) {
  const navigate = useNavigate();

  // 상세 페이지로 이동
  const handleClickDetailicon = useCallback((voucherId: number) => {
    navigate(`/voucher/detail/${voucherId}`);
  }, [navigate]);

  return (
    <div className="InventoryPage">
    <h1 className="title-label">소유권 보관함</h1>
      <VoucherListCard
        icon={faArrowRight}
        handleClickIcon={handleClickDetailicon}
        defaultFilter={{
          owner: 'MINE',
          state: 'ALL'
        }}
      />
    </div>
  );
}

export default Index;